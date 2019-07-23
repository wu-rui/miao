var huntye1 = function () {
  return {
    compact, chunk, difference, drop, dropRight, findLastIndex, flattenDepth, flatten, flattenDeep, reverse, join, some, every, forEach, countBy, filter, find, curry, spread, negate, flip, before, after, ary, unary, memerize, keyBy, property, forOwn, isArray, isFunction, isFinite, isNaN, isNumber, isNull, isNil, isObject, isUndefined,
    isString, isBoolean, isObjectLike, isArguments, isArrayBuffer, isArrayLike, isArrayLikeObject, isDate, isPlainObject, isElement, isEmpty, isEqual, isEqualWith, isError, isInteger, nativeToString, isSet, isMap, isMatch, isMatchWith, isLength, isRegExp, isSafeInteger, isSymbol, isWeakSet, isWeakMap
  }
  function isWeakSet(val) {
    return isObjectLike(val) && nativeToString(val) == `[object WeakSet]`
  }
  function isWeakMap(val) {
    return isObjectLike(val) && nativeToString(val) == `[object WeakMap]`
  }

  function isSymbol(val) {
    return typeof val == "symbol";
  }

  function isSafeInteger(val) {
    return Number.isSafeInteger(val);
  }
  /**
   * check the val is RegExp type
   *
   * @param   {*}  val  the val to check
   *
   * @return  {boolean}       return true if the val is RegExp type else false
   */
  function isRegExp(val) {
    return isObjectLike(val) && nativeToString(val) == `[object RegExp]`;
  }

  function isMatchWith(obj, src, customizer) {

    for (let k in src) {
      if (k in obj) {
        let res = customizer(obj[k], src[k]);
        if (res !== undefined) {
          return res;
        }
      }
    }
    for (let k in obj) {
      if (isObjectLike(obj[k]) && isMatch(obj[k], src)) {
        return true
      }
    }
    return false;
  }

  /**
   * check the val is a invalid array length
   *
   * @param   {*}  val  the val to check
   *
   * @return  {boolean}       return tre if the val is valid length of array else false
   */
  function isLength(val) {
    if (isNumber(val)) { 
      return val <= Number.MAX_SAFE_INTEGER && val >= 0
    }
    return false;
  }

  /**
   * performs a partial deep comparison between object and source to determin if object contains equivalent property values
   *
   * @param   {object}  obj  The object to inspect.
   * @param   {object}  src  The object of property values to match.
   *
   * @return  {[type]}      Returns true if object is a match, else false.
   */
  function isMatch(obj, src) {
    if (isEqual(obj, src)) {
      return true;
    }
    for (let k in src) {
      if (k in obj) {
        return isEqual(obj[k], src[k]);
      }
    }
    for (let k in obj) {
      if (isObjectLike(obj[k]) && isMatch(obj[k], src)) {
        return true
      }
    }
    return false;
  }

  /**
   * check if the val is set object
   *
   * @param   {*}  val  the val to check
   *
   * @return  {boolean}   return true if the val is set object else false
   */
  function isSet(val) {
    return isObjectLike(val) && nativeToString(val) == "[object Set]";
  }
  /**
   * check if the val is map object
   *
   * @param   {*}  val  the val to check
   *
   * @return  {boolean}   return true if the val is map object else false
   */
  function isMap(val) {
    return isObjectLike(val) && nativeToString(val) == "[object Map]";
  }
  /**
   * return true if the val is integer
   *
   * @param   {*}  val  the val to check
   *
   * @return  {boolean}       return true if the val is integer
   */
  function isInteger(val) {
    return Number.isInteger(val);
  }
  /**
   * return true if the val is type of error
   *
   * @param   {*}  val  the val to check
   *
   * @return  {boolean}       return true if the val is type of error
   */
  function isError(val) {
    return val instanceof Error;
  }
  function isEqualWith(val, other, customizer) {
    if (customizer == undefined) {
      return isEqual(val, other);
    }
    let res = customizer(val, other);
    if (res == undefined) {
      for (let k in val) {
        if (customizer(val[k], other[k])) {
          return true; // 不是很懂 not exacly clear
        }
      }
      return false;
    }
    return res;
  }
  /**
   * deepcompare `val` and  `ohter` is equal. 无法判断包装类型且只能深对比类对象
   *
   * @param   {*}  val    the val to compare
   * @param   {*}  other  the other val to compare
   *
   * @return  {boolean}   return true if two vals are deepEqual else false;
   */
  function isEqual(val, other) {
    if (val === other) {
      return true // 无法判断包装类型；
    }
    if (isNaN(val) && isNaN(other)) {
      return true;
    }
    // deepcompare
    if (isObjectLike(val) && isObjectLike(other)) {
      let k1 = 0, k2 = 0;
      for (let k in val) {
        k1++;
      }
      for (let k in other) {
        k2++;
      }
      if (k1 !== k2) {
        return false;
      }
      for (let k in val) {
        if (!isEqual(val[k], other[k])) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  function isEmpty(val) {
    if (val == null) {
      return true;
    }
    if (isArrayLike(val) && val.length == 0) {
      return true;
    }
    let tag = nativeToString(val);
    if (tag == `[object Set]` || tag == `[object Map]`) {
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
    return !isNil(val) && isLength(val.length) && !isFunction(val) && isObjectLike(val);
  }

  /**
   * to check the `val` is `arraylike`
   *
   * @param   {*}  val  the val to check
   *
   * @return  {boolean}   return true if the the `val` is `arraylike` else return false;
   */
  function isArrayLike(val) {
    return !isNil(val) && isLength(val.length) && !isFunction(val);
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
      arg = arg.filter(it => isFunction(it));
      arg = arg.filter(it => it != "_"); // 占位符？？就是这么难受
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