import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    layout: string;
  }

  // Provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}