const BASE_URL = 'https://restcountries.eu/rest/v2';
function fetchCountry(name) {
    const url = `${BASE_URL}/name/${name}`;
    return fetch(url)
        .then(res => { return res.json() })
        .catch(() => {
            alert(`Please checked if enter value is correct. And try one more time`)
        })
}

export default { fetchCountry };
