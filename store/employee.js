export const state = () => ({
    AllEmployee:[],
    update:'',
    byId:''
  })
  
  export const mutations={
    setEmployee(state, data){
      state.AllEmployee = data
    },
    setEmployeeById(state, data){
      state.byId = data
    },
    setUpdate(state, data){
      state.update = data
    }
  }
  
  export const actions = {
    selectEmployee({commit}){
        this.$axios.get('/employee').then((res)=>{
            commit('setEmployee', res.data.result)
        })
    },
    selectEmployeeById({commit}, id){
      this.$axios.get(`/employee/${id}`).then((res)=>{
          commit('setEmployeeById', res.data.result)
      })
  },
    insert({commit}, item){
      this.$axios.post('employee', item).then((res)=>{
        this.$toast.success('Insert Employee Success')
        this.$router.push('/employee')
      })
    },
    update({commit}, item){
      const id = item.id
      this.$axios.put(`employee/${id}`, item.data).then((res)=>{
        this.$toast.success('Update Employee Success')
        this.$router.push('/employee')
      })
    }
  }
  