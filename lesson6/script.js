// 1) необходимо разработать пользовательский элемент,
// который отображает кол-во дней минут и секунд до дедлайна и описание дедлайна (что нужно сделать).
//
// 2) необходимо добавить интерфейс, который позволит добавлять дедлайны
//
// 3) дедлайны должны сохраняться в Localstorage в виде массива объектов
// и при обновлении страницы отображаться
//
// 5) необходимо добавить кнопку, которая будет удалять элемент с дедлайном из localstorage
//
// 6)* при достижени дедлайна цвет заднего фона должен меняться от зеленого к красному.
// (если есть еще сутки, то задний фон абсолютно зеленый, дедлайн просрочен, то абсолютно красный,
// переход должен быть постепенным).
//
// 7)* необходимо помимо обычного добавления дз в репу git необходимо опубликовать дз на github pages.
// Информацию о процессе можно погуглить

if (localStorage.Todos == null) {
    localStorage.setItem("Todos", '[]');
}
let arrayTodos = (JSON.parse(localStorage.Todos) || []),
    addButton = document.getElementById('add-button'),
    title = document.getElementById('add-title'),
    date = document.getElementById('add-date'),
    todosList = document.getElementById('todos-list');

function addTodo(e) {
    e.preventDefault();
    let objTodo = {};
    objTodo[title.value] = date.value;
    arrayTodos.push(objTodo);
    localStorage.setItem('Todos', JSON.stringify(arrayTodos));
}

function removeTodo() {
    let parent = this.parentNode.parentNode;
    for (let i = 0; i < parent.childNodes.length; i++) {
        if (this.parentNode == parent.childNodes[i]) {
            arrayTodos = arrayTodos.filter((task, index) => index !== i);
        }
    }
    this.closest('.todos__item').remove();
    localStorage.setItem('Todos', JSON.stringify(arrayTodos));
}

function issuingTodos() {
    arrayTodos.forEach(element => {
        let item = document.createElement('li'),
            todoTitle = document.createElement('span'),
            todoDeadline = document.createElement('span'),
            btn = document.createElement('button'),
            progress = document.createElement('div'),
            itemDate;
        item.className = "todos__item";
        todoTitle.className = "todos__title";
        todoDeadline.className = "todos__deadline";
        btn.className = "todos__delete";
        progress.className = "progress";
        for (key in element) {
            todoTitle.innerText = key;
            itemDate = new Date(element[key]);
            (Date.parse(itemDate) > Date.parse(new Date())) ? item.classList.add('expires') : item.classList.add('dead');
            todoDeadline.innerText = `Дата: ${itemDate.getDate()}.${itemDate.getMonth() + 1}.${itemDate.getFullYear()} Время: ${itemDate.getHours()}:${itemDate.getMinutes()}:${itemDate.getSeconds()}`;
            progressCycle(element[key], todoDeadline, progress);
        }
        btn.innerHTML = "&times;";
        btn.addEventListener('click', removeTodo)
        item.append(progress, todoTitle, todoDeadline, btn);
        todosList.append(item);
    });
}

function progressCycle(date, span, bar) {
    let progressDate = new Date(new Date(date) - new Date()),
        progressStep = 0,
        progressWidth = 0,
        interval = setInterval(() => {
            let bufferDate = new Date(new Date(date) - new Date()),
                offsetWidth = span.closest('.todos__item').offsetWidth;
            progressStep = (offsetWidth / (Date.parse(progressDate) / 1000));
            if (Date.parse(bufferDate) >= 0) {
                span.innerText = `Осталось: ${bufferDate.getDate() - 1} дней, ${bufferDate.getMonth()} месяцев, ${bufferDate.getFullYear() - 1970} лет, ${bufferDate.getUTCHours()}:${bufferDate.getMinutes()}:${bufferDate.getSeconds()}`;
                progressWidth += progressStep;
                bar.style.width = progressWidth + 'px';
            } else {
                clearInterval(interval);
                span.closest('.todos__item').classList.remove('expires');
                span.closest('.todos__item').classList.add('dead');
            }
        }, 1000);
}

issuingTodos();
addButton.addEventListener('click', addTodo);