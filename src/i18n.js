import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: "en",
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
      save: "Save",
      close: "Close",
    },
    ee: {
      AddOperators: {
        label: "Add Operators",
      },
    },
  },
});
