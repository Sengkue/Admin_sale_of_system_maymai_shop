
<!-- <template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">user Edit</span>
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
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="username"
                    :rules="userNameRules"
                    label="Name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="back()"> Close </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="updateuser()"
            :disabled="!valid"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    loading: false,
    valid: true,
    username: "",
    userNameRules: [
      (v) => !!v || "Username is required",
      (v) =>
        (v && v.length <= 50) || "username must be less than 50 characters",
    ],
    passworld: "",
    passwordRules: [
      (v) => !!v || "password is required",
      (v) =>
        (v && v.length <= 70) || "password must be less than 50 characters",
    ],
  }),
  computed: {
    getOneUser() {
      return this.$store.state.user.StateSelectOne;
    },
  },
  created() {
    this.dialog = this.$store.state.user.edit;
    if (this.getOneUser) {
      this.username = this.getOneUser.username;
      this.password = this.getOneUser.password;
    }
  },
  methods: {
    back() {
      this.$store.commit("user/setEdit", false);
    },
    async updateuser() {
      this.$refs.form.validate();
      if (!this.valid) return;
      this.loading = true;

      const formData = new FormData();
      formData.append("username", this.form.username);
      formData.append("pasword", this.form.password);

      try {
        await this.$store.dispatch("/user/update", formData);
        this.success = true;
        this.$refs.form.reset();
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script> -->
