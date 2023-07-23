/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
  allPass,
  compose,
  countBy,
  equals,
  identity,
  prop,
  propEq,
  values,
} from 'ramda';

const isBiggestTwo = (a, b = 2) => a >= b;

const isRed = equals('red');
const isGreen = equals('green');
const isWhite = equals('white');
const isBlue = equals('blue');
const isOrange = equals('orange');
const getTriangle = prop('triangle');
const getGreen = prop('green');
const twoGreens = propEq('green', 2);
const oneRed = propEq('red', 1);
const isGreenTriangle = compose(isGreen, getTriangle);
const countColors = compose(countBy(identity), values);
const countGreenColors = compose(getGreen, countColors);
const twoGreenColors = compose(twoGreens, countColors);
const oneRedColor = compose(oneRed, countColors);
const redAndBlue = ({ blue, red }) => blue === red;
const moreThree = ({ red, green, blue, orange }) =>
  red > 2 || green > 2 || blue > 2 || orange > 2;
const allOrange = ({ orange }) => orange === 4;

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) =>
  isRed(star) && isGreen(square) && isWhite(triangle) && isWhite(circle);
// allPass([isRed(star), isGreen(square), isWhite(triangle), isWhite(circle)]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(isBiggestTwo, countGreenColors);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(redAndBlue, countColors);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({ star, square, circle }) =>
  isRed(star) && isOrange(square) && isBlue(circle);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(moreThree, countColors);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  isGreenTriangle,
  twoGreenColors,
  oneRedColor,
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(allOrange, countColors);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({ star }) => !isRed(star) && !isWhite(star);

// 9. Все фигуры зеленые.
export const validateFieldN9 = ({ star, square, triangle, circle }) =>
  isGreen(star) && isGreen(square) && isGreen(triangle) && isGreen(circle);
// allPass([isGreen(star), isGreen(square), isGreen(triangle), isGreen(circle)]);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ square, triangle }) =>
  !isWhite(square) && square === triangle;
