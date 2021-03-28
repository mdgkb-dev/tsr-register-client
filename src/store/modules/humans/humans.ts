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
  },
  editHuman: (state: any, payload: any) => {
    const item = state.humans.find((item: any) => item.id === payload.recordId);
    Object.assign(item, payload);
  },
  deleteHuman: (state: any, payload: any) => {
    const i = state.someArrayofObjects
      .map((item: any) => item.id)
      .indexOf(payload);
    state.humans.splice(i, 1);
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
    console.log(payload);
    const res = await fetch(
      process.env.VUE_APP_BASE_URL + `human/${payload.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );
    context.commit("editHuman", res.json());
  },
  deleteHuman: async (context: any, id: any) => {
    await fetch(process.env.VUE_APP_BASE_URL + `human/${id}`, {
      method: "DELETE"
    });
    context.commit("deleteHuman", id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
