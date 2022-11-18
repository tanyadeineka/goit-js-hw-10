import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
    debounce(e => {
        const trimInputValue = input.value.trim();
        clean();
        if (trimInputValue !== '') {
            fetchCountries(trimInputValue).then(foundData => {
                if (foundData.length > 10) {
                    Notiflix.Notify.info(
                      'Too many matches found. Please enter a more specific name.', { position: "center-top" }
                    );
                } else if (foundData.length === 0) {
                    Notiflix.Notify.failure(
                      'Oops, there is no country with that name',
                      { position: 'center-top' }
                    );
                } else if (foundData.length >= 2 && foundData.length < 10) {
                    renderCountryList(foundData);
                } else if (foundData.length === 1) {
                    renderOneCountryList(foundData);
                }
            })
        }
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
    const markup = countries.map(country => {
        return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    }).join('');
    countryList.innerHTML = markup;
};

function renderOneCountryList(countries) {
    const markup = countries.map(country => {
        return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official
            }" width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    }).join('');
    countryList.innerHTML = markup;
}

function clean() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
}