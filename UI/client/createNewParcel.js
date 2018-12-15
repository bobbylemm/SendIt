const user = localStorage.getItem('user');
const token = localStorage.getItem('x-auth-token');
const admin = localStorage.getItem('admin');
const adminLink = document.querySelector('#adminLink');
const form = document.querySelector ('#form');
const loader = document.querySelector('#loader');
const packageName = document.querySelector('#packageName');
const pickupLocation = document.querySelector('#pickupLocation');
const destination = document.querySelector('#destination');
const parcelQuantity = document.querySelector('#parcelQuantity');
const weight = document.querySelector('#weight');
const parcelPrice = document.querySelector('#parcelPrice');
const pageGreeting = document.querySelector('.page-greeting');
const apiMessage = document.querySelector('#api-message');

if (!token) {
    window.location.replace('index.html');
}if (!admin) {
    adminLink.classList.add('enabled');
}if (!admin) {
    adminLink.classList.add('disabled');
}

const url = '/api/v1/parcel';
let price;
pageGreeting.innerHTML = `Welcome <em>${user}</em> Start Creating Your Parcel`;
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
    loader.style.display = 'block';
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
    .then(data => {
        loader.style.display = 'none';
        if(data.status === 'success') {
            apiMessage.style.display = 'block';
            apiMessage.innerHTML = 'Created Parcel successfully';
            apiMessage.style.backgroundColor = '#89bdd3';
            setTimeout(() => {
                apiMessage.style.display = 'none';
                window.location.replace('view-all-parcel.html');
              }, 2000);
        }else {
            apiMessage.style.display = 'block';
            apiMessage.innerHTML = 'Error Creating Parcel';
            apiMessage.style.backgroundColor = '#e62739';
            setTimeout(() => {
                apiMessage.style.display = 'none';
              }, 2000);
        }
    })
    .catch(err => {
        loader.style.display = 'none';
        apiMessage.innerHTML = 'Error Creating Parcel';
        console.log(err);
    })
}
form.addEventListener('submit', handleSubmit);