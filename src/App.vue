<template>
  <div>
    2
    <router-view />
    <div v-if="loading" class="absolute w-screen h-screen bg-white z-10">
      <div class="flex flex-col justify-center items-center w-full h-full">
        <LoadingSvg class="w-96 h-96" />
        <p class="text-xl font-extrabold">
          <span>{{ $t("loading") }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import LoadingSvg from "@/assets/svg/loading.svg";
import { auth } from "./db";


const loadingState = Vue.observable({
  loading: false,
  setLoading(value) {
    this.loading = value;
  },
});

export default {
  components: {
    LoadingSvg,
  },
  provide: { loadingState },
  data() {
    return {
      error: false,
    };
  },
  computed: {
    loading() {
      return loadingState.loading;
    },
  },
  methods: {
    updateOnlineStatus() {
      if (!navigator.onLine) this.$router.push({ name: "NoConnection" });
      else {
        if (this.$route.name === "NoConnection")
          this.$router.push({ name: "MainArea" });
      }
    },
  },
  async created() {
    loadingState.setLoading(true);
    await auth;
    loadingState.setLoading(false);
  },
  mounted() {
    this.updateOnlineStatus();
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
};
</script>
