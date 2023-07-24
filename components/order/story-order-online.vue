<template>
  <div>
    <v-data-table
      :search="newsearch"
      :headers="newHeaders"
      :items="getTypeAndStatus"
      :single-expand="true"
      item-key="idx"
      show-expand
      class="elevation-3"
    >
      <template #[`item.sale_date`]="{ value }">
        <div>
          {{ formatDateLo(value) }}
        </div>
      </template>
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>ລາຍການສັ່ງຊື້ສິນຄ້າ</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider
          ><v-spacer></v-spacer>
          <v-text-field
            v-model="newsearch"
            append-icon="mdi-magnify"
            label="ຄົ້ນຫາຂໍ້ມູນ"
            single-line
            outlined
            dense
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon large color="#C51162" @click="editeItem(item)">
          mdi-check
        </v-icon>
        <v-icon large color="primary" @click="viewItem(item)"> mdi-eye </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'AdminSaleOfSystemMaymaiShopStoryOrderOnline',

  data() {
    return {
        newHeaders: [
        { text: "ລໍາດັບ", value: "idx" },
        { text: "ຜູ້ສັ່ງຊື້", value: "customerName" },
        { text: "ເບີ້ໂທ", value: "customerPhone" },
        // { text: "ອີມິວ", value: "customer_email" },
        { text: "ວັນທີ່ສັ່ງຊື້", value: "sale_date" },
        // { text: "ເວລາສັ່ງຊື້", value: "order_time" },
        // { text: "ຈ່າຍຜ່ານ", value: "pay_method" },
        // { text: "ເມັ້ນຂອງລູກຄ້າ", value: "customer_content" },
        // { text: "ສ່ວນຫຼຸດ", value: "discount" },
        { text: "ຮັບສັ່ງຊື້", value: "actions" },
        // { text: "ລາຍລະອຽດ", value: "data-table-expand" },
      ],
    }
  },
  getTypeAndStatus(){
        return this.$store.state.sale.TypeAndStatus;
     },
  mounted() {
      const data={
        type:"online",
        status:"completed"
      }
     this.$store.dispatch('sale/selectByTypeAndStatus',data)
    },

    methods: {
      Submit() {
        this.editList.emp_id = this.$store.state.authMod.token.emp_id;
        if(this.editList.status ==='Confirm'){
          this.editList.status='Waiting'
        this.RecieveOrder(this.editList);
          const comment = {
            id: this.editList.com_id,
            emp_id: this.$store.state.authMod.token.emp_id,
            receive_content: this.editList.receive_content,
          };
          this.UpdateComment(comment);
        }
        this.back();
      },
      viewItem(item){
        this.$router.push('/order_online/'+ item.id)
      }
    },
}
</script>

<style lang="scss" scoped></style>
