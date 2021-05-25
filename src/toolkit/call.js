export function effCall(context = window, ...args){
  context === null ? context = window : null;
  var type = typeof context;
  if(type !== "object" && type !== "function" && type !== "symbol") {
    switch(type) {
      case 'number': 
        context = new Number(context);
        break;
      case 'string': 
        context = new String(context);
        break;
      case 'boolean': 
        context = new Boolean(context);
        break;
    }
  }
  context.$fn = this;
  var result = context.$fn(...args);
  delete context.$fn;
  return result;
}