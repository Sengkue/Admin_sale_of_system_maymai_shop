<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list v-for="(item, i) in items" :key="i" dense class="pt-0" tile flat>
        <!-- Menu drop down -->
        <v-list-group v-if="item.children" :prepend-icon="item.icon" no-action>
        <!-- title name of topic -->
          <template #activator>
            <v-list-item-title class="py-1 ml-n5" style="font-weight: bold; font-size: 18px">{{
              item.title
            }}</v-list-item-title>
          </template>
        <!-- child lists menu display icon and title-->
          <v-list-item
            v-for="(child, j) in item.children"
            :key="j"
            :to="child.to"
            router
            exact
            active-class="blue-grey lighten-4"
          >
         <!-- child list icon -->
            <v-list-item-action class="ml-n6">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
         <!-- child list title -->
            <v-list-item-title class="ml-n6" style="font-size: 15px">{{
              child.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <!-- Menu title One line -->
        <v-list-item
          v-else
          :to="item.to"
          router
          exact
          dense
          active-class="blue-grey lighten-4"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content class="ml-n5">
            <v-list-item-title
              class="py-1"
              style="font-weight: bold; font-size: 18px"
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-avatar size="45" class="mr-1 ml-2" color="red">
        <v-img class="ma-1" :src="require('@/static/images/logo.png')" />
      </v-avatar>
      <!-- <h2>Sale System Of Maymai Shop</h2> -->
      <h2 style="color: #004d40">ລະບົບຂາຍ ຮ້ານຂາຍເຄື່ອງແມ່ໄໝ</h2>
      <v-spacer />
      <div v-ripple class="text-center px-3 cursor-pointer">
        <v-btn text rounded>
          <v-badge color="success" dot
            ><span class="btn"
              >ຜູ້ເຂົ້າໃໍຊ້: {{ $cookies.get('name') }}</span
            ></v-badge
          >
        </v-btn>
      </div>
      <div v-ripple class="text-center px-3 cursor-pointer">
        <v-btn text rounded @click="dialog = true">
          <v-icon color="primary"> mdi-logout</v-icon>
          ອອກຈາກລະບົບ
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-row>
      <v-dialog
        v-model="dialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark class="teal white--text">
            <div class="text-center">ອອກຈາກລະບົບ!!!</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="text-center">
            <v-card-title class="text-center">
              ທ່ານຕ້ອງການອອກຈາກລະບົບບໍ ?
            </v-card-title>
          </div>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="error" @click="logout">
              <v-icon color="white">mdi-power</v-icon>
              <span style="color: white"> ອອກຈາກລະບົບ</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      notifications: [],
      dialog: false,
      dialogLogOut: false,
      clipped: true,
      drawer: true,
      fixed: false,
      miniVariant: false,
      rightDrawer: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'ໜ້າຫຼັກ',
          to:"/",
        },
        //  ຈັດການຂໍ້ມູນພີ້ນຖາມ
        {
          icon: 'mdi-group',
          title: 'ຈັດການຂໍ້ມູນພື້ນຖານ',
          children: [
            {
              icon: 'mdi-tshirt-crew',
              title: 'ຈັດການຂໍ້ມູນສິນຄ້າ',
              to: { name: 'product' },
            },
            {
              icon: 'mdi-shape',
              title: 'ຈັດການຂໍ້ມູນປະເພດສິນຄ້າ',
              to: { name: 'category' },
            },
            {
              icon: 'mdi-account-tie',
              title: 'ຈັດການຂໍ້ມູນພະນັກງານ',
              to: { name: 'employee' },
            },
            {
              icon: 'mdi-account-cowboy-hat',
              title: 'ຈັດການຂໍ້ມູນຜູ້ສະໜອງ',
              to: { name: 'supplier' },
            },
            {
              icon: 'mdi-account',
              title: 'ຈັດການຂໍ້ມູນລູກຄ້າ',
              to: { name: 'customer' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ຈັດການໂປຼໂມຊັນ',
              to: { name: 'promotion' },
            },
          ],
        },
        {
          icon: 'mdi-message-arrow-right',
          title: 'ສັ່ງຊື້ສິນຄ້າ',
          to: 'order',
        },
        {
          icon: 'mdi-table-arrow-left',
          title: 'ນໍາເຂົ້າສິນຄ້າ',
          to: 'import',
        },
        {
          icon: 'mdi-widgets',
          title: 'ຂາຍສິນຄ້າ',
          to: 'sale',
        },
        //  ລາຍງານ
        {
          icon: 'mdi-chart-areaspline',
          title: 'ລາຍງານ',
          children: [
            {
              icon: 'mdi-tshirt-crew',
              title: 'ຂໍ້ມູນສິນຄ້າ',
              to: '/report/admin.product',
            },
            {
              icon: 'mdi-chart-bell-curve',
              title: 'ຂໍ້ມູນການຂາຍ',
              to: '/report/admin.sale' ,
            },
            {
              icon: 'mdi-folder-file',
              title: 'ຂໍ້ມູນລູກຄ້າ',
              to:'/report/admin.customer' ,
            },
            {
              icon: 'mdi-folder-file',
              title: 'ຂໍ້ມູນພະນັກງານ',
              to:'/report/admin.employee',
            },
            {
              icon: 'mdi-baby-carriage',
              title: 'ຂໍ້ມູນການສັງຊື້',
              to: '/report/admin.order' ,
            },
            // {
            //   icon: 'mdi-folder-file',
            //   title: 'ລາຍຮັບ',
            //   to: { name: 'order' },
            // },
          ],
        },
        {
          icon: 'mdi-cog',
          title: 'ຕັ້ງຄ້າ',
          children: [
            {
              icon: 'mdi-account-group',
              title: 'ຈັດການຜູ້ນຳໃຊ້ລະບົບ',
              to: '/user',
            }
          ],
        },
      ],
    }
    
  },
  methods: {
    logout() {
      this.$cookies.remove("token");
      this.$cookies.remove("status");
       this.$router.push("/login");
    },
  },
}
</script>
