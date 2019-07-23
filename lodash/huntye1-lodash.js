var huntye1 = function () {
  return {
    compact, chunk, difference, drop, dropRight, findLastIndex, flattenDepth, flatten, flattenDeep, reverse, join, some, every, forEach, countBy, filter, find, curry, spread, negate, flip, before, after, ary, unary, memerize, keyBy, property, forOwn, isArray, isFunction, isFinite, isNaN, isNumber, isNull, isNil, isObject, isUndefined,
    isString, isBoolean, isObjectLike, isArguments, isArrayBuffer, isArrayLike, isArrayLikeObject, isDate, isPlainObject, isElement, isEmpty
  }

  function isEmpty(val) {
    if (val == null) { 
      return true;
    }
    if (isArrayLike(val) && val.length == 0) {
      return true;
    }
    let tag = nativeToString(val);
    if (tag == `[object Set]` || tag == `[object Set]`) {
      return !val.size;
    }
    for (let key in val) {
      if (val.hasOwnProperty(key)) { 
        return false;
      }
    }
    return true;
  }
  /**
   * check the val is `DOM element`
   *
   * @param   {*}  val  the val to check
   *
   * @return  {boolean}       return true if the val is `DOM element` else false
   */
  function isElement(val) {
    return isObjectLike(val) && val.nodeType == 1 && isPlainObject(val);
  }

  /**
   * check the val is `plain object` whitch means that an object created by the Object constructor or one with a [[Prototype]] of null.
   *
   * @param   {*}  val  the val to check 
   *
   * @return  {boolean}    return true if the val is `plain object` else false;
   */
  function isPlainObject(val) {
    let proto = Object.getPrototypeOf(val)
    return proto == null || proto.constructor == Object;
  }
  /**
   * @private
   * use native `toString` method to `val`
   *
   * @param   {*}  val  the val to check
   *
   * @return  {string}       return string eg: [object String]
   */
  function nativeToString(val) {
    return Object.prototype.toString.call(val);
  }
  /**
   * to check the `val` is `Date` object
   *
   * @param   {*}  val  the val to check
   *
   * @return  {boolean}       return true if the `val` is `Date` object else false
   */
  function isDate(val) {
    return isObjectLike(val) && nativeToString(val) == "[object Date]";
  }

  /**
     * to check the `val` is `arraylike`  and the val is  an object
     *
     * @param   {*}  val  the val to check
     *
     * @return  {boolean}   return true if the the `val` is `arraylikeObject` else return false;
     */
  function isArrayLikeObject(val) {
    return !isNil(val) && val.length <= Number.MAX_SAFE_INTEGER && val.length >= 0 && !isFunction(val) && isObjectLike(val);
  }

  /**
   * to check the `val` is `arraylike`
   *
   * @param   {*}  val  the val to check
   *
   * @return  {boolean}   return true if the the `val` is `arraylike` else return false;
   */
  function isArrayLike(val) {
    return !isNil(val) && val.length <= Number.MAX_SAFE_INTEGER && val.length >= 0 && !isFunction(val);
  }

  /**
   * to check the `val` is like the `arguments` object
   *
   * @param   {*}  val the val to check
   *
   * @return  {boolean}  return true if the `val` is an `arguments` object else false
   */
  function isArguments(val) {
    return isObjectLike(val) && nativeToString(val) == `[object Arguments]`;
  }

  /**
   * to check the `val` is an `ArrayBuffer` object 
   *
   * @param   {*}  val  the  val to check
   *
   * @return  {boolean} return true if the `val` is an `ArrayBuffer` object else false
   */
  function isArrayBuffer(val) {
    return isObjectLike(val) && nativeToString(val) == `[object ArrayBuffer]`
  }

  function isObjectLike(val) {
    return typeof val == "object" && val !== null;
  }

  function isObject(val) {
    let type = typeof val;
    return (type == "object" || type == "function") && val != null
  }

  function isUndefined(val) {
    return val === undefined;
  }

  function isNull(val) {
    return val === null;
  }

  function isString(val) {
    return typeof val == "string" || (isObjectLike(val) && nativeToString(val) == "[object String]");
  }


  function isNumber(val) {
    return typeof val == "number" || (isObjectLike(val) && nativeToString(val) == "[object Number]");
  }

  function isBoolean(val) {
    return typeof val == "boolean" || (isObjectLike(val) && nativeToString(val) == "[object Boolean]");
  }

  function isFunction(val) {
    return typeof val == "function"
  }

  function isArray(val) {
    return Array.isArray(val);
  }

  function isNil(val) {
    return val == undefined;
  }

  function isNaN(val) {
    return isNumber(val) && val !== +val;
  }

  function isFinite(val) {
    return Number.isFinite(val);
  }




  function forOwn(obj, iterator) {
    let hasOwn = Object.prototype.hasOwnProperty;
    for (let key in iterator) {
      if (hasOwn.call(obj, key)) {
        iterator(obj[key], key, obj);
      }
    }
  }

  function compact(arr) {
    return arr.filter(item => item);
  }

  function chunk(arr, size = 1) {
    let res = [];
    for (let i = 0; i < arr.length;) {
      if (i + size - 1 < arr.length && size > 1) {
        let temp = [];
        let count = size;
        while (count--) {
          temp.push(arr[i]);
          i++;
        }
        res.push(temp)
      } else {
        res.push([arr[i]]);
        i++
      }
    }
    return res;
  }

  function difference(arr, ...ex) {
    return arr.filter(item => ex.every(val => !val.includes(item)));
  }

  function drop(arr, num = 1) {
    return arr.slice(num > 0 ? num : 0);
  }

  function dropRight(arr, num = 1) {
    return arr.slice(0, num <= 0 ? num.length : -num);
  }

  function findLastIndex(ary, predicate, fromIndex = -1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(ary[i])) {
        return i;
      }
    }
  }

  function flattenDepth(arr, depth = 1) {
    if (depth == 0) return arr.slice();
    let res = [];
    arr.forEach(it => {
      if (Array.isArray(it)) {
        res.push(...flattenDepth(it, depth - 1));
      } else {
        res.push(it);
      }
    })
    return res;
  }
  function flatten(arr) {
    return flattenDepth(arr, 1);
  }
  function flattenDeep(arr) {
    return flattenDepth(arr, Infinity);
  }
  function reverse(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      res[arr.length - 1 - i] = arr[i];
    }
    return res;
  }
  function join(arr, symbol) {
    return arr.reduce((res, item) => res + item + symbol, "").slice(0, -1);
  }
  function some(arr, predicate) {
    return arr.reduce(function (res, item) {
      return res || predicate(item);
    }, false)
  }
  function every(arr, predicate) {
    return !some(arr, function (it) {
      return !predicate(it);
    })
  }

  function forEach(obj, action) {
    for (let key in obj) {
      if (action(obj[key], key, obj) == false) {
        break;
      }
    }
  }
  function countBy(obj, f) {
    let map = {};
    forEach(obj, function (val) {
      let key = f(val);
      if (key in map) {
        map[key]++;
      } else {
        map[key] = 1;
      }
    })
    return map;
  }
  function filter(obj, f) {
    let res = [];
    forEach(obj, function (val, key, obj) {
      if (f(val, key, obj)) {
        res.push(val);
      }
    })
    return res;
  }
  function find(arr, f, from = 0) {
    for (let i = from; i < arr.length; i++) {

    }
  }
  function curry(f) {
    if (f.length == 0) return f();
    return function (...arg) {
      return curry(f.bind(null, ...arg));
    }
  }
  function spread(f) {
    return function (arr) {
      return f(...arr);
    }
  }
  function negate(f) {
    return function (...arg) {
      return !f(...arg);
    }
  }
  function flip(f) {
    return function (...arg) {
      return f(...arg.reverse());
    }
  }
  function before(n, f) {
    let result;
    let times = 0;
    return function (...arg) {
      if (times < n) {
        return result = f(...arg);
      } else {
        return result;
      }
    }
  }
  function after(n, ...arg) {
    let times = 0;
    return function (...arg) {
      if (times < n) {
        return
      } else {
        return f(...arg);
      }
    }
  }
  function ary(f, n = f.length) {
    return function (...arg) {
      return f(...arg.slice(0, n));
    }
  }
  function unary(f) {
    return ary(f, 1);
  }
  function memerize(f) {
    let cashe = {};
    return function (...arg) {
      if (arg in cashe) {
        return cashe[arg];
      } else {
        return cashe[arg] = f(...arg);
      }
    }
  }
  function keyBy(collec, identity) {
    let map = {};
    for (let key in collec) {
      let item = collec[key];
      if (typeof identity == "String") {
        map[item[identity]] = item;
      } else {
        map[identity(item)] = item;
      }
    }
    return map;
  }
  function property(propname) {
    return function (obj) {
      return obj[propname];
    }
  } // property => propname => obj => obj[propname];
}();