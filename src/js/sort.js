'use strict';

const data = [
  {
    "id": 26,
    "title": "Побег из Шоушенка",
    "imdb": 9.30,
    "year": 1994
  },
  {
    "id": 25,
    "title": "Крёстный отец",
    "imdb": 9.20,
    "year": 1972
  },
  {
    "id": 27,
    "title": "Крёстный отец 2",
    "imdb": 9.00,
    "year": 1974
  },
  {
    "id": 1047,
    "title": "Тёмный рыцарь",
    "imdb": 9.00,
    "year": 2008
  },
  {
    "id": 223,
    "title": "Криминальное чтиво",
    "imdb": 8.90,
    "year": 1994
  }
]

export default function sortCollection() {
  const sortArray = [
    ['id', 'desc'],
    ['id', 'asc'],
    ['title', 'desc'],
    ['title', 'asc'],
    ['year', 'desc'],
    ['year', 'asc'],
    ['imdb', 'desc'],
    ['imdb', 'asc'],
  ]
  let bodyTable = document.getElementsByTagName('tbody')[0];

  // рисуем таблицу
  for (let item of data) {
    bodyTable.insertAdjacentHTML('beforeend', `
      <tr data-id="${item.id}" data-title="${item.title}" data-year="${item.year}" data-imdb="${item.imdb}">
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.year}</td>
        <td>imdb: ${item.imdb.toFixed(2)}</td>
      </tr>
    `)
  }

  // получаем коллекцию таблицы
  let bodyTableCollection = document.getElementsByTagName('tbody')[0];

  // запускаем сортировку с интервалом 2 секунды
  let sortArrayIndex = 0
  setInterval(() => {

    // удаляем стрелки в шапке
    let arrow = document.getElementById('arrow');
    if (arrow) { arrow.remove() }

    // сортируем коллекцию
    let e = bodyTableCollection.children;
    [].slice
      .call(e)
      .sort(function(a, b) {
        if (sortArray[sortArrayIndex][1] === 'desc') {
          return a.dataset[sortArray[sortArrayIndex][0]].localeCompare(b.dataset[sortArray[sortArrayIndex][0]]);
        } else {
          return b.dataset[sortArray[sortArrayIndex][0]].localeCompare(a.dataset[sortArray[sortArrayIndex][0]]);
        }
      })
      .forEach(function(val, index) {
        bodyTableCollection.appendChild(val);
      });

    // рисуем стрелку на том столбце, который сортируем
    let columnHeader = document.getElementById(sortArray[sortArrayIndex][0]);
    if (sortArray[sortArrayIndex][1] === 'desc') {
      columnHeader.insertAdjacentHTML('beforeend', `
        <i id="arrow" class="arrow up"></i>
      `)
    } else {
      columnHeader.insertAdjacentHTML('beforeend', `
        <i id="arrow" class="arrow down"></i>
      `)
    }

    // переходим на следующий столбец
    sortArrayIndex === (sortArray.length - 1) ? sortArrayIndex = 0 : sortArrayIndex += 1;
  }, 2000)
}
