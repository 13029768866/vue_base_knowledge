import {initMixin} from "./init";


function Vue(options){
  /* 1、options初始化 */
  this._init(options);
}

/* 初始化(原型上挂载方法) */
initMixin(Vue);


export default Vue;
