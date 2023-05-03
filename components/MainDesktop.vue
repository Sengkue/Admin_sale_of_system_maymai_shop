<template>
  <v-app>
    <v-app-bar app light clipped-left dense flat color="#e0e0e0">
      <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
      <v-avatar size="35" class="mr-1 ml-2" home color="red">
        <v-img class="ma-1" :src="require('@/static/images/logo.png')" />
      </v-avatar>
      <h2>Sale System Of Maymai Shop</h2>
      <v-spacer></v-spacer>
      <h2 style="color: #004d40">ລະບົບຂາຍ ຮ້ານຂາຍເຄື່ອງແມ່ໄໝ</h2>
      <v-spacer />
      <v-btn text color="primary" small><v-icon>mdi-login</v-icon></v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      color="#e0e0e0"
      dark
      app
      clipped
      disable-resize-watcher
    >
      <v-list v-for="(item, i) in items" :key="i" dense class="py-0" tile flat>
        <v-list-group
          v-if="item.children"
          :prepend-icon="item.icon"
          no-action
          color="red"
        >
          <template #activator>
            <v-list-item-title
              class="py-2"
              style="font-size: 18px; color: black; font-weight: bold"
              >{{ item.title }}
            </v-list-item-title>
          </template>

          <v-list-item
            v-for="(subItem, subI) in item.children"
            :key="subI"
            exact
            :to="subItem.to"
            link
          >
            <v-list-item-action>
              <v-icon color="black">{{ subItem.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-title
              class="py-2"
              style="font-size: 18px; color: black"
              >{{ subItem.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-else
          :to="item.to"
          router
          exact
          dense
          active-class="primary white--text"
        >
          <v-list-item-action>
            <v-icon color="black">{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              <span style="font-size: 18px; color: black; font-weight: bold">
                {{ item.title }}</span
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Dialog ---------------------------------------------------------->
    <!-- <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      persistent
      max-width="600"
    >

      <template #:default="dialog">
        <v-card>
          <v-toolbar color="primary" dense dark>
            <v-row no-gutters justify="center">
              <h3>ຢຶນຢັນການອອກຈາກລະບົບ</h3>
            </v-row>
          </v-toolbar>
          <v-card-text>
            <v-row no-gutters justify="center" class="py-7">
              <h2>ທ່ານຕ້ອງການອອກຈາກລະບົບຫຼືບໍ?</h2>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="primary" light @click="confrimLogOut">
              <v-icon class="mr-1">mdi-check-all</v-icon>
              ຢຶນຢັນ
            </v-btn>
            <v-btn color="green" light @click="dialog.value = false">
              <v-icon>mdi-arrow-left</v-icon>
              ກັບຄືນ
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog> -->
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      notifications: [],
      dialog: false,
      dialogLogOut: false,
      title: 'NEw',
      mini: false,
      drawer: null,
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
              icon: 'mdi-tshirt-crew',
              title: 'ສິນຄ້າ',
              to: { name: 'product' },
            },
            {
              icon: 'mdi-shape',
              title: 'ຂໍ້ມູນປະເພດ',
              to: { name: 'category' },
            },
            {
              icon: 'mdi-account-tie',
              title: 'ຂໍ້ມູນພະນັກງານ',
              to: { name: 'employee' },
            },
            {
              icon: 'mdi-account-cowboy-hat',
              title: 'ຂໍ້ມູນຜູ້ສະໜອງ',
              to: { name: 'supplier' },
            },
            {
              icon: 'mdi-account',
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
      ],
    }
  },
}
</script>
