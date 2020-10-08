const burger = (menuSelector, burgerSelector) => {      //  то, что появляется и на чем кликают
    const menuElem = document.querySelector(menuSelector),
        burgerElem = document.querySelector(burgerSelector);

    menuElem.style.display = 'none';

    burgerElem.addEventListener('click', () => {
        if (menuElem.style.display == 'none' && window.screen.availWidth < 993) {       // елси меню не отображается и ширина экрана меньше 993
            menuElem.style.display = 'block';
            menuElem.classList.add('animated', 'fadeIn');
        } else {
            menuElem.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 993) {
            menuElem.style.display = 'none';
        }
    });

};

export default burger;