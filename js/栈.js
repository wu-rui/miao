let previousLess = [];

let stack = [];
for (let i = 0; i < nums.length; i++) { 
  while (!stack.length && nums[stack[stack.length - 1]] > nums[i]) { 
    stack.pop();
  }
  previousLess[i] = stack.length ? stack[stack.length - 1] : -1;
  stack.push(i);
}
//nextLess[i] = j 代表A[j] 是A[i]的NLE的index。
//nextLess[i] = -1 代表A[i]没有NLE。
let nextLess = [];
let nums = [2, 6, 4, 3, 8];
let stack = [];
for (let i = 0; i < nums.length; i++) { 
  nextLess[i] = -1;
}
for (let i = 0; i < nums.length; i++) { 
  while (stack.length && nums[stack[stack.length - 1]] > nums[i]) { 
    nextLess[stack[stack.length - 1]] = i;
    stack.pop();
  }
  stack.push(i);
}

var sumSubarrayMins = function (arr) {
  let stackP = [];
  let stackN = [];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) { 
    left[i] = 1;
    right[i] = arr.length - i ;
  }
  for (let i = 0; i < arr.length; i++) { 
    while (stackP.length && arr[stackP[stackP.length - 1]] > arr[i]) { 
      stackP.pop();
    }
    left[i] = stackP.length ? i - stackP[stackP.length - 1] : i + 1;
    stackP.push(i);
  }
  for (let i = 0; i < arr.length; i++) { 
    while (stackN.length && arr[stackN[stackN.length - 1]] > arr[i]) {
      right[stackN[stackN.length - 1]] = i - stackN[stackN.length - 1];
      stackN.pop();
    }
    stackN.push(i);
  }
  let sum = 0;
  let mod = 1e9 + 7;
  for (let i = 0; i < arr.length; i++) { 
    sum = (sum + arr[i] * left[i] * right[i]) % mod;
  }
  return sum;
};