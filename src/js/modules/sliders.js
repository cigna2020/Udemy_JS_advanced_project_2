const sliders = (slides, dir, prev, next) => {        // dir - diraction (направление слайдера - горизонтально/вертикально)
    let slideIndex = 1,  // индекс текущего слайда
        paused = false;

    const items = document.querySelectorAll(slides);   // выбираем все слайды в слайдере

    function showSlides(n) {        // тоже индекс слайда
        if (n > items.length) {       // усле индекс больше чем количество слайдов в слайдере
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');     // добавляем класс с css анимации
            item.style.display = 'none';        // скрываем все слайды
        });

        items[slideIndex - 1].style.display = 'block';
    }
    showSlides(slideIndex);     // чтобы сразу показать только один слайд

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    try {                                               // на случай если в аргументы не переданы кнопки (авто изминение)
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);                         // вместо цифр можно передать аргумент (prev/next)
            items[slideIndex - 1].classList.remove('slideInLeft');      // slideInLeft - class из css анимации
            items[slideIndex - 1].classList.add('slideInRight');
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');

        });
    } catch (e) { }

    function activateAnimation() {
        if (dir === 'vertical') {
            paused = setInterval(function () {
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');

            }, 3000);
        } else {
            paused = setInterval(function () {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 3000);
        }
    }

    activateAnimation();


    items[0].parentNode.addEventListener('mouseenter', () => {        // mouseenter == hover; 0 - только для того, чтобы получить доступ к родителю
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });

};

export default sliders;