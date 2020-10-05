const modals = () => {

    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) { // triggerSelector - класс, который обьеденяет все кнопки, modalSelector - класс модального окна
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'), // data-modal - data-атрибут для всех модальных окон
            scroll = calcScroll();                                  // ширина правого скролла

        // trigger.addEventListener('click', (e) => {            // заком., работает только с querySelector
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {

                if (e.target) {
                    e.preventDefault();
                }

                windows.forEach(item => {               // закрываем все открытые модальные окна
                    item.style.display = 'none';
                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';        // страница под модальн.окном не будет скролится
                document.body.style.marginRight = `${scroll}px`;    // чтобы не прыгала страница про открывании/закрывании модального окна
                // document.body.classList.add('modal-open');          // класс из bootstrap, вместо вышеуказанного кода          
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {               // закрываем все открытые модальные окна
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;    // чтобы не прыгала страница про открывании/закрывании модального окна
            // document.body.classList.remove('modal-open');       // класс из bootstrap, вместо вышеуказанного кода
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {          // closeClickOverlay = false нужно передать при вызове функции чтобы "подложка" не закрывала модальное окно
                windows.forEach(item => {               // закрываем все открытые модальные окна
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;    // чтобы не прыгала страница про открывании/закрывании модального окна
                // document.body.classList.remove('modal-open');     // класс из bootstrap, вместо вышеуказанного кода
            }
        });

    }
    // const callEngineerBtn = document.querySelector('.popup_engineer_btn'),           // заком., в начале добавили селекторы
    //     modalEngineer = document.querySelector('.popup_engineer'),
    //     modalENgineerClose = document.querySelector('.popup_engineer .popup_close');

    function showModalByTime(selector, time) {          // чтобы мод.окно появлялось со временем
        setTimeout(function () {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {         // проверяем открыто какое-либо модальное окно или нет
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }, time);
    }

    function calcScroll() {    // посчитать сколько места занимает правый скрол, чтобы потом не "прыгала" картинка при открытии/закрытии модального окна
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth; // полная ширина минус главный контент в который НЕ включается прокрутка
        div.remove();

        return scrollWidth;
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');

    showModalByTime('.popup-consultation', 2000);

};

export default modals;