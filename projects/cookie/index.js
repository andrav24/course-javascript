/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const addCookie = (key, value, expireDate = '') => {
  let cookie = `${key}=${value}; `;
  if (expireDate.length) {
    cookie += `max-age=${expireDate}}`;
  }
  document.cookie = cookie;
};

const deleteCookie = (key) => {
  const value = '';
  const exp = '0';
  addCookie(key, value, exp);
};

const getMyCookies = () => {
  const cookies = document.cookie;
  if (!cookies.length) return [];
  return document.cookie.split('; ').map((cookie) => {
    const [name, value] = cookie.split('=');
    return { name, value };
  });
};

const isMatching = (string, pattern) => {
  const regexp = new RegExp(pattern, 'i');
  return regexp.test(string);
};

const updateTable = () => {
  const cookies = getMyCookies();
  if (!cookies) return false;
  const pattern = filterNameInput.value;
  listTable.innerHTML = cookies
    .filter(
      (cookie) => isMatching(cookie.name, pattern) || isMatching(cookie.value, pattern)
    )
    .reduce(
      (acc, cookie) =>
        (acc += `
      <tr>
        <td class="cookie-name">${cookie.name}</td>
        <td class="cookie-value">${cookie.value}</td>
        <td><button>Удалить</button></td>
      </tr>`),
      ''
    );
};

filterNameInput.addEventListener('input', function () {
  updateTable();
});

addButton.addEventListener('click', () => {
  const key = addNameInput.value;
  const value = addValueInput.value;
  addCookie(key, value);
  updateTable();
});

listTable.addEventListener('click', (e) => {
  let parent = e.target.parentElement;
  do {
    if (e.target.tagName === 'BUTTON' && parent.tagName === 'TR') {
      const name = parent.querySelector('.cookie-name');
      deleteCookie(name.innerText);
      updateTable();
    }
  } while ((parent = parent.parentElement));
});
