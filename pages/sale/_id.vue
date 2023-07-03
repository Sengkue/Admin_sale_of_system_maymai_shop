<template>
  <div>
    <div class="shop-info">
      <img src="/images/logo.png" alt="Shop Logo" class="logo" />

      <div class="shop-details">
        <h2>Maymai Shop</h2>
        <p>123 Main Street, City</p>
        <p>Phone: (020) 7878-1525</p>
      </div>
    </div>
    <p class="bill-date">Date: 000</p>

    <v-data-table :items="getDetail" :headers="headers" class="product-table">
      <template #[`item.total`]="{ item }">
        <td>{{ formatPrice(item.sale_price * item.quantity) }}</td>
      </template>
    </v-data-table>
    {{ getDetail }}
    <p class="total-price">Total Price:</p>
    <v-btn class="print-button" @click="printBill">Print Bill</v-btn>
  </div>
</template>

<script>
export default {
  name: 'AdminSaleOfSystemMaymaiShopBill',

  data() {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        // {
        //   text: 'Category',
        //   value: 'category',
        // },
        {
          text: 'Price',
          value: 'sale_price',
        },
        {
          text: 'Quantity',
          value: 'quantity',
        },
        {
          text: 'Total',
          value: 'total',
        },
      ],
    }
  },
  computed: {
    getDetail() {
      return this.$store.state.saleDetail.StateSelectOne
    },
    totalPrice() {
      return this.$store.state.saleDetail.StateSelectOne.map((item) => {
        return {
          AllPrice: item.sale_price,
          totalQuantity: item.quantity,
          ...item,
        }
      })
    },
  },
  mounted() {
    this.$store.dispatch('saleDetail/selectBySaleId', this.$route.params.id)
  },
  methods: {
    printBill() {
      this.$taost.success('Printing the bill...')
    },
  },
}
</script>

<style lang="scss" scoped>
/* Add your custom styles here */

.shop-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 80px;
  height: auto;
  margin-right: 10px;
}

.shop-details {
  margin-top: 10px;
}

.bill-date {
  margin-bottom: 10px;
}

.product-table {
  margin-bottom: 20px;
}

.total-price {
  font-weight: bold;
  margin-bottom: 10px;
}

.print-button {
  margin-top: 20px;
}
</style>
