// 1) Необходимо реализовать класс Person
// свойства:
//     - имя
//     - фамилия
//     - возраст
//     - друзья (массив)
// методы
// - добавить друга
//
// 2) Необходимо реализовать экземпляр класса Person (вы) и добавить в свойство
// "друзья" своих друзей. Затем вашим друзьям их друзей (для простоты можете реализовать
// в виде дерева без циклических связей). Необходимо реализовать минимум трехуровневую вложенность.
//
// 3) Напишите функцию, которая рекурсивно пройдется по дереву и выведет данные в canvas в виде графа
// (карточка с Фамилией, именем и связи).

class Person {
    constructor(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.friends = [];
    }

    addFriend(friendName, friendSurname, friendAge) {
        let friend = new Person(friendName, friendSurname, friendAge);
        this.friends.push(friend);
    }
}

let person1 = new Person('Николай', 'Иванов', 33),
    person2 = new Person('Михаил', 'Капранов', 33),
    person3 = new Person('Александр', 'Кучеров', 34),
    person4 = new Person('Илья', 'Тришков', 31),
    person5 = new Person('Дмитрий', 'Чаплыгин', 32),
    person6 = new Person('Александр', 'Иваницкий', 34);
person2.addFriend('Дмитрий', 'Андреев', 33);
person2.addFriend('Павел', ' Савин', 32);
person2.addFriend('Александр', ' Левченко', 31);
person3.addFriend('Алексей', 'Алешин', 34);
person3.addFriend('Владимир', 'Кривачёв', 34);
person3.addFriend('Александр', 'Завершнев', 30);
person4.addFriend('Сергей', 'Жуков', 28);
person4.addFriend('Тамара', 'Дейкун', 33);
person4.addFriend('Рустам', 'Султанов', 30);
person5.addFriend('Михаил', 'Терно', 34);
person5.addFriend('Кирилл', 'Богданов', 32);
person5.addFriend('Николай', 'Левадный', 33);
person6.addFriend('Андрей', 'Екимов', 34);
person6.addFriend('Мария', 'Киселёва', 30);
person6.addFriend('Оксана', 'Андреева', 30);
person1.friends = [person2, person3, person4, person5, person6];

let cnvs = document.getElementById('cnvs'),
    ctx = cnvs.getContext('2d');

cnvs.width = '700';
cnvs.height = '1100';
cnvs.style.border = '1px solid #000000';
cnvs.style.backgroundColor = '#ffffff';

function paint(user, q, x, y, r, parX, parY) {
    let curX = x + 100,
        curY = y + 100,
        radius = r / 2,
        stepX = 200,
        stepY = 0;
    ctx.beginPath();
    ctx.moveTo(curX, curY);
    ctx.lineTo(parX, parY);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = '#00ff00';
    ctx.arc(curX, curY, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = '18px Roboto, sans-serif';
    ctx.fillStyle = '#ff0000';
    ctx.textAlign = 'left';
    ctx.fillText(`${user.surname} ${user.name}`, curX, curY - r - 5);
    ctx.strokeText(`${user.surname} ${user.name}`, curX, curY - r - 5);
    if (user.friends.length) {
        length = user.friends.length;
        if (length == 5) {
            stepY = stepX;
            user.friends.forEach((friend, index) => {
                paint(friend, length, stepX, stepY * index, radius, x + 100, y + 100)
            });
        } else if (length == 3) {
            stepY = stepX / 3;
            user.friends.forEach((friend, index) => {
                paint(friend, length, stepX * 2, (stepY * index) + y, radius, x + 100, y + 100);
            });
        }
    }
}

paint(person1, 1, 0, 0, 50);
