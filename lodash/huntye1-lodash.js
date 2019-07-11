var huntye1 = {
  compact: function compact(arr) {
    return arr.filter(item => item);
  },

  chunk: function chunk(arr, size = 1) {
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
  },

  difference: function difference(arr, ...ex) {
    return arr.filter(item => ex.every(val => !val.includes(item)));
  },

  drop: function drop(arr, num = 1) {
    return arr.slice(num > 0 ? nums : 0);
  },

  dropRight: function dropRight(arr, num = 1) {
    return arr.slice(0, num <= 0 ? num.length : -num);
  }

  , fill: function fill(ary, ...arg) {
    return ary.fill(...arg);
  }

  , find: function find(ary, ...arg) {
    return ary.find(...arg);
  }

  , findIndex: function findIndex(ary, ...arg) {
    return ary.findindex(...arg);
  }

  , findLastIndex: function findLastIndex(ary, predicate, fromIndex = -1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(ary[i])) {
        return;
      }
    }
  }
  , flatten: function flatten(arr) {
    let res = [];
    arr.forEach(ele => Array.isArray(ele) ? ele.forEach(it => res.push(it)) : res.push(ele));
    return res;
  }
  , flattenDeep: function flattenDeep(arr) {
    let res = [];
    arr.forEach(ele => Array.isArray(ele) ? res.push(...huntye1.flattenDeep(ele)) : res.push(ele));
    return res;
  }
  , flattenDepth: function flattenDepth(arr, depth = 1) {
    let res;
    for (let i = 0; i < depth; i++) {
      res = [];
      let flatten = true;
      arr.forEach(ele => {
        if (Array.isArray(ele)) {
          ele.forEach(it => res.push(it));
          flatten = false;
        } else {
          res.push(ele);
        }
      })
      if (flatten) {
        break;
      }
      arr = res;
    }
    return res;
  }
}