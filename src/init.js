import {initState} from "./state";

export function initMixin(Vue) {
  /* 初始化$options */
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;

    /* 状态初始化(props,methods,computed...)*/
    initState(vm);
  }
}
