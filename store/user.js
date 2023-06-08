export const state = () => ({
  profile:{},
})

export const mutations={
  setProfile(state, data){
    state.profile = data
  }
}

export const actions = {

  login({ commit }, form) {
    this.$axios.post('/user/login', form).then((data) => {
      this.$cookies.set('token', data.data.token)
      this.$cookies.set('name', form.username)
      this.$router.push('/')
    })
  },
  selectProfile({commit}){
    this.$axios.get('/profile').then((data)=>{
      commit('setProfile', data.data)
    })
  }
}
