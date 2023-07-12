export const state = () => ({
    StateSelectAll:[],
    StateSelectOne:[],
    SaleType:[],
    TypeAndStatus:[],
    saleOnline:[]

  });
  
  export const mutations = {
    setSelectAll(state, data) {
      state.StateSelectAll = data;
    },
    setSelectOne(state, data) {
      state.StateSelectOne = data;
    },
    setSaleType(state, data){
      state.SaleType = data
    },
    setTypeAndStauts(state, data){
      state.TypeAndStatus = data
    },
    selectSaleOnline(state, data){
      state.saleOnline = data
    }
   
  };
  export const actions = {
    // _______________selete all sale________________
    async selectAll({ commit }) {
      await this.$axios
        .get("/sale")
        .then((data) => {
          commit("setSelectAll", data.data);
        })
        .catch((error) => {
          this.$toast.error("ການດືງຂໍ້ມູນຂອງທ່ານມີບັນຫາ!", error);
        });
    },
    // ______________select by Sale Id________________
    async selectBySaleId({ commit }, id) {
      await this.$axios
        .get(`/sale/${id}`)
        .then((data) => {
          commit("setSelectOne", data.data.result);
        })
        .catch((error) => {
          this.$toast.error("ການດືງຂໍ້ມູນຂອງທ່ານມີບັນຫາ!", error);
        });
    },
    // _______________create sale or sell on pos _______________
    async insert({ commit }, data) {
      await this.$axios
        .post("sale/", data)
        .then((data) => {
          this.$toast.success("ການເພີ່ມຂໍ້ມູນຂອງທ່ານສຳເລັດ!");
        })
        .catch((error) => {
          this.$toast.error("ການເພີ່ມຂໍ້ມູນຂອງທ່ານມີບັນຫາ!", error);
        });
    },
  // ____________________select by type__________________
  async selectBySaleType({commit}){
    const Type = "online"
    await this.$axios.get(`/sale/type/${Type}`).then((res)=>{
      commit('setSaleType', res.data.result)
    })
  },
  // _______________________select by type and status_______________
  async selectByTypeAndStatus({commit}){
    const Type = "online"
    const Status = "pending"
    await this.$axios.get(`/sale/${Type}/${Status}`).then((res)=>{
      commit('setTypeAndStauts', res.data.result)
    })
  },
  // __________________________select sell online by sale id______________
  selectSaleOnlineById({commit},id){
    this.$axios.get(`/sale/sell_online/${id}`).then((res)=>{
      commit('selectSaleOnline', res.data.result)
    })
  },
  // _____________________________update status sell Online_____________________
 async updateStatus({commit}, id){
     await  this.$axios.put(`/sale/status/${id}`).then((res)=>{
        this.$toast.success("ຢືນຢັນການຂາຍອອນໄລສຳເລັດ")
      this.$router.push('/order_online')
       })
  }
  };
  