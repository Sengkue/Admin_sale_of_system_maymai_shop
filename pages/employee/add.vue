<template>
  <div>

      <v-card>
<v-row justify="center" class="mx-5 px-5">
        <v-col cols="12" class="text-center">
          <h2 style="margin-top: 30px">ເພີ່ມຂໍ້ມູນພະນັກງານ</h2>
        </v-col>
        <v-col cols="6"><v-text-field v-model="employees.name" filled :rules="[(v) => !!v || 'employeeName is require']"
            :counter="100" label="ຊື່ພະນັກງານ" required></v-text-field></v-col>
        <v-col cols="6">
          <v-text-field v-model="employees.surename" filled :rules="[(v) => !!v || 'surname is require']" :counter="100"
            label="ນານສະກຸນພະນັກງານ" required></v-text-field></v-col>
        <v-col cols="6">
          <v-text-field v-model="employees.tel" filled :rules="[(v) => !!v || 'tel is require']" :counter="100"
            label="ເບີ້ໂທລະສັບ" required></v-text-field></v-col>

        <v-col cols="6">
          <v-text-field v-model="employees.email" filled :rules="[(v) => !!v || 'email is require']" label="ອີແມວ" counter
            required></v-text-field></v-col>
        <v-col cols="6">
          <v-text-field v-model="employees.village" filled :rules="[(v) => !!v || 'village is require']" :counter="100"
            label="ບ້ານຢູ່ປັດຈຸບັນ" required></v-text-field></v-col>

        <v-col cols="6">
          <v-text-field v-model="employees.district" filled :rules="[(v) => !!v || 'district is require']" :counter="100"
            label="ເມືອງ" required></v-text-field></v-col>
        <v-col cols="6" class="my-0 py-0">
          <v-select filled dense v-model="status" :items="['admin', 'user']" label="User Status*"
            prepend-inner-icon="mdi-family-tree" clearable clear-icon="mdi-close-circle-outline" required></v-select>
        </v-col>
        <v-col cols="6" class="my-0 py-0">
          <v-select filled dense v-model="status" :items="['admin', 'user']" label="User Status*"
            prepend-inner-icon="mdi-family-tree" clearable clear-icon="mdi-close-circle-outline" required></v-select>
        </v-col>

        <v-col cols="12">
          <h4 class="mt-5" style="font-size: 17px; font-weight: normal">
            ເລຶອກຮູບພະນັກງານ
          </h4>
          <input type="file" class="file-upload" accept="image/*" :rules="[(v) => !!v || 'image is require']" required />
        </v-col>
        <v-col cols="12">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn style="font-size: 20px; font-weight: bold" class=" red white--text mr-7 mt-2">
              <v-icon left > mdi-close-circle </v-icon>
              ຍົກເລິກ
            </v-btn>

            <v-btn @click="submit" style="font-size: 20px; font-weight: bold"  class="primary white--text mr-5 mt-2">
              <v-icon left > mdi-check-circle </v-icon>
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
      img: '../../../assets/logo.png',
      employees: {
        name: '',
        surename: '',
        gender: '',
        tel: '',
        facebook: '',
        email: '',
        password: '',
        village: '',
        district: '',
        province: '',
        status: '',
        profile: '',
      },
    }
  },
}
</script>