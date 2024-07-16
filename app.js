const getSelects = document.querySelectorAll('select');

const options = ['Violet', 'Lilly', 'Snowdrop', 'Rose', 'Poppy', 'Daffodil', 'Bluebell'];

function populateSelects() {
    getSelects.forEach((select) => {
        // Add placeholder text
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = 'Please select a flower...';
        select.appendChild(placeholderOption);

        // Add option values
        options.forEach((option) => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            select.appendChild(opt);
        });
    });
}

function submitFavourites() {
    const selectedValues = Array.from(getSelects).map((select) => select.value);

    // Basic form of validation
    if (selectedValues.some((value) => value === '')) {
        alert('Please select a flower for each dropdown.');
        return;
    }

    alert('Your favourite flowers picks are:\n' + selectedValues.join('\n'));

    sendFavouritesToServer(selectedValues);
}

function sendFavouritesToServer(selectedValues) {
    const favouriteFlower = document.getElementById('favouriteFlower').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedValues })
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            displayTopFlower(favouriteFlower);
            resetDropdownsToPlaceholder();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function resetDropdownsToPlaceholder() {
    getSelects.forEach((select) => {
        select.value = '';
    });
}

function displayTopFlower(favouriteFlower) {
    document.getElementById('lastFavorite').textContent = favouriteFlower;
}

document.addEventListener('DOMContentLoaded', () => {
    populateSelects();
    displayTopFlower('Snowdrop');
});
