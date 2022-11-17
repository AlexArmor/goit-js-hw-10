import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce'
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

const countrySearch = () => {
    console.dir(input.value);
    fetchCountries(input.value)
    .then(data => {
        if(data.length > 10){
            Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        }else if(data.length > 1 && data.length <= 10){

        }else {

        }
        // console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
};

input.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY)); 