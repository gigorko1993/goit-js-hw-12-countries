import './sass/main.scss';
import countryCardTpl from '../src/templates/country-list.hbs'
import countryCardsTpl from '../src/templates/countries-list.hbs'

const debounce = require("lodash.debounce");

const refs = {
    cardContainer: document.querySelector('.js-country__container'),
    input: document.querySelector('.search-country'),
}
const { cardContainer, input } = refs;
input.addEventListener('input', debounce(onSearch, 500));

function onSearch(ev) {
    ev.preventDefault();

    const inputedText = ev.target.value;
    fetchCountry(inputedText)
        .then(renderCountryCard)
        .catch(error => console.log(error));
}

function fetchCountry(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(res => { return res.json() })
        }

function renderCountryCard(country) {
    if (country.length === 1) {
        const markup = countryCardTpl(country);
        cardContainer.innerHTML = markup;
    } else if (country.length > 1 && country.length < 11) {
        const markup = countryCardsTpl(country);
        cardContainer.innerHTML = markup;
    } 
    }
