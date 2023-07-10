<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="py-2 px-2 d-flex justify-space-between">
          <h2>ສ້າງຂໍ້ມູນເຈົ້າຂອງຮ້ານ</h2>
          <v-btn to="/owner" text color="error"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card>
      </v-col>
      <v-col cols="4" class="d-flex">
        <v-text-field label="Firstname" v-model="a.firstName"></v-text-field>
      </v-col>
      <v-col cols="4" class="d-flex">
        <v-text-field label="Lastname" v-model="a.lastName"></v-text-field>
      </v-col>
      <v-col cols="4" class="d-flex">
        <v-text-field label="ShopeName" v-model="a.shopName"></v-text-field>
      </v-col>
      <v-col cols="4" class="d-flex">
        <v-text-field label="Phone Number" v-model="a.phone"></v-text-field>
      </v-col>
      <v-col cols="4" class="d-flex">
        <v-text-field label="Email" v-model="a.email"></v-text-field>
      </v-col>
      <v-col cols="4" class="d-flex">
        <v-select
          v-model="a.gender"
          :items="['ຊາຍ', 'ຍິງ']"
          label="Gender"
        ></v-select>
      </v-col>
      <v-col cols="12" class="d-flex">
        <v-text-field label="Address" v-model="a.address"></v-text-field>
      </v-col>
      <v-col cols="12" class="d-flex">
        <v-textarea label="Description" v-model="a.description"></v-textarea>
      </v-col>

      <!--------------------------- input images banner profile -->
      <v-col cols="6" class="mt-4">
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
          <v-col cols="12" class="mb-5 mt-n5 d-flex flex-wrap">
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
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" @click="submitForm">Submit</v-btn>
        <v-btn color="error" @click="cancelForm">Cancel</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      url: null,
      selectedFiles: '',
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
      owner_id: '',
    }
  },
  methods: {
    getFileUrl(file) {
      return URL.createObjectURL(file)
    },
    async submitForm() {
      await axios.post('http://localhost:8080/owner', this.a)
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
          this.$store.dispatch('owner/selectOwner')
          this.$store.dispatch('owner/selectBanner')
          this.resetForm()
          this.$router.push('/owner')
        })
        .catch((error) => {
          console.error('Error adding data', error)
        })
    },
    cancelForm() {
      // Reset form fields if needed
      this.resetForm()
    },
    resetForm() {
      this.a = {
        firstName: '',
        lastName: '',
        shopName: '',
        phone: '',
        email: '',
        gender: '',
        address: '',
        description: '',
      }
    },
  },
}
</script>
