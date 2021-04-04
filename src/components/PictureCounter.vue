<template>
  <WithLabel for-attribute="addOperators" label="Set pictures">
    <ItemCounter
      v-for="(value, index) in values"
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
export default {
  components: {
    WithLabel,
    ItemCounter,
  },
  data() {
    return {
      values: [
        { value: 1, label: "Intracranial" },
        { value: 3, label: "2D Panoramic" },
        { value: 3, label: "3D Sector" },
        { value: 3, label: "3D Something/Else" },
        { value: 3, label: "3D Another one" },
        { value: 3, label: "SEHP something" },
      ],
    };
  },
  computed: {
    total() {
      return this.values.reduce((acc, cur) => {
        return acc + cur.value;
      }, 0);
    },
  },
  methods: {
    plus(index) {
      const item = this.values[index];
      this.values.splice(index, 1, { ...item, value: item.value + 1 });
    },
    minus(index) {
      const item = this.values[index];
      const value = Math.max(item.value - 1, 0);
      this.values.splice(index, 1, { ...item, value });
    },
  },
};
</script>
