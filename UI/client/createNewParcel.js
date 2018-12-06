const user = localStorage.getItem('user');
const form = document.querySelector ('#form');
const packageName = document.querySelector('#packageName');
const pickupLocation = document.querySelector('#pickupLocation');
const destination = document.querySelector('#destination');
const parcelQuantity = document.querySelector('#parcelQuantity');
const weight = document.querySelector('#weight');
const parcelPrice = document.querySelector('#parcelPrice');
const token = localStorage.getItem('x-auth-token');

const url = 'http://localhost:3000/api/v1/parcels';
let price;
const handleinputChange = (inputThatChanged) => {
    const inputValue = inputThatChanged.value;
    const parcelQuan = parcelQuantity.value;
    const weightQuan = weight.value;
    if (inputThatChanged.name === 'parcelQuantity') {
        price = inputValue * weightQuan * 500;
    }else {
        price = inputValue * parcelQuan * 500;
    }
    parcelPrice.innerHTML = `&#8358; ${price}`;
}

const handleSubmit = (e) => {
    e.preventDefault();
    const pricefigure = parcelPrice.innerHTML;
    const splitPrice = pricefigure.split(' ')[1];

    const newParcel = JSON.stringify({
        packageName: packageName.value,
        pickupLocation: pickupLocation.value,
        dropOfflocation: destination.value,
        quantity: parcelQuantity.value,
        weight: weight.value,
        price: splitPrice
    })

    fetch(url, {
        method: 'POST',
        body: newParcel,
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}
form.addEventListener('submit', handleSubmit);