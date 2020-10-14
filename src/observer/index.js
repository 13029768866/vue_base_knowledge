class Observer {
  constructor(value){
    this.walk(value)
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
  if(typeof data !== 'object' || data === null) return;
  return new Observer(data);
}
