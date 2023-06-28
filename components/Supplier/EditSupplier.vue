<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card class="red white--text d-flex justify-center py-2">
          <span class="text-h5 shadow"> Edit supplier</span>

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
                  v-model="name"
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
                  v-model="phone"
                    :rules="telephoneRules"
                    clearable
                    outlined
                    dense
                    label="ເບີ*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="provinceId"
                    outlined
                    dense
                    :items="getProvince"
                    item-value="id"
                    item-text="provinceName"
                    label="ແຂວງ"
                    required
                    clearable
                    clear-icon="mdi-close-circle-outline"
                    @change="onProvinceSelected"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="districtId"
                    outlined
                    dense
                    :items="getDistrict"
                    item-value="id"
                    item-text="districtName"
                    label="ເມືອງ"
                    required
                    clearable
                    clear-icon="mdi-close-circle-outline"
                  ></v-select>
                </v-col>
                <v-col cols="12" class="py-0" sm="6">
                  <v-text-field
                    v-model="village"
                    clearable
                    outlined
                    dense
                    label="village"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    v-model="address"
                    clearable
                    outlined
                    dense
                    label="address"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="description"
                    clearable
                    outlined
                    dense
                    label="Description*"
                    class="custom-textarea"
                  ></v-text-field>
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
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 50) || 'Name must be less than 50 characters',
    ],
    provinceId: '',
    surnameRules: [
      (v) => !!v || 'Surname is required',
      (v) => (v && v.length <= 50) || 'Surname must be less than 50 characters',
    ],
    phone: '',
    telephoneRules: [
      (v) => !!v || 'Telephone is required',
      (v) => /^\d+$/.test(v) || 'Telephone must contain only digits',
    ],
    districtId: '',
    village: '',
    // emailRules: [
    //   (v) => !!v || 'E-mail is required',
    //   (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    //   (v) => (v && v.length <= 50) || 'E-mail must be less than 50 characters',
    // ],
    supplierId: '',
    loading: false,
    success: false,
    error: false,
    imagedata: '',
  }),
  computed: {
    getPercentage: {
      get() {
        return this.$store.state.supplier.uploadProgress
      },
      set(value) {},
    },
    getOneUser() {
      return this.$store.state.supplier.StateSelectOne
    },
    getProvince() {
      return this.$store.state.province.AllProvince || []
    },
    getDistrict() {
      return this.$store.state.district.byProvinceId || []
    },
  },
  created() {
    this.dialog = this.$store.state.supplier.edit
    if (this.getOneUser) {
      this.supplierId = this.getOneUser.id
      this.name = this.getOneUser.name
      this.phone = this.getOneUser.phone
      this.provinceId = this.getOneUser.provinceId
      this.districtId = this.getOneUser.districtId
      this.village = this.getOneUser.village
      this.file = this.getOneUser.profile
      this.task = this.getOneUser.description
      this.image = this.getOneUser.profile
      this.address = this.getOneUser.address
      this.description = this.getOneUser.description
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
      this.$store.commit('supplier/setEdit', false)
    },
    async updateItem() {
      this.uploadImage = true
      const id = this.supplierId
      this.$refs.form.validate()
      if (!this.valid) return
      this.loading = true
      if (this.files !== null) {
        await this.$store.dispatch('supplier/upload', this.files)
        this.imagedata = await this.$store.state.supplier.image
      } else {
        this.imagedata = this.getOneUser.picture
      }
      try {
        const formData = {
          name: this.name,
          address: this.address,
          phone: this.phone,
          provinceId: this.provinceId,
          districtId: this.districtId,
          village: this.village,
          description: this.description,
          profile: this.imagedata,
        }

        await this.$store.dispatch('supplier/update', { formData, id })
        this.uploadImage = false
        this.$store.commit('supplier/setEdit', false)
        this.$store.dispatch('supplier/selectAll')
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
