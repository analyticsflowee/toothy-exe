<template>
  <PageLayout v-if="!showAdmin">
    <template #left>
      <AddOperators :clinic-id="cabinetData.clinicUID" />
    </template>
    <template #top-left>
      <span>{{ cabinetData.name }}</span>
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
import PageLayout from "@/components/PageLayout";
import BasicButton from "@/components/basic/BasicButton";
import AddOperators from "@/components/AddOperators";
import PictureCounter from "@/components/PictureCounter";
import AdminArea from "@/components/AdminArea";
import { db } from "@/db";

export default {
  name: "App",
  components: {
    PageLayout,
    BasicButton,
    AddOperators,
    PictureCounter,
    AdminArea,
  },
  data() {
    return {
      cabinet: null,
      cabinetData: {},
      clinic: {},
      code: "",
    };
  },
  computed: {
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
  async mounted() {
    this.cabinet = await window.electronSettings.get("cabinet");
    window.addEventListener("keydown", this.checkAdmin, false);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.checkAdmin, false);
  },
  watch: {
    cabinet: {
      immediate: false,
      handler(cabinet) {
        this.$bind("cabinetData", db.collection("cabinets").doc(cabinet));
      },
    },
    "cabinetData.clinicUID": {
      immediate: true,
      handler(clinicUID) {
        if (clinicUID) {
          this.$bind("clinic", db.collection("clinics").doc(clinicUID));
        }
      },
    },
  },
};
</script>

<style></style>
