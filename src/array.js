
let oldArrayPrototype = Array.prototype;

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

methods.forEach(method => {
  newArrayPrototype[method] = function (...args) {
    const res = oldArrayPrototype[method].apply(this,args);
    let insert;
    let ob = this.__ob__;

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
    if(insert) ob.observerArray(insert);


    return res;
  }
})


