<template>
  <PageLayout>
    <template #left>
      <AddOperators :clinic-id="cabinetData.clinicUID" v-model="workers" />
    </template>
    <template #top-left>
      <span>{{ cabinetData.name }}</span>
    </template>
    <template #right>
      <PictureCounter v-model="snapshots" :disabled="!workers.length" />
    </template>
    <template #footer>
      <BasicButton class="w-full" @click="saveSnapshot" :disabled="!enableSave">
        {{ $t("save") }}
      </BasicButton>
    </template>
  </PageLayout>
</template>

<script>
import PageLayout from "@/components/PageLayout";
import BasicButton from "@/components/basic/BasicButton";
import AddOperators from "@/components/AddOperators";
import PictureCounter from "@/components/PictureCounter";
import { db } from "@/db";

export default {
  name: "App",
  components: {
    PageLayout,
    BasicButton,
    AddOperators,
    PictureCounter,
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
    enableSave() {
      return this.workers.length > 0 && this.snapshots.some((s) => s.value);
    },
  },
  methods: {
    checkAdmin(e) {
      this.code = (this.code + e.key).substr(-10);
      if (this.code === "Shiftadmin") {
        this.code = "";
        this.$router.push({ name: "AdminArea" });
      }
    },
    saveSnapshot() {
      db.collection("snapshots").add({
        cabinetUID: this.cabinet,
        workersUIDs: [...this.workers],
        pictures: [...this.snapshots],
        timestamp: Date.now(),
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
