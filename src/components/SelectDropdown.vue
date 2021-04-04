<template>
  <div>
    <!-- TODO: refactor this to use BasicDropdown -->
    <label :for="uniqueId" class="block text-sm font-medium text-gray-700">
      <slot></slot>
    </label>
    <select
      :id="uniqueId"
      :name="name"
      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      v-model="internalValue"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :selected="isSelected(option)"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
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
      type: String,
      default: null,
    },
  },
  computed: {
    uniqueId() {
      return `select_${this._uid}`;
    },
    internalValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value.key);
      },
    },
  },
  methods: {
    isSelected(option) {
      return option.key === this.value;
    },
  },
};
</script>

<style></style>
