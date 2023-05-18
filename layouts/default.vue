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
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-avatar size="45" class="mr-1 ml-2" color="red">
        <v-img class="ma-1" :src="require('@/static/images/logo.png')" />
      </v-avatar>
      <!-- <h2>Sale System Of Maymai Shop</h2> -->
      <v-spacer></v-spacer>
      <h2 style="color: #004d40">ລະບົບຂາຍ ຮ້ານຂາຍເຄື່ອງແມ່ໄໝ</h2>
      <v-spacer />
      <v-btn text color="primary" small><v-icon>mdi-login</v-icon></v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>

  </v-app>
</template>
<script>
export default {
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
          icon: 'mdi-dots-triangle',
          title: 'ຈັດການຂໍ້ມູນພື້ນຖານ',
          children: [
            {
              icon: 'mdi-folder-file',
              title: 'ສິນຄ້າ',
              to: { name: 'product' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ຂໍ້ມູນປະເພດ',
              to: { name: 'category' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ຂໍ້ມູນພະນັກງານ',
              to: { name: 'personnel' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ຂໍ້ມູນຜູ້ສະໜອງ',
              to: { name: 'supplier' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ຂໍ້ມູນລູກຄ້າ',
              to: { name: 'customer' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ຈັດການໂປຼໂມຊັນ',
              to: { name: 'promotion' },
            },
          ],
        },
        //  ຂາຍສິນຄ້າ
        {
          icon: 'mdi-cart-percent',
          title: 'ຂາຍສິນຄ້າ',
          children: [
            {
              icon: 'mdi-point-of-sale',
              title: 'ເລືອກສິນຄ້າ',
              to: { name: 'sell' },
            },
          ],
        },
        //  ສັ່ງຊື່
        {
          icon: 'mdi-purse',
          title: 'ສັ່ງຊື້ສິນຄ້າ',
          children: [
            {
              icon: 'mdi-folder-file',
              title: 'ກວດສອບສັ່ງຊື້',
              to: { name: 'product' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ບັນທຶກສັ່ງຊື້',
              to: { name: 'order' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ພີມໃບສັ່ງຊື້',
              to: { name: 'order' },
            },
          ],
        },
        //  ນຳເຂົ້າສິນຄ້າ
        {
          icon: 'mdi-cart-arrow-right',
          title: 'ນຳເຂົ້າສິນຄ້າ',
          children: [
            {
              icon: 'mdi-folder-file',
              title: 'ກວດສອບສັ່ງຊື້',
              to: { name: 'product' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ນຳເຂົ້າສິນຄ້າ',
              to: { name: 'order' },
            },
          ],
        },
        //  ລາຍງານ
        {
          icon: 'mdi-chart-areaspline',
          title: 'ລາຍງານ',
          children: [
            {
              icon: 'mdi-folder-file',
              title: 'ຂໍ້ມູນສິນຄ້າ',
              to: { name: 'product' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ການຂາຍ',
              to: { name: 'order' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ຂໍ້ມູນລູກຄ້າ',
              to: { name: 'product' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ຂໍ້ມູນພະນັກງານ',
              to: { name: 'order' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ຂໍ້ມູນການສັງຊື້',
              to: { name: 'product' },
            },
            {
              icon: 'mdi-folder-file',
              title: 'ລາຍຮັບ',
              to: { name: 'order' },
            },
          ],
        },
      ],
    }
  },
}
</script>
