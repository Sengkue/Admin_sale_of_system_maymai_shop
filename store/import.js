export const state = () => ({
    AllImport:[],
    ByStatus:[],
    importId:{},
    import_id:'',
  })
  
  export const mutations={
    setImport(state, data){
      state.AllImport = data
    },
        setimportOne(state, data){
      state.importId = data
    },
    setimportByStatus(state, data){
      state.ByStatus = data
    },
    setimportId(state, data){
      state.import_id = data
    }
  }
  
  export const actions = {
    selectAll({commit}){
        this.$axios.get('/import').then((res)=>{
            commit('setImport', res.data.result)
        })
    },
  selectimportById({commit},id){
        this.$axios.get(`/import/${id}`).then((res)=>{
            commit('setimportOne', res.data.result)
        })
    },
    selectimportByStatus({commit}){
      const id = "pending"
      this.$axios.get(`/import/status/${id}`).then((res)=>{
          commit('setimportByStatus', res.data.result)
      }).catch((res)=>{
        commit('setimportByStatus', [],res)
      })
  },
   async Insert({commit},data){
     await   this.$axios.post(`/import`, data).then((res)=>{
          commit('setimportId', res.data.result.id)
        })
    },
  }
  