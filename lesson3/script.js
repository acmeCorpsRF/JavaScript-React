// 1) необходимо реализовать класс Employee со свойствами:
//     name
// lastname
// age
// salary
// staff (массив)
//
//
// и методами:
//     showDate (выводит информацию о работнике)
// addWorker (добавляет работника в массив staff)
//
// 2) Добавить get и set для свойства salary.
//     Добавить метод dismiss, который принимает параметр - экземпляр класса Employee и удаляет этого подчиненного,
//     у того объекта, у которого был вызван метод.
//     При удалении все подчиненные удаленного переходят в подчинение к боссу удаленного.
//
//     Заполнить данными и проверить функционал. В итоге должен быть один объект (главный босс),
//     у которого множество подчиненных со своими подчиненными до которых можно добраться через свойство staff.
//     Иерархия должна быть минимум в 3 уровня. Босс -> Его подчиненные -> их подчиненные.
//
// 3)* Главному боссу добавьте метод search, который должен искать сотрудника по имени и фамилии (без учета регистра).

class Employee {
    constructor(name, lastname, age, salary) {
        this.name = name;
        this.lastname = lastname;
        this.age = age;
        this._salary = salary;
        this.staff = [];
    }

    get salary() {
        return (this._salary + ' р.');
    }

    set salary(value) {
        this._salary = parseInt(value);
    }

    showDate() {
        console.log(
            ' Имя работника      - ' + this.name + '\n',
            'Фамилия работника  - ' + this.lastname + '\n',
            'Возраст работника  - ' + this.age + '\n',
            'Зарплата работника - ' + this._salary + '\n',
            'Состав подчиненных: ');
        console.log(this.staff);
    }

    addWorker(worker) {
        this.staff.push(worker);
    }

    dismiss(removeSubordinate) {
        removeSubordinate.staff.forEach(element => this.staff.push(element));
        this.staff.forEach((worker, index) => {
            if (removeSubordinate === worker) {
                this.staff.splice(index, 1);
            }
        });
        console.log(this.staff);
    }

}

let boss = new Employee('Петя', 'Васечкин', 30, 20000),
    worker1 = new Employee('Сеня', 'Трубник', 31, 21000),
    worker2 = new Employee('Веня', 'Красный', 28, 18000),
    worker3 = new Employee('Женя', 'Весельницкий', 35, 25000),
    worker4 = new Employee('Пеня', 'Трушный', 25, 15000),
    worker5 = new Employee('Феня', 'Дронкин', 40, 10000),
    worker6 = new Employee('Катя', 'Катастрофа', 33, 22000);

function find(node, employeeName, employeeLastname, count) {
    count++;
    node.staff.forEach(employee => {
        if (employeeName.toLowerCase() === employee.name.toLowerCase() &&
            employeeLastname.toLowerCase() === employee.lastname.toLowerCase()) {
            console.log(`Найден в ${count} уровне`);
            console.log(employee);
        } else {
            find(employee, employeeName, employeeLastname, count);
        }
    });
}

boss.search = function (employeeName, employeeLastname) {
    let eN = employeeName,
        eL = employeeLastname,
        count = 0;
    find(this, eN, eL, count);
};

boss.addWorker(worker1);
boss.addWorker(worker2);
worker1.addWorker(worker3);
worker1.addWorker(worker4);
worker2.addWorker(worker5);
worker2.addWorker(worker6);

boss.search('сеня', 'трубник');
boss.search('кАтЯ', 'Катастрофа');