import { defineStore } from 'pinia'

export const useRoute = defineStore('route', {
  state: () => ({
    currentRoute: 'mainmenu',
  }),
  actions: {
    changeRoute(newRoute:string) {
        this.currentRoute = newRoute
    },
  },
  getters: {
    current() {
        return this.currentRoute
    }
  }
})
