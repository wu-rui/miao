function bind(f, ...fixedArgs) {
  return function (...args) {
    f(...fixedArgs, args)
  }
}
function bind(f) {
  var fixedArgs = Array.from(arguments).slice(1);
  return function () {
    var args = Array.from(arguments);
    return f.applay(null, fixedArgs.concat(args));
  }
}