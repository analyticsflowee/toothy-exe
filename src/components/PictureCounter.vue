<template>
  <WithLabel for-attribute="addOperators" label="Set pictures">
    <ItemCounter
      v-for="(value, index) in labeled"
      :value="value.value"
      :key="index"
      @plus="plus(index)"
      @minus="minus(index)"
    >
      {{ value.label }}
    </ItemCounter>

    <div class="w-full border-t border-1 mt-4 border-gray-300"></div>

    <ItemCounter :value="total" is-total> Total </ItemCounter>
  </WithLabel>
</template>

<script>
import WithLabel from "./WithLabel";
import ItemCounter from "./ItemCounter";

const labels = {
  pic_one: "Intracranial",
  pic_two: "2D Panoramic",
  pic_three: "3D Sector",
  pic_four: "3D Something/Else",
  pic_five: "3D Another one",
  pic_six: "SEHP something",
};

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
  },
  computed: {
    total() {
      return this.value.reduce((acc, cur) => {
        return acc + cur.value;
      }, 0);
    },
    labeled() {
      return this.value.map((v) => ({ ...v, label: labels[v.key] }));
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
