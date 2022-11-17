import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce'
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

const countrySearch = () => {
    console.dir(input.value);
    fetchCountries(input.value);
};

input.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY)); 