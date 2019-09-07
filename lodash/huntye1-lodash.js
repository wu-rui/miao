var huntye1 = function () {
  return {
    compact, chunk, difference, drop, dropRight, flattenDepth, flatten, flattenDeep, reverse, join, some, every, forEach, countBy, filter, curry, spread, negate, flip, before, after, ary, unary, memerize, keyBy, forOwn, isArray, isFunction, isFinite, isNaN, isNumber, isNull, isNil, isObject, isUndefined,
    isString, isBoolean, isObjectLike, isArguments, isArrayBuffer, isArrayLike, isArrayLikeObject, isDate, isPlainObject, isElement, isEmpty, isEqual, isEqualWith, isError, isInteger, nativeToString, isSet, isMap, isMatch, isMatchWith, isLength, isRegExp, isSafeInteger, isSymbol, isWeakSet, isWeakMap, differenceBy, differenceWith, bindAll, range, dropWhile, dropRightWhile, fill, findIndex, identity, findLastIndex, toPairs, fromPairs, head, indexOf, initial, intersection, intersectionBy, intersectionWith, last, lastIndexOf
    , nth, pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, slice, sortedIndex, sortedIndexBy, sortedIndexOf
    , sortedLastIndex, sortedLastIndexBy, sortedLastIndexOf, sortedUniq, sortedUniqBy, tail, take, takeRight, takeWhile, takeRightWhile, union, unionBy, unionWith, iteratee, toPath, get,
    property, matchesProperty, forOwnRight, uniq, uniqWith, uniqBy, zip, unzip, unzipWith, add, without, xor, xorBy, xorWith, zipObject, zipObjectDeep, zipWith, baseSet, find, findLast, flatMap, flatMapDeep, flatMapDepth, forEachRight, groupBy, invokeMap, includes, map, toCompareFunc, orderBy, sortBy, partition, reduce, reduceRight, reject, sample, sampleSize, shuffle, size, defer, delay, castArray, conforms, conformsTo, eq, gte, gt, isNative, lt, lte, toArray, ceil, divide, floor
    , assign, max, maxBy, min, minBy, mean, meanBy, sum, sumBy, multiply, round, clamp, inRange, random, defaults, findKey, findLastKey, forIn, forInRight, functions, constant, functionsIn, has, create, hasIn
  }


  // function compose(funcs) {
  //   return function (val) {
  //     for (let i = 0; i < funcs.length; i++) {
  //       val = funcs[i](val);
  //     }
  //     return val;
  //   }
  // }

  function create(prototype, property = {}) { 
    let F = function () { };
    F.prototype = prototype;
    f = new F();
    assign(f, property);
    return f;
  }

  function constant(val) { 
    return function () { 
      return val;
    }
  }

  function functionsIn(obj) {
    let res = [];
    forIn(obj, (v, k) => {
      if (isFunction(v)) {
        res.push(k);
      }
    })
    return res;
  }

  function functions(obj) { 
    let res = [];
    forOwn(obj, (v, k) => { 
      if (isFunction(v)) { 
        res.push(k);
      }
    })
    return res;
  }

  function forInRight(obj, fn = identity) {
    let keys = [];
    forIn(obj, (v,k) => {
      keys.push(k);
    });
    console.log(keys);
    keys.reverse();
    forEach(keys, k => { 
      fn(obj[k], k, obj);
    })
   }

  function forIn(obj,fn = identity) { 
    fn = iteratee(fn);
    for (let k in obj) { 
      if (fn(obj[k], k,obj) == false){ 
        break;
      }
    }
  }

  function findLastKey(obj, fn = identity) {
    fn = iteratee(fn);
    let keys = Object.keys(obj).reverse();
    for (let key of keys) {
      if (fn(obj[key])) {
        return key
      }
    }
  }

  function findKey(obj, fn = identity) {
    fn = iteratee(fn);
    for (let key of Object.keys(obj)) {
      if (fn(obj[key])) {
        return key
      }
    }
  }

  function defaults(obj, ...src) {
    src.forEach(s => {
      for (let [k, v] of Object.entries(s)) {
        if (!obj.hasOwnProperty(k)) {
          obj[k] = v;
        }
      }
    })
    return obj;
  }

  function random(lower, upper, floating) {
    if (arguments.length == 0) {
      lower = 0;
      upper = 1;
    }
    if (arguments.length == 1) {
      upper = lower;
      lower = 0;
    }
    if (arguments.length == 2) {
      if (isBoolean(upper)) {
        floating = upper;
        upper = lower
        lower = 0;
      }
    }
    if (floating == undefined) {
      if (isInteger(upper) && isInteger(lower)) {
        floating = false;
      } else {
        floating = true;
      }
    }
    if (lower > upper) {
      let t = start;
      start = end;
      end = t;
    }
    if (!floating) {
      return Math.floor(Math.random() * (upper - lower + 1) + lower);
    } else {
      return Math.random() * (upper - lower) + lower;
    }
  }

  function inRange(number, start = 0, end) {
    if (arguments.length == 2) {
      end = start;
      start = 0;
    }

    if (start > end) {
      let t = start;
      start = end;
      end = t;
    }

    if (number >= start && number < end) {
      return true;
    } else {
      return false;
    }

  }

  function clamp(num, lower, upper) {
    if (arguments.length == 2) {
      upper = lower;
      return num < upper ? num : upper;
    } else {
      if (num < lower) {
        return lower;
      }
      if (num > upper) {
        return upper;
      }
      return num;
    }
  }

  function multiply(a, b) {
    return a * b;
  }

  function sumBy(arr, fn = identity) {
    fn = iteratee(fn);
    return arr.reduce((pre, cur) => pre + fn(cur));
  }

  function sum(arr) {
    return arr.reduce((pre, cur) => pre + cur);
  }

  function meanBy(arr) {
    let sum = 0;
    return sumBy(arr) / arr.length;
  }

  function mean(arr) {
    return sum(arr) / arr.length;
  }

  function minBy(arr, fn = identity) {
    fn = iteratee(fn);
    if (isNil(arr) || isNaN(arr) || arr.length == 0) {
      return undefined;
    }
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (fn(arr[i]) < fn(min)) {
        min = arr[i];
      }
    }
    return min;
  }

  function min(arr) {
    if (isNil(arr) || isNaN(arr) || arr.length == 0) {
      return undefined;
    }
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      }
    }
    return min;
  }


  function maxBy(arr, fn = identity) {
    fn = iteratee(fn);
    if (isNil(arr) || isNaN(arr) || arr.length == 0) {
      return undefined;
    }
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (fn(arr[i]) > fn(max)) {
        max = arr[i];
      }
    }
    return max;
  }

  function max(arr) {
    if (isNil(arr) || isNaN(arr) || arr.length == 0) {
      return undefined;
    }
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }


  function assign(obj, ...src) {
    return Object.assign(obj, ...src);
  }


  function round(val, precision = 0) {
    val *= 10 ** precision;
    val = Math.round(val);
    val /= 10 ** precision;
    return val;
  }

  function floor(val, precision = 0) {
    val *= 10 ** precision;
    val = Math.floor(val);
    val /= 10 ** precision;
    return val;
  }

  function divide(divide, divisor) {
    return divide / divisor;
  }

  function ceil(val, precision = 0) {
    val *= 10 ** precision;
    val = Math.ceil(val);
    val /= 10 ** precision;
    return val;
  }

  function toArray(value) {
    let res = [];
    if (isNil(value)) return res;
    if (value.length !== undefined) {
      for (let i = 0; i < value.length; i++) {
        res.push(value[i]);
      }
    } else if (isObject(value)) {
      for (let v of Object.values(value)) {
        res.push(v);
      }
    }
    return res;
  }

  function lte(a, b) {
    return lt(a, b) || eq(a, b);
  }

  function lt(a, b) {
    return a < b;
  }

  function gte(a, b) {
    return gt(a, b) || eq(a, b);
  }

  function gt(a, b) {
    return a > b;
  }

  function eq(a, b) {
    return SameValueZero(a, b);
  }

  function conformsTo(obj, source) {
    let keys = Object.keys(source);
    for (let k of Object.keys(obj)) {
      if (keys.includes(k)) {
        if (!source[k](obj[k])) {
          return false;
        }
      }
    }
    return true;
  }

  function conforms(source) {
    let keys = Object.keys(source);
    return function (obj) {
      for (let k of Object.keys(obj)) {
        if (keys.includes(k)) {
          if (!source[k](obj[k])) {
            return false;
          }
        }
      }
      return true;
    }
  }

  function castArray(val) {
    if (arguments.length == 0) {
      return [];
    } else if (isArray(val)) {
      return val;
    } else {
      return [val];
    }
  }

  function delay(func, wait, ...args) {
    setTimeout(() => {
      func(...args);
    }, wait)
  }

  function defer(func, ...args) {
    setTimeout(() => {
      func(...args);
    }, 1)
  }

  function size(collec) {
    return collec.length || Object.keys(collec).length;
  }

  function shuffle(collec) {
    return sampleSize(collec, n = Object.keys(collec).length);
  }

  function sampleSize(collec, n = 1) {
    let keys = Object.keys(collec);
    let idxs = new Set();
    n = Math.min(keys.length, n);
    for (let i = 0; i < n; i++) {
      while (true) {
        let randomIdx = Math.floor(keys.length * Math.random());
        if (!idxs.has(randomIdx)) {
          idxs.add(randomIdx);
          break;
        }
      }
    }
    idxs = [...idxs];
    let res = [];
    for (let idx of idxs) {
      res.push(collec[keys[idx]])
    }
    return res;
  }

  function sample(collec) {
    let keys = Object.keys(collec);
    let randomIdx = Math.floor(keys.length * Math.random());
    return collec[keys[randomIdx]];
  }

  function reject(collec, predicate = identity) {
    return filter(collec, negate(iteratee(predicate)));
  }

  function reduceRight(collec, action = identity, accumulator) {
    let entries = Object.entries(collec).reverse();
    for (let [k, v] of entries) {
      if (accumulator === undefined) {
        accumulator = v;
      } else {
        accumulator = action(accumulator, v, k, collec);
      }
    }
    return accumulator;
  }


  function reduce(collec, action = identity, accumulator) {
    for (let [k, v] of Object.entries(collec)) {
      if (accumulator === undefined) {
        accumulator = v;
      } else {
        accumulator = action(accumulator, v, k, collec);
      }
    }
    return accumulator;
  }

  function partition(collection, predicate) {
    predicate = iteratee(predicate);
    let trueArr = [];
    let falseArr = [];
    for (let val of Object.values(collection)) {
      if (predicate(val)) {
        trueArr.push(val);
      } else {
        falseArr.push(val);
      }
    }
    return [trueArr, falseArr];
  }

  function sortBy(collection, funcs) {
    return orderBy(collection, funcs);
  }

  function orderBy(collections, funcs, orders = []) {
    let compare = toCompareFunc(funcs, orders);
    return mergeSort(collections, compare);
  }

  function toCompareFunc(funcs, orders) {
    return function compare(obj1, obj2) {
      for (let i = 0; i < funcs.length; i++) {
        let f = iteratee(funcs[i]);
        let res1 = f(obj1);
        let res2 = f(obj2);
        let flag = orders[i] === "desc" ? -1 : 1;
        if (res1 > res2) {
          return flag * 1;
        } else if (res1 < res2) {
          return flag * -1;
        }
      }
      return 0;
    }
  }


  function mergeSort(arr, compare) {
    if (compare == undefined) {
      compare = function (a, b) {
        if (a > b) {
          return 1;
        } else if (a < b) {
          return 0;
        } else {
          return -1;
        }
      }
    }
    if (arr.length < 2) {
      return [...arr];
    }
    let mid = arr.length >> 1;
    let left = mergeSort(arr.slice(0, mid), compare);
    let right = mergeSort(arr.slice(mid), compare);
    return merge(left, right, compare);

    function merge(arr1, arr2, compare) {
      let res = []
      let i = 0, j = 0;
      while (i < arr1.length && j < arr2.length) {
        let compared = compare(arr1[i], arr2[j]);
        if (compared <= 0) {
          res.push(arr1[i++]); // 需要等于0 保持顺序
        } else {
          res.push(arr2[j++]);
        }
      }
      while (i < arr1.length) {
        res.push(arr1[i++]);
      }
      while (j < arr2.length) {
        res.push(arr2[j++]);
      }
      return res;
    }
  }


  function map(collection, f = identity) {
    f = iteratee(f);
    let res = [];
    for (let [k, v] of Object.entries(collection)) {
      if (!isNaN(k)) {
        k = Number(k);
      }
      res.push(f(v, k, collection));
    }
    return res;
  }

  function invokeMap(collection, path, ...args) {
    let vals = Object.values(collection);
    return vals.map(obj => {
      if (!isFunction(path)) {
        path = get(obj, path);
      }
      return path.call(obj, ...args)
    })
  }

  function includes(collection, value, from = 0) {
    if (isString(collection)) {
      return collection.includes(value, from);
    }
    let idx = 0;
    for (let val of Object.values(collection)) {
      if (idx >= from) {
        if (SameValueZero(val, value)) {
          return true;
        }
      }
      idx++;
    }
    return false;
  }

  function groupBy(collection, f = identity) {
    f = iteratee(f);
    let vals = Object.values(collection);
    let res = {};
    for (let val of vals) {
      let k = f(val);
      if (k in res) {
        res[k].push(val);
      } else {
        res[k] = [val];
      }
    }
    return res;
  }

  function forEachRight(collection, action = identity) {
    action = iteratee(action);
    let keys = Object.keys(collection).reverse();
    for (let key of keys) {
      if (action(collection[key]) === false) {
        break;
      };
    }
    return collection;
  }
  function flatMapDepth(collection, f = identity, depth = 1) {
    f = iteratee(f);
    let res = [];
    let keys = Object.keys(collection);
    for (let key of keys) {
      res.push(flattenDepth(f(collection[key]), depth));
    }
    return res;
  }

  function flatMapDeep(collection, f = identity) {
    f = iteratee(f);
    let res = [];
    let keys = Object.keys(collection);
    for (let key of keys) {
      res.push(...flattenDeep(f(collection[key])));
    }
    return res;
  }

  function flatMap(collection, f = identity) {
    f = iteratee(f);
    let res = [];
    let keys = Object.keys(collection);
    for (let key of keys) {
      res.push(...f(collection[key]));
    }
    return res;
  }

  function findLast(collection, predicate = identity, from = collection.length - 1) {
    predicate = iteratee(predicate);
    let idx = 0;
    let keys = Object.keys(collection).reverse();
    for (let key of keys) {
      if (idx <= from) {
        if (predicate(collection[key])) {
          return collection[key]
        }
      }
      idx--;
    }
  }

  function find(collection, predicate = identity, from = 0) {
    predicate = iteratee(predicate);
    let idx = 0;
    let keys = Object.keys(collection)
    for (let key of keys) {
      if (idx >= from) {
        if (predicate(collection[key])) {
          return collection[key]
        }
      }
      idx++;
    }
  }

  function SameValue(a, b) {
    return Object.is(a, b);//+0 -0 不相等 NaN相等
  }

  function SameValueZero(a, b) {
    if (isNaN(a) && isNaN(b)) { // NaN相等
      return true;
    }
    return a === b; // 不同类型不相等 
  }


  function xorWith(...arrs) {
    let comparator;
    comparator = arrs.pop();
    let res = [];
    for (let i = 0; i < arrs.length; i++) {
      let diff = arrs[i];
      for (let j = 0; j < arrs.length; j++) {
        if (i != j) {
          diff = differenceWith(diff, arrs[j], comparator);
        }
      }
      res[i] = diff;
    }
    res.push(comparator);
    return unionWith(...res);
  }

  function xorBy(...arrs) {
    let predicate = identity;
    if (!isArray(arrs[arrs.length - 1])) {
      predicate = arrs.pop();
    }
    predicate = iteratee(predicate);
    let res = [];
    for (let i = 0; i < arrs.length; i++) {
      let diff = arrs[i];
      for (let j = 0; j < arrs.length; j++) {
        if (i != j) {
          diff = differenceBy(diff, arrs[j], predicate);
        }
      }
      res[i] = diff;
    }
    res.push(predicate);
    return unionBy(...res);
  }

  function xor(...arrs) {
    let res = [];
    for (let i = 0; i < arrs.length; i++) {
      let diff = arrs[i];
      for (let j = 0; j < arrs.length; j++) {
        if (i != j) {
          diff = difference(diff, arrs[j]);
        }
      }
      res[i] = diff;
    }
    return union(...res);
  }


  function without(arr, ...vals) {
    let res = [];
    arr.forEach(it => {
      if (!vals.includes(it)) {
        res.push(it);
      }
    })
    return res;
  }

  function add(a, b) {
    return a + b;
  }

  function zipObjectDeep(paths = [], vals = []) {
    let obj = {};
    paths.forEach((path, i) => {
      if (isString(path)) {
        path = toPath(path);
      }
      baseSet(obj, path)[path.slice(-1)] = vals[i];
    });
    return obj
  }

  function baseSet(obj, path) {
    if (isString(path)) {
      path = toPath(path);
    }
    let c = path[0];
    for (let i = 1; i < path.length; i++) {
      if (obj[c]) {
        obj = obj[c];
      } else {
        if (isSingleNum(path[i])) {
          obj[c] = [];
          obj = obj[c];
        } else {
          obj[c] = {};
          obj = obj[c];
        }
      }
      c = path[i];
    }
    return obj;

    function isSingleNum(s) {
      return s.length == 1 && s <= 9 && s >= 0;
    }
  }


  function zipObject(keys = [], vals = []) {
    let obj = {};
    keys.forEach((k, i) => obj[k] = vals[i]);
    return obj;
  }

  function unzipWith(arr, predicate = identity) {
    if (predicate == undefined) {
      return unzip(arr);
    }
    predicate = iteratee(predicate);
    return arr[0].map((it, idx) => predicate(...arr.map(item => item[idx])));
  }

  function unzip(arr) {
    let res = Array(arr[0].length).fill(0).map(it => Array(arr.length));
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        res[j][i] = arr[i][j];
      }
    }
    return res;
    // return arr[0].map((it, idx) => arr.map(item => item[idx]));
  }

  function zipWith(...arrs) {
    let predicate = identity;
    if (!isArray(arrs[arrs.length - 1])) {
      predicate = arrs.pop();
    }
    predicate = iteratee(predicate);
    return arrs[0].map((it, idx) => predicate(...arrs.map(item => item[idx])));
  }

  function zip(...arrs) {
    let maxlen = arrs.reduce((max, arr) => Math.max(max, arr.length), 0);
    let res = Array(maxlen).fill(0).map(it => Array(arrs.length));
    for (let i = 0; i < maxlen; i++) {
      for (let j = 0; j < arrs.length; j++) {
        res[i][j] = arrs[j][i];
      }
    }

    return res;

  }

  function matches(val) {
    return function (obj) {
      return isMatch(obj, val);
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

  function hasIn(obj,path) { 
    if (isString(path)) { 
      path = toPath(path);
    }
    for (let i = 0; i < path.length; i++) { 
      if (obj[path[i]] == undefined) { 
        return false;
      }
      obj = obj[path[i]];
    }
    return true;
  }

  function has(obj,path) { 
    if (isString(path)) { 
      path = toPath(path);
    }
    for (let i = 0; i < path.length; i++) { 
      if (!obj.hasOwnProperty(path[i])) { 
        return false;
      }
      obj = obj[path[i]];
    }
    return true;
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
    return val.split(/\.|\[|\]\.|\]\[/g);
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


  function uniq(...arg) {
    return union(...arg);
  }
  function uniqBy(...arg) {
    return unionBy(...arg);
  }
  function uniqWith(...arg) {
    return unionWith(...arg);
  }

  function unionWith(...arrs) {
    let comparator;
    if (!isArray(arrs[arrs.length - 1])) {
      comparator = arrs[arrs.length - 1];
      arrs = arrs.slice(0, -1);
    }
    let res = [];
    arrs = flatten(arrs);
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
    let res = [];
    arrs = flatten(arrs);
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
      if (SameValueZero(arr[i], val)) {
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
      if (SameValueZero(val, array[i])) {
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

  function isNative(val) {
    return isFunction(val) && (/\{ \[native code\] \}$/).test(val.toString());
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
      predicate(obj[key], key);
    }
    return obj;
  }

  function forOwnRight(obj, predicate = identity) {
    predicate = iteratee(predicate);
    let keys = Object.keys(obj).reverse();
    for (let key of keys) {
      predicate(obj[key], key);
    }
    return obj;
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

  function some(collec, predicate = identity) {
    predicate = iteratee(predicate);
    let entries = Object.entries(collec);
    return entries.reduce(function (res, entry) {
      return res || predicate(entry[1], entry[0], collec);
    }, false)
  }

  function every(collec, predicate = identity) {
    predicate = iteratee(predicate);
    let entries = Object.entries(collec);
    return entries.reduce(function (res, entry) {
      return res && predicate(entry[1], entry[0], collec);
    }, true)
  }

  function forEach(obj, predicate = identity) {
    predicate = iteratee(predicate);
    for (let key of Object.keys(obj)) {
      if (predicate(obj[key], key, obj) == false) {
        break;
      }
    }
    return obj;
  }

  function countBy(obj, predicate) {
    let map = {};
    predicate = iteratee(predicate);
    for (let key of Object.keys(obj)) {
      let ks = predicate(obj[key], key, obj);
      if (ks in map) {
        map[ks]++;
      } else {
        map[ks] = 1;
      }
    }
    return map;
  }
  function filter(obj, predicate) {
    predicate = iteratee(predicate);
    let res = [];
    for (let key of Object.keys(obj)) {
      if (predicate(obj[key], key, obj)) {
        res.push(obj[key]);
      }
    }

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
    for (let [k, v] of Object.entries(collec)) {
      map[predicate(v)] = collec[k];
    }
    return map;
  }
}();
// var _ = huntye1;