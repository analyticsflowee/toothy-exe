<template>
  <div :class="{ 'mt-1 relative': true, 'z-20': shown }" @click.prevent.stop>
    <slot :show="show" :hide="hide" :toggle="toggle"></slot>
    <transition
      leave-active-class="transition-all"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ul
        v-if="shown"
        class="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        role="listbox"
      >
        <li
          v-for="option in parsedOptions"
          :key="option.key"
          :class="{
            'cursor-default select-none relative py-2 pl-8 pr-4': true,
            'text-white bg-indigo-600': option.highlighted,
            'text-gray-900': !option.highlighted,
          }"
          role="option"
          tabindex="0"
          @mouseover="highlight(option)"
          @mouseout="downlight(option)"
          @click="select(option)"
          @keydown.enter="select(option)"
          @keydown.esc="hide"
        >
          <span
            :class="{
              'block truncate': true,
              'font-normal': !option.selected,
              'font-semibold': option.selected,
            }"
          >
            {{ option.label }}
          </span>

          <span
            v-if="option.selected"
            :class="{
              'absolute inset-y-0 left-0 flex items-center pl-1.5': true,
              'text-white': option.highlighted,
              'text-indigo-600': !option.highlighted,
            }"
          >
            <CheckIcon/>
          </span>
        </li>
        <li v-if="!parsedOptions.length" class="cursor-default select-none relative py-2 pl-8 pr-4 text-gray-900'">
          <span class="block truncate font-normal">Tulemused puuduvad...</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import {CheckIcon} from "../icons";

export default {
  components: {
    CheckIcon,
  },
  props: {
    selected: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    search: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      shown: false,
      highlighted: null,
    };
  },
  computed: {
    parsedOptions() {
      return this.options
        .filter((o) =>
          o.label.toLowerCase().includes(this.$props.search.toLowerCase())
        )
        .map((o) => ({
          ...o,
          selected: this.selected.includes(o.key),
          highlighted: this.highlighted === o.key,
        }));
    },
  },
  mounted() {
    window.document.body.addEventListener("click", this.hide, false);
  },
  beforeDestroy() {
    window.document.body.removeEventListener("click", this.hide, false);
  },
  methods: {
    select(option) {
      this.$emit("select", option);
    },
    highlight({key}) {
      this.highlighted = key;
    },
    downlight({key}) {
      if (this.highlighted === key) {
        this.highlighted = null;
      }
    },
    show() {
      this.shown = true;
    },
    hide() {
      this.shown = false;
    },
    toggle() {
      this.shown = !this.shown;
    },
  },
};
</script>
