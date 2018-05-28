import Cookies from 'js-cookie'
var app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    }
  },

  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    }
  }
}

export default app
