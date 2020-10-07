// import checkNumInputs from './checkNumInputs';

const forms = () => {                  // state, как аргумент - modalState (данные с формы), актуально только для калькулятора

    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name = "upload"]');


    // checkNumInputs('input[name = "user_phone"]');

    // const message = {
    //     loading: 'Загрузка...',
    //     success: 'Спасибо! Скоро мы с вами свяжемся.',
    //     failure: 'Что-то пошло не так...'
    // };

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {          // пути для данных разных форм
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const postData = async (url, data) => {
        // document.querySelector('.status').textContent = message.loading; //заком., если будет отображатся спиннер
        let res = await fetch(url, {        // await - чтобы дождатся ответа от сервера, иначе код будет выполнятся с пустым res
            method: "POST",
            body: data
        });

        return await res.text(); // await, иначе return выполнится без ничего, т.е. без res.text()
    };

    const clearInputs = () => {         // очистить инпуты
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран!';
        });
    };

    upload.forEach(item => {                    // получаем имья загружаемого файла
        item.addEventListener('input', () => {
            console.log(item.files[0].name);
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 5 ? dots = '...' : dots = '.';  // розделяем имья файла на две части - до и после (формат) точки
            const name = arr[0].substring(0, 6) + dots + arr[1];  // обрезаем длинное имья
            item.previousElementSibling.textContent = name;     //заменяем надпись "файл не выбран" именем файла
        });
    });

    const closeModalPopup = () => {
        const modalPopup = document.querySelectorAll('.popup_calc_end');
        modalPopup.forEach(item => {
            item.style.display = 'none';
            document.body.style.overflow = '';
        });

    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            // item.appendChild(statusMessage);                // добавляем сообщение в конец формы // заком.если нужно отобразить картинку вместо формы (см.ниже)
            item.parentNode.appendChild(statusMessage);
            item.classList.add('animated', 'fadeOutUp');        //если нужно отобразить картинку вместо формы, делаем форму прозрачной
            setTimeout(() => {                              //если нужно отобразить картинку вместо формы, убираем форму (input) со страницы
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);           // добавляем спиннер на страницу

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);    // FormData найдете все импуты формы (item), соберет данные (текст, файлы..., зависит от формы, в нашем слачае Ф.И.О, телефон)
            // // if (item.getAttribute('data-calc') === 'end') { // заком., иначе не работает append   // data-calc = 'end' есть только у формы-калькулятора
            // for (let key in state) {                        // state - modalState (данные калькулятора), key - ключ масива
            //     formData.append(key, state[key]);
            // }
            // }
            let api;        // динамический путь, куда будем отправлять данные
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;       // найти элемент выше по иерархии, если есть - design (если форма с загрузкой картинки), нет - question, если много вариантов - использовать switch - case
            console.log(api);

            // postData('assets/server.php', formData)
            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                // .catch(() => statusMessage.textContent = message.failure)
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                        closeModalPopup();
                    }, 2000);
                });
        });
    });

};

export default forms;