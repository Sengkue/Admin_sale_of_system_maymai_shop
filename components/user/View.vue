<!-- <template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">user Details</span>
          <v-spacer />
          <v-btn color="error darken-1" class="mt-n6 mr-n6" text @click="back()"
            ><v-icon>mdi-close-box-multiple</v-icon> Close
          </v-btn>
        </v-card-title>
        <div class="d-flex justify-center">
          <v-img
            style="border-radius: 5%; border: 5px solid teal; box-shadow: 12px"
            lazy-src="user.png"
            max-height="200"
            max-width="200"
            src="user.png"
          />
        </div>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="d-flex">
                  <div class="px-3">Username:</div>
                  <span> {{ getOneUser.username }}</span>
                </div>
                <div class="d-flex">
                  <div class="px-3">paswword:</div>
                  <span> {{ getOneUser.password }}</span>
                </div>
                <div class="d-flex">
                  <div class="px-3">id:</div>
                  <span> {{ getOneUser.id }}</span>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    dialog: "",
    passwordShow: "",
  }),
  computed: {
    getOneUser() {
      return this.$store.state.user.StateSelectOne;
    },
  },
  mounted() {
    this.dialog = this.$store.state.user.view;
  },
  methods: {
    back() {
      this.$store.commit("user/setView", false);
    },
  },
};
</script> -->
