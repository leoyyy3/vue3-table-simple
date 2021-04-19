import Htable from './index.vue'

export default {
    install: (app, options) => {
      app.component('htable', Htable)
    }
  }