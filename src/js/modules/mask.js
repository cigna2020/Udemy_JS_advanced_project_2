const mask = (selector) => {        // selector - inputs, которые нужны нам для валидации

    let setCursorPosition = (pos, elem) => {              // елси пользователь уже ввел числа, после смены фокуса вернуть курсор в прежнюю позицию
        elem.focus();  // установить фокус на всем элементе

        // выделяем часть символов
        if (elem.setSelectionRange) {       // проверяем потдержывает ли браузер такое свойство
            elem.setSelectionRange(pos, pos);   // оставляем курсор возле крайнего символа
        } else if (elem.createTextRange) {      // если не потдерживает
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __', // можно создать вручную, как в данному случае, или в отдельном json файле
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');

        if (def.length >= val.length) {     // чтобы нельзя было удалить +7
            val = def;
        }

        this.value = matrix.replace(/./g, function (a) {     // this.value - значение, которое ввел пользователь, a - это каждый символ
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;  // проверяем каждый симво на число или нет (false), val - это уже только цифры
        });

        if (event.type === 'blur') {         // blur - элемент теряет фокус (выйти из инпута)
            if (this.value.length == 2) {     // если ничего не ввели, т.е осталось два символа +7
                this.value = '';
            } else {
                setCursorPosition(this.value.length, this)
            }
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });

};

export default mask;