import {observer} from "./observer/index";
import { proxy } from "./utlils";

export function initState(vm) {
  const opt = vm.$options;
  /* 1、根据顺序初始化状态 */
  if(opt.props){
    initProps(vm)
  }
  if(opt.methods){
    initMethods(vm)
  }
  if(opt.data){
    initData(vm)
  }
  if(opt.computed){
    initComputed(vm)
  }
  if(opt.watch){
    initWatch(vm)
  }
}


function initProps(vm) {

}
function initMethods(vm) {

}

function initData(vm) {
  /* 1、类型判断获取data */
  let data = vm.$options.data;
  vm._data = data = typeof data === 'function'?data.call(vm): data;

  /* 方便用户体验代理 */
  for(let key in data){
    proxy(vm,'_data', key);
  }
  /* 2、进行数据劫持,添加响应式 */
  observer(data);
}
function initComputed(vm) {

}
function initWatch(vm) {

}
