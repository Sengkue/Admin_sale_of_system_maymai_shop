export const state = () => ({
  profile:{},
  AllUser:{},
  edit: false,
  view: false,
  insert: false,
  findOne:''
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
  setFindOne(state, data) {
    state.findOne = data;
  },
}

export const actions = {
  async update({ commit }, data) {
    const id = data.updateId;
    const items = data.data;
    await this.$axios.put(`/user/${id}`, items);
  },
  async selectOne({ commit }, id) {
    const response = await this.$axios.get(`/user/${id}`);
    commit('setFindOne', response.data.result);
  },
  async insert({ commit }, data) {
    await this.$axios.post('/user', data);
  },
  async selectUser({ commit }) {
    const response = await this.$axios.get('/user');
    commit('setAllUser', response.data);
  },
  async login({ commit }, form) {
    const response = await this.$axios.post('/user/login', form);
    this.$cookies.set('token', response.data.token);
    this.$cookies.set('status', response.data.status);
    this.$cookies.set('name', response.data.employeeFirstName ? response.data.employeeFirstName : response.data.ownerFirstName);
    this.$router.push('/');
  },
};
