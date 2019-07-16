var huntye1 = {
  compact: function compact(arr) {
    return arr.filter(item => item);
  }
  , chunk: function chunk(arr, size = 1) {
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

  , difference: function difference(arr, ...ex) {
    return arr.filter(item => ex.every(val => !val.includes(item)));
  }

  , drop: function drop(arr, num = 1) {
    return arr.slice(num > 0 ? num : 0);
  }

  , dropRight: function dropRight(arr, num = 1) {
    return arr.slice(0, num <= 0 ? num.length : -num);
  }

  , findLastIndex: function findLastIndex(ary, predicate, fromIndex = -1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(ary[i])) {
        return;
      }
    }
  }
  , flattenDepth: function flattenDepth(arr, depth = 1) {
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
  , flatten: function flatten(arr) {
    return huntye1.flattenDepth(arr, 1);
  }
  , flattenDeep: function flattenDeep(arr) {
    return huntye1.flattenDepth(arr, Infinity);
  }
  , reverse: function reverse(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      res[arr.length - 1 - i] = arr[i];
    }
    return res;
  }
  , join: function join(arr, symbol) {
    return arr.reduce((res, item) => res + item + symbol, "").slice(0, -1);
  }
  , some: function some(arr, predicate) {
    return arr.reduce(function (res, item) {
      return res || predicate(item);
    }, false)
  }
  , every: function every(arr, predicate) {
    return !huntye1.some(arr, function (it) {
      return !predicate(it);
    })
  }

  , forEach: function forEach(obj, action) {
    for (let key in obj) {
      if (action(obj[key], key, obj) == false) {
        break;
      }
    }
  }
  , countBy: function countBy(obj, f) {
    let map = {};
    huntye1.forEach(obj, function (val) {
      let key = f(val);
      if (key in map) {
        map[key]++;
      } else {
        map[key] = 1;
      }
    })
    return map;
  }
  , filter: function filter(obj, f) {
    let res = [];
    huntye1.forEach(obj, function (val, key, obj) {
      if (f(val, key, obj)) {
        res.push(val);
      }
    }
    )
    return res;
  }
  , find: function find(arr, f, from = 0) {
    for (let i = from; i < arr.length; i++) {

    }
  }
}