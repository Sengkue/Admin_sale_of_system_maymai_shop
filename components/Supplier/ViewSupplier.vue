<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5 shadow">supplier Details</span>
          <v-spacer />
          <v-btn
            color="error darken-1"
            class="mt-n10 mr-n6"
            text
            @click="back()"
            ><v-icon>mdi-close-box-multiple</v-icon> Close
          </v-btn>
        </v-card-title>
        <div
          class="d-flex justify-center pb-2"
          style="box-shadow: 2px 2px 3px #999"
        >
          <v-img
            class="shadow-img"
            lazy-src="no_user.png"
            max-height="250"
            max-width="250"
            :src="`${getOneUser.profile}`"
          />
        </div>
        <v-card-title class="box2">
          <v-row>
            <v-col cols="12">
              <div class="d-flex">
                <div style="font-size: 16px; font-weight: bold">ຊື່:</div>
                <span class="pl-2"> {{ getOneUser.name }}</span>
              </div>
              <v-divider />
              <div class="d-flex">
                <div style="font-size: 16px; font-weight: bold">phone:</div>
                <span class="pl-2"> {{ getOneUser.phone }}</span>
              </div>
              <v-divider />

              <div class="d-flex">
                <div style="font-size: 16px; font-weight: bold">Address:</div>
                <span class="pl-2"> {{ getOneUser.address }}</span>
              </div>
              <v-divider />

              <div class="d-flex">
                <div style="font-size: 16px; font-weight: bold">province</div>
                <span class="pl-2"> {{ getOneUser.province }}</span>
              </div>
              <v-divider />
              <div class="d-flex">
                <div style="font-size: 16px; font-weight: bold">district</div>
                <span class="pl-2"> {{ getOneUser.district }}</span>
              </div>
              <v-divider />
              <div class="d-flex">
                <div style="font-size: 16px; font-weight: bold">village</div>
                <span class="pl-2"> {{ getOneUser.village }}</span>
              </div>
              <v-divider />
              <div>
                <div class="text-caption text-sm-body-2 text-md-body-1">
                  task:
                </div>
                <v-card-text max-height="200" style="border: 1px solid silver">
                  {{ getOneUser.description }}</v-card-text
                >
              </div>
              <v-divider />
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    dialog: '',
  }),
  computed: {
    getOneUser() {
      return this.$store.state.supplier.StateSelectOne
    },
  },
  mounted() {
    this.dialog = this.$store.state.supplier.view
  },
  methods: {
    back() {
      this.$store.commit('supplier/setView', false)
    },
  },
}
</script>
<style lang="scss" scoped>
.shadow-img {
  padding: 5px;
  box-shadow: 2px 2px 4px #999;
  border-radius: 5%;
  border: 5px solid teal;
  box-shadow: 12px;
}
</style>
