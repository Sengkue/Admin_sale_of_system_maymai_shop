<template>
  <div>
    <div>
      <v-card class="px-5">
        <v-row>
          <v-col cols="12" sm="12" class="mt-2 mb-n2">
            <div class="d-flex justify-center">
              <h2>ສິນຄ້າ</h2>
            </div>
          </v-col>
          <v-col cols="12" sm="12" class="mb-n5">
            <div style="max-width: 100%" elevation="1" class="ml-1 d-flex justify-center">
              <v-btn
              style="width: 20%"
                class="mx-n1 mb-1 rounded-0 btn-border"
                :class="activeWindow === 1 ? 'blue white--text ' : ''"
                @click="activeWindow = 1"
              >
                <v-icon>mdi-file-document</v-icon>
                <div>ສິນຄ້າທັງໝົດໃນສະຕ໊ອກ</div>
              </v-btn>
              <v-btn
              style="width: 20%"
                class="mx-n1 mb-1 rounded-0 btn-border"
                :class="activeWindow === 2 ? 'blue white--text' : ''"
                @click="activeWindow = 2"
              >
                <v-icon>mdi-file-document</v-icon>
                <div>ສິນຄ້າຂາຍດີ</div>
              </v-btn>
              <v-btn
              style="width: 20%"
                class="mx-n1 mb-1 rounded-0 btn-border"
                :class="activeWindow === 3 ? 'blue white--text' : ''"
                @click="activeWindow = 3"
              >
                <v-icon>mdi-file-document</v-icon>
                <div>ສິນຄ້າໃກ້ໝົດສະຕ໊ອກ</div>
              </v-btn>
            </div>
          </v-col>

          <v-col cols="12" sm="12">
            <v-window v-model="activeWindow">
              <!-- ___________window ___________ -->
              <v-window-item :value="1">
                <div>
                  <report-report-all-products-in-stock
                  />
                </div>
              </v-window-item>
              <v-window-item :value="2">
                <div ><TranslateDocumentsWaiteDocumentForPay /></div>
              </v-window-item>
              <v-window-item :value="3">
                <!-- Content for window 3 -->
                <div><TranslateDocumentsFinishPayDocument /></div>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <!-- <div v-if="getEdit">
      <TranslateDocumentsEdit />
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeWindow: 1,
      loading: false,
    };
  },
  computed: {
    getView() {
      return this.$store.state.TranslateDocuments.view;
    },
  },

  watch: {
    activeWindow() {
      this.loading = true;
      if (this.activeWindow === 3) {
        this.$store.dispatch("TranslateDocuments/selectNewDocument", 2);
      }
      if (this.activeWindow === 2) {
        this.$store.dispatch("TranslateDocuments/selectNewDocument", 1);
      }
      if (this.activeWindow === 1) {
        this.$store.dispatch("product/selectAll");
      }
      this.loading = false;
    },
  },
  async mounted() {
    try {
      this.loading = true;
   await  this.$store.dispatch("product/selectAll");
      this.loading = false;
    } catch (error) {
      this.$toast.error("error!");
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.my-swal-container {
  padding: 25px;
  margin: 25px;
}
.btn-border {
  border: 2px solid rgb(105, 105, 105);
}
// .box:hover {
//   transform: translateY(-5px);
//   box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
// }
</style>
