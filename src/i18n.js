import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: "ee",
  messages: {
    en: {
      AddOperators: {
        label: "Add Operators",
      },
      SelectCabinet: {
        placeholder: "Cabinet",
      },
      PictureCounter: {
        label: "Set pictures",
        total: "Total",
      },
      AdminArea: {
        processSelected: "Process correctly selected",
      },
      save: "Save",
      close: "Close",
      networkError:
        "An error occurred while contacting the server, please try to re-open the application",
      loading: "Loading...",
      refresh: "Refresh",
    },
    ee: {
      AddOperators: {
        label: "Lisa isik",
      },
      SelectCabinet: {
        placeholder: "Kabinet",
      },
      PictureCounter: {
        label: "Vali pilt",
        total: "Pilte kokku",
      },
      AdminArea: {
        processSelected: "Process correctly selected",
      },
      save: "Salvesta",
      close: "Sulge",
      networkError:
        "An error occurred while contacting the server, please try to re-open the application",
      loading: "Loading...",
      refresh: "Refresh",
    },
  },
});
