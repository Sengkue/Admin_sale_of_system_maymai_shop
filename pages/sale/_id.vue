<template>
  <div>
    <div>
      <v-btn tile fixed right color="error" class="mb-10" to="/sale"
        ><v-icon>mdi-close</v-icon> ປິດ</v-btn
      >
    </div>
    <div class="shop-info">
      <img src="/images/logo.png" alt="Shop Logo" class="logo" />

      <div class="shop-details">
        <h2>Maymai Shop</h2>
        <p>123 Main Street, City</p>
        <p>Phone: (020) 7878-1525</p>
      </div>
    </div>
    <p class="bill-date">Date:{{ formatDateLo(getSale.sale_date) }}</p>

    <v-data-table :items="getDetail" :headers="headers" class="product-table">
      <template #[`item.total`]="{ item }">
        <td>{{ formatPrice(item.sale_price * item.quantity) }}</td>
      </template>
    </v-data-table>
    <p class="total-price">ລວມເງິນທັງໝົດ: {{ formatPrice(totalPrice) }}ກິບ</p>
    <div v-if="getSale.promotionDiscount > 0" class="total-price">
      <p>ຮັບສ່ວນຫຼຸດ: {{ getSale.promotionDiscount }}%</p>
      <p class="total-price green--text">
        ຍັງເຫຼຶອພຽງ: {{ formatPrice(calculatePromotion) }}ກິບ
      </p>
    </div>
    <v-btn class="print-button primary" @click="generateAndPrintBill"
      >Print Bill</v-btn
    >
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default {
  name: 'AdminSaleOfSystemMaymaiShopBill',

  data() {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Category',
          value: 'category',
        },
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
    getSale() {
      return this.$store.state.sale.StateSelectOne
    },
    totalPrice() {
      return this.getDetail.reduce((total, item) => {
        return total + item.sale_price * item.quantity
      }, 0)
    },
    calculatePromotion() {
      return (
        this.totalPrice -
        (this.getSale.promotionDiscount * this.totalPrice) / 100
      )
    },
  },
  mounted() {
    this.$store.dispatch('saleDetail/selectBySaleId', this.$route.params.id)
    this.$store.dispatch('sale/selectBySaleId', this.$route.params.id)
  },
  methods: {
    generateAndPrintBill(callback) {
      const table = document.querySelector('.v-data-table__wrapper table')
      const clonedTable = table.cloneNode(true)
      const headers = clonedTable.querySelectorAll('thead th')
      const actionsIndex = Array.from(headers).findIndex(
        (header) => header.textContent.trim() === 'Actions'
      )
      if (actionsIndex !== -1) {
        headers[actionsIndex].remove()
        const rows = clonedTable.querySelectorAll('tbody tr')
        rows.forEach((row) => row.children[actionsIndex].remove())
      }

      const printWindow = window.open('', '', 'height=500,width=800')
      printWindow.document.write('<html><head><title>ບິນຂາຍຮ້ານເມໄໝ</title>')
      printWindow.document.write(`
    <style>
      @font-face {
        font-family: 'Noto Sans Lao Looped';
        src: url('assets/fonts/NotoSerifLao.ttf') format('truetype');
      }
      table {
        border-collapse: collapse;
        margin: 0 auto;
        font-family: 'Noto Sans Lao Looped', serif;
        width: 100%;
      }
      td, th {
        border: 1px solid black;
        padding: 0.5rem;
      }
      .logo {
        width: 80px;
        height: auto;
        margin-right: 10px;
      }
      .shop-info {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }
      .shop-details {
        margin-top: 10px;
      }
      .bill-date {
        margin-bottom: 10px;
      }
      .total-price {
        font-weight: bold;
        margin-bottom: 10px;
      }
    </style>
  `)
      printWindow.document.write('</head><body >')

      // Add shop information
      printWindow.document.write(`
    <div class="shop-info">
      <img src="/images/logo.png" alt="Shop Logo" class="logo" />
      <div class="shop-details">
        <h2>Maymai Shop</h2>
        <p>123 Main Street, City</p>
        <p>Phone: (020) 7878-1525</p>
      </div>
    </div>
  `)

      // Add bill date
      printWindow.document.write(
        `<p class="bill-date">Date: ${this.formatDateLo(
          this.getSale.sale_date
        )}</p>`
      )

      // Add table
      printWindow.document.write(clonedTable.outerHTML)

      // Add total price
      printWindow.document.write(
        `<p class="total-price">Total Price: ${this.formatPrice(
          this.totalPrice
        )}kip</p>`
      )

      // Add promotion discount if applicable
      if (this.getSale.promotionDiscount > 0) {
        printWindow.document.write(`
      <div class="total-price">
        <p>ຮັບສ່ວນຫຼຸດ: ${this.getSale.promotionDiscount}%</p>
        <p class="total-price green--text">
          ຍັງເຫຼຶອພຽງ: ${this.formatPrice(this.calculatePromotion)}ກິບ
        </p>
      </div>
    `)
      }

      printWindow.document.write('</body></html>')
      printWindow.document.close()
      printWindow.print()

      // Clear the value after printing is complete
      setTimeout(() => {
        this.value = ''
      }, 1000) // Wait for 1 second before clearing the value

      if (typeof callback === 'function') {
        callback()
      }
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
