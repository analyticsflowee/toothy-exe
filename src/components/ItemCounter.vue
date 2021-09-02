<template>
  <div
    :class="{
      'flex justify-between  mt-2 p-2 rounded-lg': true,
      'text-gray-400': disabled,
      'text-indigo-600': !disabled,
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
        :disabled="disabled"
        :class="{ 'mr-1': true, 'opacity-0 pointer-events-none	': isTotal }"
        @click="$emit('minus')"
      >
        <MinusCircleIcon class="h-7 w-7" />
      </button>
      <span
        :class="{
          'w-7 text-center text-lg text-black': true,
          'text-gray-400': !value || disabled,
        }"
      >
        {{ value }}
      </span>

      <button
        :disabled="disabled"
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
