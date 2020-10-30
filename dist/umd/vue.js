(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /* 数组原型 */
  var oldArrayPrototype = Array.prototype;
  /* 基于数组原型创造一个Vue数组原型 */

  var newArrayPrototype = Object.create(oldArrayPrototype);
  var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
  /* 7个改变原数组的方法重写 */

  methods.forEach(function (method) {
    newArrayPrototype[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var res = oldArrayPrototype[method].apply(this, args);
      var insert;
      var ob = this.__ob__;
      /* 新增方法判断 */

      switch (method) {
        case 'push':
        case 'unshift':
          insert = args;
          break;

        case 'splice':
          insert = args.slice(2);
          break;
      }
      /* 新增的值增加观测 */


      if (insert) ob.observerArray(insert);
      return res;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      /* 添加是否被观测过的表示‘__ob__’ */
      Object.defineProperty(value, '__ob__', {
        enumerable: false,
        // 不可枚举,隐藏属性,不能被循环
        configurable: false,
        // 不能被设置
        value: this
      });
      /* 数组处理 */

      if (Array.isArray(value)) {
        // 函数劫持,切片编程
        value.__proto__ = newArrayPrototype; // 观测数组中的对象类型

        this.observerArray(value);
      } else {
        /* 对象处理 */
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observerArray",
      value: function observerArray(data) {
        data.forEach(function (item) {
          observer(item);
        });
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(obj, attr, value) {
    /* 递归处理多层级 */
    observer(value);
    Object.defineProperty(obj, attr, {
      get: function get() {
        console.log('用户获取');
        return value;
      },
      set: function set(newValue) {
        console.log('用户设置');
        if (newValue === value) return;
        observer(newValue);
        value = newValue;
      }
    });
  }

  function observer(data) {
    /* 类型判断 */
    if (_typeof(data) !== 'object' || data === null) return data;
    if (data.__ob__) return data;
    return new Observer(data);
  }

  function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[data][key];
      },
      set: function set(newValue) {
        vm[data][key] = newValue;
      }
    });
  }

  function initState(vm) {
    var opt = vm.$options;
    /* 1、根据顺序初始化状态 */

    if (opt.props) ;

    if (opt.methods) ;

    if (opt.data) {
      initData(vm);
    }

    if (opt.computed) ;

    if (opt.watch) ;
  }

  function initData(vm) {
    /* 1、类型判断获取data */
    var data = vm.$options.data;
    vm._data = data = typeof data === 'function' ? data.call(vm) : data;
    /* 方便用户体验代理 */

    for (var key in data) {
      proxy(vm, '_data', key);
    }
    /* 2、进行数据劫持,添加响应式 */


    observer(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      /* 1、options初始化 */
      var vm = this;
      vm.$options = options;
      /* 2、state初始化 */

      initState(vm);
      /* */

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      /* 挂载操作 */
      var vm = this;
      var opts = vm.$options;
      el = document.querySelector(el);
      console.log(el);
      /* 根据顺序render => template => el */

      if (!opts.render) {
        // 没有render, template 转化成render
        var template = opts.template;

        if (!template && el) {
          /* outerHTML元素及其后代序列化HTML片段 */
          template = el.outerHTML;
        }

        console.log(template);
      }
    };
  }

  function Vue(options) {
    //  2、执行options初始化
    this._init(options);
  } // 1、原型上挂载初始化方法


  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
