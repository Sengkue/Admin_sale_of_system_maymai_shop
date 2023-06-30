<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card class="red white--text d-flex justify-center py-2">
          <span class="text-h5 shadow"> Edit customer</span>

          <!-- <v-btn
            color="error darken-1"
            class="mt-n6 mr-n6"
            text
            @click="back()"
          >
            <v-icon>mdi-close-box-multiple</v-icon> Close
          </v-btn> -->
        </v-card>

        <div class="d-flex justify-center mb-5"></div>

        <div class="justify-center text-center mt-5 mb-5">
          <div>
            <v-avatar size="120">
              <v-img v-if="url" :src="url"></v-img>
              <v-img v-else :src="`${file}`"></v-img>
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
                <v-col cols="12" class="py-0" sm="6">
                  <v-text-field
                    v-model="password"
                    clearable
                    outlined
                    dense
                    label="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="gender"
                    outlined
                    dense
                    :items="['ຊາຍ','ຍິງ']"
                    item-value="id"
                    item-text="districtName"
                    label="ເພດ"
                    required
                    clearable
                    clear-icon="mdi-close-circle-outline"
                  ></v-select>
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
            :disabled="!valid"
            @click="updateItem()"
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
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 50) || 'Name must be less than 50 characters',
    ],
    surnameRules: [
      (v) => !!v || 'Surname is required',
      (v) => (v && v.length <= 50) || 'Surname must be less than 50 characters',
    ],
    phone: '',
    telephoneRules: [
      (v) => !!v || 'Telephone is required',
      (v) => /^\d+$/.test(v) || 'Telephone must contain only digits',
    ],
    customerId:'',
    fname:'',
    lname:'',
    gender:'',
    password:'',
    loading: false,
    success: false,
    error: false,
    imagedata: '',
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
  created() {
    this.dialog = this.$store.state.customer.edit
    if (this.getOneUser) {
      this.customerId = this.getOneUser.c_id
      this.fname = this.getOneUser.c_fname
      this.lname = this.getOneUser.c_lname
      this.phone = this.getOneUser.c_phone
      this.file = this.getOneUser.c_profile
      this.image = this.getOneUser.c_profile
      this.gender = this.getOneUser.c_gender
    }
    this.onProvinceSelected()
  },
  methods: {
    onProvinceSelected() {
      const id = this.provinceId
      this.$store.dispatch('district/getByProvinceId', id)
    },
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e)
      }
    },
    upload() {
      document.getElementById('file').click()
    },
    back() {
      this.$store.commit('customer/setEdit', false)
    },
    async updateItem() {
      this.uploadImage = true
      const id = this.customerId
      this.$refs.form.validate()
      if (!this.valid) return
      this.loading = true
      if (this.files !== null) {
        await this.$store.dispatch('customer/upload', this.files)
        this.imagedata = await this.$store.state.customer.image
      } else {
        this.imagedata = this.getOneUser.picture
      }
      try {
        const formData = {
          c_fname: this.fname,
          c_lname: this.lname,
          c_phone: this.phone,
          c_gender: this.gender,
          c_password: '',
          profile: this.imagedata,
        }

        await this.$store.dispatch('customer/update', { formData, id })
        this.uploadImage = false
        this.$store.commit('customer/setEdit', false)
        this.$store.dispatch('customer/selectAll')
        this.success = true
        this.$refs.form.reset()
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
