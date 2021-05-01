<template>
  <PageLayout v-if="cabinetData">
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
  name: "MainArea",
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
      xRayEquipments: [],
      xRayImages: [],
      snapshots: [],
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
    async getCollectionSlice(collection, ids) {
      const querySnapshot = await db.collection(collection).get();
      const items = querySnapshot.docs.filter((d) => ids.includes(d.id));
      return items.map((d) => ({ ...d.data(), collectionId: d.id }));
    },
  },
  async mounted() {
    this.cabinet = await window.electronSettings.get("cabinet");
    window.addEventListener("keydown", this.checkAdmin, false);
    window.ipcRenderer.on("refresh", async () => {
      this.cabinet = null;
      this.cabinet = await window.electronSettings.get("cabinet");
    });
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.checkAdmin, false);
  },
  watch: {
    cabinet: {
      immediate: false,
      handler(cabinet) {
        if (cabinet) {
          this.$bind("cabinetData", db.collection("cabinets").doc(cabinet));
        }
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
    "cabinetData.xRayEquipmentsUID": {
      immediate: true,
      async handler(xRayEquipmentsUID) {
        if (xRayEquipmentsUID) {
          this.snapshots = [];
          this.xRayEquipments = await this.getCollectionSlice(
            "xRayEquipments",
            xRayEquipmentsUID
          );

          this.xRayImages = await this.getCollectionSlice(
            "xRayImages",
            ...this.xRayEquipments.map((x) => x.imageUIDs)
          );

          this.xRayEquipments.forEach((equipment) => {
            equipment.imageUIDs.forEach((imageId) => {
              const image = this.xRayImages.find(
                (i) => i.collectionId === imageId
              );
              this.snapshots.push({
                value: 0,
                label: `${equipment.name} - ${image.imageName}`,
                xRayImageId: image.collectionId,
                xRayEquipmentUID: equipment.collectionId,
              });
            });
          });
        }
      },
    },
  },
};
</script>

<style></style>
