export const state = () => ({
    AllEmployee:'',
  })
  
  export const mutations={
    setEmployee(state, data){
      state.AllEmployee = data
    }
  }
  
  export const actions = {
    selectEmployee({commit}){
        this.$axios.get('/customer').then((res)=>{
            commit('setEmployee', res.data)
            console.log('vuex:', res.data)
        })
    }
  }
  