<template>
  <WithLabel :for-attribute="name">
    <div class="inline-flex">
      <input
        v-model="internalValue"
        type="text"
        :name="name"
        :id="name"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        :class="{ 'border-r-0 rounded-r-none': hasButton }"
        :placeholder="placeholder"
        :aria-describedby="descriptionId"
      />
      <slot />
    </div>
    <p class="mt-2 text-sm text-gray-500" :id="descriptionId">
      <slot name="description"></slot>
    </p>
  </WithLabel>
</template>

<script>
import WithLabel from "@/components/WithLabel";

export default {
  components: {
    WithLabel,
  },
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
  },
  computed: {
    descriptionId() {
      return `${this.name}-description`;
    },
    hasButton() {
      return this.$scopedSlots.default;
    },
    internalValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style></style>
