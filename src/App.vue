<template>
  <PageLayout v-if="!showAdmin">
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
  <AdminArea v-else @close="code = ''" />
</template>

<script>
import PageLayout from "./components/PageLayout";
import SelectDropdown from "./components/SelectDropdown";
import BasicButton from "./components/BasicButton";
import AddOperators from "./components/AddOperators";
import PictureCounter from "./components/PictureCounter";
import AdminArea from "./components/AdminArea";
export default {
  name: "App",
  components: {
    SelectDropdown,
    PageLayout,
    BasicButton,
    AddOperators,
    PictureCounter,
    AdminArea,
  },
  data() {
    return {
      selectedCabinet: {},
      code: "",
    };
  },
  computed: {
    cabinetOptions() {
      return [1, 2, 3, 4].map((key) => ({ key, label: `Kabinet ${key}` }));
    },
    showAdmin() {
      return this.code === "Shiftadmin";
    },
  },
  methods: {
    checkAdmin(e) {
      if (this.showAdmin) {
        return;
      }
      this.code = (this.code + e.key).substr(-10);
    },
  },
  mounted() {
    window.addEventListener("keydown", this.checkAdmin, false);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.checkAdmin, false);
  },
};
</script>

<style></style>
