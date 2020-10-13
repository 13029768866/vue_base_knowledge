import {observer} from "./observer/index";

export function initState(vm) {
  let opts = vm.$options;
  /* 依照顺序,依次初始化 */
  if(opts.props){
    initProps(vm);
  }
  if(opts.methods){
    initMethods(vm);
  }
  if(opts.data){
    initData(vm);
  }
  if(opts.computed){
    initComputed(vm);
  }
  if(opts.watch){
    initWatch(vm);
  }
}


function initProps(vm) {

}
function initMethods(vm) {

}
function initData(vm) {
  /* 1、类型判断 */
  let data = vm.$options.data;
  data = typeof data === 'function'? data.call(vm) : data;

  observer(data);

}
function initComputed(vm) {

}
function initWatch(vm) {

}
