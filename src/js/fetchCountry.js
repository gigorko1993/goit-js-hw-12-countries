const BASE_URL = 'https://restcountries.eu/rest/v2';
function fetchCountry(name) {
  const url = `${BASE_URL}/name/${name}`;
  return fetch(url).then(res => {
    return res.json();
  });
}

export default { fetchCountry };
