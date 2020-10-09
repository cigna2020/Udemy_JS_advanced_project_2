import accordion from './modules/accordion';
import burger from './modules/burger';
import checkTextInputs from './modules/checkTextInputs';
import culc from './modules/culc';
import drop from './modules/drop';
import filter from './modules/filter';
import forms from './modules/forms';
import mask from './modules/mask';
import modals from './modules/modals';
import pictureSize from './modules/pictureSize';
import scrolling from './modules/scrolling';
import showMoreStyles from './modules/showMoreStyles';
import sliders from './modules/sliders';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    modals();
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms();
    mask('[name = "phone"]');
    checkTextInputs('[name = "name"]');
    checkTextInputs('[name = "message"]');
    // showMoreStyles('.button-styles', '.styles-2');  // заком., используем БД
    showMoreStyles('.button-styles', '#styles .row');
    culc('#size', '#material', '#options', '.promocode', '.calc-price');
    filter();
    pictureSize('.sizes-block');
    // accordion('.accordion-heading ', '.accordion-block');  // css-animation
    accordion('.accordion-heading');  // using js
    burger('.burger-menu', '.burger');
    scrolling('.pageup');
    drop();

});