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

        <v-col cols="8" class="mt-4">
          <v-row>
            <v-col cols="12">
              <v-file-input
                v-model="selectedFiles"
                accept="image/*"
                label="ເລືອກຮູບ Banners"
                multiple
                filled
                show-size
                prepend-icon="mdi-camera"
              >
              </v-file-input>
            </v-col>
            <v-col cols="8" class="mb-5 mt-n5 d-flex flex-wrap">
              <div
                v-for="(item, index) in selectedFiles"
                :key="index"
                class="mx-1"
              >
                <v-img :src="getFileUrl(item)" width="60" height="70"></v-img>
              </div>
            </v-col>
          </v-row>
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
      file: null,
      selectedFiles: '',
      url: null,
      a: {
        firstName: '',
        lastName: '',
        shopName: '',
        phone: '',
        email: '',
        gender: '',
        address: '',
        description: '',
      },
      urlImage: '',
    }
  },
  methods: {
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e)
      }
    },
    getFileUrl(file) {
      return URL.createObjectURL(file)
    },
    upload() {
      document.getElementById('file').click()
    },
    async submit() {
      const file = this.file
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
        firstName: this.a.firstName,
        lastName: this.a.lastName,
        shopName: this.a.shopName,
        phone: this.a.phone,
        email: this.a.email,
        gender: this.a.gender,
        address: this.a.address,
        description: this.a.description,
        profile: this.urlImage,
      }

      await this.$axios
        .post('/owner', data)
        .then((response) => {
          console.log('Data added successfully', response.data)
          this.owner_id = response.data.result.id
          const formDatas = new FormData()
          for (const file of this.selectedFiles) {
            formDatas.append('files', file)
          }
          this.$axios.post('/upload/multiple', formDatas).then((res) => {
            res.data.files.map((image) => {
              const imageUrl = image.url
              return this.$axios.post('/banner', {
                ownerId: this.owner_id,
                url: imageUrl,
              })
            })
          })
        })
        .catch((error) => {
          console.error('Error adding data', error)
        })
      this.$store.dispatch('owner/selectOwner')
      this.$store.dispatch('owner/selectBanner')
      this.resetForm()
      this.$router.push('/owner')
    },
  },
}
</script>
