var huntye1 = {
  compact: function compact (arr) { 
    return arr.filter(item => item);
  },

  chunk: function chunk (arr,size = 1) { 
    let res = [];
    for (let i = 0; i < arr.length; ) { 
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
    return arr.slice(num);
  },

  dropRight: function dropRight(arr, num = 1) {
    return arr.slice(0,-num);
  }
  
}