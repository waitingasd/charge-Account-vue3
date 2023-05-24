import { BigNumber } from 'bignumber.js';

// 加法
export function add(num1, num2, result) {
  var count1 = BigNumber(num1);
  var count2 = BigNumber(num2);
  result = count1.plus(count2).toNumber();
  var str = ''+result;
  if (/e/i.test(str)) {
    result = (result).toFixed(18).replace(/\.?0+$/, "");
  };
  return result
}

// 减法
export function subtraction(num1, num2, result) {
  var count1 = BigNumber(num1);
  var count2 = BigNumber(num2);
  result = count1.minus(count2).toNumber();
  var str = ''+result;
  if (/e/i.test(str)) {
    result = (result).toFixed(18).replace(/\.?0+$/, "");
  };
  return result
}

// // 乘法
// export function multiply(num1, num2, result) {
//   var count1 = BigNumber(num1);
//   var count2 = BigNumber(num2);
//   result = count1.times(count2).toNumber();
//   var str = ''+result;
//   if (/e/i.test(str)) {
//     result = (result).toFixed(18).replace(/\.?0+$/, "");
//   };
//   return result
// }

// // 除法
// export function division(num1, num2, result) {
//   var count1 = BigNumber(num1);
//   var count2 = BigNumber(num2);
//   result = count1.dividedBy(count2).toNumber();
//   var str = ''+result;
//   if (/e/i.test(str)) {
//     result = (result).toFixed(18).replace(/\.?0+$/, "");
//   };
//   return result
// }