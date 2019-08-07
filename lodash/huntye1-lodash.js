var huntye1 = function () {
  return {
    compact, chunk, difference, drop, dropRight, flattenDepth, flatten, flattenDeep, reverse, join, some, every, forEach, countBy, filter, curry, spread, negate, flip, before, after, ary, unary, memerize, keyBy, property, forOwn, isArray, isFunction, isFinite, isNaN, isNumber, isNull, isNil, isObject, isUndefined,
    isString, isBoolean, isObjectLike, isArguments, isArrayBuffer, isArrayLike, isArrayLikeObject, isDate, isPlainObject, isElement, isEmpty, isEqual, isEqualWith, isError, isInteger, nativeToString, isSet, isMap, isMatch, isMatchWith, isLength, isRegExp, isSafeInteger, isSymbol, isWeakSet, isWeakMap, differenceBy, differenceWith, bindAll, range, dropWhile, dropRightWhile, forEach, fill, findIndex, identity, findLastIndex, toPairs, fromPairs, head, indexOf, initial, intersection, intersectionBy, intersectionWith, last, lastIndexOf
    , nth, pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, slice, sortedIndex, sortedIndexBy, sortedIndexOf
    , sortedLastIndex, sortedLastIndexBy, sortedLastIndexOf, sortedUniq, sortedUniqBy, tail, take, takeRight, takeWhile, takeRightWhile, union, unionBy, unionWith, iteratee, toPath, get,
    property, matchesProperty, forOwnRight
  }


  // function compose(funcs) {
  //   return function (val) {
  //     for (let i = 0; i < funcs.length; i++) {
  //       val = funcs[i](val);
  //     }
  //     return val;
  //   }
  // }



  function matches(val) {
    return function (obj) {
      return isMatch(val, obj);
    }
  }

  function matchesProperty(path, val) {
    return function (obj) {
      return isEqual(get(obj, path), val);
    }
  }

  function property(path) {
    return function (obj) {
      return get(obj, path);
    }
  }

  function get(obj, path, defaultVal) {
    if (isString(path)) {
      path = toPath(path);
    }
    for (let i = 0; i < path.length; i++) {
      if (obj == undefined) {
        return defaultVal;
      }
      obj = obj[path[i]];
    }
    return obj;
  }

  function toPath(val) {
    return val.split(/\.|\[|\]\./g)
  }

  function iteratee(val) {
    if (isString(val)) {
      return property(val)
    }
    if (isArray(val)) {
      return matchesProperty(val[0], val[1])
    }
    if (isObjectLike(val)) {
      return matches(val)
    }
    return val
  }


  function unionWith(...arrs) {
    let comparator;
    if (!isArray(arrs[arrs.length - 1])) {
      comparator = arrs[arrs.length - 1];
      arrs = arrs.slice(0, -1);
    }
    let res = arrs[0];
    arrs = flatten(arrs.slice(1));
    for (let i = 0; i < arrs.length; i++) {
      let isFound = false;
      for (let j = 0; j < res.length; j++) {
        if (comparator(arrs[i], res[j])) {
          isFound = true;
          break;
        }
      }
      if (!isFound) {
        res.push(arrs[i]);
      }
    }
    return res;
  }

  function unionBy(...arrs) {
    let predicate = identity;
    if (!isArray(arrs[arrs.length - 1])) {
      predicate = arrs[arrs.length - 1];
      arrs = arrs.slice(0, -1);
    }
    let res = arrs[0];
    arrs = flatten(arrs.slice(1));
    predicate = iteratee(predicate);
    for (let i = 0; i < arrs.length; i++) {
      let isFound = false;
      for (let j = 0; j < res.length; j++) {
        if (predicate(arrs[i], i, arrs) == predicate(res[j], j, res)) {
          isFound = true;
          break;
        }
      }
      if (!isFound) {
        res.push(arrs[i]);
      }
    }
    return res;
  }

  function union(...arrs) {
    return Array.from(new Set(flatten(arrs)));
  }

  function takeWhile(arr, predicate = identity) {
    let res = [];
    predicate = iteratee(predicate);
    for (let i = 0; i < arr.length; i++) {
      if (predicate(arr[i], i, arr)) {
        res.push(arr[i]);
      } else {
        break;
      }
    }
    return res;
  }

  function takeRightWhile(arr, predicate = identity) {
    let res = [];
    predicate = iteratee(predicate);
    for (let i = arr.length - 1; i >= 0; i--) {
      if (predicate(arr[i], i, arr)) {
        res.unshift(arr[i]);
      } else {
        break;
      }
    }
    return res;
  }

  function takeRight(arr, n = 1) {
    if (n == 0) return [];
    return arr.slice(-n, arr.length)
  }

  function take(arr, n = 1) {
    return arr.slice(0, n);
  }

  function tail(arr) {
    return arr.length ? arr.slice(1) : [];
  }

  function sortedUniqBy(arr, predicate = identity) {
    let res = [];
    predicate = iteratee(predicate);
    for (let i = 0, j = -1; i < arr.length; i++) {
      if (predicate(arr[i]) !== predicate(res[j])) {
        res.push(arr[i]);
        j++;
      }
    }
    return res;
  }

  function sortedUniq(arr) {
    let res = [];
    for (let i = 0, j = -1; i < arr.length; i++) {
      if (arr[i] !== res[j]) {
        res.push(arr[i]);
        j++;
      }
    }
    return res;
  }

  function sortedLastIndexOf(arr, val) {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
      let mid = start + end >> 1;
      if (arr[mid] == val) {
        while (arr[mid + 1] == val) {
          mid++;
        }
        return mid;
      }
      if (arr[mid] > val) {
        end = mid - 1;
      }
      if (arr[mid] < val) {
        start = mid + 1;
      }
    }
    return -1;
  }

  function sortedLastIndexBy(arr, val, predicate = identity) {
    if (arr.length == 0) {
      return 0;
    }
    let start = 0;
    let end = arr.length - 1;
    predicate = iteratee(predicate);
    val = predicate(val);
    while (start <= end) {
      if (val < predicate(arr[start])) {
        return start;
      }
      if (val > predicate(arr[end])) {
        return end + 1;
      }
      if (end - start == 1) {
        return end;
      }
      let mid = (start + end) >> 1;
      if (predicate(arr[mid]) > val) {
        end = mid;
      } else if (predicate(arr[mid]) < val) {
        start = mid;
      } else {
        while (predicate(arr[mid + 1]) == val) {
          mid++;
        }
        return mid;
      }
    }
  }

  function sortedLastIndex(arr, val) {
    if (arr.length == 0) {
      return 0;
    }
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
      if (val < arr[start]) {
        return start;
      }
      if (val > arr[end]) {
        return end + 1;
      }
      if (end - start == 1) {
        return end;
      }
      let mid = (start + end) >> 1;
      if (arr[mid] > val) {
        end = mid;
      } else if (arr[mid] < val) {
        start = mid;
      } else {
        while (arr[mid + 1] == val) {
          mid++;
        }
        return mid + 1;
      }

    }
  }

  function sortedIndexOf(arr, val) {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
      let mid = start + end >> 1;
      if (arr[mid] == val) {
        while (arr[mid - 1] == val) {
          mid--;
        }
        return mid;
      }
      if (arr[mid] > val) {
        end = mid - 1;
      }
      if (arr[mid] < val) {
        start = mid + 1;
      }
    }
    return -1;
  }

  function sortedIndexBy(arr, val, predicate = identity) {
    if (arr.length == 0) {
      return 0;
    }
    let start = 0;
    let end = arr.length - 1;
    predicate = iteratee(predicate);
    val = predicate(val);
    while (start <= end) {
      if (val <= predicate(arr[start])) {
        return start;
      }
      if (val > predicate(arr[end])) {
        return end + 1;
      }
      if (end - start == 1) {
        return end;
      }
      let mid = (start + end) >> 1;
      if (predicate(arr[mid]) > val) {
        end = mid;
      } else if (predicate(arr[mid]) < val) {
        start = mid;
      } else {
        while (predicate(arr[mid - 1]) == val) {
          mid--;
        }
        return mid;
      }
    }
  }

  function sortedIndex(arr, val) {
    if (arr.length == 0) {
      return 0;
    }
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
      if (val <= arr[start]) {
        return start;
      }
      if (val > arr[end]) {
        return end + 1;
      }
      if (end - start == 1) {
        return end;
      }
      let mid = (start + end) >> 1;
      if (arr[mid] > val) {
        end = mid;
      } else if (arr[mid] < val) {
        start = mid;
      } else {
        while (arr[mid - 1] == val) {
          mid--;
        }
        return mid;
      }
    }
  }

  function slice(arr, start = 0, end = arr.length) {
    return arr.slice(start, end);
  }

  function remove(arr, predicate = identity) {
    let pulled = [];
    arr.forEach(it => {
      if (predicate(it)) {
        pulled.push(it);
      }
    })
    pullAll(arr, pulled);
    return pulled;
  }

  function pullAt(arr, idxs) {
    let pulled = [];
    idxs.forEach(i => {
      pulled.push(arr[i]);
    })
    pullAll(arr, pulled);
    return pulled;
  }

  function pullAllWith(arr, vals, comparator = isEqual) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < vals.length; j++) {
        if (comparator(arr[i], vals[j])) {
          arr.splice(i, 1);
          i--;
          break;
        }
      }
    }
    return arr;
  }

  function pullAllBy(arr, vals, predicate = identity) {
    predicate = iteratee(predicate);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < vals.length; j++) {
        if (predicate(arr[i]) === predicate(vals[j])) {
          arr.splice(i, 1);
          i--;
          break;
        }
      }
    }
    return arr;
  }

  function pullAll(arr, vals) {
    return pull(arr, ...vals);
  }

  function pull(arr, ...vals) {
    for (let i = 0; i < arr.length; i++) {
      if (vals.includes(arr[i])) {
        arr.splice(i, 1);
        i--;
      }
    }
    return arr;
  }

  function nth(arr, n) {
    return n >= 0 ? arr[n] : arr[arr.length + n];
  }

  function lastIndexOf(arr, val, from = arr.length - 1) {
    for (let i = from; i >= 0; i--) {
      if (arr[i] == val) {
        return i;
      }
    }
    return -1;
  }

  function last(arr) {
    return arr[arr.length - 1];
  }

  function intersectionWith(arr, ...args) {
    let comparator = args.pop();
    args = flatten(args);
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < args.length; j++) {
        if (comparator(arr[i], args[j])) {
          res.push(arr[i]);
          break;
        }
      }
    }
    return res;
  }

  function intersectionBy(arr, ...args) {
    let predicate;
    if (!isArray(args[args.length - 1])) {
      predicate = args.pop();
    }
    if (predicate == undefined) {
      predicate = identity;
    }
    predicate = iteratee(predicate);
    args = flatten(args);
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < args.length; j++) {
        if (predicate(arr[i]) === predicate(args[j])) {
          res.push(arr[i]);
          break;
        }
      }
    }
    return res;
  }

  function intersection(arr, ...args) {
    args = flatten(args);
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < args.length; j++) {
        if (arr[i] === args[j]) {
          res.push(arr[i]);
          break;
        }
      }
    }
    return res;
  }

  function initial(arr) {
    return arr.length > 1 ? arr.slice(0, -1) : [];
  }

  function indexOf(array, val, from = 0) {
    from = from >= 0 ? from : array.length + from;
    for (let i = from; i < array.length; i++) {
      if (val === array[i]) {
        return i;
      }
    }
    return -1;
  }

  function head(arr) {
    return arr.length ? arr[0] : undefined;
  }
  function fromPairs(pairs) {
    let obj = {};
    for (let [key, val] of pairs) {
      obj[key] = val;
    }
    return obj;
  }
  function toPairs(obj) {
    let res = [];
    for (let [key, val] of Object.entries(obj)) {
      res.push([key, val]);
    }
    return res;
  }

  function findLastIndex(arr, predicate = identity, start = arr.length - 1) {
    predicate = iteratee(predicate);
    for (let i = start; i >= 0; i--) {
      if (predicate(arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  }

  function findIndex(arr, predicate = identity, start = 0) {
    predicate = iteratee(predicate);
    for (let i = start; i < arr.length; i++) {
      if (predicate(arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  }

  function identity(...arg) {
    return arg[0];
  }

  function fill(array, val, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = val;
    }
    return array;
  }

  function dropWhile(array, predicate = identity) {
    predicate = iteratee(predicate);
    let res = array.slice();
    for (let i = 0; i < array.length; i++) {
      if (!predicate(array[i], i, array)) {
        break;
      }
      res.shift();
    }
    return res;
  }

  function forEach(array, action) {
    for (let i = 0; i < array.length; i++) {
      if (action(array[i], i, array) === false) {
        break;
      }
    }
  }

  function dropRightWhile(array, predicate) {
    predicate = iteratee(predicate);
    let res = array.slice();
    for (let i = array.length - 1; i >= 0; i--) {
      if (!predicate(array[i], i, array)) {
        break;
      }
      res.pop();
    }
    return res;
  }



  function range(start, end, step = 1) {
    let res = [];
    if (end == undefined) {
      end = start;
      start = 0;
      step = end < 0 ? -1 : 1;
    }
    let gap = Math.abs(start - end);
    while (compare(start, end, step)) {
      res.push(start);
      start += step;
    }
    return res;
    function compare(start, end, step) {
      if (step > 0) {
        return start < end;
      } else if (step < 0) {
        return start > end;
      } else {
        return gap--;
      }
    }
  }

  function bindAll(obj, methodNames) {
    methodNames.forEach(methodName =>
      obj[methodName] = obj[methodName].bind(obj));
  }

  function difference(arr, ...ex) {
    return arr.filter(item => ex.every(val => !val.includes(item)));
  }

  function differenceWith(arr, ...vals) {
    let comparator = iteratee(vals.pop());
    let res = [];
    vals = flatten(vals);
    for (let i = 0; i < arr.length; i++) {
      let findSame = false;
      for (let j = 0; j < vals.length; j++) {
        if (comparator(arr[i], vals[j])) {
          findSame = true;
          break;
        }
      }
      if (!findSame) {
        res.push(arr[i]);
      }
    }
    return res;
  }

  function differenceBy(arr, ...vals) {
    let predicate;
    if (!isArray(vals[vals.length - 1])) {
      predicate = iteratee(vals.pop());
    }
    if (predicate == undefined) {
      predicate = identity;
    }
    let res = [];
    vals = flatten(vals);
    for (let i = 0; i < arr.length; i++) {
      let findSame = false;
      for (let j = 0; j < vals.length; j++) {
        if (predicate(arr[i]) === predicate(vals[j])) {
          findSame = true;
          break;
        }
      }
      if (!findSame) {
        res.push(arr[i]);
      }
    }
    return res;
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
    if (obj === src) {
      return true;
    }
    if (obj == undefined) {
      return false;
    }
    for (let key of Object.keys(src)) {
      if (isObjectLike(src[key])) {
        if (!isMatch(obj[key], src[key])) {
          return false;
        }
      } else {
        if (!customizer(obj[key], src[key], key, obj, src)) {
          return false;
        }
      }
    }
    return true;
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
      return val <= Number.MAX_SAFE_INTEGER && val >= 0 && isInteger(val);
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
    if (obj === src) {
      return true;
    }
    if (obj == undefined) {
      return false;
    }
    for (let key of Object.keys(src)) {
      if (isObjectLike(src[key])) {
        if (!isMatch(obj[key], src[key])) {
          return false;
        }
      } else {
        if (obj[key] != src[key]) {
          return false;
        }
      }
    }
    return true;
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




  function forOwn(obj, predicate = identity) {
    predicate = iteratee(predicate);
    for (let key of Object.keys(obj)) {
      predicate(obj[key],key);
    }
  }

  function forOwnRight(obj, predicate = identity) {
    predicate = iteratee(predicate);
    let keys = Object.keys(obj).reverse();
    for (let key of keys) {
      predicate(obj[key], key);
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



  function drop(arr, num = 1) {
    return arr.slice(num > 0 ? num : 0);
  }

  function dropRight(arr, num = 1) {
    return arr.slice(0, num <= 0 ? num.length : -num);
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
    redicate = iteratee(predicate);
    return arr.reduce(function (res, item) {
      return res || predicate(item);
    }, false)
  }

  function every(arr, predicate) {
    predicate = iteratee(predicate);
    return arr.reduce((res, cur) => {
      return res && predicate(cur)
    }, true)
  }

  function forEach(obj, action) {
    for (let key in obj) {
      if (action(obj[key], key, obj) == false) {
        break;
      }
    }
  }
  function countBy(obj, predicate) {
    let map = {};
    predicate = iteratee(predicate);
    forEach(obj, function (val) {
      let key = predicate(val);
      if (key in map) {
        map[key]++;
      } else {
        map[key] = 1;
      }
    })
    return map;
  }
  function filter(obj, predicate) {
    predicate = iteratee(predicate);
    let res = [];
    forEach(obj, function (val, idx, arr) {
      if (predicate(val, idx, arr)) {
        res.push(val);
      }
    })
    return res;
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
  function keyBy(collec, predicate = identity) {
    predicate = iteratee(predicate);
    let map = {};
    for (let key in Object.keys(collec)) {
      let item = collec[key];
      let newkey = predicate(item, key, collec)
      map[newkey] = collec[key];
    }
    return map;
  }
  function property(propname) {
    return function (obj) {
      return obj[propname];
    }
  } // property => propname => obj => obj[propname];
}();
// var _ = huntye1;