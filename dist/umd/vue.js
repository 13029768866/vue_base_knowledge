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

  // <div>hello {{name}} <span>world</span></div>

  /*{
      tag: 'div',
      parent: null,
      type: 1,
      attr: [],
      children:[
      ]
  }*/

  /* 1、匹配标签名字 */
  // 英文字符开头下划线,可有可无的‘-’
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
  /* 2、匹配命名空间标签 my:xxx */

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  /* 3、匹配开始标签 <tag */

  var startTagOpen = new RegExp("^<".concat(qnameCapture));

  function parseHTML(html) {
    /* 根据正则匹配,匹配成功删除对应长度,直到字符串为空 */
    while (html) {
      /* 获取第一个字符判断是否是标签*/
      var textEnd = html.indexOf('<');

      if (textEnd == 0) {
        console.log('开始');
        parseStartTag();
        break;
      }
    }
    /* 解析完前进字符串 */

    function advance(n) {
      html = html.substring(n);
    }
    /* 解析开头标签 */


    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attr: []
        };
        advance(start[0].length);
        console.log(html);
      }
    }
  }

  function compileToFunctions(template) {
    /* html模板 => render函数 */

    /* ast语法树可以描述js,css,dom  虚拟dom只能描述dom  */
    // 1、需要将html代码转换成“ast”语法树  可以用AST树来描述语言本身（描述代码的）
    // 前端必须要掌握的数据结构（树）
    var ast = parseHTML(template); // 2、通过AST语法树 重新反编译成代码
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
      /* 思路1、找到外层元素 */

      el = document.querySelector(el);
      console.log(el);
      /* 根据顺序render => template => el */

      /* options是否有人的函数 */

      if (!opts.render) {
        // 没有render函数, template 转化成render函数
        var template = opts.template;

        if (!template && el) {
          /* template标签里的是外部模板,options里的template是内部模板 */

          /* outerHTML元素及其后代序列化HTML片段 */
          template = el.outerHTML;
        } // console.log(template);

        /* 编译原理,将模板转换成render函数 */


        var render = compileToFunctions(template);
        opts.render = render;
      } // 渲染师用的render方法


      console.log(opts.render);
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
