/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './towns.html';

const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
  const method = 'GET';
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.responseType = 'json';

  const towns = new Promise((resolve, reject) => {
    xhr.addEventListener('error', () => {
      reject();
    });
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

  xhr.send();
  return towns;
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  chunk = chunk.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  const regexp = new RegExp(chunk, 'i');
  return regexp.test(full);
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

const onSuccess = function () {
  loadingBlock.classList.toggle('hidden');
  filterBlock.classList.toggle('hidden');
  filterInput.focus();
};
const onFailure = function () {
  loadingBlock.classList.toggle('hidden');
  loadingFailedBlock.classList.toggle('hidden');
  retryButton.focus();
};

let towns = loadTowns();
towns
  .then(() => {
    onSuccess();
  })
  .catch(() => {
    onFailure();
  });

retryButton.addEventListener('click', (e) => {
  loadingFailedBlock.classList.toggle('hidden');
  loadingBlock.classList.toggle('hidden');
  towns = loadTowns();
  towns
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onFailure();
    });
});

filterInput.addEventListener('input', function (e) {
  towns.then((array) => {
    const arrTownsToShow = array.filter(
      (item) => e.target.value && isMatching(item.name, e.target.value)
    );
    filterResult.innerHTML = '';
    for (const town of arrTownsToShow) {
      const div = document.createElement('div');
      div.textContent = town.name;
      filterResult.appendChild(div);
    }
  });
});

loadingFailedBlock.classList.add('hidden');
filterBlock.classList.add('hidden');

export { loadTowns, isMatching };
