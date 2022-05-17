<template>
  <div>
    <v-row v-for="payin in payins" :key='payin.id'>
      <v-col cols='12'>
        <h3>{{getSectionLabel(payin.date)}}</h3>
      </v-col>
      <v-col cols='12'>
        <ActivitiesItem 
          :activity="payin"
          :isPayin="true"
          @itemClicked="OnPayinClick"
          @delete="onPayinDelete"
        />
      </v-col>
    </v-row>
    <ModalEdit 
      :activity="activePayin"
      :isOpen="toggleModalOpen"
      :projects="projects"
      @cancel="OnCancel"
      @save="OnSave"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ActivitiesItem from "./ActivitiesItem.vue";
import ModalEdit from "./ModalEdit.vue";

export default {
  name: "PayinsList",
  data: () => ({
    toggleModalOpen: false,
    activePayin: {},
  }),
  components: {
    ActivitiesItem,
    ModalEdit,
  },
  computed: {
    ...mapState("global", ["payins", "projects"]),
  },
  methods: {
    ...mapActions("global", ["fetchAllPayins", "updatePayins"]),

    OnPayinClick(payin) {
      this.toggleModalOpen = true;
      this.activePayin = payin;
    },
    getSectionLabel(date) {
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        const compDate = new Date(date);
        compDate.setHours(0);
        compDate.setMinutes(0);
        compDate.setSeconds(0);
        compDate.setMilliseconds(0);
        const diff = today.getTime() - compDate.getTime();
        if (compDate.getTime() == today.getTime()) {
          return "Today";
        } else if (diff <= (24 * 60 * 60 * 1000)) {
          return "Yesterday";
        } else { 
          return date; // or format it what ever way you want
        }
    },
    async OnSave(payin) {
      await this.updatePayins(payin);
      this.toggleModalOpen = false;
      this.fetchAllPayins(true);
    },
    OnCancel() {
      this.toggleModalOpen = false;
    },
    onPayinDelete(payin) {
      alert("Payin Deleted: ", payin.id);
    }
  },
  mounted() {
    this.fetchAllPayins();
  },
};
</script>
