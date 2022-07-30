import React from "react";
import "./styles.css";
import { useState } from "react";

/*
Реализовать проект учета покупок.
Юзер после похода в магазин записывает
в наш сервис каждую покупку с ее стоимостью.
Покупки вводятся по одному в специальную форму,
которая имеет три поля: название продукта, его категорию
(еда, одежда и тп, категорию юзер придумывает сам) и цену.
Пользователь может написать категорию продукта в инпут,
либо выбрать ее из списка ранее использованных им категорий.
На экране должен быть виден список продуктов (в виде таблицы),
сделанных за сегодня. В этот список можно добавлять
новые продукты, удалять неверно добавленные,
и редактировать.
Юзер может также посмотреть продукты
за любой день. Кроме того можно выбрать период
времени, за который необходимо вывести список
продуктов.
При просмотре продуктов снизу таблицы должна
выводится их суммарная стоимость. Можно посмотреть
потраченную сумму за любой промежуток времени.
Можно посмотреть сумму за конкретную категорию
продуктов.
Можно построить график трат, детализированный
по дням, неделям, месяцам. График также можно
строить по определенным категориям продуктов.
*/

//import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
let nanoid = (t = 21) => {
  let e = "",
    r = crypto.getRandomValues(new Uint8Array(t));
  for (; t--; ) {
    let n = 63 & r[t];
    e +=
      n < 36
        ? n.toString(36)
        : n < 62
        ? (n - 26).toString(36).toUpperCase()
        : n < 63
        ? "_"
        : "-";
  }
  return e;
};

/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
//рисует календарь
function draw(year, month) {
  let arr = range(getLastDay(year, month));
  let firstWeekDay = getFirstWeekDay(year, month);
  let lastWeekDay = getLastWeekDay(year, month);
  let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);

  return nums;
} //draw

function range(count) {
  let arr = [];
  for (let i = 0; i < count; i++) {
    arr[i] = i + 1;
  } //for

  return arr;
}

function getLastDay(year, month) {
  let date = new Date(year, month + 1, 0);

  return date.getDate();
}
/////////////////////
function getFirstWeekDay(year, month) {
  let date = new Date(year, month, 1);

  let dayWeek = date.getDay();

  if (dayWeek > 0) {
    dayWeek--;
  } //if
  else if (dayWeek == 0) {
    dayWeek = 6;
  }

  return dayWeek;
}

function getLastWeekDay(year, month) {
  let date = new Date(year, month + 1, 0);

  let dayWeek = date.getDay();

  if (dayWeek > 0) {
    dayWeek--;
  } //if
  else if (dayWeek == 0) {
    dayWeek = 6;
  }

  return dayWeek;
}

function normalize(arr, left, right) {
  for (let i = 0; i < left; i++) {
    arr.unshift(" ");
  } //for

  for (let i = 0; i < right; i++) {
    arr.push(" ");
  } //for

  return arr;
}

//////////////////////
function chunk(arr, n) {
  let arrBig = [];

  let k = 0;

  while (k < arr.length) {
    let arrSmall = [];
    arrSmall.length = n;

    for (let j = 0; j < arrSmall.length; j++) {
      arrSmall[j] = arr[k];
      k++;
    } //for

    arrBig.push(arrSmall);
  } //while

  return arrBig;
}

/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////

export default function App() {
  //{name, category, cost}

  let arrProd = [
    {
      id: nanoid(),
      date: "2022-5-7",
      name: "ручка",
      category: "канцелярия",
      cost: 10
    },
    {
      id: nanoid(),
      date: "2022-5-8",
      name: "отвертка",
      category: "инструменты",
      cost: 10
    },
    {
      id: nanoid(),
      date: "2022-5-9",
      name: "кепка",
      category: "одежда",
      cost: 10
    },
    {
      id: nanoid(),
      date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      name: "циркуль",
      category: "канцелярия",
      cost: 10
    }
  ];

  //массив с товарами
  const [prods, setProds] = useState(arrProd);

  let arrList = prods.map((item, index) => {
    return item.category;
  });
  //массив категорий продуктов без повторов
  let listArr = [...new Set(arrList)];

  return (
    <div className="App">
      <p>Учет покупок</p>
      <Table
        prods={prods}
        setProds={setProds}
        name={prods[0].name}
        category={prods[0].category}
        cost={prods[0].cost}
        listArr={listArr}
      />

      <br />

      <InputOne prods={prods} setProds={setProds} listArr={listArr} />
    </div>
  );
}
//------------InputOne--------------
//------------InputOne--------------
//------------InputOne--------------
//------------InputOne--------------
//------------InputOne--------------

function InputOne({ prods, setProds, listArr }) {
  //наименование
  const [valueOne, setValueOne] = useState("");
  //категория
  const [valueTwo, setValueTwo] = useState("");
  //цена
  const [valueThree, setValueThree] = useState("");
  //дата
  const [valueDate, setValueDate] = useState("");

  function addItem() {
    setProds([
      ...prods,
      { date: valueDate, name: valueOne, category: valueTwo, cost: valueThree }
    ]);
  }

  // список неповторяющихся категорий
  const listOne = listArr.map((item) => {
    return (
      <li
        key={nanoid()}
        onClick={(e) => {
          setValueTwo(e.target.innerHTML);
        }}
      >
        {item}
      </li>
    );
  });

  return (
    <div className="container">
      <p> Добавить запись: </p>
      <input
        type="date"
        value={valueDate}
        onChange={(e) => {
          setValueDate(e.target.value);
        }}
      />
      <input
        placeholder="наименование"
        value={valueOne}
        onChange={(e) => {
          setValueOne(e.target.value);
        }}
      />
      <span id="parent">
        <input
          id="elem"
          placeholder="категория"
          value={valueTwo}
          onChange={(e) => {
            setValueTwo(e.target.value);
          }}
        />
        <ul id="list">{valueTwo !== "" ? listOne : ""}</ul>
      </span>
      <input
        placeholder="сумма"
        type="number"
        value={valueThree}
        onChange={(e) => {
          setValueThree(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addItem();
        }}
      >
        ADD
      </button>
      <br />
    </div>
  );
}
//-------------------Table------------------
//-------------------Table------------------
//-------------------Table------------------
//-------------------Table------------------
//-------------------Table------------------
//-------------------Table------------------

function Table({ name, category, cost, prods, setProds, listArr }) {
  //удалить запись из таблицы
  function delItem(index) {
    setProds([
      ...prods.slice(0, index),
      ...prods.slice(index + 1, prods.length)
    ]);
  }

  const [change, setChange] = useState(false);
  // индекс строки
  const [numIndex, setNumIndex] = useState(null);

  // id строки
  const [editId, setEditId] = useState(null);
  //первая дата периода
  const [dateFirst, setDateFirst] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );
  // вторая дата периода
  const [dateSecond, setDateSecond] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );
  // дата сегодня
  const [dateOne, setDateOne] = useState(new Date());

  // день
  const [optionD, setOptionD] = useState(new Date().getDate());
  //месяц
  const [optionM, setOptionM] = useState(new Date().getMonth() + 1);
  //неделя
  const [optionW, setOptionW] = useState();
  //массив с календарем на месяц
  const [monthArr, setMonthArr] = useState(
    draw(dateOne.getFullYear(), optionM - 1)
  );
  //выбранная категория
  const [categoryName, setCategoryName] = useState(null);

  // значение инпута в таблице
  function getValue(prop, index, arr = prods) {
    return arr.reduce(
      (res, item, index) => (item.id === editId ? item[index] : res),
      arr[index][prop]
    );
  }
  // изменение ячейки таблицы
  function changeItem(prop, event) {
    setProds(
      prods.map((item) =>
        item.id === editId ? { ...item, [prop]: event.target.value } : item
      )
    );
  }

  //меняет первый и последний день периода
  function changeFirstEndDay(e) {
    let dateChange = `${new Date().getFullYear()}-${optionM}-${e}`;
    setDateFirst(dateChange);
    setDateSecond(dateChange);
  }
  // меняет месяц
  function changeMonth(e) {
    let dateChangeStart = `${new Date().getFullYear()}-${e}-${1}`;

    let newMonth = draw(new Date().getFullYear(), e - 1);

    let endDay = newMonth[newMonth.length - 1].filter((item) => {
      return item != " ";
    });

    let dateChangeEnd = `${new Date().getFullYear()}-${e}-${
      endDay[endDay.length - 1]
    }`;
    setDateFirst(dateChangeStart);
    setDateSecond(dateChangeEnd);
  }

  //строки отфильтрованные по периоду
  const resultPeriod = prods.filter((item) => {
    let itemDate = new Date(item.date);
    let first = new Date(dateFirst);
    let second = new Date(dateSecond);

    /* console.log(
       
      itemDate.getTime() >= first.getTime(),
      itemDate.getTime() <= second.getTime()
    ); */

    return (
      JSON.stringify(itemDate) >= JSON.stringify(first) &&
      JSON.stringify(itemDate) <= JSON.stringify(second)
    );
  });

  //строки таблицы сортированные по периоду
  let resultTwo = [];

  resultTwo = tableMap(resultPeriod);

  // фильтр по категориям

  const resultCategory = prods.filter((item) => {
    if (categoryName !== null && categoryName !== "по категориям") {
      let catOne = categoryName;

      return item.category == catOne ? item : "";
    }
  });

  // строки таблицы сортированные по категориям
  const resultThreeCategory = tableMap(resultCategory);

  // устанавливает начало и конец недели в период

  function changeWeek(e) {
    let newMonth = draw(new Date().getFullYear(), optionM - 1);

    if (e >= 0) {
      const startEndTwo = newMonth[e].filter((item) => {
        //filter
        return item !== " ";
      });

      setDateFirst(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          startEndTwo[0]
        }`
      );

      setDateSecond(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          startEndTwo[startEndTwo.length - 1]
        }`
      );

      setOptionW(e);
    }
  }

  //---создание строк таблицы из массива
  function tableMap(arr) {
    return arr.map((item, index, arr) => {
      return (
        <tr
          key={item.id}
          onClick={() => {
            setEditId(item.id);
            setNumIndex(index);
            setChange(true);
          }}
          onBlur={() => {
            setEditId(null);
            setNumIndex(null);
          }}
        >
          {/* <td>
            <input
              value={getValue("date", index, arr)}
              onChange={(event) => changeItem("date", event)}
            />
          </td> */}
          <td>
            <input
              value={getValue("name", index, arr)}
              onChange={(event) => changeItem("name", event)}
            />
          </td>
          <td>
            <input
              value={getValue("category", index, arr)}
              onChange={(event) => changeItem("category", event)}
            />
          </td>
          <td>
            <input
              type="number"
              value={getValue("cost", index, arr)}
              onChange={(event) => changeItem("cost", event)}
            />
          </td>
          <td>
            <button
              onClick={() => {
                delItem(index);
              }}
            >
              DEL
            </button>
          </td>
        </tr>
      );
    });
  }
  //---
  // сумма товаров
  function sum(arr = prods) {
    let summa = 0;
    for (let i = 0; i < arr.length; i++) {
      summa = +arr[i].cost + summa;
    }

    return summa;
  }

  let arrDays = [];
  let arrMonths = [];
  let arrWeek = [];
  // заполнение массивов номерами для options
  arrDays = arrNumbersFill(arrDays, 31);
  arrMonths = arrNumbersFill(arrMonths, 12);
  arrWeek = arrNumbersFill(arrWeek, monthArr.length, 0);

  function arrNumbersFill(arr, num, step = 1) {
    for (let i = 0; i < num; i++) {
      arr[i] = i + step;
    }
    return arr;
  }
  //options для дней
  const optionsDays = optionsMaps(arrDays);
  //options для месяцев
  const optionsMonths = optionsMaps(arrMonths);

  //options для недель

  const optionsWeeks = arrWeek.map((item, index) => {
    return (
      <option key={nanoid()} value={item}>
        {item + 1}
      </option>
    );
  });

  // для выпадающего списка по категориям/дате

  const listArrAddEnd = ["по категории", ...listArr, "по дате"];

  const listOptions = optionsMaps(listArrAddEnd);

  //создает options из массива
  function optionsMaps(arr) {
    return arr.map((item, index) => {
      return <option key={nanoid()}>{item}</option>;
    });
  }
  // return TABLE
  return (
    <>
      <table>
        <thead>
          <td>Наимен</td>
          <td>Катег</td>
          <td>Цена</td>
          <td> </td>
        </thead>
        {categoryName === null ? resultTwo : resultThreeCategory}
      </table>

      <ChangesInputs
        categoryName={categoryName}
        resultPeriod={resultPeriod}
        sum={sum}
        resultCategory={resultCategory}
        dateFirst={dateFirst}
        dateSecond={dateSecond}
        optionD={optionD}
        setOptionD={setOptionD}
        changeFirstEndDay={changeFirstEndDay}
        optionsDays={optionsDays}
        optionM={optionM}
        setOptionM={setOptionM}
        changeMonth={changeMonth}
        optionsMonths={optionsMonths}
        optionW={optionW}
        changeWeek={changeWeek}
        optionsWeeks={optionsWeeks}
        setDateFirst={setDateFirst}
        setDateSecond={setDateSecond}
        setCategoryName={setCategoryName}
        listOptions={listOptions}
      />
    </>
  );
}
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////

function ChangesInputs({
  categoryName,
  resultPeriod,
  sum,
  resultCategory,
  dateFirst,
  dateSecond,
  optionD,
  setOptionD,
  changeFirstEndDay,
  optionsDays,
  optionM,
  setOptionM,
  changeMonth,
  optionsMonths,
  optionW,
  changeWeek,
  optionsWeeks,
  setDateFirst,
  setDateSecond,
  setCategoryName,
  listOptions
}) {
  return (
    <>
      <span>Сумма: </span>{" "}
      {categoryName === null ? sum(resultPeriod) : sum(resultCategory)}
      <span> руб. </span>
      <br />
      <br />
      <span>c: </span>
      {dateFirst}
      <span> по: </span>
      {dateSecond}
      <br />
      <span> день: </span>
      <select
        value={optionD}
        onChange={(e) => {
          setOptionD(+e.target.value);
          changeFirstEndDay(+e.target.value);
        }}
      >
        {optionsDays}
      </select>{" "}
      <span> месяц: </span>
      <select
        value={optionM}
        onChange={(e) => {
          setOptionM(+e.target.value);
          changeMonth(+e.target.value);
        }}
      >
        {optionsMonths}
      </select>
      <span> неделя: </span>
      <select
        value={optionW}
        onChange={(e) => {
          changeWeek(+e.target.value);
        }}
      >
        {optionsWeeks}
      </select>{" "}
      <br />
      <span> период: </span>
      <input
        type="date"
        value={dateFirst}
        onChange={(e) => {
          setDateFirst(e.target.value);
        }}
      />
      <input
        type="date"
        value={dateSecond}
        onChange={(e) => {
          setDateSecond(e.target.value);
        }}
      />{" "}
      <br />
      <span> по категории/дате: </span>
      <select
        onChange={(e) => {
          if (e.target.value != "по дате") {
            setCategoryName(e.target.value);
          } else {
            setCategoryName(null);
          }
        }}
      >
        {listOptions}
      </select>
      <br />
    </>
  );
}
