const checkTextInputs = (selector) => {         // selector = inputs
    const textInputs = document.querySelectorAll(selector);
    textInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {       // keypress - нажатие на определенную клавишу
            if (e.key.match(/[^а-яё 0-9]/ig)) { // e.key - значение клавиши, проверяем на соответствие кирилице
                e.preventDefault();
            }
        });
    });
};

export default checkTextInputs;