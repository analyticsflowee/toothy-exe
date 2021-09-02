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
    <span class="uppercase inline-flex w-24 justify-center">
      <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" v-if="loading">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <slot v-if="!loading"></slot>
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
