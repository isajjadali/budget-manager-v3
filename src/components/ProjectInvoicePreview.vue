<template>
  <LoaderView v-if="loadingPdf" :isProjectPreview="true" />
  <h3 v-else-if="!pdfBlobUrl">
    Unable to load pdf
  </h3>
  <iframe
    v-else
    :src="pdfBlobUrl"
    width="100%"
    style="min-height: inherit"
  />
</template>

<script>
import {mapActions} from 'vuex';
import LoaderView from './LoaderView.vue';

export default {
  name: 'ProjectInvoicePreview',
  components: {
    LoaderView
  },
  props: {
    projectId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loadingPdf: true,
      pdfBlobUrl: null,
    };
  },
  async mounted() {
    this.loadingPdf = true;
    this.pdfBlobUrl = await this.fetchPreviewPDF(this.projectId);
    this.loadingPdf = false;
  },
  methods: {
    ...mapActions('global', ['fetchPreviewPDF']),
  }
};
</script>

<style scoped>

</style>