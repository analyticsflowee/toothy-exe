<template>
  <div class="min-h-screen bg-gray-100">
    <div class="bg-indigo-600 pb-32">
      <nav
        class="bg-indigo-600 border-b border-indigo-300 border-opacity-25 lg:border-none"
      ></nav>
      <header class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-white">
            Toothy Tron
            <span class="cursor-pointer" v-if="cabinet" @click="removeCabinet"
              >({{ cabinet }})
            </span>
          </h1>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6 h-1/2-screen">
          <div
            v-if="$scopedSlots.default"
            class="flex justify-center items-center h-full"
          >
            <div>
              <slot />
            </div>
          </div>
          <div class="h-full flex flex-col" v-else>
            <div class="grid grid-cols-6 mb-4">
              <slot name="top-left"> </slot>
            </div>
            <div class="grid grid-cols-6 grid-rows-3 flex-1">
              <div class="col-span-2 row-span-3">
                <slot name="left"></slot>
              </div>
              <div class="col-span-3 col-start-4 row-span-3">
                <slot name="right"></slot>
              </div>
              <div class="col-span-6 mt-4">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cabinet: null,
    };
  },
  async mounted() {
    this.cabinet = await window.electronSettings.get("cabinet");
  },
  methods: {
    async removeCabinet() {
      await window.electronSettings.set("cabinet", null);
      this.$router.push({ name: "SelectCabinet" });
    },
  },
};
</script>
