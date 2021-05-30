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
          @click="setProcess(process)"
        >
          {{ process.cmd }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BasicButton from "@/components/basic/BasicButton";

export default {
  components: { BasicButton },
  data() {
    return {
      processes: [],
      search: "",
      selected: {},
    };
  },
  computed: {
    filteredProcesses() {
      return this.processes.filter((p) => p.cmd.includes(this.search));
    },
  },
  methods: {
    async setProcess(process) {
      this.selected = process;
      window.electronSettings.set("process", process);
      this.$toasted.success(this.$t("AdminArea.processSelected"));
      await this.$nextTick();
      this.$router.push({ name: "MainArea" });
    },
    async refresh() {
      this.processes = await window.ipcRenderer.invoke("get-processes");
    },
  },
  async mounted() {
    this.processes = await window.ipcRenderer.invoke("get-processes");
    this.selected = (await window.electronSettings.get("process")) || {};
  },
};
</script>

<style></style>
