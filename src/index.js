import './sass/main.scss';
import countryCardTpl from '../src/templates/country-list.hbs'

const refs = {
    cardContainer: document.querySelector('.js-country__container'),
    input: document.querySelector('.search-country'),
}
refs.input.addEventListener('input', onSearch)

function onSearch(ev) {
    ev.preventDefault();

    const inputedText = ev.currentTarget.value;
    fetchCountry(inputedText)
    .then(renderCountryCard)
    .catch(error => console.log(error))
}


function fetchCountry(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        .then(res => { return res.json() })
}

    function renderCountryCard(country) {
        console.log(country);
        const markup = countryCardTpl(country);
        refs.cardContainer.innerHTML = markup;
        console.log(markup);
    }
