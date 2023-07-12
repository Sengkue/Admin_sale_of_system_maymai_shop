<template>
  <div>
    <v-card>
      <v-row justify="center" class="mx-5 px-5">
        <v-col cols="12" class="pt-5 text-center">
          <h2>ສ້າງຂໍ້ມູນເຈົ້າຂອງຮ້ານ</h2>
        </v-col>
        <v-col cols="12" class="">
          <div class="justify-center text-center mt-5">
            <div>
              <v-avatar
                size="130"
                style="
                  border-radius: 10%;
                  border: 3px solid teal;
                  box-shadow: 12px;
                "
              >
                <v-img v-if="url" :src="url"></v-img>
                <v-img v-else src="/images/logo.png"></v-img>
              </v-avatar>
            </div>
            <v-file-input
              id="file"
              v-model="file"
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
        <v-col cols="6">
          <v-text-field
            v-model="a.firstName"
            filled
            dense
            :counter="100"
            :rules="[(v) => !!v || 'employeefirstName is require']"
            label="ຊື່"
            required
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="a.lastName"
            filled
            dense
            :rules="[(v) => !!v || 'surfirstName is require']"
            :counter="100"
            label="ນານສະກຸນ"
            required
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="a.shopName"
            filled
            dense
            :rules="[(v) => !!v || 'shopName is require']"
            :counter="100"
            label="ຊື່ຮ້ານ"
            required
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="a.phone"
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
            v-model="a.email"
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
            v-model="a.gender"
            filled
            dense
            :items="['ຊາຍ', 'ຍິງ']"
            label="ເພດ*"
            clearable
            clear-icon="mdi-close-circle-outline"
            required
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="a.address"
            filled
            dense
            :rules="[(v) => !!v || 'Address is require']"
            :counter="100"
            label="ທີຢູ່"
            required
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="a.description"
            filled
            dense
            :rules="[(v) => !!v || 'Description is require']"
            :counter="100"
            label="ຄຳອະທິບາຍ"
            required
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              style="font-size: 20px; font-weight: bold"
              class="red white--text mr-7 mt-2"
              to="/owner"
            >
              <v-icon left>mdi-close-circle</v-icon>
              ຍົກເລິກ
            </v-btn>
            <v-btn
              :loading="loading"
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
      loading:false,
      file: null,
      url: null,
      a: {
        firstName: null,
        lastName: null,
        shopName: null,
        phone: null,
        email: null,
        gender: null,
        address: null,
        description: null,
        profile:null
      },
      urlImage: null,
    }
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
    async submit() {
      this.loading = true
      const file = this.file
      const formData = new FormData()
      formData.append('file', file)
      this.a.profile = await this.$axios
        .post('upload/single', formData)
        .then((response) => {
          return response?.data?.url
        })
        .catch((error) => {
          this.$toast.success('File upload failed', error)
        })

      await this.$axios
        .post('/owner', this.a)
        .then((response) => {
          this.$toast.success('create owner information success')
        })
        .catch((error) => {
          this.$toast.error('Error adding data', error)
        })
        this.loading = false
      this.$store.dispatch('owner/selectOwner')
      this.$store.dispatch('owner/selectBanner')
      this.$router.push('/owner')
    },
  },
}
</script>
