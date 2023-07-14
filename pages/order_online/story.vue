<template>
  <div>
    <v-data-table
      :search="newsearch"
      :headers="newHeaders"
      :items="getTypeAndStatus"
      :single-expand="true"
      :expanded.sync="newexpanded"
      item-key="index"
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
          <v-toolbar-title>ປະຫວັດລາຍການສັ່ງຊື່ສຳເລັດ</v-toolbar-title>
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
      newsearch:null,
        newHeaders: [
        { text: "ລໍາດັບ", value: "index" },
        { text: "ຜູ້ສັ່ງຊື້", value: "customerName" },
        { text: "ເບີ້ໂທ", value: "customerPhone" },
        { text: "ວັນທີ່ສັ່ງຊື້", value: "sale_date" },
        { text: "ຮັບສັ່ງຊື້", value: "actions" },
      ],
    }
  },
  computed: {
    getTypeAndStatus() {
      return this.$store.state.sale.saleStory.map((item, index)=>{
        return{
           index: index + 1,
           ...item
        }
      })
    },
  },
  mounted() {
    this.$store.dispatch('sale/selectStorySellOnline', {
        type: 'online',
        status: 'completed',
      })
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
