# react-products-table

Проект учета покупок.

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

Демо: [https://codesandbox.io/s/brave-cannon-4hzge9?file=/src/App.js](https://codesandbox.io/s/brave-cannon-4hzge9?file=/src/App.js)

## Инструкция по запуску приложения
* Установка - `npm i`
* Запуск приложения - `npm start`
