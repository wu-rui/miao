
// dymatic programming
var longestPalindrome = function (s) {
  let len = s.length;
  let dp = Array(len).fill(0).map(it => {
    return Array(len).fill(false);
  })
  let maxlen = 0;
  let res = ""
  for (let r = 1; r < s.length; r++) {
    for (let l = 0; l <= r; l++) {
      if (l == r) {
        dp[l][r] = true;
      } else if (r - l == 1 && s[r] == s[l]) {
        dp[l][r] = true;
      } else if (s[r] == s[l] && dp[l + 1][r - 1]) {
        dp[l][r] = true;
      }
      if (dp[l][r] == true) {
        let len = r - l + 1;
        if (len > maxlen) {
          maxlen = len;
          res = s.slice(l, r + 1)
        }
      }
    }
  }
  return res;
};
var maxSubArray = function (nums) {
  let len = nums.length;
  let dp = Array(len);
  for (let i = 0; i < len; i++) {
    if (i == 0) {
      dp[i] == nums[i];
    }
    dp[i] = nums[i] + dp[i - 1] > 0 ? dp[i - 1] : 0;
  }
  return Math.max(...dp);
};
var uniquePaths = function (m, n) {
  let dp = Array(m).fill(0).map(it => {
    return Array(n).fill(1);
  })
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (j == 0 && j == 0) {
        dp[i][j] = 1;
      } else if (i == 0 && j == 1 || i == 1 && j == 0) {
        dp[i][j] = 1;
      } else {
        let top = i < 0 ? 0 : dp[i - 1][j];
        let left = j < 0 ? 0 : dp[i][j - 1]
        dp[i][j] = top + left;
      }
    }
  }
  return dp[m - 1][n - 1]
}
var uniquePathsWithObstacles = function (obstacleGrid) {
  for (var i = 0; i < obstacleGrid.length; i++) {
    for (var j = 0; j < obstacleGrid[0].length; j++) {
      if (obstacleGrid[i][j] != 1) {
        if (i == 0 && j == 0) {
          obstacleGrid[i][j] = -1;
        } else {
          if (i - 1 > 0) {
            let top = (obstacleGrid[i - 1][j] == 1 ? 0 : obstacleGrid[i - 1][j]);
          } else {
            let top = 0;
          }
          if (j - 1 < 0) {
            let left = (obstacleGrid[i][j - 1] == 1 ? 0 : obstacleGrid[i][j - 1]);
          } else {
            let left = 0;
          }
          obstacleGrid[i][j] = top + left;
        }
      }
    }
  }
  console.log(obstacleGrid)
  return obstacleGrid[i - 1][j - 1] == 1 ? 0 : -obstacleGrid[i - 1][j - 1]
};

var climbStairs = function (n) {
  if (n == 1) {
    return 1;
  }
  if (n == 2) {
    return 2;
  }
  let pre = 1;
  let res = 2;
  for (let i = 3; i <= n; i++) {
    res += pre;
    pre = res - pre;
  }
  return res;
};
var maximalSquare = function (matrix) {
  let max = 0;
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[0].length; j++) {
      if (matrix[i][j] == 1 && i !== 0 && j !== 0) {
        matrix[i][j] += Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
      }
      if (matrix[i][j] > max) {
        max = matrix[j][j];
      }
    }
  }
  return max;
};
var nthUglyNumber = function (n) {
  let arr = [];
  let k2 = 0, k3 = 0, k5 = 0;
  arr[0] = 1;
  for (let i = 1; i < n; i++) {
    arr[i] = Math.min(arr[k2] * 2, arr[k3] * 3, arr[k5] * 5);
    if (arr[i] == arr[k2] * 2) k2++;
    if (arr[i] == arr[k3] * 3) k3++;
    if (arr[i] == arr[k5] * 5) k5++;
  }
  return arr.pop();
};
var numSquares = function (n) {
  let dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= n; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }
  return dp.pop();
};

var lengthOfLIS = function (nums) {
  let dp = [];
  for (let i = 0; i < nums.length; i++) {
    let premax = 0;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && dp[j] > premax) {
        premax = dp[j]
      }
    }
    dp[i] = premax + 1;;
  }
  return Math.max(...dp);
};
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.sums = [];
  this.sums[0] = 0;
  for (let i = 0; i < nums.length; i++) {
    this.sums[i + 1] = this.sums[i] + nums[i];
  }
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
  return this.sums[j + 1] - this.sums[i];
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */

/**
* @param {number[][]} matrix
*/
var NumMatrix = function (matrix) {
  this.row = matrix.length;
  this.col = matrix[0].length;
  this.matrixSum = Array(row + 1).fill(0).map(it => Array(col + 1));
  for (let i = 0; i < matrixSum.length; i++) {
    for (let j = 0; j < matrixSum[0].length; j++) {
      if (j == 0 || i == 0) {
        matrixSum[i][j] = 0;
      } else {
        matrixSum[i][j] = matrixSum[i - 1][j] + matrixSum[i][j - 1] - matrixSum[i - 1][j - 1] + matrix[i - 1][j - 1];
      }
    }
  }
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  return this.matrixSum[row2][col2] + this.matrixSum[row1][col1] - this.matrixSum[row1 - 1][col2] - this.matrixSum[row2][col1 - 1];
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */