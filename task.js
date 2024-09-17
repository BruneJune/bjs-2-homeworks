//Домашнее задание к лекции 1 «Основные понятия»
//Задание 1

"use strict";

"use strict";

function solveEquation(a, b, c) {
  let arr = [];
  let discriminant = b ** 2 - 4 * a * c; // Вычисляем дискриминант

  if (discriminant < 0) {
    // Корней нет, возвращаем пустой массив
    return arr;
  } else if (discriminant === 0) {
    // Один корень
    let singleRoot = -b / (2 * a);
    arr.push(singleRoot);
  } else {
    // Два корня
    let root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    let root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    arr.push(root1, root2);
  }

  return arr; // Возвращаем массив с корнями
}


// Задание 2

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  let monthlyRate = (percent / 100) / 12;

  let loanBody = amount - contribution;

  if (loanBody <= 0) {
    return 0;
  }

  let monthlyPayment = loanBody * (monthlyRate + (monthlyRate / ((1 + monthlyRate) ** countMonths - 1)));

  let totalAmount = monthlyPayment * countMonths;

  return +totalAmount.toFixed(2);
}