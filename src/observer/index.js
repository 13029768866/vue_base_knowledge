class Observer {
  constructor(value){
    this.walk(value)
  }
  walk(){

  }
}

export function observer(data) {
  /* 类型判断 */
  if(typeof data === 'object' || data === null) return;
  return new Observer(data);
}
