import {initState} from "./state";
import {compileToFunctions} from "./compiler/index";

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

    /* 思路1、找到外层元素 */
    el = document.querySelector(el);
    console.log(el);

    /* 根据顺序render => template => el */
    /* options是否有人的函数 */
    if(!opts.render){
      // 没有render函数, template 转化成render函数
      let template = opts.template;
      if(!template && el){
        /* template标签里的是外部模板,options里的template是内部模板 */
        /* outerHTML元素及其后代序列化HTML片段 */
        template = el.outerHTML;
      }
      // console.log(template);
      /* 编译原理,将模板转换成render函数 */
      const render = compileToFunctions(template);
      opts.render = render;
    }
    // 渲染师用的render方法
    console.log(opts.render);
  }
}
