export const state = () => ({
    Allorder:[],
    ByStatus:[],
    orderId:{},
    order_id:'',
  })
  
  export const mutations={
    setorder(state, data){
      state.Allorder = data
    },
        setorderOne(state, data){
      state.orderId = data
    },
    setOrderByStatus(state, data){
      state.ByStatus = data
    },
    setOrderId(state, data){
      state.order_id = data
    }
  }
  
  export const actions = {
    selectAll({commit}){
        this.$axios.get('/order').then((res)=>{
            commit('setorder', res.data.result)
            console.log('setorder', res.data.result)
        })
    },
  selectOrderById({commit},id){
        this.$axios.get(`/order/${id}`).then((res)=>{
            commit('setorderOne', res.data.result)
        })
    },
    selectOrderByStatus({commit}){
      const id = "pending"
      this.$axios.get(`/order/status/${id}`).then((res)=>{
          commit('setOrderByStatus', res.data.result)
      }).catch((res)=>{
        commit('setOrderByStatus', [],res)
      })
  },
   async Insert({commit},data){
     await   this.$axios.post(`/order`, data).then((res)=>{
          commit('setOrderId', res.data.result.id)
        })
    },
  }
  