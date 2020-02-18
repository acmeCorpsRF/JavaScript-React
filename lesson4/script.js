// 1) реализовать форму с 4 полями:
//     - название поста (input)
// - описание (textarea)
// - ссылка на картинку (input)
// - ссылка на источник (input)
// и одной кнопкой "добавить"
//
// при нажатии на кнопку добавить должна появляться карточка с указанным текстом,
// названием, картинкой и ссылкой на источник. Карточки должны быть стилизованы через css.
//
// 2) добавьте кнопку "удалить все карточки" которая должна удалять все карточки
//
// 3) * у каждой карточки добавьте кнопку для удаления именно этой карточки.
//
//     p.s. Напоминаю, с этого занятия все дз принимаются только в виде ссылки на github.

function showCard(e) {
    e.preventDefault();
    let title = document.querySelector('input').value,
        description = document.querySelector('textarea').value,
        img = document.querySelector('[name="link-picture"]').value,
        linkSource = document.querySelector('[name="link-source"]').value,
        wrap = document.createElement('div'),
        cardTitle = document.createElement('h1'),
        cardDescription = document.createElement('p'),
        cardImg = document.createElement('img'),
        cardLinkSource = document.createElement('a');
    wrap.className = 'wrap';
    cardImg.setAttribute("src", img); //cardImg.src = img;
    cardImg.setAttribute("alt", title); //cardImg.alt = title;
    cardTitle.innerText = title;
    cardDescription.innerText = description;
    cardLinkSource.setAttribute("href", linkSource) //cardLinkSource.href = linkSource;
    cardLinkSource.prepend(cardTitle);
    wrap.append(cardImg, cardLinkSource, cardDescription);
    document.body.prepend(wrap);
}

let btnAdd = document.getElementById('add'),
    btnRemove = document.querySelector('remove');
btnAdd.addEventListener('click', showCard);