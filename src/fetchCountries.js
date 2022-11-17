export function fetchCountries(name) {
    fetch('https://restcountries.com/v3.1/name/')
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
}