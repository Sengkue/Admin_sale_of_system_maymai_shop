<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="700px" max-height="100%">
      <v-card>
        <v-form ref="form" v-model="valid">
          <v-card class="teal white--text text-center py-2 mb-n10">
            <span class="text-h5">Create customer</span>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" class="">
                  <div class="justify-center text-center mt-5">
                    <div>
                      <v-avatar
                        size="130"
                        style="
                          border-radius: 50%;
                          border: 6px solid teal;
                          box-shadow: 12px;
                        "
                      >
                        <v-img v-if="url" :src="url"></v-img>
                        <v-img v-else src="logo.png"></v-img>
                      </v-avatar>
                    </div>
                    <v-file-input
                    id="file"
                    v-model="file"
                      :rules="imageRules"
                      label="Image"
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
                </v-col>
                <v-col cols="12" class="py-0" sm="6">
                  <v-text-field
                  v-model="fname"
                    :rules="nameRules"
                    clearable
                    outlined
                    dense
                    label="ຊື່*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0" sm="6">
                  <v-text-field
                  v-model="lname"
                    :rules="nameRules"
                    clearable
                    outlined
                    dense
                    label="ນາມສະກຸນ"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0" sm="6">
                  <v-text-field
                  v-model="phone"
                    :rules="telephoneRules"
                    clearable
                    outlined
                    dense
                    label="ເບີ*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-text-field
                  v-model="password"
                    clearable
                    outlined
                    dense
                    label="ລະຫັດ*"
                    class="custom-textarea"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="gender"
                    outlined
                    dense
                    :items="['ຍິງ','ຊາຍ']"
                    label="ເພດ"
                    required
                    clearable
                    clear-icon="mdi-close-circle-outline"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <div v-if="uploadImage" class="loading-graphic">
              <div class="loading-bar" :style="{ width: getPercentage + '%' }">
                <div class="loading-number">{{ getPercentage }}%</div>
              </div>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="back()"> Close </v-btn>
            <v-btn
              color="blue darken-1"
              :loading="loading"
              text
              :disabled="!valid"
              @click="insert()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    uploadImage: false,
    valid: false,
    file: null,
    url: null,
    imageRules: [(v) => !!v || 'Image is required'],
    loading: false,
    modal: '',
    dialog: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 50) || 'Name must be less than 50 characters',
    ],
    telephoneRules: [
      (v) => !!v || 'Telephone is required',
      (v) => /^\d+$/.test(v) || 'Telephone must contain only digits',
      (v) => (v && v.length <= 15) || 'Telephone must be less than 15 digits',
    ],
    fname:'',
    lname:'',
    gender:'',
    phone: '',
    password:'',
    urlImage: '',
  }),
  computed: {
    getPercentage: {
      get() {
        return this.$store.state.customer.uploadProgress
      },
      set(value) {},
    },
    getOneUser() {
      return this.$store.state.customer.StateSelectOne
    },
  },
  mounted() {
    this.dialog = this.$store.state.customer.insert
  },
  methods: {
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e)
      }
    },
    upload() {
      document.getElementById('file').click()
    },
    back() {
      this.$store.commit('customer/setInsert', false)
    },
    async insert() {
      this.uploadImage = true
      const file = this.file
      const formData = new FormData()
      formData.append('file', file)
      this.$refs.form.validate()
      if (!this.valid) return
      this.loading = true
      this.urlImage = await this.$axios
        .post('upload/single', formData)
        .then((response) => {
          return response?.data?.url
        })
        .catch((error) => {
          this.$toast.success('File upload failed',error)
        })

      const data = {
        c_profile:this.urlImage,
        c_fname: this.fname,
        c_lname: this.lname,
        c_gender: this.gender,
        c_phone: this.phone,
        c_password: this.password,
       
      }
      await this.$store.dispatch('customer/insert', data)
      this.uploadImage = false
      await this.$store.commit('customer/setInsert', false)
      await this.$store.dispatch('customer/selectAll')
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.loading-graphic {
  width: 100%;
  height: 30px;
  background-color: #ddd;
}

.loading-bar {
  height: 100%;
  background-color: #0078d4;
  text-align: right;
  transition: width 0.3s;
}

.loading-number {
  display: inline-block;
  padding: 5px;
  font-size: 12px;
  color: #fff;
}
.shadow {
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  padding: 5px;
  box-shadow: 2px 2px 4px #999;
}
.custom-textarea textarea {
  height: 10px; /* Set the desired height */
}
</style>
