<template>
  <PageLayout>
    <div class="flex">
      <BasicInput name="Cabinet" placeholder="Cabinet" v-model="cabinet">
        <template #label> Cabinet </template>
        <template #default>
          <BasicButton @click="save"> Save </BasicButton>
        </template>
      </BasicInput>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from "@/components/PageLayout";
import BasicInput from "@/components/basic/BasicInput";
import BasicButton from "@/components/basic/BasicButton";

export default {
  components: {
    PageLayout,
    BasicInput,
    BasicButton,
  },
  data() {
    return {
      cabinet: null,
    };
  },
  methods: {
    async save() {
      await window.electronSettings.set("cabinet", this.cabinet);
      this.$router.push({ name: "Main" });
    },
  },
};
</script>

<style></style>
