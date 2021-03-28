const state = () => ({
  humans: []
});

const getters = {
  humans: (state: any) => {
    return state.humans;
  },
  getHumanById: (state: any) => (id: number) => {
    return state.humans.find((human: any) => human.id === id);
  }
};

const mutations = {
  setHumans: (state: any, payload: any) => {
    state.humans = payload;
  },
  createHuman: (state: any, payload: any) => {
    state.humans.push(payload);
  }
};

const actions = {
  getAllHumans: async (context: any) => {
    const res = await fetch(process.env.VUE_APP_BASE_URL + "human");
    context.commit("setHumans", await res.json());
  },
  createHuman: async (context: any, payload: any) => {
    const res = await fetch(process.env.VUE_APP_BASE_URL + "human", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    context.commit("createHuman", res.json());
  },
  editHuman: async (context: any, payload: any) => {
    const res = await fetch(
      process.env.VUE_APP_BASE_URL + `human/${payload.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );
    context.commit("createHuman", res.json());
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
