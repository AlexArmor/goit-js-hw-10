import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const counties = document.querySelector('.country-list');
const oneCountry = document.querySelector('.country-info');

const input = document.querySelector('#search-box');

const countrySearch = event => {
  const prettyInputValue = event.target.value.trim();
  if (!prettyInputValue) {
    counties.innerHTML = '';
    oneCountry.innerHTML = '';
    return;
  }
  fetchCountries(prettyInputValue)
    .then(data => {
      if (data.length > 10) {
        counties.innerHTML = '';
        oneCountry.innerHTML = '';
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      } else if (data.length > 1 && data.length <= 10) {
        const markup = data
          .map(({ name, flags }) => {
            return `<li class="countries__item">
                    <img class="flag" src="${flags.svg}">
                    <p>${name.official}</p>
                    </li>`;
          })
          .join('');
        counties.innerHTML = markup;
        oneCountry.innerHTML = '';
      } else {
        const element = data[0];
        const language = Object.values(element.languages).join(', ');
        const capital = element.capital.join(', ');
        const markup = `<div class="country-title">
                <img class="flag" src="${element.flags.svg}">
                <h1 class="country-name">${element.name.official}</h>
                </div>
                <p class="section-name">Capital: <span>${capital}</span></p>
                <p class="section-name">Population: <span>${element.population}</span></p>
                <p class="section-name">Languages: <span>${language}</span></p>`;
        oneCountry.innerHTML = markup;
        counties.innerHTML = '';
        console.dir(element);
      }
    })
    .catch(err => {
      counties.innerHTML = '';
      oneCountry.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
      return;
    });
};

input.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));
