import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(name) {
  const url = `${BASE_URL}/name/${name}`;
  return fetch(url).then(res => {
    if (!res.ok) {
      res.status === 404
        ? error({
            text: 'Sorry, we can`t find entered name of country. Please try to change inputed name.',
            delay: 3500,
          })
        : error({
            text: 'Sorry, it can be issues with server.',
            delay: 3500,
          });
    }
    return res.json();
  });
}

export default { fetchCountry };
