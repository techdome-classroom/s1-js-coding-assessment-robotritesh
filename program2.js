const decodeTheRing = function (s, p) {
  const sLen = s.length;
  const pLen = p.length;

  // Create a 2D DP array
  const dp = Array(sLen + 1).fill(false).map(() => Array(pLen + 1).fill(false));

  // Base case: empty pattern and empty string match
  dp[0][0] = true;

  // Initialize dp for patterns with leading stars
  for (let j = 1; j <= pLen; j++) {
      if (p[j - 1] === '*') {
          dp[0][j] = dp[0][j - 1];  // '*' can match empty sequence
      }
  }

  // Fill the dp table
  for (let i = 1; i <= sLen; i++) {
      for (let j = 1; j <= pLen; j++) {
          if (p[j - 1] === '?' || p[j - 1] === s[i - 1]) {
              // '?' matches any single character, or characters match exactly
              dp[i][j] = dp[i - 1][j - 1];
          } else if (p[j - 1] === '*') {
              // '*' can either match zero characters (dp[i][j-1]) or one or more (dp[i-1][j])
              dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
          }
      }
  }

  
  return dp[sLen][pLen];
};

module.exports = decodeTheRing;
