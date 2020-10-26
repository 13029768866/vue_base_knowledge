import {initMixin} from "./init";


function Vue(options) {
//  2、执行options初始化
  this._init(options)
}

// 1、原型上挂载初始化方法
initMixin(Vue);
export default Vue;
