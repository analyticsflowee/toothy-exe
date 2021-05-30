<template>
  <router-view v-if="showMainApp" />
  <PageLayout v-else>
    <div class="flex flex-col justify-center items-center w-full h-full">
      <LoadingSvg class="w-96 h-96" />
      <p class="text-xl font-extrabold">
        <span v-if="error">{{ error }}</span>
        <span v-else>{{ $t("loading") }}</span>
      </p>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from "@/components/PageLayout";
import LoadingSvg from "@/assets/svg/loading.svg";
import { auth } from "./db";

export default {
  components: {
    PageLayout,
    LoadingSvg,
  },
  data() {
    return {
      loading: true,
      error: false,
    };
  },
  computed: {
    showMainApp() {
      return (!this.loading && !this.error) || true;
    },
  },
  async created() {
    await auth;
    this.loading = false;
  },
  mounted() {
    window.addEventListener("error", (e) => {
      this.error = e.message;
      console.log(e);
      this.$toasted.error(this.$t("networkError"));
    });
  },
};
</script>
