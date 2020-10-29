import {initState} from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    /* 1、options初始化 */
    let vm = this;
    vm.$options = options;


    /* 2、state初始化 */
    initState(vm)
  }
}
