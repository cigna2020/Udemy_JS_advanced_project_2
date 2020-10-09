const drop = () => {
    // События, которые срабатываю в браузере при перетягивании файла: 
    // drag *; dragend *; dragenter (обьект над dropArea); dragexit *; dragleave (обьект за предлами dropArea); dragover (обьект двигается над dropArea); dragstart *; drop (обьект отпущен над dropArea)
    // * события, которые срабатывают на самом элементе, которые перетаскивают со страницы, а не из вне

    const fileInputs = document.querySelectorAll('[name="upload"]'); // выбираем input-ы для загрузки файла

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {   // массив событий
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);  // на каждый инпут навешываем кождое событие и убираем стандарное поведение браузера с помощью функции 
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();  // убираем всплытие
    }

    function highLight(item) {      // выделяем область куда можно перетягнуть файл
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7';
    }

    function unHighLight(item) {      // выделяем область куда можно перетягнуть файл
        item.closest('.file_upload').style.border = 'none';
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';

        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);  // выделяем инпут при событиях  
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {   // массив событий
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unHighLight(input), false);  // на каждый инпут навешываем кождое событие и убираем стандарное поведение браузера с помощью функции 
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;     // перетаскиваем файл из файловой системы

            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 5 ? dots = '...' : dots = '.';  // розделяем имья файла на две части - до и после (формат) точки
            const name = arr[0].substring(0, 6) + dots + arr[1];  // обрезаем длинное имья
            input.previousElementSibling.textContent = name;     //заменяем надпись "файл не выбран" именем файла

        });
    });
};

export default drop;