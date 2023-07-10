<template>
    <div>
      <div>
        <v-btn tile fixed right color="error" class="mb-10" to="/order"
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
      <p class="bill-date">Date:{{ formatDateLo(getSale.order_date) }}</p>
  
      <v-data-table :items="getDetail" :headers="headers" class="product-table">
        <template #[`item.profile`]="{ item }">
          <v-img :src="item.profile" width="60px"></v-img>
        </template>
      </v-data-table>
      <!-- <p class="total-price">ລວມເງິນທັງໝົດ: {{ formatPrice(500000) }}ກິບ</p> -->
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
            text: 'ລຳດັບ',
            value: 'index',
          },
          {
            text: 'ຮູບ',
            value: 'profile',
          },
          {
            text: 'Name',
            value: 'productName',
          },
          {
            text: 'Category',
            value: 'categoryName',
          },
          {
            text: 'Quantity',
            value: 'order_quantity',
          },
        //   {
        //     text: 'Total',
        //     value: 'total',
        //   },
        ],
      }
    },
    computed: {
      getDetail() {
        return this.$store.state.order_detail.Banner.map((item, index)=>{
          return{
            index: index + 1,
            ...item
          }
        })
      },
      getSale() {
        return this.$store.state.order.orderId
      },
    //   totalPrice() {
    //     return this.getDetail.reduce((total, item) => {
    //       return total + item.sale_price * item.quantity
    //     }, 0)
    //   },

    },
    mounted() {
      this.$store.dispatch('order/selectOrderById', this.$route.params.id)
      this.$store.dispatch('order_detail/selectByorderId', this.$route.params.id)
    },
    methods: {
      generateAndPrintBill(callback) {
  const table = document.querySelector('.product-table')
  const clonedTable = table.cloneNode(true)
  const printWindow = window.open('', '', 'height=500,width=800')

  printWindow.document.write('<html><head><title>ໃບບິນສັ່ງຊື້ຂອງຮ້ານເມໄໝ</title>')
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
      @media print {
        table tbody tr {
          border: none;
        }
        .v-data-footer {
          display: none;
        }
        .v-pagination {
          display: none;
        }
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
      this.getSale.order_date
    )}</p>`
  )

  // Remove the profile column from the cloned table
  const headers = clonedTable.querySelectorAll('thead th')
  const profileIndex = Array.from(headers).findIndex(
    (header) => header.textContent.trim() === 'ຮູບ'
  )
  if (profileIndex !== -1) {
    headers[profileIndex].remove()
    const rows = clonedTable.querySelectorAll('tbody tr')
    rows.forEach((row) => row.children[profileIndex].remove())
  }

  // Add table
  printWindow.document.write(clonedTable.outerHTML)

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
}

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
  