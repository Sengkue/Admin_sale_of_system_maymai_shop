<template>
  <div>
    <v-card>
      <v-row justify="center" class="mx-5 px-5">
        <v-col cols="12" class="pt-5 text-center">
          <h2>ເພີ່ມຂໍ້ມູນພະນັກງານ</h2>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="employees.firstName"
            filled
            dense
            :counter="100"
            :rules="[(v) => !!v || 'employeefirstName is require']"
            label="ຊື່ພະນັກງານ"
            required
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="employees.lastName"
            filled
            dense
            :rules="[(v) => !!v || 'surfirstName is require']"
            :counter="100"
            label="ນານສະກຸນພະນັກງານ"
            required
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="employees.tel"
            filled
            dense
            :rules="[
              (v) =>
                v === '' ||
                /^[0-9]+$/.test(v) ||
                'Tel should contain only numbers',
            ]"
            :counter="15"
            label="ເບີ້ໂທລະສັບ"
            required
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="employees.email"
            filled
            dense
            :rules="[(v) => !!v || 'email is require']"
            label="ອີແມວ"
            counter
            required
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="employees.provinceId"
            filled
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
            v-model="employees.districtId"
            filled
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
        <v-col cols="6">
          <v-text-field
            v-model="employees.village"
            filled
            dense
            :rules="[(v) => !!v || 'village is require']"
            :counter="100"
            label="ບ້ານ"
            required
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="employees.gender"
            filled
            dense
            :items="['ຊາຍ', 'ຍິງ']"
            label="User Status*"
            clearable
            clear-icon="mdi-close-circle-outline"
            required
          ></v-select>
        </v-col>
        <v-col cols="6">
          <h4 style="font-size: 17px; font-weight: normal">ເລຶອກຮູບພະນັກງານ</h4>
          <input
            type="file"
            class="file-upload"
            accept="image/*"
            required
            @change="handleFileUpload"
          />
        </v-col>
        <v-col cols="6"
          ><div v-if="imageData">
            <img
              :src="imageData"
              alt="Selected Image"
              style="
                max-height: 120px;
                border-radius: 5%;
                border: 1px solid black;
              "
            /></div
        ></v-col>

        <v-col cols="12">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              style="font-size: 20px; font-weight: bold"
              class="red white--text mr-7 mt-2"
              to="/employee"
            >
              <v-icon left>mdi-close-circle</v-icon>
              ຍົກເລິກ
            </v-btn>
            <v-btn
              style="font-size: 20px; font-weight: bold"
              class="primary white--text mr-5 mt-2"
              @click="submit"
            >
              <v-icon left>mdi-check-circle</v-icon>
              ບັນທຶກ
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: null,
      employees: {
        firstName: '',
        lastName: '',
        tel: '',
        email: '',
        village: '',
        districtId: '',
        provinceId: '',
        file: '',
        gender: '',
      },
      imageData: null,
      urlImage: '',
    }
  },
  computed: {
    getProvince() {
      return this.$store.state.province.AllProvince || []
    },
    getDistrict() {
      return this.$store.state.district.byProvinceId || []
    },
  },

  mounted() {
    this.$store.dispatch('province/selectProvince')
    this.$store.dispatch('district/selectDistrict')
  },
  methods: {
    onProvinceSelected() {
      const id = this.employees.provinceId
      this.$store.dispatch('district/getByProvinceId', id)
    },
    async submit() {
      const file = this.employees.profile
      const formData = new FormData()
      formData.append('file', file)

      this.urlImage = await this.$axios
        .post('upload/single', formData)
        .then((response) => {
          return response?.data?.url
        })
        .catch((error) => {
          this.$toast.success('File upload failed', error)
        })

      const data = {
        firstName: this.employees.firstName,
        lastName: this.employees.lastName,
        gender: this.employees.gender,
        provinceId: this.employees.provinceId,
        districtId: this.employees.districtId,
        village: this.employees.village,
        email: this.employees.email,
        phone: this.employees.tel,
        profile: this.urlImage,
      }
      this.$store.dispatch('employee/insert', data)
    },

    handleFileUpload(event) {
      const file = event.target.files[0]
      this.employees.profile = file
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        this.imageData = null
      }
    },
  },
}
</script>
