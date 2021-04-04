<template>
  <BasicDropdown
    :options="options"
    :selected="[value.key]"
    @select="setSelected"
    ref="dropdown"
  >
    <template #default="{ toggle, hide }">
      <button
        type="button"
        class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-9"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        @click="toggle"
        @keydown.esc="hide"
      >
        <span class="block truncate"> {{ value.label }} </span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <SelectorIcon class="text-gray-400" />
        </span>
      </button>
    </template>
  </BasicDropdown>
</template>

<script>
import BasicDropdown from "./BasicDropdown";
import { SelectorIcon } from "./icons";
export default {
  components: {
    BasicDropdown,
    SelectorIcon,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    setSelected(value) {
      this.$emit("input", value);
      this.$refs.dropdown.hide();
    },
  },
};
</script>

<style></style>
