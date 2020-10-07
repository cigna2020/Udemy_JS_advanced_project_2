const showMoreStyles = (triger, styles) => {        // triger - кнопка, styles - обьекты которые нужно показать
    const cards = document.querySelectorAll(styles),
        btn = document.querySelector(triger);

    cards.forEach(item => {
        item.classList.add('animated', 'fadeInUp');
    });

    btn.addEventListener('click', () => {
        cards.forEach(item => {
            item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });
        btn.style.display = 'none';    // или btn.remove()

    });
};


export default showMoreStyles;