<template>
  <div
    :class="{
      'flex justify-between text-indigo-600 mt-2 p-2 rounded-lg': true,
      'bg-gray-100': value && !isTotal,
    }"
  >
    <div
      :class="{
        'text-gray-400': !value && !isTotal,
        'text-bold text-black': isTotal,
      }"
    >
      <slot></slot>
    </div>
    <div class="flex items-center">
      <button
        :class="{ 'mr-1': true, 'opacity-0 pointer-events-none	': isTotal }"
        @click="$emit('minus')"
      >
        <MinusCircleIcon class="h-7 w-7" />
      </button>
      <span
        :class="{
          'w-7 text-center text-lg text-black': true,
          'text-gray-400': !value,
        }"
      >
        {{ value }}
      </span>

      <button
        :class="{ 'ml-1': true, 'opacity-0 pointer-events-none	': isTotal }"
        @click="$emit('plus')"
      >
        <PlusCircleIcon class="h-7 w-7" />
      </button>
    </div>
  </div>
</template>

<script>
import { PlusCircleIcon, MinusCircleIcon } from "./icons";

export default {
  components: {
    PlusCircleIcon,
    MinusCircleIcon,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    isTotal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
