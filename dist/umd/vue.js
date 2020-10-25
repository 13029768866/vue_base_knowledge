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

  var oldArrayPrototype = Array.prototype;
  var newArrayPrototype = Object.create(oldArrayPrototype);
  var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    newArrayPrototype[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var res = oldArrayPrototype[method].apply(this, args);
      var insert;
      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          insert = args;
          break;

        case 'splice':
          insert = args.slice(2);
          break;
      }

      if (insert) ob.observerArray(insert);
      return res;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      Object.defineProperty(value, '__ob__', {
        enumerable: false,
        // 不可枚举,隐藏属性,不能被循环
        configurable: false,
        // 不能被设置
        value: this
      });

      if (Array.isArray(value)) {
        value.__proto__ = newArrayPrototype;
        this.observerArray(value);
      } else {
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

  function initState(vm) {
    var opts = vm.$options;
    /* 依照顺序,依次初始化 */

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    /* 1、类型判断 */
    var data = vm.$options.data;
    vm._data = data = typeof data === 'function' ? data.call(vm) : data;
    observer(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;
      /* 状态初始化 */

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
