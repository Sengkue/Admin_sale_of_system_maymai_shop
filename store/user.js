export const state = () => ({
  profile:{},
  AllUser:{},
  edit: false,
  view: false,
  insert: false,
})

export const mutations={
  setProfile(state, data){
    state.profile = data
  },
  setAllUser(state, data){
    state.AllUser = data
  },
  setView(state, data) {
    state.view = data;
  },
  setEdit(state, data) {
    state.edit = data;
  },
  setInsert(state, data) {
    state.insert = data;
  },
}

export const actions = {
  selectUser({commit}){
    this.$axios.get('/user').then((data)=>{
      commit('setAllUser', data.data)
    })
  },
  login({ commit }, form) {
    this.$axios.post('/user/login', form).then((data) => {
      this.$cookies.set('token', data.data.token)
      this.$cookies.set('status', data.data.status)
      console.log('return:', data.data.result)
      this.$router.push('/')
    })
  },
  selectProfile({commit}){
    this.$axios.get('/profile').then((data)=>{
      commit('setProfile', data.data)
    })
  }
}
