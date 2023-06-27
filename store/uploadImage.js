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
        this.$axios.get('/employee').then((res)=>{
            commit('setEmployee', res.data.result)
        })
    },
    insert({commit}, item){
      this.$axios.post('employee', item).then((res)=>{
        this.$toast.success('Insert Employee Success')
      })
    }
  }
  