import './sass/main.scss';
import API from '../src/js/fetchCountry.js'
import countryCardTpl from '../src/templates/country-list.hbs'
import countryCardsTpl from '../src/templates/countries-list.hbs'
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require("lodash.debounce");

const refs = {
    cardContainer: document.querySelector('.js-country__container'),
    countryLink: document.querySelector('.country__link'),
    contryElements: document.querySelector('[data-render]'),
    input: document.querySelector('.search-country'),
}
const { cardContainer, input, countryLink, contryElements } = refs;
input.addEventListener('input', debounce(onSearch, 500));
countryLink.addEventListener('click', onFullCardRender);

function onSearch(ev) {
    ev.preventDefault();

    const inputedText = ev.target.value;
    API.fetchCountry(inputedText)
        .then(renderCountryCard)
        // .catch(err => {
        //     error({
        //         text: `${inputedText} not found. Please checked if enter value is correct. And try one more time ${err}`,
        //     })
        // })

        .finally(setTimeout(()=> { ev.target.value = '' }, 3000) );
}

function renderCountryCard(country) {
    cardContainer.innerHTML = '';
    if (country.length === 1) {
        const markup = countryCardTpl(country);
        cardContainer.innerHTML = markup;
        return;
    } else if (country.length > 1 && country.length < 11) {
        const markup = countryCardsTpl(country);
        cardContainer.innerHTML = markup;
    } else if (country.length > 10) {
        error({
            text: "Too many matches found. Please enter a more specific query!",
            delay:3000,
        });
    } return
}
function onFullCardRender() {
    contryElements.classList.remove('visually-hidden');
      
    }