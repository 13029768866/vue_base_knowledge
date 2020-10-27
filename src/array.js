
/* 数组原型 */
let oldArrayPrototype = Array.prototype;

/* 基于数组原型创造一个Vue数组原型 */
export let newArrayPrototype = Object.create(oldArrayPrototype);

let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
];

/* 7个改变原数组的方法重写 */
methods.forEach(method => {
  newArrayPrototype[method] = function (...args) {
    const res = oldArrayPrototype[method].apply(this,args);
    let insert;
    let ob = this.__ob__;

    /* 新增方法判断 */
    switch (method) {
      case 'push':
      case 'unshift':
        insert = args;
        break;
      case 'splice':
        insert = args.slice(2);
        break;
      default:
        break;
    }

    /* 新增的值增加观测 */
    if(insert) ob.observerArray(insert);


    return res;
  }
})


