<template>
  <div class="pa-5">
    <div>
      <v-btn tile fixed right color="error" class="mb-10" @click="goBack"
        ><v-icon>mdi-close</v-icon> ປິດ</v-btn
      >
    </div>
    <div class="shop-info">
      <img src="/images/logo.png" alt="Shop Logo" class="logo" />

      <div class="shop-details">
        <h2>ຮ້ານຂາຍເຄື່ອງ ແມ່ໄໝ</h2>
        <p>ຕັ້ງຢູ່ທີ່ ບ້ານດົງໂດກ, ເມືອງໄຊທານີ, ນະຄອນຫຼວງວຽງຈັນ</p>
        <p>ເບີຕິດຕໍ່: 020 5475 6861</p>
      </div>
    </div>
    <div class="d-flex justify-space-between">
      <h4 class="bill-date">
        ໃບບິນສັ່ງຊື້: {{ getSale.id ? getSale.id : 'ບໍ່ມີ' }}
      </h4>
      <h4 class="bill-date">
        ວັນທີສັ່ງຊື້: {{ formatDateLo(getSale.order_date) }}
      </h4>
    </div>
    <div class="d-flex justify-space-between">
      <h4 class="bill-date">
        ພະນັກງານ:
        {{ getSale.employeeName ? getSale.employeeName : 'ເຈົ້າຂອງຮ້ານ' }}
      </h4>
      <div v-if="getSupplier">
        <h4>ຜູ້ສະໜອງ: {{ getSupplier.name }}</h4>
        <h4>ເບີຕິດຕໍ່: {{ getSupplier.phone }}</h4>
      </div>
    </div>
    <v-data-table :items="getDetail" :headers="headers" class="product-table">
      <template #[`item.profile`]="{ item }">
        <v-img :src="item.profile" width="60px"></v-img>
      </template>
    </v-data-table>
    <!-- <p class="total-price">ລວມເງິນທັງໝົດ: {{ formatPrice(500000) }}ກິບ</p> -->
    <v-btn class="print-button primary" @click="generateAndPrintBill"
      >ພິມໃບບິນສັ່ງຊື້</v-btn
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
          width: '35',
        },
        {
          text: 'ຮູບ',
          value: 'profile',
        },
        {
          text: 'ຊື່ສິນຄ້າ',
          value: 'productName',
        },
        {
          text: 'ປະເພດສິນຄ້າ',
          value: 'categoryName',
        },
        {
          text: 'ສິ',
          value: 'color',
        },
        {
          text: 'ຂະໜາດ',
          value: 'size',
        },
        {
          text: 'ຈຳນວນ',
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
      return this.$store.state.order_detail.Banner.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        }
      })
    },
    getSupplier() {
      return this.$cookies.get('supplierData')
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
    goBack() {
      this.$cookies.remove('supplierData')
      this.$router.push('/order')
    },
    generateAndPrintBill(callback) {
  const table = document.querySelector('.product-table')
  const clonedTable = table.cloneNode(true)
  const printWindow = window.open('', '', 'height=500,width=800')

  printWindow.document.write('<html><head><title>ໃບບິນສັ່ງຊື້ຂອງຮ້ານເມໄໝ</title>')
  printWindow.document.write(`
    <style>
      * {
        font-family: phetsarath ot;
      }
      table {
        border-collapse: collapse;
        margin: 0 auto;
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
      // .watermark {
      //   position: fixed;
      //   top: 50%;
      //   left: 50%;
      //   transform: translate(-50%, -50%) rotate(-45deg);
      //   font-size: 3rem;
      //   color: rgba(0, 0, 0, 0.2);
      //   pointer-events: none;
      // }
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

  // Watermark
  // printWindow.document.write(`
  //   <div class="watermark">*ຮ້ານຂາຍເຄື່ອງ ແມ່ໄໝ*</div>
  // `)

  // Add shop information
  printWindow.document.write(`
    <div class="shop-info">
      <img src="/images/logo.png" alt="Shop Logo" class="logo" />
      <div class="shop-details">
        <h2>ຮ້ານຂາຍເຄື່ອງ ແມ່ໄໝ</h2>
        <p>ຕັ້ງຢູ່ທີ່ ບ້ານດົງໂດກ, ເມືອງໄຊທານີ, ນະຄອນຫຼວງວຽງຈັນ</p>
        <p>ເບີຕິດຕໍ່: 020 5475-6861</p>
      </div>
    </div>
  `)

  printWindow.document.write(
    `         
    <div style="display: flex; justify-content: space-between">
      <h4 class="bill-date">ໃບບິນສັ່ງຊື້: 
    ${this.getSale.id}
    </h4>
      <h4 class="bill-date">ວັນທີສັ່ງຊື້: ${this.formatDateLo(
      this.getSale.order_date
    )}</h4>
    </div>
    
    `
  )

  if(this.getSupplier){
    printWindow.document.write(
      `         
      <div style="display: flex; justify-content: space-between">
        <h4 class="bill-date">ພະນັກງານຂາຍ: ${
          this.getSale.employeeName
            ? this.getSale.employeeName
            : 'ເຈົ້າຂອງຮ້ານ'
        }</h4>
        <div>
          <h4 class="bill-date">ຜູ້ສະໜອງ: ${this.getSupplier.name}</h4>
          <h4 class="bill-date">ເບີຕິດຕໍ່: ${this.getSupplier.phone}</h4>
        </div>
      </div>
      
      `
    )
  }else{
    printWindow.document.write(
      `         
      <div style="display: flex; justify-content: space-between">
        <h4 class="bill-date">ພະນັກງານຂາຍ: ${
          this.getSale.employeeName
            ? this.getSale.employeeName
            : 'ເຈົ້າຂອງຮ້ານ'
        }</h4>
      </div>
      
      `
    )
  }

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
