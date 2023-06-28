<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5 shadow"> Edit supplier</span>
          <v-spacer />
          <v-btn
            color="error darken-1"
            class="mt-n6 mr-n6"
            text
            @click="back()"
          >
            <v-icon>mdi-close-box-multiple</v-icon> Close
          </v-btn>
        </v-card-title>

        <div class="d-flex justify-center mb-5"></div>

        <div class="justify-center text-center mt-5 mb-5">
          <div>
            <v-avatar size="120">
              <v-img v-if="url" :src="url"></v-img>
              <v-img
                v-else
                :src="`https://loyal-api.itcapital.la/${file}`"
              ></v-img>
            </v-avatar>
          </div>
          <v-file-input
            id="file"
            v-model="files"
            label="Image"
            filled
            class="d-none"
            prepend-icon="mdi-camera"
            @change="onFileChange"
            @click="upload"
          ></v-file-input>
          <!--------------------------- buttom profile -->
          <v-btn class="mt-2" color="primary" small @click="upload">
            <v-icon>mdi-tray-arrow-up</v-icon>
            Profile
          </v-btn>
        </div>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    :rules="nameRules"
                    clearable
                    outlined
                    dense
                    v-model="name"
                    label="ຊື່*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    :rules="surnameRules"
                    clearable
                    outlined
                    dense
                    v-model="surname"
                    label="ນາມສະກຸນ*"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    :rules="telephoneRules"
                    clearable
                    outlined
                    dense
                    v-model="tel"
                    label="ເບີ*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-0"
                  ><v-text-field
                    :rules="emailRules"
                    clearable
                    outlined
                    dense
                    v-model="email"
                    label="Email*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-textarea
                    clearable
                    outlined
                    dense
                    v-model="task"
                    label="task*"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div v-if="uploadImage" class="loading-graphic">
            <div class="loading-bar" :style="{ width: getPercentage + '%' }">
              <div class="loading-number">{{ getPercentage }}%</div>
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="back()">Close</v-btn>
          <v-btn
            color="blue darken-1"
            text
            :loading="loading"
            @click="updateItem()"
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
    uploadImage: false,
    files: null,
    url: null,
    task: false,
    dialog: false,
    valid: false,
    file: null,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
    ],
    surname: "",
    surnameRules: [
      (v) => !!v || "Surname is required",
      (v) => (v && v.length <= 50) || "Surname must be less than 50 characters",
    ],
    tel: "",
    telephoneRules: [
      (v) => !!v || "Telephone is required",
      (v) => /^\d+$/.test(v) || "Telephone must contain only digits",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
      (v) => (v && v.length <= 50) || "E-mail must be less than 50 characters",
    ],
    supplierId: "",
    loading: false,
    success: false,
    error: false,
  }),
  computed: {
    getPercentage: {
      get() {
        return this.$store.state.supplier.uploadProgress;
      },
      set(value) {},
    },
    getOneUser() {
      return this.$store.state.supplier.StateSelectOne;
    },
  },
  created() {
    this.dialog = this.$store.state.supplier.edit;
    if (this.getOneUser) {
      this.supplierId = this.getOneUser.id;
      this.name = this.getOneUser.name;
      // this.surname = this.getOneUser.surname;
      this.tel = this.getOneUser.phone;

      // this.email = this.getOneUser.email;
      this.file = this.getOneUser.profile;
      this.task = this.getOneUser.description;
      this.image = this.getOneUser.profile;
    }
  },
  methods: {
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e);
      }
    },
    upload() {
      document.getElementById("file").click();
    },
    back() {
      this.$store.commit("supplier/setEdit", false);
    },
    async updateItem() {
      this.uploadImage = true;
      let imagedata = '';
      const id = this.supplierId;
      this.$refs.form.validate();
      if (!this.valid) return;
      this.loading = true;
      if (this.files !== null) {
        await this.$store.dispatch("supplier/upload", this.files);
         imagedata = await this.$store.state.supplier.image;
      } else {
         imagedata = this.getOneUser.picture;
      }
      try {
        const formData = {
          name: this.name,
          surname: this.surname,
          tel: this.tel,
          email: this.email,
          task: this.task,
          picture: imagedata,
        };
        await this.$store.dispatch("supplier/update", { formData, id });
        this.uploadImage = false;
        this.$store.commit("supplier/setEdit", false);
        this.$store.dispatch("supplier/selectAll");
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
</script>
