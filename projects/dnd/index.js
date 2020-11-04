/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');
homeworkContainer.classList.add('dropzone');
const addDivButton = homeworkContainer.querySelector('#addDiv');
const dropzone = document.querySelector('.dropzone');
addDivButton.addEventListener('click', addElement);
dropzone.addEventListener('dragover', dragOverHandler);
dropzone.addEventListener('drop', dropHandler);
document.addEventListener('dragend', endDrag);
document.addEventListener('dragstart', startDrag);

let currentDrag;

function startDrag(e) {
  currentDrag = e.target;
  const style = window.getComputedStyle(currentDrag, null);
  e.dataTransfer.setData(
    'text',
    `${parseInt(style.getPropertyValue('left'), 10) - e.clientX},
      ${parseInt(style.getPropertyValue('top'), 10) - e.clientY}
      `
  );
  requestAnimationFrame(function () {
    currentDrag.classList.add('hide');
  });
}
function endDrag(e) {
  currentDrag.classList.remove('hide');
}
function dropHandler(e) {
  const data = e.dataTransfer.getData('text').split(',');
  currentDrag.style.left = e.clientX + parseInt(data[0], 10) + 'px';
  currentDrag.style.top = e.clientY + parseInt(data[1], 10) + 'px';
  e.dataTransfer.clearData();
  e.preventDefault();
}
function dragOverHandler(e) {
  e.preventDefault();
  return false;
}

function addElement() {
  const div = createDiv();
  renderElement(div);
}

function renderElement(elem) {
  dropzone.appendChild(elem);
}

export function createDiv() {
  const div = document.createElement('DIV');
  div.style.backgroundColor = generateColorRGB();
  div.style.width = generateSize(4, 10, '%');
  div.style.height = generateSize(4, 10, '%');
  const pos = generateElementPosition(dropzone);
  div.style.left = `${pos.left}px`;
  div.style.top = `${pos.top}px`;
  div.draggable = true;
  div.classList.add('draggable-div');
  return div;

  function generateColorRGB() {
    const min = 0;
    const max = 255;
    return (
      'rgb(' +
      randomIntFromInterval(min, max) +
      ', ' +
      randomIntFromInterval(min, max) +
      ', ' +
      randomIntFromInterval(min, max) +
      ')'
    );
  }
  function generateSize(min, max, unit) {
    return `${randomIntFromInterval(min, max)}${unit}`;
  }
  function generateElementPosition(root) {
    const { width, height } = getElementSize(root);
    return {
      left: randomIntFromInterval(0, width),
      top: randomIntFromInterval(0, height),
    };
  }
  function getElementSize(elem) {
    return {
      width: elem.offsetWidth,
      height: elem.offsetHeight,
    };
  }
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
