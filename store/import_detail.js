export const state = () => ({
    Allorder:[],
    byOrderId:[],
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
      state.byOrderId = data
    }
  }
  
  export const actions = {
    selectorder({commit}){
        this.$axios.get('/order').then((res)=>{
            commit('setorder', res.data.result)
        })
    },
    selectByorderId({commit},id){
      this.$axios.get(`/import_detail/import/${id}`).then((res)=>{
        commit('setOrderDetail', res.data.result)
        console.log('setOrderDetail', res.data.result)
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
            console.log('setOwnerOne', res.data)
        })
    },
  }
  