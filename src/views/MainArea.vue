<template>
  <PageLayout
    v-if="!loadingState.loading"
    :cabinet-data="cabinetData"
    :clinic="clinic"
  >
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
      <div class="w-full flex justify-around">
        <!--        <BasicButton class="w-1/2" @click="saveSnapshot" :disabled="!enableSave">-->
        <!--          {{ $t("addImages") }}-->
        <!--        </BasicButton>-->

        <button
          v-if="enableSave"
          class="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="saveSnapshot"
        >
          {{ $t("addImages") }}
        </button>
        <div class="rounded-md bg-yellow-50 p-4 w-1/2" v-else>
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-md font-medium text-yellow-800">
                Piltide edukaks lisamiseks
              </h3>
              <div class="mt-2 text-md text-yellow-700">
                <ul class="list-disc pl-5 space-y-1">
                  <li v-if="!isWorkersSelected">
                    Lisa isik või isikud kes olid pildi tegemise hetkel
                    kabinetis
                  </li>
                  <li v-if="!isImagesAdded">
                    Lisa kogus piltidele mis tehti kabinetis
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<script>
import PageLayout from "@/components/PageLayout";
import AddOperators from "@/components/AddOperators";
import PictureCounter from "@/components/PictureCounter";
import { db } from "@/db";

export default {
  name: "MainArea",
  inject: ["loadingState"],
  components: {
    PageLayout,
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
      return this.isWorkersSelected && this.isImagesAdded;
    },
    isWorkersSelected() {
      return this.workers.length > 0;
    },
    isImagesAdded() {
      return this.snapshots.some((s) => s.value);
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
          this.loadingState.setLoading(true);
          this.snapshots = [];
          this.xRayEquipments = await this.getCollectionSlice(
            "xRayEquipments",
            xRayEquipmentsUID
          );
          this.xRayImages = await this.getCollectionSlice("xRayImages", [
            ...this.xRayEquipments.flatMap((x) => x.imageUIDs),
          ]);

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

          this.loadingState.setLoading(false);
        }
      },
    },
  },
};
</script>

<style></style>
