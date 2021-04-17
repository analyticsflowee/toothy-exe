<template>
  <PageLayout v-if="!showAdmin">
    <template #left>
      <AddOperators :clinic-id="cabinetData.clinicUID" v-model="workers" />
    </template>
    <template #top-left>
      <span>{{ cabinetData.name }}</span>
    </template>
    <template #right>
      <PictureCounter v-model="snapshots" />
    </template>
    <template #footer>
      <BasicButton class="w-full" @click="saveSnapshot"> Save </BasicButton>
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
      workers: [],
      snapshots: [
        { value: 0, key: "pic_one" },
        { value: 0, key: "pic_two" },
        { value: 0, key: "pic_three" },
        { value: 0, key: "pic_four" },
        { value: 0, key: "pic_five" },
        { value: 0, key: "pic_six" },
      ],
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
    saveSnapshot() {
      db.collection("snapshots").add({
        cabinetUID: this.cabinet,
        workersUIDs: [...this.workers],
        pictures: [...this.snapshots],
      });
      this.workers = [];
      this.snapshots = this.snapshots.map((s) => ({ ...s, value: 0 }));
      window.ipcRenderer.invoke("hide");
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
