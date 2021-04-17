<template>
  <WithLabel for-attribute="addOperators" label="Add Operators">
    <div class="mt-1 relative rounded-md shadow-sm">
      <BasicDropdown
        :selected="selected"
        :options="searchData"
        @select="toggleSelected"
      >
        <template #default="{ show, hide }">
          <input
            type="text"
            name="add-operators"
            id="addOperators"
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md h-9"
            placeholder="Add operators"
            v-model="search"
            @keydown.esc="hide"
            @keydown.enter="show"
            @focus="show"
          />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button @click="show">
              <SearchIcon class="text-gray-400" />
            </button>
          </div>
        </template>
      </BasicDropdown>
    </div>
    <ul class="space-y-3 mt-4">
      <li
        v-for="operator in parsedSelected"
        :key="operator.key"
        class="bg-white shadow overflow-hidden rounded-md px-3 inline-flex w-full justify-between items-center h-9"
      >
        <span>
          {{ operator.label }}
        </span>
        <button @click="toggleSelected(operator)">
          <CrossIcon class="text-gray-400" />
        </button>
      </li>
    </ul>
  </WithLabel>
</template>

<script>
import { SearchIcon, CrossIcon } from "./icons";
import BasicDropdown from "./basic/BasicDropdown";
import WithLabel from "./WithLabel";
import { db } from "@/db";

export default {
  components: {
    SearchIcon,
    CrossIcon,
    BasicDropdown,
    WithLabel,
  },
  props: {
    clinicId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      search: "",
      workers: [],
      selected: [1, 2],
    };
  },
  computed: {
    searchData() {
      return this.workers.map((w) => ({ key: w.clinicUID, label: w.name }));
    },
    parsedSelected() {
      return this.searchData.filter((o) => this.selected.includes(o.key));
    },
  },
  methods: {
    toggleSelected({ key }) {
      if (this.selected.includes(key)) {
        this.selected = this.selected.filter((k) => k !== key);
      } else {
        this.selected.push(key);
      }
    },
  },
  watch: {
    clinicId: {
      immediate: true,
      handler(clinicId) {
        if (clinicId) {
          this.$bind(
            "workers",
            db.collection("workers").where("clinicUID", "==", this.clinicId)
          );
        }
      },
    },
  },
};
</script>

<style></style>
