<template>
  <div class="flex items-center">
    <button
      @click="changeValue"
      type="button"
      :class="value ? 'bg-indigo-600' : 'bg-gray-200'"
      class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      role="switch">
      <span
        :class="value ? 'translate-x-5' : 'translate-x-0'"
        class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
    </button>
    <span class="ml-3">
     <span class="text-sm font-medium text-gray-900"><slot/> </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    changeValue() {
      this.$emit("changeValue");
    }
  }
}

</script>

<style scoped>

</style>