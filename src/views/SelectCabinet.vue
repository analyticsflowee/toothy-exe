<template>
  <PageLayout>
    <div class="flex flex-col">
      <div class="my-4 text-center">
        <h3 class="text-xl leading-6 font-medium text-gray-900">
          Sisestage kabineti ID
        </h3>
      </div>
      <div class="flex">
        <BasicInput
          name="Cabinet"
          :placeholder="$t('SelectCabinet.placeholder')"
          v-model.trim="cabinet"
        >
          <template #label> Cabinet</template>
          <template #default>
            <BasicButton @click="onSelect" :loading="loading">
              {{ $t("save") }}
            </BasicButton>
          </template>
        </BasicInput>
      </div>
    </div>
    <AreYouSureCabinetModal
      v-if="selectingCabinetModal"
      :cabinet="tempCabinet"
      @onSelect="setCabinet"
    />
  </PageLayout>
</template>

<script>
import PageLayout from "@/components/PageLayout";
import BasicInput from "@/components/basic/BasicInput";
import BasicButton from "@/components/basic/BasicButton";
import { db } from "@/db";
import AreYouSureCabinetModal from "@/components/modal/AreYouSureCabinetModal";

export default {
  components: {
    AreYouSureCabinetModal,
    PageLayout,
    BasicInput,
    BasicButton,
  },
  data() {
    return {
      cabinet: null,
      loading: false,
      selectingCabinetModal: false,
      tempCabinet: undefined,
    };
  },
  methods: {
    async onSelect() {
      this.loading = true;
      if (!this.cabinet) {
        this.$toasted.error("Palun sisestage kabineti ID");
        this.loading = false;
        return;
      }

      const querySnapshot = await db
        .collection("cabinets")
        .doc(this.cabinet)
        .get();
      if (!querySnapshot.exists) {
        this.$toasted.error("Antud kabineti ei eksisteeri");
        this.loading = false;
        return;
      }
      const {
        xRayEquipmentsUID,
        clinicUID,
        name: cabinetName,
      } = querySnapshot.data();
      if (!xRayEquipmentsUID.length) {
        this.$toasted.error(
          "Antud kabinetil puuduvad registreeritud röntgen seadmed"
        );
        this.loading = false;
        return;
      }

      const clinicSnapshot = await db
        .collection("clinics")
        .doc(clinicUID)
        .get();
      if (!querySnapshot.exists) {
        this.$toasted.error("Antud kliinikumi ei eksisteeri");
        this.loading = false;
        return;
      }

      const { workersUID, name: clinicName } = clinicSnapshot.data();
      if (!workersUID.length) {
        this.$toasted.error("Antud kliinikumil puuduvad töötajad");
        this.loading = false;
        return;
      }
      this.loading = false;
      this.tempCabinet = {
        cabinetUID: this.cabinet,
        cabinetName: cabinetName,
        clinicName: clinicName,
      };
      this.selectingCabinetModal = true;
    },

    async setCabinet(iAmSure) {
      this.selectingCabinetModal = false;
      if (iAmSure) {
        await window.electronSettings.set(
          "cabinet",
          this.tempCabinet.cabinetUID
        );
        await this.$router.push({ name: "MainArea" });
        await window.ipcRenderer.invoke("hide");
      }
      this.tempCabinet = undefined;
    },
  },
};
</script>

<style></style>
