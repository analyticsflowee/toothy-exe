<template>
  <div>
    <label :for="forAttribute" class="block text-md font-bold text-gray-700">
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    forAttribute: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
