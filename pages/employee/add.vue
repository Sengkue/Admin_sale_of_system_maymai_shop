<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="11">
        <form @submit.prevent="submit">
          <v-card
            elevation="2"
            style="margin-top: 2px; padding-bottom: 10px"
            class="mt-3"
          >
            <v-row no-gutters class="justify-center">
              <h2 style="margin-top: 30px">ເພີ່ມຂໍ້ມູນພະນັກງານ</h2>
            </v-row>
            
            <v-row no-gutters class="ma-5 justify-space-around">
              <v-col cols="12" md="9">
                <v-card class="mr-4 elevation-0">
                  <v-text-field
                    v-model="employees.name"
                    :rules="[(v) => !!v || 'employeeName is require']"
                    :counter="100"
                    label="ຊື່ພະນັກງານ"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="employees.surename"
                    :rules="[(v) => !!v || 'surname is require']"
                    :counter="100"
                    label="ນານສະກຸນພະນັກງານ"
                    required
                  ></v-text-field>
                  <v-radio-group
                    label="ເພດ"
                    v-model="employees.gender"
                    row
                    required
                    :rules="[(v) => !!v || 'gender is require']"
                  >
                    <v-row class="justify-space-around">
                      <v-radio label="ຊາຍ" value="ຊາຍ"></v-radio>
                      <v-radio label="ຍິງ" value="ຍິງ"></v-radio>
                    </v-row>
                  </v-radio-group>
                  <v-divider style="margin-top: -12px"></v-divider>
                  <v-text-field
                    v-model="employees.tel"
                    :rules="[(v) => !!v || 'tel is require']"
                    :counter="100"
                    label="ເບີ້ໂທລະສັບ"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="employees.facebook"
                    :rules="[(v) => !!v || 'facebook is require']"
                    :counter="100"
                    label="ແຟ໌ສບຸກ"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="employees.email"
                    :rules="[(v) => !!v || 'email is require']"
                    label="ອີແມວ"
                    counter
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="employees.village"
                    :rules="[(v) => !!v || 'village is require']"
                    :counter="100"
                    label="ບ້ານຢູ່ປັດຈຸບັນ"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="employees.district"
                    :rules="[(v) => !!v || 'district is require']"
                    :counter="100"
                    label="ເມືອງ"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="employees.province"
                    :rules="[(v) => !!v || 'province is require']"
                    :counter="100"
                    label="ແຂວງ"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="employees.password"
                    :rules="[(v) => !!v || 'password is require']"
                    label="ລະຫັດຜ່ານ"
                    counter
                    required
                  ></v-text-field>

                  <v-radio-group
                    v-model="employees.status"
                    row
                    label="ສະຖານະ"
                    required
                    :rules="[(v) => !!v || 'status is require']"
                  >
                    <v-row class="justify-space-around">
                      <v-radio label="Admin" value="Admin"></v-radio>
                      <v-radio label="User" value="User"></v-radio>
                    </v-row>
                  </v-radio-group>
                  <v-divider style="margin-top: -10px"></v-divider>
                  <h4 class="mt-5" style="font-size: 17px; font-weight: normal">
                    ເລຶອກຮູບພະນັກງານ
                  </h4>
                  <input
                    type="file"
                    class="file-upload"
                    accept="image/*"
                    :rules="[(v) => !!v || 'image is require']"
                    required
                  />
                  <v-img
                    :src="url"
                    v-show="employees.profile"
                    max-height="450"
                    aspect-ratio="1.7"
                    contain
                    v-ripple="{ class: `white--text` }"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
            <v-divider class></v-divider>
            <v-row class="ma-5">
              <v-btn
                style="font-size: 20px; font-weight: bold"
                color="deep-purple lighten-4"
                rounded
                class="mt-2"
                to="/employee"
              >
                <v-icon left large> mdi-arrow-left-circle </v-icon>
                ກັບສູ່ໜ້າຂໍ້ມູນພະນັກງານ
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                style="font-size: 20px; font-weight: bold"
                color="#FF8A65"
                rounded
                class="mr-7 mt-2"
              >
                <v-icon left large> mdi-close-circle </v-icon>
                ຍົກເລິກ
              </v-btn>

              <v-btn
                @click="submit"
                style="font-size: 20px; font-weight: bold"
                color="#1DE9B6"
                rounded
                class="mr-5 mt-2"
              >
                <v-icon left large> mdi-check-circle </v-icon>
                ບັນທຶກ
              </v-btn>
            </v-row>
          </v-card>
        </form>
      </v-col>
    </v-row>
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