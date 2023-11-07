import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      opened: false
    }
  },
  actions: {
    openMenu() {
      this.opened = true;
    },
    closeMenu() {
      this.opened = false;
    }
  },
  getters: {
    isMenuBurgerOpened: (state) => state.opened,
  }
});
