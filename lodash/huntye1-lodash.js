var huntye1 = {
  compact: function compact (arr) { 
    return arr.filter(item => item);
  },

  chunck: function chunck (arr,size = 1) { 
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
        res.push(arr[i]);
        i++
      }
    }
    return res;
  },

  difference: function difference(arr, ...ex) { 
    return arr.filter(item => ex.every(val => !val.includes(item)));
  },

}