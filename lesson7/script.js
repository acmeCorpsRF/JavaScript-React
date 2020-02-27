// 1) необходимо разработать функцию, которая получив id страницы рендерит карточки пользователей,
// в HTML. Процесс рендеринга страницы из JSON необходимо реализовать отдельной функцией.
// Ссылка для запросов https://reqres.in/api/users?page=1
//
// 2) реализовать процесс, который будет вызывать функцию из первого пункта при скролинге страницы.
// Когда до конца страницы вам осталось 100 или меньше пикселей необходимо загрузить новую страницу
// данных. Таким образом вы добьетесь бесконечной ленты, как в интсаграме и подобных сервисах.
//
// 3) * реализовать кнопку удаления у каждой карточки пользователя,
// которая отправляет запрос на удаление на сервер и при успешном ответе удаляет элемент из DOM
//
// 4) * реализовать форму по добавлению карточки пользователя.
// Данные из формы отправляются на сервер и при положительном ответе элемент должен рендериться в DOM
//
// ВНИМАНИЕ!! сервис reqres не сохраняет состояние и процессы удаления/добавления
// лишь эмулируют действия, но не изменяют данные на сервере.

const wrapper = document.getElementById('wrapper');
const addUser = document.getElementById('add-user');
let currentPage = 0;

function getData(pageId) {
    fetch(`https://reqres.in/api/users?page=${pageId}`)
        .then(
            response => response.json(),
            error => console.log(error)
        )
        .then(
            response => {
                (response.data).forEach(dataUser => {
                    constructorCard(dataUser, pageId);
                    currentPage = pageId;
                });
            },
            error => console.log(error)
        );
}

function constructorCard(userData, idPage) {
    let userCard = document.createElement('div'),
        userAvatar = document.createElement('img'),
        userWrapImg = document.createElement('div'),
        userName = document.createElement('p'),
        userEmail = document.createElement('a'),
        btn = document.createElement('button');
    userCard.className = 'card';
    userCard.id = `user${userData.id}`;
    userCard.setAttribute('data-page_id', idPage);
    btn.className = 'remove';
    btn.innerHTML = '&times;';
    btn.addEventListener('click', removeCard);
    userWrapImg.className = 'wrap-img';
    userAvatar.setAttribute('src', userData.avatar);
    userAvatar.setAttribute('alt', `${userData.first_name} ${userData.last_name}`);
    userWrapImg.append(userAvatar);
    userName.innerText = `${userData.first_name} ${userData.last_name}`;
    userEmail.setAttribute('href', `mailto:${userData.email}`);
    userEmail.innerText = userData.email;
    userCard.append(btn, userWrapImg, userName, userEmail);
    wrapper.append(userCard);
}

function removeCard() {
    let parentId = Number((this.closest('.card').id).replace('user', ''));
    fetch(`https://reqres.in/api/users?id=${parentId}`)
        .then(
            response => response.json(),
            error => console.log(error)
        )
        .then(
            response => {
                if (response.data.id == parentId) {
                    this.closest('.card').remove();
                }
            }
        )
}

addUser.addEventListener('click', (e) => {
    e.preventDefault();
    let newUserFirstName = document.querySelector('[name="user-first-name"]').value,
        newUserLastName = document.querySelector('[name="user-last-name"]').value,
        newUserId = document.querySelector('[name="user-id"]').value,
        newUserEmail = document.querySelector('[name="user-email"]').value,
        newUserAvatar = document.querySelector('[name="user-avatar"]').value;
    let formData = new FormData();
    formData.append('id', newUserId);
    formData.append('email', newUserEmail);
    formData.append('first_name', newUserFirstName);
    formData.append('last_name', newUserLastName);
    formData.append('avatar', newUserAvatar);
    fetch(`https://reqres.in/api/users?`, {
            method: 'POST',
            body: formData
        }
    )
        .then(
            response => response.json(),
            error => console.log(error)
        )// Ответ с сервера приходит вида: {id: "426", createdAt: "2020-02-27T13:00:46.379Z"}
        .then(
            response => {
                let userData = {
                    id: response.id,
                    email: newUserEmail,
                    first_name: newUserFirstName,
                    last_name: newUserLastName,
                    avatar: newUserAvatar
                };
                constructorCard(userData, response.id)
            },
            error => console.log(error)
        )
});

window.addEventListener('scroll', function () {
    let clientHeight = document.documentElement.clientHeight,
        scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    // if ((clientHeight + window.pageYOffset) > (scrollHeight - 100)) { ** При таком расскладе, у меня след. PAGE добавляется несколько раз. Не пойму почему. (╯°□°）╯︵ ┻━┻
    if ((clientHeight + window.pageYOffset) == scrollHeight) {
        getData(currentPage + 1);
    }
});


getData(1);