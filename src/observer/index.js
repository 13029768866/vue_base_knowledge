import {newArrayPrototype} from "../array";

class Observer {
  constructor(value){

    /* 添加是否被观测过的表示‘__ob__’ */
    Object.defineProperty(value,'__ob__',{
      enumerable: false,      // 不可枚举,隐藏属性,不能被循环
      configurable: false,    // 不能被设置
      value: this
    });


    /* 数组处理 */
    if(Array.isArray(value)){
      // 函数劫持,切片编程
      value.__proto__ = newArrayPrototype;
      // 观测数组中的对象类型
      this.observerArray(value)
    }else{
      /* 对象处理 */
      this.walk(value)
    }

  }
  observerArray(data){
    data.forEach(item => {
      observer(item);
    })
  }
  walk(data){
    let keys = Object.keys(data);
    keys.forEach(key => {
      defineReactive(data,key,data[key])
    })

  }
}
function defineReactive(obj,attr,value) {
  /* 递归处理多层级 */
  observer(value);
  Object.defineProperty(obj,attr,{
    get() {
      console.log('用户获取');
      return value;
    },
    set(newValue){
      console.log('用户设置');
      if(newValue === value ) return;
      observer(newValue);
      value = newValue;
    }
  })
}

export function observer(data) {
  /* 类型判断 */
  if(typeof data !== 'object' || data === null) return data;
  if(data.__ob__) return data;
  return new Observer(data);
}
