<template>
  <div class="bg-white relative shadow overflow-hidden rounded-md">
    <div class="px-4 py-5 sm:px-6 fixed w-full bg-white flex">
      <input type="text" v-model="search" />
      <BasicButton @click="$emit('close')">Close</BasicButton>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <ul class="divide-y divide-gray-200">
        <li
          :class="{
            'px-6 py-4': true,
            'bg-indigo-600': process.pid === selected.pid,
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
    setProcess(process) {
      this.selected = process;
      window.electronSettings.set("process", process);
    },
  },
  async mounted() {
    this.processes = await window.ipcRenderer.invoke("get-processes");
    this.selected = await window.electronSettings.get("process");
  },
};
</script>

<style></style>
