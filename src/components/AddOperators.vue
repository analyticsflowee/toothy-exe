<template>
  <div>
    <label for="addOperators" class="block text-md font-bold text-gray-700">
      Add Operators
    </label>
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
  </div>
</template>

<script>
import { SearchIcon, CrossIcon } from "./icons";
import BasicDropdown from "./BasicDropdown";

export default {
  components: {
    SearchIcon,
    CrossIcon,
    BasicDropdown,
  },
  data() {
    return {
      search: "",
      searchData: [
        { key: 1, label: "Operator 1" },
        { key: 2, label: "Operator 2" },
        { key: 3, label: "Operator 3" },
      ],
      selected: [1, 2],
    };
  },
  computed: {
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
};
</script>

<style></style>
