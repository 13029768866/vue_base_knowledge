import {initState} from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    /* 1、options初始化 */
    let vm = this;
    vm.$options = options;


    /* 2、state初始化 */
    initState(vm)

    /* */
    if(vm.$options.el){
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function (el) {
    /* 挂载操作 */
    const vm = this;
    const opts = vm.$options;

    el = document.querySelector(el);
    console.log(el);

    /* 根据顺序render => template => el */
    if(!opts.render){
      // 没有render, template 转化成render
      let template = opts.template;
      if(!template && el){
        /* outerHTML元素及其后代序列化HTML片段 */
        template = el.outerHTML;
      }
      console.log(template);
    }
  }
}
