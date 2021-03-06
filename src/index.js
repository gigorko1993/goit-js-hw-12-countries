import './sass/main.scss';
import getRefs from '../src/js/markup.js';
import API from '../src/js/fetchCountry.js';
import countryCardTpl from '../src/templates/country-list.hbs';
import countriesCardsTpl from '../src/templates/countries-list.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');
const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(ev) {
  ev.preventDefault();

  const inputedText = ev.target.value.trim();

  API.fetchCountry(inputedText).then(renderCountryCard);
}

function renderCountryCard(country) {
  refs.cardContainer.innerHTML = '';
  if (country.length === 1) {
    const markup = countryCardTpl(country);
    refs.cardContainer.innerHTML = markup;
  } else if (country.length > 1 && country.length < 11) {
    const markup = countriesCardsTpl(country);
    refs.cardContainer.innerHTML = markup;
  } else if (country.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 3500,
    });
  }
  return;
}
