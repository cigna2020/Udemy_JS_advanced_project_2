import { getResource } from '../services/requests';

// const showMoreStyles = (triger, styles) => {        // triger - кнопка, styles - обьекты которые нужно показать // заком. когда работаем с сервером
const showMoreStyles = (triger, wrapper) => {        // triger - кнопка, styles - обьекты которые нужно показать
    // const cards = document.querySelectorAll(styles);   // заком. когда работаем с сервером
    const btn = document.querySelector(triger);



    //====================== Паказать изображения с помощью class
    // cards.forEach(item => {
    //     item.classList.add('animated', 'fadeInUp');
    // });

    // btn.addEventListener('click', () => {
    //     cards.forEach(item => {
    //         item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });
    //     btn.style.display = 'none';    // или btn.remove()

    // });

    btn.addEventListener('click', function () {
        // getResource('http://localhost:3000/styles') // json-server
        // .then(res => createCards(res))
        getResource('assets/db.json')
            .then(res => createCards(res.styles))       // styles - свойство с json файла
            .catch(error => console.log(error));

        this.remove();
    });

    function createCards(response) {        // response - массив, который получаем от сервера (res)
        // response.forEach(item => {  // заком., делаем деструктуризацию ниже, теперь в card.innerHTML можно писать просто src, а не item.src и т.п.
        response.forEach(({ src, title, link }) => {
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            card.innerHTML = `
        <div class="styles-block">
            <img src=${src} alt="style">
    		<h4>${title}</h4>
            <a href=${link}>Подробнее</a>
        </div>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    }


};


export default showMoreStyles;