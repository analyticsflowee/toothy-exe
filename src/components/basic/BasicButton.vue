<template>
  <button
    v-on="$listeners"
    type="button"
    :disabled="disabled"
    class="inline-flex items-center justify-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    :class="{
      'bg-gray-100 text-gray-500': disabled,
      'bg-indigo-600 hover:bg-indigo-700 text-white': !disabled,
    }"
  >
    <span class="uppercase">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
