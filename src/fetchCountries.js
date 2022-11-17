export function fetchCountries(name) {
    fetch(`https://restcountries.com/v3.1/name/${name}`, {
        method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
}