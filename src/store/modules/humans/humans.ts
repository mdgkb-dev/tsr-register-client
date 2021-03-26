const state = () => ({
  humans: []
});

const getters = {
  humans: (state: any) => {
    return state.todos;
  }
};

const mutations = {
  setHumans: (state: any, payload: any) => {
    state.humans = payload;
  },

  addHuman: (state: any, payload: any) => {
    state.humans.push(payload);
  }
};

const actions = {
  getAllHumans: async (context: any, payload: any) => {
    const data = await fetch(process.env.BASE_URL + "human");
    context.commit("setHumans", data.json());
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
