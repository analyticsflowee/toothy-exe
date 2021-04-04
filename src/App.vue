<template>
  <PageLayout>
    <template #top-left>
      <SelectDropdown
        name="cabinet-select"
        :options="cabinetOptions"
        v-model="selectedCabinet"
      />
    </template>
    <template #left>
      <AddOperators />
    </template>

    <template #right>
      <PictureCounter />
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
import PictureCounter from "./components/PictureCounter";
export default {
  name: "App",
  components: {
    SelectDropdown,
    PageLayout,
    BasicButton,
    AddOperators,
    PictureCounter,
  },
  data() {
    return {
      selectedCabinet: {},
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
