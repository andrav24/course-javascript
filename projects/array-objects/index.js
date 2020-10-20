/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */
function forEach(array, fn) {
  if (!Array.isArray(array)) {
    throw new TypeError(array + ' must be array');
  }
  if (typeof fn !== 'function') {
    throw new TypeError(fn + ' must be function');
  }

  const len = array.length;
  for (let i = 0; i < len; i++) {
    fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */
function map(array, fn) {
  if (!Array.isArray(array)) {
    throw new TypeError(array + ' must be array');
  }
  if (typeof fn !== 'function') {
    throw new TypeError(fn + ' must be function');
  }

  const len = array.length;
  const newArr = new Array(len);
  for (let i = 0; i < len; i++) {
    newArr[i] = fn(array[i], i, array);
  }
  return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */
function reduce(array, fn, initial) {
  if (!Array.isArray(array)) {
    throw new TypeError(array + ' must be array');
  }
  if (typeof fn !== 'function') {
    throw new TypeError(fn + ' must be function');
  }

  const len = array.length;
  let startPos;
  let acc;
  const hasInitial = initial !== undefined;

  if (!hasInitial && len === 0) {
    throw new TypeError('Empty array with no initial value');
  }
  if (!hasInitial) {
    acc = array[0];
    startPos = 1;
  } else {
    acc = initial;
    startPos = 0;
  }

  for (let i = startPos; i < len; i++) {
    acc = fn(acc, array[i], i, array);
  }
  return acc;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  return Object.keys(obj).map((el) => el.toUpperCase());
}

/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */
function createProxy(obj) {
  return new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = Math.pow(value, 2);
      return true;
    },
  });
}

export { forEach, map, reduce, upperProps, createProxy };
