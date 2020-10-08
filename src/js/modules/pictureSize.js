const pictureSize = (imgSelector) => {      // imgSelector - селектор, по которому обьеденяются все изображения / блоки
    const blocks = document.querySelectorAll(imgSelector);

    function showImg(block) {       // block - блок (диф), где находится изображение
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -4) + '-1.png';      // добавляем -1 в src, т.к только этим отличаются картинки которые нужно скрыть / показать
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => { // скрываем параграфы (надписи), кроме одно с соответств. классом
            p.style.display = 'none';
        });
    }

    function hideImg(block) {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -6) + '.png';
        block.querySelectorAll('p').forEach(p => { // скрываем параграфы (надписи), кроме одно с соответств. классом
            p.style.display = 'block';
        });
    }

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {     // mouseover - когда курсор над элементом
            showImg(block);
        });
        block.addEventListener('mouseout', () => {     // mouseover - когда курсор над элементом
            hideImg(block);
        });
    });
};

export default pictureSize;