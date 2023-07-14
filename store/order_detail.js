export const state = () => ({
    Allorder:[],
    Banner:[],
    orderId:{},
    fromId:null,
  })
  
  export const mutations={
    setOrderId(state, data){
    state.fromId = data
    },
    setorder(state, data){
      state.Allorder = data
    },
        setorderOne(state, data){
      state.orderId = data
    },
    setOrderDetail(state, data){
      state.Banner = data
    }
  }
  
  export const actions = {
    selectorder({commit}){
        this.$axios.get('/order').then((res)=>{
            commit('setorder', res.data.result)
        })
    },
    selectByorderId({commit},id){
      this.$axios.get(`/order_detail/order/${id}`).then((res)=>{
        commit('setOrderDetail', res.data.result)
      })
  },
      selectorderId({commit},id){
        this.$axios.get(`/order/${id}`).then((res)=>{
            commit('setorderOne', res.data.result)
        })
    },
    Insert({commit},data){
        this.$axios.post(`/order`, data).then((res)=>{
            // commit('setOwnerOne', res.data.result)
          
        })
    },
  }
  