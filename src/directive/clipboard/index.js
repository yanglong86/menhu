import Clipboard from './clipboard'

const install = function(Vue) {
  Vue.directive('Clipboard', Clipboard);
  Vue.directive('auth',{
    update:function (el,tes) {
      console.log(el)
      console.log(tes)
    }
  })
}

if (window.Vue) {
  window.clipboard = Clipboard
  Vue.use(install); // eslint-disable-line
}

Clipboard.install = install
export default Clipboard
