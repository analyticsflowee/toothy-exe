<template>
  <div class="bg-white relative shadow overflow-hidden rounded-md h-screen">
    <div class="px-4 py-5 sm:px-6 fixed w-full bg-white flex justify-between">
      <input type="text" v-model="search" />
      <BasicButton @click="refresh">{{ $t("refresh") }}</BasicButton>
    </div>
    <div class="px-4 mt-10 sm:p-6">
      <ul class="divide-y divide-gray-200">
        <li
          :class="{
            'px-6 py-4 cursor-pointer	': true,
            'bg-indigo-600 text-white': process.pid === selected.pid,
          }"
          v-for="process in filteredProcesses"
          :key="process.pid"
          @click="onSelect(process)"
        >
          {{ process.cmd }} - <span class="font-bold">{{ process.name }}</span>
        </li>
      </ul>
    </div>
    <AreYouSureProcessModal
      v-if="selectingProccessModal"
      :process="tempProcess"
      @onSelect="setProcess"
    />
  </div>
</template>

<script>
import BasicButton from "@/components/basic/BasicButton";
import AreYouSureProcessModal from "@/components/modal/AreYouSureProcessModal";
export default {
  components: { AreYouSureProcessModal, BasicButton },
  emits: ["onProcess"],
  data() {
    return {
      processes: [],
      search: "",
      selected: {},
      newProcesses: [],
      selectingProccessModal: false,
      tempProcess: undefined,
    };
  },
  computed: {
    filteredProcesses() {
      return this.newProcesses.filter(
        (p) =>
          p.cmd.toLowerCase().includes(this.search.toLowerCase()) ||
          p.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {

    onSelect(process) {
      this.tempProcess = process;
      this.selectingProccessModal = true;
    },
    async setProcess(iAmSure) {
      this.selectingProccessModal = false;
      if (iAmSure) {
        this.selected = this.tempProcess;
        this.$emit("onProcess", this.selected);
      }
      this.tempProcess = undefined;
    },
    async refresh() {
      this.processes = await window.ipcRenderer.invoke("get-processes");
    },
  },
  watch: {
    processes(newP, oldP) {
      this.newProcesses = newP.filter(
        (np) => !oldP.find((op) => op.cmd === np.cmd)
      );
    },
  },
  async mounted() {
    this.processes = await window.ipcRenderer.invoke("get-processes");
    this.selected = (await window.electronSettings.get("process")) || {};
  },
};
</script>

<style></style>
