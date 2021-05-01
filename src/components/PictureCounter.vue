<template>
  <WithLabel for-attribute="addOperators" :label="$t('PictureCounter.label')">
    <ItemCounter
      v-for="(value, index) in value"
      :value="value.value"
      :key="index"
      :disabled="disabled"
      @plus="plus(index)"
      @minus="minus(index)"
    >
      {{ value.label }}
    </ItemCounter>

    <div class="w-full border-t border-1 mt-4 border-gray-300"></div>

    <ItemCounter :value="total" is-total>
      {{ $t("PictureCounter.total") }}
    </ItemCounter>
  </WithLabel>
</template>

<script>
import WithLabel from "./WithLabel";
import ItemCounter from "./ItemCounter";

export default {
  components: {
    WithLabel,
    ItemCounter,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    total() {
      return this.value.reduce((acc, cur) => {
        return acc + cur.value;
      }, 0);
    },
  },
  methods: {
    plus(index) {
      const updated = this.value.map((s) => ({ ...s }));
      const item = this.value[index];
      updated.splice(index, 1, { ...item, value: item.value + 1 });
      this.$emit("input", updated);
    },
    minus(index) {
      const updated = this.value.map((s) => ({ ...s }));
      const item = this.value[index];
      const value = Math.max(item.value - 1, 0);
      updated.splice(index, 1, { ...item, value });
      this.$emit("input", updated);
    },
  },
};
</script>
