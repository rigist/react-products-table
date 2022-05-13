import React from "react";
import "./styles.css";
import { useState } from "react";
//260422 16-02
//270422  9-11
/*
Реализовать проект учета покупок.
Юзер после похода в магазин записывает
в наш сервис каждую покупку с ее стоимостью.
Покупки вводятся по одному в специальную форму,
которая имеет три поля: название продукта, его категорию
(еда, одежда и тп, категорию юзер придумывает сам) и цену.[]
Пользователь может написать категорию продукта в инпут,[x]
либо выбрать ее из списка ранее использованных им категорий.[$]
На экране должен быть виден список продуктов (в виде таблицы),[]
сделанных за сегодня. В этот список можно добавлять
новые продукты, удалять неверно добавленные,
и редактировать.[]
Юзер может также посмотреть продукты
за любой день.[] Кроме того можно выбрать период
времени, за который необходимо вывести список
продуктов.[]
При просмотре продуктов снизу таблицы должна
выводится их суммарная стоимость.[x] Можно посмотреть
потраченную сумму за любой промежуток времени.[]
Можно посмотреть сумму за конкретную категорию
продуктов.[]
Можно построить график трат, детализированный
по дням, неделям, месяцам.[$] График также можно
строить по определенным категориям продуктов.[$]
*/
// три поля, выпадающий список категорий, сумма по промежут, сумма  по категориям, график по категориям
// http://code.mu/ru/javascript/framework/react/book/prime/states/select/
// дату сумму
//52 нед и где-то 2 дня
// ставилось 5 часов  дня
// вторая дато чтоб больше первой
// сброс строки  с инструм
//после клика на строку, после нажатия add, строка не видна
// в инпут не добавл дата
/*
080522   
11-40  12-42
17-28 18-25 дни option
отд
18-36 е
19-31  20-18
21-23

090522
12-04  12-49
отд
13-00  13-16
15:02-
17-38  - 18-50
е
19-36

100522
12-16 12-33
19-56

110522
120522
20-06

130522 
17-01
*/

//http://code.mu/ru/javascript/faq/js-compare-dates/

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

export default function App() {
  //{name, category, cost}

  let arrProd = [
    {
      id: nanoid(),
      date: "2022-5-7",
      name: "ручка",
      category: "канц",
      cost: 10
    },
    {
      id: nanoid(),
      date: "2022-5-8",
      name: "отверт",
      category: "инстр",
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
      category: "канц",
      cost: 10
    }
  ];

  const [prods, setProds] = useState(arrProd);

  /*   const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState(""); */

  /* const result = prods.map((item) => {
    return (
      <p key={nanoid()}>
        <span>{item.name}</span>,<span>{item.category}</span>,
        <span>{item.cost}</span>
        <button onClick={() => {}}>edit</button>
      </p>
    );
  }); */

  let arrList = prods.map((item, index) => {
    return item.category;
  });

  let listArr = [...new Set(arrList)];

  return (
    <div className="App">
      <Table
        prods={prods}
        setProds={setProds}
        name={prods[0].name}
        category={prods[0].category}
        cost={prods[0].cost}
        listArr={listArr}
      />
      {/*  {result} */}
      {/*  <p>{prods[1] ? prods[1].name : ""}</p> */}
      {/*  <input
        onChange={(e) => {
          setProds([
            ...prods,
            { name: e.target.value, category: "канц", cost: 10 }
          ]);
          console.log(prods);
        }}
      /> */}
      <br />

      <InputOne
        prods={prods}
        setProds={setProds}
        listArr={listArr} /* set={setName} */
      />
      {/*  <InputOne set={setCategory} />
      <InputOne set={setCost} /> */}
    </div>
  );
}
//------------InputOne--------------
//------------InputOne--------------
//------------InputOne--------------
//------------InputOne--------------
//------------InputOne--------------

function InputOne({ prods, setProds, listArr }) {
  const [value, setValue] = useState("");

  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [valueThree, setValueThree] = useState("");
  const [valueDate, setValueDate] = useState("");

  //const texts = ["text1", "text2", "text3", "text4"];

  const options = prods.map((item, index) => {
    return (
      <option key={nanoid()} value={index}>
        {item.category}
      </option>
    );
  });

  function addItem() {
    setProds([
      ...prods,
      { date: valueDate, name: valueOne, category: valueTwo, cost: valueThree }
    ]);
  }

  //console.log("listOne", listOne);

  const listOne = listArr.map((item) => {
    return (
      <ul key={nanoid()}>
        <li
          onClick={(e) => {
            setValueTwo(e.target.innerHTML);
            //  console.log(e.target.innerHTML);
          }}
        >
          {item}
        </li>
      </ul>
    );
  });

  //const listOne

  return (
    <div>
      <input
        type="date"
        value={valueDate}
        onChange={(e) => {
          setValueDate(e.target.value);
          //console.log(prods);
        }}
      />
      <input
        value={valueOne}
        onChange={(e) => {
          setValueOne(e.target.value);
          //console.log(prods);
        }}
      />

      <input
        value={valueTwo}
        onChange={(e) => {
          setValueTwo(e.target.value);

          //console.log(prods);
        }}
      />
      <input
        type="number"
        value={valueThree}
        onChange={(e) => {
          setValueThree(e.target.value);
          //console.log(prods);
        }}
      />
      <button
        onClick={() => {
          //console.log(valueDate);
          addItem();
          //console.log(valueDate);
        }}
      >
        ADD
      </button>
      <br />
      {/*  <div>
        <select
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setValueTwo("prods[+value].category");
            //console.log("p")
          }}
        >
          {options}
        </select>
        <p>ваш выбор: {prods[+value].category}</p>
      </div> */}
      {valueTwo !== "" ? listOne : "*"}
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
  function delItem(index) {
    // console.log(index);
    setProds([
      ...prods.slice(0, index),
      ...prods.slice(index + 1, prods.length)
    ]);
  }

  const [change, setChange] = useState(false);

  const [numIndex, setNumIndex] = useState(null);

  /* function changeItem(e) {
    //console.log((prods[index].name = e.target.value));
    console.log("numIndex", numIndex);
    console.log(e.target.value);
    setProds([
      ...prods.slice(0, numIndex),
      {
        name: e.target.value,
        category: "item.category",
        cost: "item.cost"
      },
      ...prods.slice(numIndex + 1, prods.length)
    ]);
    console.log("prods", prods);
  } //changeItem */

  /*   function inputChange(e, item) {
    change === false ? (
      item.name
    ) : (
      <input value={item.name} onChange={changeItem} />
    );
  } */

  const [editId, setEditId] = useState(null);

  const [dateFirst, setDateFirst] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );

  const [dateSecond, setDateSecond] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );

  const [dateOne, setDateOne] = useState(new Date());

  const [optionD, setOptionD] = useState(new Date().getDate());
  const [optionM, setOptionM] = useState(new Date().getMonth() + 1);
  const [optionW, setOptionW] = useState();

  const [monthArr, setMonthArr] = useState(
    draw(dateOne.getFullYear(), optionM - 1)
  );

  const [categoryName, setCategoryName] = useState(null);

  //console.log(dateOne);

  /////////////////////////////
  /////////////////////////////
  //console.log("dr", monthArr);

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

  function getValue(prop, index, arr = prods) {
    //console.log(prop, index);
    return arr.reduce(
      (res, item, index) =>
        item.id === editId ? item[index] /* item[prop] */ : res,
      arr[index][prop]
    );
  }

  function changeItem(prop, event) {
    setProds(
      prods.map((item) =>
        item.id === editId ? { ...item, [prop]: event.target.value } : item
      )
    );
  }

  let resultTwo = "*";

  //по дате
  const resultDate = prods.map((item) => {
    let itemDate = new Date(item.date);
    /*  console.log("dateOne1", dateOne);
    console.log("itemDate", itemDate);
    console.log(dateOne == itemDate);

    console.log(
      "111",
      JSON.stringify(new Date("2022-04-07")) ==
        JSON.stringify(new Date("2022-04-07"))
    ); */

    return JSON.stringify(itemDate) == JSON.stringify(dateOne) ? item : "";
  });

  function changeFirstEndDay(e) {
    let dateChange = `${new Date().getFullYear()}-${
      /* new Date().getMonth() */ optionM
    }-${e}`;
    setDateFirst(dateChange);
    setDateSecond(dateChange);
  }

  function changeMonth(e) {
    let dateChangeStart = `${new Date().getFullYear()}-${e}-${1}`;

    let newMonth = draw(new Date().getFullYear(), e - 1);

    let endDay = newMonth[newMonth.length - 1].filter((item) => {
      return item != " ";
    });

    //console.log("endDay", newMonth[newMonth.length - 1], endDay);

    let dateChangeEnd = `${new Date().getFullYear()}-${e}-${
      endDay[endDay.length - 1]
    }`;
    setDateFirst(dateChangeStart);
    setDateSecond(dateChangeEnd);
  }

  //период
  const resultPeriod = prods.filter((item) => {
    let itemDate = new Date(item.date);
    let first = new Date(dateFirst);
    let second = new Date(dateSecond);

    /*  console.log(
      "ifs",
      itemDate,
      first,
      second,
      JSON.stringify(itemDate) >= JSON.stringify(first) &&
        JSON.stringify(itemDate) <= JSON.stringify(second),
      JSON.stringify(itemDate),
      JSON.stringify(first),
      JSON.stringify(second)
    ); //false  "2022-05-07T19:00:00.000Z" */

    /* console.log(
      "ifs2",
      itemDate,
      first,
      second,
      itemDate.getTime() >= first.getTime(),
      itemDate.getTime() <= second.getTime()
    ); */

    return (
      JSON.stringify(itemDate) >= JSON.stringify(first) &&
      JSON.stringify(itemDate) <= JSON.stringify(second)
      /* ? item
      : false */
    );
  });

  //console.log("resultP", resultPeriod);

  resultTwo = tableMap(resultPeriod);

  //по категориям
  const resultCategory = prods.filter((item) => {
    if (categoryName !== null) {
      let catOne = categoryName;

      return item.category == catOne ? item : "";
    }
  });

  //console.log("catOne", resultCategory);

  const resultThreeCategory = tableMap(resultCategory);

  //дням, неделям, месяцам
  /*  
let [month, setMonth] = useState(dateOne.getMonth());
  let [year, setYear] = useState(dateOne.getFullYear());

  let [dayOne, setDayOne] = useState(dateOne.getDate() - 1) 
  */

  const resultMD = prods.map((item) => {
    let monthA = JSON.stringify(new Date(item.date).getMonth() + 1);
    //dateOne.getMonth() + 1
    //let year = dateOne.getFullYear();
    let dayA = JSON.stringify(new Date(item.date).getDate());
    //dateOne.getDate()

    let dayB = JSON.stringify(optionD);
    let monthB = JSON.stringify(optionM);

    //console.log("A", dayA, monthA);
    //console.log("B", dayB, monthB);
    //console.log("---");
    return monthA == monthB && dayA == dayB ? item : "";
  });

  //console.log("MD", resultMD);

  // по неделям

  //по категориям

  const [startEnd, setStartEnd] = useState([]);

  function changeStartEnd() {
    // периоды не меняются
    if (optionW) {
      const startEndTwo = monthArr[optionW].filter((item) => {
        //filter
        return item != " ";
      });

      //console.log("se", startEndTwo, startEnd);

      setStartEnd(...startEndTwo);

      setDateFirst(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          startEndTwo[0]
        }`
      );
      // value по дате не меняются
      setDateSecond(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          startEndTwo[startEndTwo.length - 1]
        }`
      );
    }

    //console.log("fe", startEnd, dateFirst, dateSecond);
  }

  function changeWeek(e) {
    let newMonth = draw(new Date().getFullYear(), optionM - 1);

    if (e >= 0) {
      const startEndTwo = newMonth[e].filter((item) => {
        //filter
        return item != " ";
      });

      //console.log("se", startEndTwo, startEnd);

      setStartEnd(...startEndTwo);

      setDateFirst(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          startEndTwo[0]
        }`
      );
      // value по дате не меняются
      setDateSecond(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          startEndTwo[startEndTwo.length - 1]
        }`
      );

      setOptionW(e);

      //console.log("W", e, dateFirst, dateSecond, startEndTwo);
    }
  }

  const resultWeeks = prods.map((item) => {
    // если неделя вторая или предпоследняя

    //console.log("111", monthArr[optionW][0], monthArr[optionW][6]);

    //setDateFirst

    // setDateSecond

    return 1 /* item.category == catOne ? item : "" */;
  });

  //---
  function tableMap(arr) {
    //console.log("arr", arr);

    return arr.map((item, index, arr) => {
      return (
        <tr
          key={item.id}
          onClick={() => {
            //console.log(index);
            setEditId(item.id);
            setNumIndex(index);
            setChange(true);
          }}
          onBlur={() => {
            setEditId(null);
            setNumIndex(null);
          }}
        >
          <td>
            <input
              value={getValue("date", index, arr)}
              onChange={(event) => changeItem("date", event)}
            />
          </td>
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

  const result = prods.map((item, index) => {
    return (
      <tr
        key={item.id}
        onClick={() => {
          //console.log(index);
          setEditId(item.id);
          setNumIndex(index);
          setChange(true);
        }}
        onBlur={() => {
          setEditId(null);
          setNumIndex(null);
        }}
      >
        <td>
          <input
            value={getValue("date", index)}
            onChange={(event) => changeItem("date", event)}
          />
        </td>
        <td>
          <input
            value={getValue("name", index)}
            onChange={(event) => changeItem("name", event)}
          />
          {/* (e, item) => inputChange(e, item) */}
          {/* item.name */}
        </td>
        <td>
          <input
            value={getValue("category", index)}
            onChange={(event) => changeItem("category", event)}
          />
          {/* item.category */}
        </td>
        <td>
          <input
            type="number"
            value={getValue("cost", index)}
            onChange={(event) => changeItem("cost", event)}
          />
          {/* item.cost */}
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

  function sum() {
    //console.log("sum");
    //console.log("prods[0].cost", prods[0].cost);
    let summa = 0;
    for (let i = 0; i < prods.length; i++) {
      summa = +prods[i].cost + summa;
      //console.log("prods[i].cost", prods[i].cost);
    }
    //console.log("summa", summa);
    return summa;
  }

  let arrDays = [];
  let arrMonths = [];
  let arrWeek = [];

  arrDays = arrNumbersFill(arrDays, 31);
  arrMonths = arrNumbersFill(arrMonths, 12);
  arrWeek = arrNumbersFill(arrWeek, monthArr.length, 0);

  //console.log("arrWeek", arrWeek);

  //console.log("arrMonths", arrMonths);

  function arrNumbersFill(arr, num, step = 1) {
    for (let i = 0; i < num; i++) {
      arr[i] = i + step;
    }
    return arr;
  }

  const optionsDays = optionsMaps(arrDays);

  const optionsMonths = optionsMaps(arrMonths);

  //console.log("arrWeek", arrWeek);

  const optionsWeeks = arrWeek.map((item, index) => {
    return (
      <option key={nanoid()} value={item}>
        {item + 1}
      </option>
    );
  });

  //console.log("optionsMonths", optionsMonths);

  const listArrAddEnd = ["по категории", ...listArr, "по дате"]

  console.log("l", listArrAddEnd)

  const listOptions = listArrAddEnd.map((item, index) => {
    return <option key={nanoid()}>{item}</option>;
  });

  function optionsMaps(arr) {
    return arr.map((item, index) => {
      return <option key={nanoid()}>{item}</option>;
    });
  }
  // return TABLE
  return (
    <>
      <p>
        numIndex: {numIndex}
        <br /> editId: {editId}
      </p>
      {categoryName === null ? resultTwo : resultThreeCategory}
      <p>День недели {new Date().getDay()}</p>

      {dateFirst}
      <br />
      {dateSecond}
      <br />
      {optionD}
      <select
        value={optionD}
        onChange={(e) => {
          setOptionD(+e.target.value);
          changeFirstEndDay(+e.target.value);
        }}
      >
        {optionsDays}
      </select>
      {optionM}
      <select
        value={optionM}
        onChange={(e) => {
          setOptionM(+e.target.value);
          changeMonth(+e.target.value);
        }}
      >
        {optionsMonths}
      </select>
      <select
        value={optionW}
        onChange={(e) => {
          // setOptionW(prev => +e.target.value);
          changeWeek(+e.target.value);
          //changeStartEnd();
        }}
      >
        {optionsWeeks}
      </select>
      <input
        type="date"
        value={dateFirst}
        onChange={(e) => {
          setDateFirst(e.target.value);
          //console.log("dateFirst", dateFirst);
        }}
      />
      <input
        type="date"
        value={dateSecond}
        onChange={(e) => {
          setDateSecond(e.target.value);
        }}
      />
      {categoryName}
      <input
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />

      <table>
        <tr>
          <td>Дата</td>
          <td>Наимен</td>
          <td>Катег</td>
          <td>Цена</td>
          <td> </td>
        </tr>

        {result}
        {sum()}
      </table>
      <div id="parent">
        <input id="elem" />
        <ul id="list">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </>
  );
}
