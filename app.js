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
// http://code.mu/ru/javascript/framework/react/book/prime/states/select/
// дату сумму
//52 нед и где-то 2 дня
/*
080522   
11-40  12-42
17-28 18-25 дни option
отд
18-36 е
19-31  20-18
21-23

*/

//http://code.mu/ru/javascript/faq/js-compare-dates/

//после клика на строку, после нажатия add, строка не видна

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
      date: "2022-4-7",
      name: "ручка",
      category: "канц",
      cost: 10
    },
    {
      id: nanoid(),
      date: "2022-4-8",
      name: "отверт",
      category: "инстр",
      cost: 10
    },
    {
      id: nanoid(),
      date: "2022-4-9",
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

  return (
    <div className="App">
      <Table
        prods={prods}
        setProds={setProds}
        name={prods[0].name}
        category={prods[0].category}
        cost={prods[0].cost}
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

      <InputOne prods={prods} setProds={setProds} /* set={setName} */ />
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

function InputOne({ prods, setProds }) {
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

  let arrList = prods.map((item, index) => {
    return item.category;
  });

  let listArr = [...new Set(arrList)];

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
      {listOne}
    </div>
  );
}
//-------------------Table------------------
//-------------------Table------------------
//-------------------Table------------------
//-------------------Table------------------
//-------------------Table------------------
//-------------------Table------------------

function Table({ name, category, cost, prods, setProds }) {
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

  const [dateFirst, setDateFirst] = useState();

  const [dateSecond, setDateSecond] = useState();

  const [dateOne, setDateOne] = useState(new Date());

  const [optionD, setOptionD] = useState(new Date().getDate());
  const [optionM, setOptionM] = useState(new Date().getMonth() + 1);

  console.log(dateOne);

  function getValue(prop, index) {
    //console.log(prop, index);
    return prods.reduce(
      (res, item, index) =>
        item.id === editId ? item[index] /* item[prop] */ : res,
      prods[index][prop]
    );
  }

  function changeItem(prop, event) {
    setProds(
      prods.map((item) =>
        item.id === editId ? { ...item, [prop]: event.target.value } : item
      )
    );
  }
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
  //период
  const resultPeriod = prods.map((item) => {
    let itemDate = new Date(item.date);
    let first = new Date(dateFirst);
    let second = new Date(dateSecond);

    return JSON.stringify(itemDate) >= JSON.stringify(first) &&
      JSON.stringify(itemDate) <= JSON.stringify(second)
      ? item
      : "";
  });

  console.log("resultP", resultPeriod);

  //по категориям
  const resultCategory = prods.map((item) => {
    let catOne = "канц";

    return item.category == catOne ? item : "";
  });

  console.log("catOne", resultCategory);

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

    console.log("A", dayA, monthA);
    console.log("B", dayB, monthB);
    console.log("---");
    return monthA == monthB && dayA == dayB ? item : "";
  });

  console.log("MD", resultMD);

  //---
  const result = prods.map((item, index) => {
    return (
      <tr
        key={item.id}
        onClick={() => {
          console.log(index);
          setEditId(item.id);
          setNumIndex(index);
          setChange(true);
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

  arrDays = arrNumbersFill(arrDays, 31);
  arrMonths = arrNumbersFill(arrMonths, 12);

  function arrNumbersFill(arr, num) {
    for (let i = 1; i <= num; i++) {
      arr[i] = i;
    }
    return arr;
  }

  const optionsDays = optionsMaps(arrDays);

  const optionsMonths = optionsMaps(arrMonths);

  function optionsMaps(arr) {
    return arr.map((item, index) => {
      return <option key={nanoid()}>{item}</option>;
    });
  }

  return (
    <>
      <p>
        numIndex: {numIndex}
        <br /> editId: {editId}
      </p>
      <p>День недели {new Date().getDay()}</p>

      {dateFirst}
      <br />
      {dateSecond}
      <br />
      {optionD}
      <select value={optionD} onChange={(e) => setOptionD(+e.target.value)}>
        {optionsDays}
      </select>
      {optionM}
      <select value={optionM} onChange={(e) => setOptionM(+e.target.value)}>
        {optionsMonths}
      </select>
      <input
        type="date"
        value={dateFirst}
        onChange={(e) => {
          setDateFirst(e.target.value);
          console.log("dateFirst", dateFirst);
        }}
      />
      <input
        type="date"
        value={dateSecond}
        onChange={(e) => {
          setDateSecond(e.target.value);
        }}
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
    </>
  );
}
