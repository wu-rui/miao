import { truncate, lstat } from "fs";
import { deepEqual, rejects } from "assert";
import { runInNewContext } from "vm";
import { maxHeaderSize, STATUS_CODES } from "http";
import { isFunction } from "util";

var checkPerfectNumber = function (num) {
  var sum = 0;
  while (num > 0) {
    var digit = num % 10;
    var num =
      sum += digit;
    num = (num - digit) / 10;
  }
  if (num === digit) {
    return true;
  }
  return false;
};

var checkPerfectNumber = function (num) {
  var sum = 1;
  var num_sqrt = Math.floor(Math.sqrt(num));
  for (var i = 2; i <= num_sqrt; i++) {
    if (num % i === 0) {
      sum += i + num / i;
    }
  }
  if (num_sqrt * num_sqrt === num) {
    sum -= num_sqrt;
  }
  return sum === num;
}

var isUgly = function (num) {
  while (num % 2 === 0) {
    num = num / 2;
  }
  while (num % 3 === 0) {
    num = num / 3;
  }
  while (num % 5 === 0) {
    num = num / 5;
  }
  return num === 1 ? true : false;
};

var mySqrt = function (x) {
  var n = x;
  if (x < 1) {
    return 0;
  }
  for (var i = 0; i <= 20; i++) {
    n = n - (n * n - x) / (2 * n);
  }
  return n | 0;
};

var isPerfectSquare = function (num) {
  if (num === 1) {
    return true;
  }
  var left = 0;
  var right = num;

  while (1) {
    var mid = ((left + right) / 2) | 0;
    if (mid === right || mid === left) {
      return false;
    }
    if (mid * mid > num) {
      right = mid;
    } else if (mid * mid < num) {
      left = mid;
    } else {
      return true;
    }
  }
};

var getDigitSquare = function (m) {
  var sum = 0;
  while (m > 0) {
    var digit = m % 10;
    sum += digit * digit;
    m = (m - digit) / 10;
  }
  return sum;
}
var isHappy = function (n) {
  var fast = n;
  var slow = n;
  do {
    slow = getDigitSquare(slow);
    fast = getDigitSquare(getDigitSquare(fast));
  } while (slow !== fast)

  return slow == 1;

};


var isPalindrome = function (x) {
  if (x < 0) {
    return false;
  } else {
    var n = x;
    var num = 0;
    while (x > 0) {
      var digit = x % 10;
      num = num * 10 + digit;
      x = (x - digit) / 10;
    }
    return num === n;
  }
};


var isPowerOfThree = function (n) {
  if (n === 0) return false;
  while (n % 3 === 0) {
    n /= 3;

  }
  if (n === 1) {
    return true;
  }
  return false;
};

var selfDividingNumbers = function (left, right) {
  var arr = [];
  for (var i = left; i <= right; i++) {
    var isSelfDivide = 1;
    var n = i;
    while (n > 0) {
      var digit = n % 10;
      if (i % digit !== 0) {
        isSelfDivide = 0;
        break;
      };
      n = (n - digit) / 10;
    }
    if (isSelfDivide) {
      arr.push(i);
    }
  }
  return arr;
};


var convertToBase7 = function (num) {
  var sum = "";
  var sign = num > 0 ? "" : "-";
  while (num > 0) {
    var digit = num % 7;
    sum = digit + sum;
    num = (num - digit) / 7;
  }
  return sign + sum;
};

var convertToBase5 = function (num) {
  var sum = "";
  var sign = num > 0 ? "" : "-";
  while (num > 0) {
    var digit = num % 5;
    sum = digit + sum;
    num = (num - digit) / 5;
  }
  return sign + sum;
};
var addDigits = function (num) {
  var sum = 0;
  while (num > 0) {
    var digit = num % 10;
    sum += digit;
    num = (num - digit) / 10;
  }
  if (sum < 10) {
    return sum;
  } else {
    return addDigits(sum);
  }

};

var reverse = function (x) {
  if (x > 0) {
    var sign = "";
  } else {
    var sign = "-";
    x = -x;
  }
  return Number(sign + x.toString().split("").reverse().join(""));
};

var twoSum = function (nums, target) {
  var arr = [];
  for (var i = 0; i < nums.length; i++) {
    if (arr[target - nums[i]] === undefined) {
      arr[nums[i]] = i;
    } else {
      return [arr[target - nums[i]], i];
    }
  }
}
twoSum([2, 7, 11, 15], 9)

var binaryGap = function (N) {
  let max = 0;
  let count;
  while (N > 0) {
    let digit = N % 2;
    N = N >>> 1;
    if (digit === 1) {
      if (count > max) {
        max = count;
      }
      count = 0;
    }
    count++;
  }
  return max;
}

var binaryGap = function (N) {
  let max = 0;
  let count = 0;

  while (!(N & 1)) {
    N = N >>> 1;
  }
  while (N) {
    if (N & 1) {
      if (count > max) {
        max = count;
      }
      count = 0;
    }
    count++;
    N = N >>> 1;
  }
  return max;
}
var reverseBits = function (n) {
  let digit;
  let num = 0;
  for (var i = 0; i < 32; i++) {
    digit = n & 1;
    n = n >>> 1;
    num = num << 1;
    if (digit) {
      num++;
    }
    // num = num * 2 + digit;
  }
  return num;
};

var judgeSquareSum = function (c) {
  let c_sqrt = Math.floor(Math.sqrt(c));
  for (var i = 1; i <= c_sqrt; i++) {
    let j = c - i * i;
    if ((Math.sqrt(j) | 0) === Math.sqrt(j)) return true;
  }
  return false
};

var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    n &= (n - 1);
    count++;
  }
};

var moveZeroes = function (nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j] = nums[i];
      j++;
    }
  }
  while (j < nums.length) {
    nums[j] = 0;
    j++;
  }
  return nums;
};


var moveZeroes = function (nums) {
  let arr = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      arr.push(0);
      nums.splice(i--, 1);
    }
  }
  return nums = nums.concat(arr);
};

var missingNumber = function (nums) {
  let max = nums.length - 1;
  let sum = max * (max + 1) / 2
  for (var i = 0; i < max; i++) {
    sum -= max - nums[i];
  }
  return sum;
};

var plusOne = function (digits) {
  if (digits[digits.length - 1] === 9) {
    digits.pop();
    plusOne(digits).push(0);
  } else {
    digits.length ? digits[digits.length - 1]++ : digits.push(1);

  }
  return digits;
};

var findMaxConsecutiveOnes = function (nums) {
  let count = 0;
  let max = 0;
  nums.forEach(element => {
    if (element) {
      count++;
    } else {
      count = 0;
    }
    if (count > max) {
      max = count;
    }
  });
  return max;
};

var removeElement = function (nums, val) {
  let j = nums.length - 1;
  for (var i = 0; i <= j; i++) {
    if (nums[i] === val) {
      nums[i--] = nums[j--]
    }
  }
  return i;
};
var searchInsert = function (nums, target) {
  var high = nums.length - 1;
  var low = 0;
  var mid;
  while (low < high) {
    mid = ((high + low) / 2) | 0;
    if (nums[mid] > target) {
      high = mid - 1;
    } else if (nums[mid] < target) {
      low = mid + 1
    } else {
      return mid;
    }
  }
  return low;
};

var merge = function (nums1, m, nums2, n) {
  nums1.splice(m, n, ...nums2);
  return nums1.sort((a, b) => a > b ? 1 : -1);
};


var removeDuplicates = function (nums) {
  let i;
  let j = 1;
  for (i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[j] = nums[i];
      j++;
    }
  }
  return j;
};

var twoSum = function (nums, target) {
  let i = 0;
  let j = nums.length - 1;
  while (1) {
    if (nums[i] + nums[j] > target) {
      j--;
    } else if (nums[i] + nums[j] < target) {
      i++;
    } else {
      return [i - 1, j - 1];
    }
  }
};

var countBits = function (num) {
  var nums = [0];
  for (var i = 1; i <= num; i++) {
    nums[i] = nums[i & i - 1] + 1
  }
  return nums;
};

var merge = function (nums1, m, nums2, n) {
  var i = m - 1;
  var j = n - 1;
  var k = m + n - 1;
  while (j >= 0) {
    if (nums1[i] < nums2[j] | i === -1) {
      nums1[k--] = nums2[j--];
    } else {
      nums1[k--] = nums1[i--];
    }
  }
};

var addStrings = function (a, b) {
  var a = parseInt(a, 10);
  var
};

var addStrings = function (a, b) {
  let isCarry = 0;
  let nums1 = a.split('').map(x => +x);
  let nums2 = b.split('').map(x => +x);
  let nums = [];
  let len1 = nums1.length;
  let len2 = nums2.length;
  let l;
  let digitSum;
  if (len1 > len2) {
    for (let m = 0; m < len1 - len2; m++) {
      nums2.unshift(0);
    }
    l = len1 - 1;
  } else {
    for (let m = 0; m < len2 - len1; m++) {
      nums1.unshift(0);
    }
    l = len2 - 1;
  }
  while (l >= 0) {
    digitSum = nums1[l] + nums2[l--] + isCarry;
    if (digitSum >= 10) {
      isCarry = 1;
      nums.unshift(digitSum - 10);
    } else {
      nums.unshift(digitSum);
      isCarry = 0;
    }
  }
  if (isCarry) {
    nums.unshift(1);
  }
  return nums.join('');
};

var addToArrayForm = function (nums, k) {
  let i = nums.length - 1;
  let isCarry = 0;
  let res = [];
  let digitSum;
  while (k > 0 | i >= 0) {
    digitSum = isCarry;
    if (k > 0) {
      let digit = k % 10
      digitSum += digit;
      k = (k - digit) / 10;
    }
    if (i >= 0) {
      digitSum += nums[i];
    }
    isCarry = (digitSum / 10) | 0;
    res.unshift(digitSum % 10);
    i--;
  }
  if (isCarry) {
    res.unshift(1);
  }
  return res;
};

var addStrings = function (a, b) {
  let isCarry = 0;
  let nums1 = a.split('').map(x => +x);
  let nums2 = b.split('').map(x => +x);
  let nums = [];
  let l1 = nums1.length - 1;
  let l2 = nums2.length - 1;
  let digitSum;
  while (l1 >= 0 | l2 >= 0) {
    digitSum = isCarry;
    if (l1 >= 0) {
      digitSum += nums1[l1]
    }
    if (l2 >= 0) {
      digitSum += nums2[l2];
    }
    nums.unshift(digitSum % 10);
    isCarry = digitSum / 10 | 0;
    l1--;
    l2--;
  }
  if (isCarry) {
    nums.unshift(1);
  }
  return nums.join('');
};

var addBinary = function (a, b) {
  let nums1 = a.split('').map(x => +x);
  let nums2 = b.split('').map(x => +x);
  let i = nums1.length - 1;
  let j = nums2.length - 1;
  let num1;
  let num2;
  let res = '';
  let isCarry = 0
  while (i >= 0 | j >= 0) {
    num1 = i >= 0 ? nums1[i] : 0;
    num2 = j >= 0 ? nums2[j] : 0;
    if (isCarry) {
      if (num1 & num2) {
        res = '1' + res;
        isCarry = 1;
      } else if (num1 | num2) {
        res = '0' + res;
        isCarry = 1;
      } else {
        res = '1' + res;
        isCarry = 0;
      }
    } else {
      if (num1 & num2) {
        res = '0' + res;
        isCarry = 1;
      } else if (num1 | num2) {
        res = '1' + res;
        isCarry = 0;
      } else {
        res = '0' + res;
        isCarry = 0;
      }
    }
    i--;
    j--;
  }
  if (isCarry) {
    return '1' + res;
  }
  return res;
};

var multiply = function (a, b) {
  let nums1 = a.split('').map(x => +x);
  let nums2 = b.split('').map(x => +x);
  let res = [];
  let n = 0;
  for (var i = nums1.length - 1; i >= 0; i--) {
    res = addTwodigit(pow10(multiplyOnedigit(nums2, nums1[i]), n), res);
    n++;
  }
  return res.join('');
};

function pow10(nums, n) {
  for (var i = 0; i < n; i++) {
    nums.push(0)
  }
  return nums;
}

function multiplyOnedigit(nums, b) {
  if (b === 0) {
    return [0];
  }
  let digitProduct;
  let res = [];
  let isCarry = 0;
  for (var i = nums.length - 1; i >= 0; i--) {
    digitProduct = nums[i] * b + isCarry;
    res.unshift(digitProduct % 10);
    isCarry = (digitProduct / 10) | 0;
  }
  if (isCarry) {
    res.unshift(isCarry);
  }
  return res;
}

var addTwodigit = function (nums1, nums2) {
  let isCarry = 0;
  let nums = [];
  let l1 = nums1.length - 1;
  let l2 = nums2.length - 1;
  let digitSum;
  while (l1 >= 0 | l2 >= 0) {
    digitSum = isCarry;
    if (l1 >= 0) {
      digitSum += nums1[l1]
    }
    if (l2 >= 0) {
      digitSum += nums2[l2];
    }
    nums.unshift(digitSum % 10);
    isCarry = digitSum / 10 | 0;
    l1--;
    l2--;
  }
  if (isCarry) {
    nums.unshift(1);
  }
  return nums;
};

var pivotIndex = function (nums) {
  let sums = 0
  for (let i = 0; i < nums.length; i++) {
    sums += nums[i];
  }
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (sums - sum - nums[i] === sum) {
      return i;
    }
    sum += nums[i];
  }
  return -1;
}

var dominantIndex = function (nums) {
  let max = nums[0];
  let secondMax = 0;
  let index = 0;
  for (var i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      index = i;
      secondMax = max;
      max = nums[i];
    } else if (num[i] > secondMax) {
      secondMax = num[i];
    }
  }
  if (max >= secondMax * 2) {
    return index;
  }
  return -1;
};

var findDiagonalOrder = function (matrix) {
  if (matrix.length === 0) {
    return [];
  }
  let m = matrix.length;
  let n = matrix[0].length;
  let res = [];
  let isX = 1;
  let j = 2;
  for (let line = 1; line <= m + n - 1; line++) {
    let sum = line + 1;
    let temp = [];
    if (line <= m) {
      for (let i = 1; i < sum && i <= m; i++) {
        temp.push(matrix[i - 1][sum - i - 1]);

      }
    } else {

      for (let i = j; i < sum && i <= m; i++) {
        temp.push(matrix[i - 1][sum - i - 1])
      }
      j++;
    }
    if (line % 2) {
      res.push(...temp.reverse());
    } else {
      res.push(...temp);
    }
  }
  return res;
};

var findDiagonalOrder = function (matrix) {
  if (matrix.length === 0) {
    return [];
  }
  let m = matrix.length;
  let n = matrix[0].length;
  let res = [];
  for (let sum = 2; sum <= m + n; sum++) {
    for (let p = 1; p < sum && (p <= m || p <= n); p++) {
      if (sum % 2 && p <= m && sum - p <= n) {
        res.push(matrix[p - 1][sum - p - 1]);
      } else {
        if (p <= n && sum - p <= m) {
          res.push(matrix[sum - p - 1][p - 1]);
        }
      }

    }
  }
  return res;
};

var spiralOrder = function (matrix) {
  if (matrix == undefined | matrix.length === 0) {
    return [];
  }
  let res = [];
  let margin_b = matrix.length;
  let margin_r = matrix[0].length;
  let margin_l = 0;
  let margin_t = 0;
  let r = 0;
  let c = 0;
  let len = margin_r * margin_b;
  let dir = 'right';
  for (let i = 0; i < len; i++) {
    res[i] = matrix[r][c];
    if (dir === 'right') c++;
    if (dir === 'down') r++;
    if (dir === 'left') c--;
    if (dir === 'top') r--;

    if (c >= margin_r) {
      c--;
      r++;
      dir = 'down';
      margin_t++;
    } else if (r >= margin_b) {
      r--;
      c--;
      dir = "left";
      margin_r--;
    } else if (c < margin_l) {
      c++;
      r--;
      dir = 'top'
      margin_b--;
    } else if (r < margin_t) {
      r++;
      c++;
      dir = 'right';
      margin_l++;
    }
  }
  return res;
};

var generateMatrix = function (n) {
  var matrix = new Array(n);
  for (var i = 0; i < n; i++) {
    matrix[i] = new Array(n);
  }
  let c = 0;
  let r = 0;
  let len = n * n;
  let dir = "right";
  let margin_b = n;
  let margin_r = n;
  let margin_l = 0;
  let margin_t = 0;
  for (let i = 1; i <= len; i++) {
    matrix[r][c] = i;
    if (dir === 'right') c++;
    if (dir === 'down') r++;
    if (dir === 'left') c--;
    if (dir === 'top') r--;

    if (c >= margin_r) {
      c--;
      r++;
      dir = 'down';
      margin_t++;
    } else if (r >= margin_b) {
      r--;
      c--;
      dir = "left";
      margin_r--;
    } else if (c < margin_l) {
      c++;
      r--;
      dir = 'top'
      margin_b--;
    } else if (r < margin_t) {
      r++;
      c++;
      dir = 'right';
      margin_l++;
    }
  }
  return matrix;
};


function febN(n) {
  if (n < 3) {
    return 1;
  }
  else {
    return febN(n - 1) + febN(n - 2)
  }
}

var generate = function (numRows) {
  let res = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    res[i] = new Array(i + 1);
    res[i][0] = 1;
    res[i][i] = 1;
  }
  for (let i = 2; i < numRows; i++) {
    for (let j = 1; j < i; j++) {
      res[i][j] = res[i - 1][j] + res[i - 1][j - 1];
    }
  }
  return res;
};
var sortedSquares = function (nums) {
  let i = 0;
  let j = nums.length - 1;
  let res = [];
  let i_sq = nums[i] * nums[i];
  let j_sq = nums[j] * nums[j];
  while (i <= j) {

    if (i_sq > j_sq) {
      res.unshift(i_sq);
      i++;
      i_sq = nums[i] * nums[i];
    } else {
      res.unshift(j_sq);
      j--;
      j_sq = nums[j] * nums[j];
    }
  }
  return res;
};
debugger;
sortedSquares([-4, -1, 0, 3, 10]);

var threeSum = function (nums) {


};

var uniquePaths = function (m, n) {
  m = m || 1;
  n = n || 1;
  let res = 0;
  function findPath(x, y) {
    x = x || 1;
    y = y || 1;
    if (x === m && y === n) {
      res++;
    } else if (x <= m && y <= n) {
      findPath(x + 1, y);
      findPath(x, y + 1);
    }
  }
  findPath();
  return res;
}
var uniquePaths = function (m, n) {
  function factorial(n) {
    if (n < 2) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }
  return factorial(m + n - 2) / factorial(m - 1) / factorial(n - 1)
}

var uniquePathsWithObstacles = function (obstacleGrid) {
  if (obstacleGrid[0][0] === 1) return 0;
  let n = obstacleGrid.length;
  let m = obstacleGrid[0].length;
  let res = 0;
  function findPath(x, y) {
    x = x || 1;
    y = y || 1;
    if (obstacleGrid[x - 1] === undefined || obstacleGrid[x - 1][y - 1] === undefined || !obstacleGrid[x - 1][y - 1]) {
      if (x === m && y === n) {
        res++;
      } else if (x <= m && y <= n) {
        findPath(x + 1, y);
        findPath(x, y + 1);
      }
    }

  }
  findPath();
  return res;
};

function isEven(n) {
  if (n === 1) return false;
  if (n === 0) return true;
  return isEven(n - 2);
}

var maxSubArray = function (nums) {
  if (nums.length < 4) {
    let sum = 0;
    nums.forEach(item => sum += item);
    return sum;
  }

  let sum = nums[0] + nums[1] + nums[2] + nums[3]
  let max = sum;
  for (let i = 4; i < nums.length; i++) {
    sum += nums[i] - nums[i - 4];
    if (sum > max) {
      max = sum;
      maxIndex = i;
    }
  }
  return max;
};

var maxSubArray = function (nums) {
  let sum = 0;
  let max = nums[0];
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (sum > max) {
      max = sum;
    }
    if (sum < 0) {
      sum = 0;
    }
  }
  return max;
};

var minMoves = function (nums) {
  let sum = 0;
  let min = nums[0];
  nums.forEach(item => {
    sum += item;
    min = Math.min(item, min);
  });
  return sum - min * num.length;
};

var minMoves2 = function (nums) {
  let steps = 0;
  nums.sort((a, b) => a - b);
  let mid = nums[Math.floor(nums.length / 2)];
  nums.forEach(item => steps += Math.abs(item - mid));
  return steps;
};


var longestCommonPrefix = function (strs) {
  if (strs == undefined || strs.length == 0 || strs[0][0] == undefined) {
    return "";
  }
  let res = '';
  let k = 0;
  let common = strs[0].slice(0, ++k);
  while (k < strs[0].length) {
    for (var i = 0; i < strs.length; i++) {
      if (strs[i].indexOf(common) !== 0) {
        return res;
      }
    }
    res = common;
    common = strs[0].slice(0, ++k);
  }
  return res;
}

var titleToNumber = function (s) {
  let sum = 0;
  let p = 1;
  for (let i = s.length - 1; i >= 0; i--) {
    let digit = s[i];
    sum += (digit.charCodeAt(0) - 64) * p;
    p *= 26;

  }
  return sum;
};

var convertToTitle = function (n) {
  let res = ''
  while (n > 0) {
    let digit = n % 26;
    res = String.fromCharCode(digit + 64) + res;
    digit = (n - digit) / 26;
  }
  return res;
};

var climbStairs = function (n) {
  if (n == 1) {
    return 1;
  }
  if (n == 2) {
    return 2;
  }

  return climbStairs(n - 1) + climbStairs(n - 2);
};


var climbStairs = function (n) {
  let res = 0;
  function findways(start, target) {
    if (start === target) {
      res++;
    } else if (start < target) {
      findways(start + 2, target);
      findways(start + 1, target);
    }
  }
  findways(0, n);
  return res;
};

var climbStairs = function (n) {
  if (n == 1) return 1;
  if (n == 2) return 2;
  let res = 0;
  let a = 1;
  let b = 2;
  for (let i = 2; i < n; i++) {
    res += a + b;
    a = b;
    b = res;
  }
  return res;
};


var findMin = function (nums) {
  let high = nums.length - 1;
  let low = 0;
  let mid = Math.floor((high + low) / 2);
  if (nums[high] > nums[low]) {
    return nums[low]
  }
  while (high - mid > 1) {
    if (nums[mid] > nums[low]) {
      low = mid;
      mid = Math.floor((high + low) / 2);
    } else {
      high = mid;
      mid = Math.floor((high + low) / 2);
    }
  }
  return Math.min(nums[high], nums[mid], nums[low]);
};

var search = function (nums, target) {
  var findMin = function (nums) {
    let high = nums.length - 1;
    let low = 0;
    let mid = Math.floor((high + low) / 2);
    if (nums[high] > nums[low]) {
      return low
    }
    while (high - mid > 1) {
      if (nums[mid] > nums[low]) {
        low = mid;
        mid = Math.floor((high + low) / 2);
      } else {
        high = mid;
        mid = Math.floor((high + low) / 2);
      }
    }
    return nums[high] < nums[mid] ? high : mid;
  };
  // 二分法
  var findTarget = function (arr, low, high, target) {
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (target == arr[mid]) {
        return mid;
      } else if (target > arr[mid]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return -1;
  }

  let minIndex = findMin(nums);
  let low;
  let high;
  if (minIndex < 1) {
    low = 0;
    high = nums.length - 1;
  } else {
    if (target < nums[0]) {
      low = minIndex;
      high = nums.length - 1;
    } else {
      low = 0;
      high = minIndex - 1;
    }
  }
  return findTarget(nums, low, high, target);
};


var intToRoman = function (num) {
  let res = '';
  let nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  let strs = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  for (let i = 0; i < nums.length; i++) {
    if (num >= nums[i]) {
      let times = Math.floor(num / nums[i]);
      for (let j = 0; j < times; j++) {
        res += strs[i]
      }
      num %= nums[i];
    }
    if (!num) {
      break;
    }
  }
  return res;
};

var romanToInt = function (s) {
  let nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  let strs = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    while (s.indexOf(strs[i]) === 0) {
      res += nums[i];
      s = s.slice(strs[i].length);
    }
    if (!s) break;
  }
  return res;
};

var distributeCandies = function (candies) {
  let kinds = new Set(candies).size;
  return Math.min(kinds, candies.length / 2);
};

var search = function (nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (target == nums[mid]) {
      return mid;
    } else if (target > nums[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
};

var isValid = function (s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(")");
    } else if (s[i] === "{") {
      stack.push("}");
    } else if (s[i] === "[") {
      stack.push("]");
    } else if (stack.pop() !== s[i]) {
      return false;
    };
  }
  return !stack.length;
};

var strStr = function (haystack, needle) {
  return haystack.indexOf(needle);
};

var reverseString = function (s) {
  let i = 0;
  let j = s.length - 1;
  let temp;
  while (i < j) {
    temp = s[i];
    s[i] = s[j];
    s[j] = temp;
    i++;
    j--;
  }
};

var arrayPairSum = function (nums) {
  let minArr = [];
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {

  }
};


var arrayPairSum = function (nums) {
  let count = [];
  for (let i = 0; i < nums.length; i++) {
    if (count[nums[i] + 10000]) {
      count[nums[i] + 10000]++;
    } else {
      count[nums[i] + 10000] = 1;
    }
  }
  let sum = 0;
  let isOdd = true;
  for (let i = 0; i < count.length; i++) {
    while (count[i]) {
      if (isOdd) {
        sum += i - 10000;
      }
      isOdd = !isOdd;
      count[i]--;
    }
  }
  return sum;
};

var fairCandySwap = function (A, B) {
  let sumA = A.reduce((acc, cur) => acc + cur, 0);
  let sumB = B.reduce((acc, cur) => acc + cur, 0);
  let gap = (sumB - sumA) / 2;
  let setB = new Set(B)
  for (let a of A) {
    if (setB.has(a + gap)) {
      return [a, gap + a];
    }
  }
};


var validUtf8 = function (data) {
  if (data.length === 0) return true;
  infoByte = to2BaseString(data[0]);
  if (infoByte[0] === "1" && infoByte[1] !== "0") {
    let countByte = 1;
    while (+infoByte[countByte]) {
      countByte++;
      if (countByte > 4) return false;
    }
    data.shift();
    countByte--;
    for (let i = 0; i < countByte; i++) {
      if (!data.length) {
        return false;
      }
      let byteString = to2BaseString(data[0]);
      if (byteString[0] !== "1" || byteString[1] !== "0") {
        return false;
      }
      data.shift();
    }
    return validUtf8(data);
  } else if (infoByte[0] === "0") {
    data.shift();
    return validUtf8(data);
  } else {
    return false;
  }

  function to2BaseString(num) {
    let res = num.toString(2);
    while (res.length < 8) {
      res = "0" + res;
    }
    return res;
  }
};


var validUtf8 = function (data) {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (count === 0) {
      if (data[i] >> 3 === 0b11110) {
        count = 3;
      }
      else if (data[i] >> 4 === 0b1110) {
        count = 2;
      }
      else if (data[i] >> 5 === 0b110) {
        count = 1;
      }
      else if (data[i] >> 7 === 1) {
        return false;
      }
    } else {
      if (data[i] >> 6 !== 0b10) {
        return false;
      }
      count--;
    }
  }
  return count === 0;
}

var largestDivisibleSubset = function (nums) {
  if (nums.length === 0) return [];
  nums.sort((a, b) => a - b);
  let temp = nums[0];
  let tempArr = [temp];
  let res = tempArr;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] % temp === 0) {
      tempArr.push(nums[i]);
      temp = nums[i];
    } else {
      temp = nums[i];
      tempArr = [temp];
    }
    if (tempArr.length > res.length) {
      res = tempArr;
    }
  }
  return res;
};

var toLowerCase = function (str) {
  let res = '';
  for (let i = 0; i < str.length; i++) {
    let charCode = str[i].charCodeAt();
    if (charCode <= 90 && charCode >= 65) {
      res += String.fromCharCode(charCode + 32)
    } else {
      res += str[i];
    }
  }
  return res;
};

var uniqueMorseRepresentations = function (words) {
  let codes = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."]
  let res = [];
  for (let i = 0; i < words.length; i++) {
    let str = ''
    for (let j = 0; j < words[i].length; j++) {
      str += codes[words[i][j].charCodeAt() - 97];
    }
    res += str;
  }
  return new Set(res).size();
};

var numSpecialEquivGroups = function (A) {
  let seen = new Set();
  for (let i = 0; i < A.length; i++) {
    let count = [];
    for (let k = 0; k < 52; k++) {
      count[k] = 0;
    }
    for (let j = 0; j < A[i].length; j++) {
      count[(A[i][j].charCodeAt() - 97 + 26 * (j & 1))]++;
    }
    seen.add(count.join(''));
  }
  return seen.size;
};

var getSum = function (a, b) {
  let stra = a.toString(2);
  let strb = b.toString(2);
  let len = Math.min(stra.length, strb.length);
  let i = stra.length - 1;
  let k = strb.length - 1;
  let res = [];
  while () {
    res.unshift(sum(stra[i], strb[j]));
  }
  function sum(a, b, isCarry) {
    if (isCarry) {
      if (a == '1' && b == '1') {
        return 1;
      }

    }
  }
};

var removeOuterParentheses = function (S) {
  let count = 0;
  let res = '';
  let isStart;
  let isEnd;
  for (let i = 0; i < S.length; i++) {
    if (S[i] === '(') {
      count++;
      if (count === 1) {
        isStart = 1;
        isEnd = 0;
      } else {
        isEnd = 0;
        isStart = 0;
      }
    } else if (S[i] === ')') {
      count--;
      if (count === 0) {
        isEnd = 1;
        isStart = 0;
      } else {
        isEnd = 0;
        isStart = 0;
      }
    }
    if (!isStart && !isEnd) {
      res += S[i];
    }
  }
  return res;
};

var findDisappearedNumbers = function (nums) {
  let max
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    if (num[i] > max)
  }
};

var findDisappearedNumbers = function (nums) {
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    nums[Math.abs(nums[i]) - 1] = - Math.abs(nums[Math.abs(nums[i]) - 1]);
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      res.push(i + 1);
    }
  }
  return res;
};

var findDuplicates = function (nums) {
  let res = [];
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    let index = (Math.abs(nums[i]) % (len + 1)) - 1;
    if (nums[index] > 0) {
      nums[index] = -nums[index];
    } else {
      nums[index] = nums[index] - len - 1;
    }
  }
  for (let i = 0; i < len; i++) {
    if (nums[i] < - len - 1) {
      res.push(i + 1);
    }
  }
  return res;
};

var imageSmoother = function (M) {
  let res = [];
  for (let i = 0; i < M.length; i++) {
    res[i] = [];
  }
  for (let r = 0; r < M.length; r++) {
    for (let c = 0; c < M[0].length; c++) {
      let count = 0;
      let sum = 0;
      for (let i = Math.max(r - 1, 0); i < Math.min(r + 2, M.length); i++) {
        for (let j = Math.max(c - 1, 0); j < Math.min(c + 2, M[0].length); j++) {
          sum += M[i][j];
          count++;
        }
      }
      res[r][c] = Math.floor(sum / count);
    }
  }
  return res;
};


stack[stack.length - 1]

function includes(ary, value) {
  return ary.indexOf(value) == -1;
  for (let i = 0; i < ary.length; i++) {
    if (ary[i] === value) return true;
  }
  return false
}

function sum() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];

  }
  return sum;
}

function deepEqual(value1, value2) {
  if (value1 === value2) {
    return true;
  } else if (isObject(value1) && isObject(value2)) {
    if (Object.keys(value1).length === Object.keys(value2).length) {
      for (let key in value1) {
        if (!deepEqual(value1[key], value2[key])) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
  function isObject(value) {
    return (typeof value === "object" && value !== null) ? true : false;
  }
}

var firstUniqChar = function (s) {
  let map = {};
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) {
      map[s[i]]++;
    } else {
      map[s[i]] = 1;
    }
  }
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] === 1) return i;
  }
  return -1;
};

var frequencySort = function (s) {
  let map = {};
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) {
      map[s[i]]++;
    } else {
      map[s[i]] = 1;
    }
  }

  let res = '';
  for (let key in map) {
    arr[map[key] - 1].push({ num: map[key] - 1, str: map[] });
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = -1; j < i; j++) {
      res = arr[i] + res;
    }
  }
  return res;
};

var twoSum = function (nums, target) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    let need = target - nums[i];
    if (need in map) {
      return [map[need], i]
    } else {
      map[nums[i]] = i;
    }
  }
};

var groupAnagrams = function (strs) {
  let map = {};
  let res = [];
  let k = 0;
  for (let i = 0; i < strs.length; i++) {
    let key = strs[i].split('').sort().join('');
    if (key in map) {
      res[map[key]].push(strs[i]);
    } else {
      map[key] = k;
      res[k] = [strs[i]];
      k++;
    }
  }
  return res;
};

var singleNumber = function (nums) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] in map) {
      map[nums[i]]++;
    } else {
      map[nums[i]] = 1;
    }
  }
  for (let key in map) {
    if (map[key] == 1) return key
  }
};

var isHappy = function (n) {
  let map = {};
  function getDigitSquare(n) {
    let sum = 0;
    while (n > 0) {
      var digit = n % 10;
      sum += digit * digit;
      n = (n - digit) / 10;
    }
    return sum;
  }
  while (1) {
    let squareOfn = getDigitSquare(n);
    if (squareOfn == 1) return true;
    if (squareOfn in map) {
      return false;
    } else {
      map[squareOfn] = 1;
    }
    n = squareOfn;
  }
};

var findWords = function (words) {
  let res = [];
  row1 = new Set(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'])
  row2 = new Set(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'])
  row3 = new Set(['z', 'x', 'c', 'v', 'b', 'n', 'm'])
  for (let i = 0; i < words.length; i++) {
    let word = words[i]
    let j;
    if (row1.has(word[0].toLowerCase())) {
      for (j = 1; j < word.length; j++) {
        if (!row1.has(word[j].toLowerCase())) {
          break;
        }
      }
      if (j === word.length) {
        res.push(word);
      }
    }
    if (row2.has(word[0].toLowerCase())) {
      for (j = 1; j < word.length; j++) {
        if (!row2.has(word[j].toLowerCase())) {
          break;
        }
      }
      if (j === word.length) {
        res.push(word);
      }
    }
    if (row3.has(word[0].toLowerCase())) {
      for (j = 1; j < word.length; j++) {
        if (!row3.has(word[j].toLowerCase())) {
          break;
        }
      }
      if (j === word.length) {
        res.push(word);
      }
    }
  }
  return res;
};

var commonChars = function (strs) {
  let res = [];
  let mapArr = Array(strs.length);
  for (let i = 0; i < mapArr.length; i++) {
    mapArr[i] = {};
  }
  for (let j = 0; j < strs[0].length; j++) {
    if (strs[0][j] in mapArr[0]) {
      mapArr[0][strs[0][j]]++;
    } else {
      mapArr[0][strs[0][j]] = 0;
    }
  }
  for (let i = 1; i < strs.length; i++) {
    let str = strs[i];
    for (let j = 0; j < str.length; j++) {
      if (str[j] in mapArr[i - 1]) {
        if (str[j] in mapArr[i]) {
          mapArr[i][str[j]]++;
        } else {
          mapArr[i][str[j]] = 0;
        }
      }
    }
  }
  for (let key in mapArr[mapArr.length - 1]) {

  }
};
var isValidSudoku = function (board) {
  let seen = new Set();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== ".") {
        let number = board[i][j];
        let rowStr = number + " in row " + i;
        let colStr = number + " in col " + j;
        let blockStr = number + " in block " + Math.floor(j / 3) + '-' + Math.floor(i / 3);
        if (!seen.has(rowStr)) {
          seen.add(rowStr);
        } else {
          return false;
        }
        if (!seen.has(colStr)) {
          seen.add(colStr);
        } else {
          return false;
        }
        if (!seen.has(blockStr)) {
          seen.add(blockStr);
        } else {
          return false;
        }
      }
    }
  }
  return true;
};

var isIsomorphic = function (s, t) {
  let seen1 = {};
  let seen2 = {};
  for (let i = 0; i < s.length; i++) {
    if (s[i] in seen1) {
      if (seen1[s[i]] !== t[i]) {
        return false
      }
    } else {
      if (seen2[t[i]]) {
        return false;
      } else {
        seen1[s[i]] = t[i];
        seen2[t[i]] = s[i];
      }
    }
  }
  return true;
};

var minWindow = function (s, t) {
  const map = {};
  for (let i = 0; i < t.length; i++) {
    if (map[t[i]]) {
      map[t[i]]++;
    } else {
      map[t[i]] = 1;
    }
  }
  let left = 0;
  let right = 0;
  let count = t.length;
  let max = Number.MAX_SAFE_INTEGER;
  let res = s;
  while (right < s.length) {
    if (map[s[right]] > 0) {
      count--;
    }
    map[s[right]]--;
    right++;
    while (count === 0) {
      if (right - left < max) {
        max = right - left;
        res = s.slice(left, right);
      }
      map[s[left]]++;
      if (map[s[left]] > 0) {
        count++;
      }
      left++;
    }
  }
  return max === Number.MAX_SAFE_INTEGER ? "" : res;
};


var lengthOfLongestSubstring = function (s) {
  let map = {};
  let left = 0;
  let right = 0;

  let max = 0;

  while (right < s.length) {
    if (!map[s[right]]) {
      map[s[right]] = 1;
      right++;
    } else {
      while (left < right) {
        delete map[s[left]];
        if (map[s[left++]] === map[s[right]]) {
          break;
        }
      }
    }
    max = Math.max(max, right - left);
  }
  return max;
};

c = 0
var cache = []
function fibb(n) {
  if (cache[n]) {
    return cache[n]
  }
  c++
  if (n <= 1) return 1
  var r = fibb(n - 1) + fibb(n - 2)
  cache[n] = r
  return r
}

var lengthOfLongestSubstring = function (s) {
  let map = {};
  let left = 0;
  let right = 0;

  let max = 0;

  while (right < s.length) {
    if (!map[s[right]]) {
      map[s[right]] = 1;
      right++;
    } else {
      while (left < right) {
        delete map[s[left]];
        left++;
        if (map[s[right]] == undefined) {
          break;
        }
      }
    }
    max = Math.max(max, right - left);
  }
  return max;
};

function maxCollection(r, c, data) {
  let rmax = data.length;
  let Lc = c + 1;
  let Rc = c + 1;
  let Lr = r;
  let Rr = r + 1;
  if (r === rmax) {
    return data[r][c];
  }
  return data[r][c] + Math.max(maxCollection(Lr, Lc), maxCollection(Rr, Rc);
}

var minimumTotal = function (triangle) {
  for (let i = triangle.length - 1; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      triangle[i][j] += Math.max(triangle[i + 1][j], triangle[i + 1][j + 1]);
    }
  }
  return triangle[0][0]
};

var calPoints = function (ops) {
  let stack = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "C") {
      stack.pop();
    } else if (ops[i] === "D") {
      stack.push(stack[stack.length - 1] * 2);
    } else if (ops[i] === "+") {
      stack.push(stack[stack.length - 1] + stack[stack.length - 2])
    } else {
      stack.push(+ops[i])
    }
  }
  return stack.reduce(
    (acc, cur) => acc + cur, 0
  )
};

var orderOfLargestPlusSign = function (N, mines) {
  let matrix = [];
  for (let i = 0; i < N; i++) {
    matrix[i] = Array(N).fill(N)
  }
  //创建二维数组
  for (let [i, j] of mines) {
    matrix[i][j] = 0;
  }
  //初始化二维数组
  let res = 0;
  for (let r = 0; r < N; r++) {
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    for (let c = 0; c < N; c++) {
      matrix[r][c] = Math.min(matrix[r][c], left = (matrix[r][c] == 0 ? 0 : left + 1));
      matrix[r][N - c - 1] = Math.min(matrix[r][N - c - 1], right = (matrix[r][N - c - 1] == 0 ? 0 : right + 1));
      matrix[c][r] = Math.min(matrix[c][r], top = (matrix[c][r] == 0 ? 0 : top + 1));
      matrix[N - c - 1][r] = Math.min(matrix[N - c - 1][r], bottom = (matrix[N - c - 1][r] == 0 ? 0 : bottom + 1));
    }
  }

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      res = Math.max(res, matrix[row][col])
    }
  }
  return res;
};

var maximalSquare = function (matrix) {
  if (matrix.length == 0 || matrix == null) return 0;
  for (let row = 0; row < matrix.length; row++) {
    let k = 1;
    for (let col = 0; col < matrix[0].length; col++) {
      if (+matrix[row][col]) {
        matrix[row][col] = k++;
      } else {
        k = 1;
      }
    }
  }
  for (let col = 0; col < matrix[0].length; col++) {
    let k = 1;
    for (let row = 0; row < matrix.length; row++) {
      if (+matrix[row][col]) {
        matrix[row][col] = Math.min(k++, +matrix[row][col]);
      } else {
        matrix[row][col] = 0;
        k = 1;
      }
    }
  }


  let maxLen = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] >= 1) {
        let count;
        for (count = 1; row + count < matrix.length && col + count < matrix[0].length; count++) {
          if (matrix[row + count][col + count] <= count) {
            break
          }
        }
        maxLen = Math.max(maxLen, count);
      }
    }
  }
  return maxLen * maxLen;
};

var countPrimes = function (n) {
  let isPrimes = Array(n).fill(1);
  for (let i = 2; i * i < n; i++) {
    if (isPrimes[i]) {
      for (let j = i * i; j < n; j += i) {
        isPrimes[j] = 0;
      }
    }
  }
  let count = 0;
  for (let i = 2; i < isPrimes.length; i++) {
    if (isPrimes(i)) count++;
  }
  return count;
};

function arrTolist(arr) {
  if (arr.length == 0) {
    return null;
  }
  return {
    value: arr.shift(),
    next: arrTolist(arr),
  };
}

var fib = function (N) {
  let fibArr = [0, 1];
  for (let i = 2; i <= N; i++) {
    fibArr[i] = fibArr[i - 1] + fibArr[i - 2];
  }
  return fibArr[N];
};

var rotate = function (nums, k) {
  let arr = []
  for (let i = 0; i < k; i++) {
    nums.(nums.pop());
  }
};

function listToArray(node) {
  let arr = [];
  while (node) {
    arr.push(node.value);
    node = node.next;
  }
  return arr;
}

function listToArray(node) {
  if (node == null) return arr;
  return [arr, listToArray(node.next, arr)]
}

var rotate = function (arr, k) {
  k = k % arr.length;
  reverse(0, arr.length - 1, arr);
  reverse(0, k - 1);
  reverse(k, arr.length - 1);
  function reverse(left, right) {
    while (left < right) {
      arr[left] = arr[right] ^ arr[left];
      arr[right] = arr[right] ^ arr[left];
      arr[left] = arr[right] ^ arr[left];
      left++;
      right--;
    }
  }
};


function nth(list, index) {
  if (index == 0) return list.value;
  return nth(list.next, index - 1);
}

var singleNumber = function (nums) {
  let x1 = 0, x2 = 0, mask = 0;
  for (let num of nums) {
    x2 ^= x1 & i;
    x1 ^= i;
    mask = ~(x1 & x2)
    x2 &= mask;
    x1 &= mask;
  }
  return x1;
};

var findComplement = function (num) {
  let res = 0;
  let sign = 1;
  if (num < 0) {
    num = - num;
    sign = -1;
  }
  let bit = 0;
  while (num > 0) {
    let digit = num & 1;
    res += (1 - digit) << bit;
    num = (num - digit) / 2
    bit++
  }
  return res * sign;
};

var numJewelsInStones = function (J, S) {
  let jset = new Set(J.split(""));
  let count = 0;
  for (let i = 0; i < S.length; i++) {
    if (jset.has(S[i])) count++;
  }
  return count;
};

var intersect = function (nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b));
  let i = 0;
  let j = 0;
  let res = [];
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] == nums2[j]) {
      res.push(nums[i]);
      i++;
      j++;
    } else if (nums1[i] > nums2[j]) {
      j++;
    } else {
      i++;
    }
  }
  return res;
};

var containsDuplicate = function (nums) {

  return nums ? true : (new Set(nums)).size !== nums.length
};

var containsNearbyDuplicate = function (nums, k) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] in map) {
      if (Math.abs(map[nums[i]] - i) <= k) {
        return true;
      } else {
        map[nums[i]] = i;
      }
    } else {
      map[nums[i]] = i;
    }
  }
  return false;
};

var heightChecker = function (heights) {
  let sortarr = [...heights].sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < heights.length; i++) {
    if (sortarr[i] !== heights[i]) count++
  }
};

var findTheDifference = function (s, t) {
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    res ^= s.charCodeAt(i);
  }
  for (let i = 0; i < t.length; i++) {
    res ^= t.charCodeAt(i);
  }
  return String.fromCharCode(res);
};

var findErrorNums = function (nums) {
  let arr = Array(num.length + 1);
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    if (arr[nums[i]] !== undefined) {
      res.push(nums[i]);
    } else {
      arr[nums[i]] = i;
    }
  }
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] == undefined) res.push(i)
  }
  return res;
};

var addTwoNumbers = function (l1, l2) {
  let newNode = ListNode();
  let isCarry = 0;
  while (l1 !== null || l2 !== null) {
    if (l1 == null) {
      newNode.value = isCarry + l2.value;
      newNode.next = l2.next;
      break;
    }
    if (l2 == null) {
      newNode.value = isCarry + l1.value;
      newNode.next = l1.next;
      break;
    }
    newNode.value = (l1.value + l2.value + isCarry) % 10;
    isCarry = Math.floor((l1.value + l2.value) / 10);
    newNode = newNode.next;
    l1 = l1.next;
    l2 = l2.next;
  }
  return newNode;
};



var sortArrayByParityII = function (nums) {
  let res = [];
  let odd = 1;
  let even = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 == 0) {
      res[even] = nums[i]
      even += 2;
    } else {
      res[odd] = nums[i];
      odd += 2;
    }
  }
  return res;
};

var lengthOfLastWord = function (s) {
  let len = s.length;
  for (let i = len - 1; i >= 0; i--) {
    if (s[i] != " ") {
      count++;
      if (s[i - 1] == " ") {
        return count;
      }
    }
  }
};

var reverseWords = function (s) {
  let res = "";
  let i = 0;
  while (i < s.length) {
    let temp = ""
    while (s[i] != " " && i < s.length) {
      temp = s[i] + temp;
      i++;
    }
    res += temp;
    if (s[i] === " ") {
      res += " "
    }
    i++;
  }
  return res;
};

var searchRange = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] == target) {
      return [find(mid, -1), find(mid, 1)];
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return [-1, -1]
  function find(idx, dir) {
    while (nums[idx] == target) {
      idx += dir;
    }
    return idx - dir;
  }
};


var sortColors = function (nums) {
  function swap(i, j) {
    nums[i] = nums[i] ^ nums[j]
    nums[j] = nums[i] ^ nums[j]
    nums[i] = nums[i] ^ nums[j]
  }
  let i = 0;
  let j = nums.length - 1;
  for (let k = 0; k < nums.length; k++) {
    if (nums[k] == 2 && k < j) {
      swap(j, k);
      j--;
      k--;
    }
    if (nums[k] == 0 && k > i) {
      swap(i, k);
      i++;
      k--;
    }

  }
};

var peakIndexInMountainArray = function (A) {
  let left = 0;
  let right = A.length - 1;
  while (left <= right) {
    let mid = (left + right / 2) | 0;
    if (A[mid] > A[mid - 1] && A[mid] > A[mid + 1]) {
      return mid;
    } else if (A[mid] > A[mid - 1] && A[mid] < A[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
};
var repeatedNTimes = function (A) {
  for (let i = 2; i < A.length; i++) {
    if (A[i - 1] == A[i] || A[i - 2] == A[i]) return A[i];
  }
  return A[i];
};

var sortArray = function (nums) {
  function swap(i, j) {
    nums[i] = nums[j] ^ nums[i];
    nums[j] = nums[j] ^ nums[i];
    nums[i] = nums[j] ^ nums[i];
  }
  for (let j = nums.length - 2; j >= 0; j++) {
    let isSort = true;
    for (let i = 0; i <= j; i++) {
      if (nums[i] > nums[i + 1]) {
        swap(i, i + 1);
        isSort = false;
      }
    }
    if (isSort) {
      return nums;
    }
  }
  return nums;
};

function d(f) {
  return function (x) {
    let s = 0.000001;
    let x1 = x + s;
    let x2 = x - s;
    let y1 = f(x1);
    let y2 = f(x2);
    return (y2 - y1) / (x2 - x1);
  }
}

var isAnagram = function (s, t) {
  let arr = Array(26).fill(0);
  if (s.length != t.length) return false;
  for (let i = 0; i < s.length; i++) {
    arr[s.charCodeAt(i) - 97]++;
    arr[t.charCodeAt(i) - 97]--;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) return false;
  }
  return true;
}

function max() {
  let max = -Infinity;
  for (let i = 0; i < arguments.length; i++) {
    max = Math.max(max, arguments[i]);
  }
  return max;
}


var duplicateZeros = function (arr) {
  let count = 0;
  arr.forEach(item => {
    if (item == 0) {
      count++;
    }
  })
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == 0) {
      count--;
    }
    if (i + count < arr.length) {
      arr[i + count] = arr[i];
      if (arr[i] == 0 && i + count + 1 < arr.length) {
        arr[i + count + 1] = 0;
      }
    }
  }
}
var judgeCircle = function (moves) {
  let y = 0;
  let x = 0;
  for (let i = 0; i < moves.length; i++) {
    if (moves[i] == "U") {
      y++;
    } else if (moves[i] == "D") {
      y--;
    } else if (moves[i] == "L") {
      x--;
    } else {
      x++
    }
  }
  return x == 0 && y == 0;
};
var isPalindrome = function (s) {
  s = s.toLowerCase();
  let l = 0;
  let r = s.length - 1;
  while (l <= r) {
    while (!isa2z(l)) {
      l++;
      if (l > s.length) break;
    }
    while (!isa2z(r)) {
      r--;
      if (r < 0) break;
    }
    if (s[r] != s[l]) {
      return false;
    }
    r--;
    l++;
  }
  return true;
  function isa2z(c) {
    return s.charCodeAt(c) >= 97 && s.charCodeAt(c) <= 122;
  }
};

var lastStoneWeight = function (stones) {
  stones.sort((a, b) => a - b);
  while (stones.length > 1) {
    let a = stones.pop();
    let b = stones.pop();
    let crash = a - b;
    insert(crash);
  }
  return stones.length ? stones[0] : 0;
  function insert(crash) {
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] > crash) {
        stones = stones.slice(0, i).concat(crash).concat(stones.slice(i))
        break;
      }
    }
    if (i == stones.length) {
      stones.push(crash);
    }
  }
};

function findMin(nums) {
  let high = nums.length - 1;
  let low = 0;
  while (low < high) {
    mid = Math.floor((high + low) / 2);
    if (mid > nums[high]) {
      low = mid;
    } else if (mid < nums[high]) {
      high = mid;
    } else {
      high--;
    }
  }
  return nums[low];
}
var arrangeCoins = function (num) {
  let step = 1;
  let coins = 0;
  let lastStep;
  while (coins <= num) {
    lastStep = step - 1;
    coins += step;
    step++;
  }
  return lastStep;
};

var flipAndInvertImage = function (A) {
  for (let r = 0; r < A.length; r++) {
    reverse(A[r]);
  }
  return A;
  function reverse(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
      if (arr[left] + arr[right] == 2) {
        arr[left] = 0;
        arr[right] = 0;
      } else if (arr[left] + arr[right] == 0) {
        arr[left] = 1;
        arr[right] = 1;
      }
      left++;
      right--;
    }
    if (left == right) {
      arr[left] = 1 - arr[left];
    }
  }
};
// 实现map
function map(arr, mapper) {
  return arr.reduce(function (res, cur) {
    res.push(mapper(cur));
    return res;
  }, [])
}
map([1, 3, 4], function (item) {
  return item * item;
})
//返回值只有一个，并且每一项需要和初始值做操作；就可以用reduce
function keyBy(arr, key) {
  return arr.reduce(function (res, item) {
    res[item[key]] = item;
    return res;
  }, {})
}


function negate(f) {
  return function (...arg) {
    return !f(...arg);
  }
}
function some(arr, predicate) {
  return !arr.every(arr, negate(predicate))
}

function every(arr, predicate) {
  return !arr.some(arr, negate(predicate))
}


function every(arr, predicate) {
  return arr.reduce((res, item, idx, arr) => {
    return res & predicate(item)
  }, true)
}
function some(arr, predicate) {
  return arr.reduce((res, item, idx, arr) => {
    return res || predicate(item)
  }, false)
}
function flip(f) {
  return function (...arg) {
    return f(...arg.reverse());
  }
}

function flip(f) {
  return function (...arg) {
    return f(...arg.reverse());
  }
}
function before(n, f) {
  let times = n;
  let lastres;
  return function (...arg) {
    if (times < n) {
      return lastres = f(...arg)
    } else {
      return lastres;
    }
  }
}
function after(n, f) {
  let times = n;
  return function (...arg) {
    if (times > n) {
      return f(...arg)
    } else {
      return lastres;
    }
  }
}

function ary(f, n = f.length) {
  return function (...arg) {
    return f(...arg.slice(0, n))
  }
}

function unary(f) {
  return ary(f, 1);
}

function spread(f) {
  return function (arr) {
    return f.apply(null, arr);
  }
}

function memerize(f) {
  let cache = {}
  return function (...arg) {
    if (arg in cache) {
      return cache(arg);
    } else {
      return cache[arg] = f(arg);
    }
  }
}

function curry(f) {
  if (f.length == 0) return f();
  return function (...arg) {
    return curry(f.bind(null, ...arg));
  }
}

// 复数
function Complex(real, image) {
  this.real = real;
  this.image = image;
}
Complex.prototype = {
  plus: function (c) {
    let real = this.real + c.real;
    let image = this.image + c.image;
    return new Complex(real, image);
  },
  minus: function (c) {
    let real = this.real - c.real;
    let image = this.image - c.image;
    return new Complex(real, image);
  },
  mul: function (c) {
    let real = this.real * c.real - this.image - c.image;
    let image = this.real * c.image + this.image * c.real;
    return new Complex(real, image);
  },
  division: function (c) {
    let div = c.real * c.real + c.image * c.image
    let real = this.real * c.real + this.image - c.image
    let iamge = this.image * c.real - this.real * c.image;
    return new Complex(real / div, image / div);
  },
  toString() {
    return "" + this.real + (this.image > 0 ? "+" : "-") + Math.abs(this.image) + "i";
  }

}
function Queue(ary = []) {
  this._head = null;
  this._tail = null;
  this._size = 0;
  for (var val of ary) {
    this.add(val);
  }
}
Queue.prototype = {
  add(val) {
    let node = {
      val: val,
      next: null,
    }
    if (this._tail == null) {
      this._tail = node;
      this._head = node;
    }
    this._tail.next = node;
    this._tail = this._tail.next;
    this._size++;
    return this;
  },
  remove() {
    if (this._tail == null) {
      return undefined;
    }
    if (this._head == this._tail) {
      this._head = null;
      this._tail = null;
      return this;
    }
    let val = this._head.val;
    this._head = this._head.next;
    this._size--;
    return val;
  }
}
// 必须new调用 不可枚举   
// class A extends B 继承
class A extends B { // a继承b，a的原型继承b的原型
  constructor() {
    super()
    // super.add();
    this.a = true;
  }
}
class Queue {
  // 构造函数方法
  static from() {
    let q = new Queue();
    for (var val of ary) {
      q.add(val);
    }
    return q;
  }
  // 构造函数
  constructor(initvals) {
    this._head = null;
    this._tail = null;
  }
  add(val) {
    let node = {
      val: val,
      next: null,
    }
    if (this._tail == null) {
      this._tail = node;
      this._head = node;
    }
    this._tail.next = node;
    this._tail = this._tail.next;
    this._size++;
    return this;
  }
  remove() {
    if (this._tail == null) {
      return undefined;
    }
    if (this._head == this._tail) {
      this._head = null;
      this._tail = null;
      return this;
    }
    let val = this._head.val;
    this._head = this._head.next;
    this._size--;
    return val;
  }
}

class MySet {
  constructor(initialValues = []) {
    this._set = []
    this._size = 0;
    for (let i = 0; i < initialValues.length; i++) {
      this.add(initialValues[i]);
    }
  }

  add(val) {
    if (!this.has(val)) {
      this._set.push(val);
      this._size++;
    }
    return this;
  }

  delete(val) {
    if (this.has(val)) {
      let idx = this._set.indexOf(val);
      this._set = this._set.slice(0, idx).concat(this._set.slice(idx + 1));
      this._size--;
      return true;
    } else {
      return false;
    }
  }

  has(val) {
    return this._set.includes(val);
  }

  clear() {
    this._set = [];
    this._size = 0;
  }

  get size() {
    return this._size;
  }
}

class MyMap {
  constructor(initialMaps = []) {
    this._kv = [];
    this._size = 0;
    for (let [k, v] of initialMaps) {
      this.set(k, v);
    }
  }

  set(key, val) {
    this._kv.push([key, val]);
    this._size++;
    return this;
  }

  get(key) {
    for (let [k, v] of this._kv) {
      if (k == key) {
        return v;
      }
    }
  }

  delete(key) {
    for (let i = 0; i < this._kv.length; i++) {
      let [k, v] = this._kv[i];
      if (k == key) {
        this._kv = this._kv.slice(0, i).concat(this._kv.slice(i + 1));
        this._size--;
        return true;
      }
    }
    return false;
  }

  has(key) {
    for (let [k, v] of this._kv) {
      if (k == key) {
        return true;
      }
    }
    return false;
  }

  clear() {
    this._kv = []
    this._size = 0;
  }

  get size() {
    return this._size;
  }
}

var thirdMax = function (nums) {
  let stack = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    let n1, n2;
    while (stack.length && nums[i] > stack[stack.length - 1]) {
      let val = stack.pop();
      if (n1 !== undefined) {
        n2 = n1;
        n1 = val;
      } else {
        n1 = val;
      }
    }
    if (stack.length < 3 && stack[stack.length - 1] != nums[i]) {
      stack.push(val);
    }
    if (n1 !== undefined && stack.length < 3) {
      stack.push(n1);
    }
    if (n2 !== undefined && stack.length < 3) {
      stack.push(n2);
    }
  }
  return stack.pop();
};

var findKthLargest = function (nums, k) {
  quicksort(nums);
  console.log(nums);
  return nums[k - 1];
  function quicksort(nums, low = 0, high = nums.length - 1) {
    if (low >= high) {
      return nums;
    }
    let pivotIdx = Math.floor(Math.random() * (high - low + 1) + low);
    let pivot = nums[pivotIdx];
    swap(nums, pivotIdx, high);
    let j = low - 1;
    for (let i = low; i < high; i++) {
      if (nums[i] > pivot) {
        j++;
        swap(nums, i, j);
      }
    }
    j++;
    swap(nums, high, j);
    if (j > k - 1) {
      quicksort(nums, low, j - 1);
    } else if (j < k - 1) {
      quicksort(nums, j + 1, high);
    }
  }

  function swap(arr, i, j) {
    let t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
};

var minPathSum = function (grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (row - 1 >= 0 && col - 1 >= 0) {
        grid[row][col] += Math.min(grid[row - 1][col], grid[row][col - 1]);
      } else if (col - 1 >= 0) {
        grid[row][col] += grid[row][col - 1];
      } else if (row - 1 >= 0) {
        grid[row][col] += rid[row - 1][col];
      }
    }
  }
  console.log(grid)
  return grid.pop().pop();
};

var numDecodings = function (s) {
  let dp = Array(s.length + 1).fill(0);
  dp[0] = 1;
  dp[1] = s[0] == "0" ? 0 : 1;
  for (let i = 1; i < s.length; i++) {
    let one = s.slice(i, i + 1);
    let two = s.slice(i - 1, i + 1);
    if (one > 0 && one < 10) { 
      dp[i + 1] += dp[i];
    }
    if (two <= 26 && two >= 10) { 
      dp[i + 1] += dp[i - 1];
    }
  }
  console.log(dp);
  return dp.pop();
};