/* ДЗ 5 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунд

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
  const method = 'GET';
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.responseType = 'json';

  const towns = new Promise((resolve, reject) => {
    xhr.addEventListener('load', (e) => {
      if (xhr.status >= 400) {
        reject(xhr.responseText);
      } else {
        const res = xhr.response;
        res.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
        resolve(res);
      }
    });
  });

  towns.then((response) => {
    response.sort((a, b) => {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  });

  xhr.send();
  return towns;
}

export { delayPromise, loadAndSortTowns };
