<template>
  <SelectProccess v-if="!process" @onProcess="onProcess" />
  <SelectCabinet v-else-if="!cabinet" @onCabinet="onCabinet" />
  <GetSettingsFile
    v-else
    :process="process"
    :cabinet="cabinet"
    @onStartOver="onStartOver"
  />
</template>
<script>
import SelectProccess from "@/components/adminarea/SelectProccess";
import SelectCabinet from "@/components/adminarea/SelectCabinet";
import GetSettingsFile from "@/components/adminarea/GetSettingsFile";

export default {
  components: { GetSettingsFile, SelectCabinet, SelectProccess },
  data() {
    return {
      process: undefined,
      cabinet: undefined,
    };
  },
  methods: {
    onProcess(process) {
      this.$toasted.success(this.$t("AdminArea.processSelected"));
      this.process = process;
    },
    onCabinet(cabinet) {
      this.$toasted.success("Kabinet valitud");
      this.cabinet = cabinet;
    },
    onStartOver() {
      this.process = undefined;
      this.cabinet = undefined;
    },
  },
};
</script>
