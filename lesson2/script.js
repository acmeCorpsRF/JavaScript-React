// 1) реализовать функцию создания объекта товара,
// которая принимает аргументы (название, цена, скидка- значение по умолчанию 0 ) 
// и возвращает объект с указаными параметрами.
// Должна реализовываться проверка. 
// Название должно быть строкой, а цена и скидка числами, 
// при том скидка должна быть от 0 до 99.

// function createItem(name, price, discount = 0) {
//     console.log("price = " + price);
//     console.log("typeof price = " + typeof price);
//     console.log("!isNaN(price) = " + !isNaN(price));
//     console.log("(typeof parseInt(price)) === 'number' = " + ((typeof parseInt(price)) === "number"));
//     return {
//         name: (typeof name === "string") ? name : '...',
//         price: !isNaN(price) ? price
//             : ((typeof parseInt(price)) === "number") ? parseInt(price) : 'Не указано',
//         discount: !isNaN(discount) ? ((0 <= discount && discount < 100) ? discount : 'Не указано')
//             : ((typeof parseInt(discount)) === "number") ?
//                 parseInt(discount) : 'Не указано'
//     };
// }
//
// let goods1 = createItem('Утюг Rowenta Focus Auto-off DW6020D1', '4990 р.', '47%');
// console.log(goods1);
// let goods2 = createItem('Парогенератор Bosch Serie 6 VarioComfort TDS6080', '9990', '50');
// console.log(goods2);
// let goods3 = createItem('Швейная машина Janome 2121', 8990, 28);
// console.log(goods3);
// let goods4 = createItem('Фен Philips HP8232/00 ThermoProtect Ionic', 2290, 100);
// console.log(goods4);
// let goods5 = createItem(2121, 990);
// console.log(goods5);

// 2) должен быть реализован бесконечный цикл while, 
// который принимает от пользователя значения названия цены и скидки, 
// формирует на этой основе объект и добавляет его в общий массив. 
// Ввод оканчивается при указании значения end в поле для названия, цены или скидки.

let commonArray = [];
while (true) {
    let nameProduct = prompt("Введите название товара:"),
        nameDiscount,
        valuePrice;
    if (nameProduct == 'end') {
        break;
    } else {
        nameDiscount = prompt("Введите название скидки:");
        if (nameDiscount == 'end') {
            break;
        } else {
            valuePrice = prompt("Введите значение цены:");
            if (valuePrice == 'end') {
                break;
            }
        }
    }
    commonArray.push({
        productName: nameProduct,
        discountName: nameDiscount,
        priceValue: valuePrice
    });
}

// 3)* по окончанию ввода данных должен формироваться отчет и отображаться в консоли
// - кол-во товаров со скидкой.
// - топ 5 самых дешевых товаров (с учетом скидки).
// - общая сумма скидки (в рублях, а не процентах) по всем товарам.

let quantityGoodsDiscount = 0,
    top5CheapestGoods = [],
    totalDiscount = 0;
commonArray.forEach(element => {
    for (let value in element) {
        if (value == 'priceValue' && element[value] !== '0') {
            if (!isNaN(parseInt(element[value]))) {
                if (top5CheapestGoods.length == 0) {
                    top5CheapestGoods.push(element);
                } else {
                    for (let j = 0; j < top5CheapestGoods.length; j++) {
                        if (parseInt(element[value]) < parseInt(top5CheapestGoods[j][value])) {
                            top5CheapestGoods.push(element);
                            // top5CheapestGoods.unshift(element[value]);
                        }
                    }
                }
                quantityGoodsDiscount++;
                totalDiscount += parseInt(element[value]);
            }
        }
    }
});
top5CheapestGoods = top5CheapestGoods.slice(0,5);
console.log(`кол-во товаров со скидкой = ${quantityGoodsDiscount}`);
console.log(top5CheapestGoods);
console.log(`общая сумма скидки = ${totalDiscount} р.`);
