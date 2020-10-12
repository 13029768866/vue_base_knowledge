(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function observer(data) {
    console.log('dataInit:', data);
  }

  function initState(vm) {
    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    var data = vm.$options.data;
    /* 类型处理 */

    data = typeof data === 'function' ? data.call(vm) : data;
    /* 数据劫持 */

    observer(data);
  }

  function initMixin(Vue) {
    /* 初始化$options */
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;
      /* 状态初始化(props,methods,computed...)*/

      initState(vm);
    };
  }

  function Vue(options) {
    /* 1、options初始化 */
    this._init(options);
  }
  /* 初始化(原型上挂载方法) */


  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
