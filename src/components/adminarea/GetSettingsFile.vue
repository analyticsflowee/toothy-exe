<template>
  <div class="relative min-h-screen bg-gray-100">
    <div class="h-52 w-full bg-indigo-600"></div>
    <main class="-mt-32">
      <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6 h-52-screen">
          <div class="flex justify-center items-center h-full">
            <div>
              <div
                class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8"
              >
                <h2 class="text-3xl font-extrabold text-gray-900">
                  Toothy-Tron seadistamine
                </h2>
                <div class="mt-8 space-y-6 my-4">
                  <div class="relative">
                    <dt>
                      <div
                        class="absolute h-12 w-12 flex items-center justify-center bg-indigo-500 rounded-md"
                      >
                        <svg
                          class="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </div>
                      <p
                        @click="downloadFile"
                        class="ml-16 text-lg leading-6 font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                      >
                        Lae alla seadete fail vajutades siia.
                      </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-gray-500">
                      Faili nimi peab olema "settings.json"
                    </dd>
                  </div>

                  <div class="relative">
                    <dt>
                      <div
                        class="absolute h-12 w-12 flex items-center justify-center bg-indigo-500 rounded-md"
                      >
                        <svg
                          class="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p
                        class="ml-16 text-lg leading-6 font-medium text-gray-900"
                      >
                        Liiguta fail "Program Files/toothy-tron" kausta
                      </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-gray-500">
                      Kui on installitud eestikeelne windows, võib kausta nimi
                      erineda (Programmifailid/toothy-tron)
                    </dd>
                  </div>

                  <div class="relative">
                    <dt>
                      <div
                        class="absolute h-12 w-12 flex items-center justify-center rounded-md transform transition-all duration-300"
                        :class="allGood ? 'bg-green-500' : 'bg-red-500'"
                      >
                        <svg
                          class="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            v-if="allGood"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                          <path
                            v-else
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <p
                        @click="checkStatus"
                        class="ml-16 text-lg leading-6 font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                      >
                        Vajuta siia, et kontrollida kas kõik on korras
                      </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-gray-500">
                      <p v-if="allGood">
                        Kõik on korras, toothy-tron sulgub mõne sekundi pärast
                      </p>
                      <p v-else>
                        Kui kõik on seadistatud korrektselt, muutub ikooni värv
                        roheliseks!
                      </p>
                    </dd>
                  </div>
                </div>

                <div
                  class="mt-6 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0"
                >
                  <button
                    @click="startOver"
                    class="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Alusta uuesti
                  </button>
                </div>
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
  props: ["process", "cabinet"],
  emits: ["onStartOver"],
  data() {
    return {
      allGood: false,
    };
  },
  computed: {
    fileTemplate() {
      return JSON.stringify({
        process: this.$props.process,
        cabinet: this.$props.cabinet,
      });
    },
  },
  methods: {
    downloadFile() {
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(this.fileTemplate)
      );
      element.setAttribute("download", "settings.json");

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    async checkStatus() {
      try {
        const process = await window.electronSettings.get("process");
        const cabinet = await window.electronSettings.get("cabinet");
        if (!process) {
          this.$toasted.error("Programm ei ole valitud");
          return;
        }
        if (!cabinet) {
          this.$toasted.error("Cabinet ei ole valitud");
          return;
        }
        this.allGood = true;
        setTimeout(async () => {
          await this.$router.push({ name: "MainArea" });
          await window.ipcRenderer.invoke("hide");
        }, 3000);
      } catch (e) {
        this.$toasted.error("settings.json faili ei leitud");
      }
    },
    startOver() {
      this.$emit("onStartOver");
    },
  },
};
</script>

<style scoped></style>
