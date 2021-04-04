<template>
  <PageLayout>
    <template #left>
      <SelectDropdown
        name="cabinet-select"
        :options="cabinetOptions"
        v-model="selectedCabinet"
      />
      <AddOperators />
    </template>
    <template #footer>
      <BasicButton class="w-full"> Save </BasicButton>
    </template>
  </PageLayout>
</template>

<script>
import PageLayout from "./components/PageLayout";
import SelectDropdown from "./components/SelectDropdown";
import BasicButton from "./components/BasicButton";
import AddOperators from "./components/AddOperators";
export default {
  name: "App",
  components: {
    SelectDropdown,
    PageLayout,
    BasicButton,
    AddOperators,
  },
  data() {
    return {
      selectedCabinet: "",
    };
  },
  computed: {
    cabinetOptions() {
      return [1, 2, 3, 4].map((key) => ({ key, label: `Kabinet ${key}` }));
    },
  },
};
</script>

<style></style>
