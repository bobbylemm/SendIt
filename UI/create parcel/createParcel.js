const packageName = document.getElementById ('packageName');
const destination = document.getElementById ('destination');
const pickupLocation = document.getElementById ('pickupLocation');
const weightCategories = document.getElementById ('weightCategories');
const form = document.querySelector ('.courier-form');
const modal = document.getElementById ('myModal');
const btn = document.getElementById ('submit');
const close = document.querySelector ('.close');

let packages = [], dest = [], pickup = [], weight = [];

form.addEventListener ('submit', handleSubmit);

function handleSubmit (e) {
  e.preventDefault ();
  packages.push (packageName.value);
  dest.push (destination.value);
  pickup.push (pickupLocation.value);
  weight.push (weightCategories.value);
  const newDelivery = {
    packageName: packages,
    destination: dest,
    pickupLocation: pickup,
    weightCategories: weight,
  };
  let userId = Object.keys (sessionStorage);
  console.log (userId[1]);
  let user = JSON.parse (sessionStorage.getItem (userId[1]));
  user.newDelivery = newDelivery;
  sessionStorage.setItem (userId[1], JSON.stringify (user));
}

// When the user clicks on the button, open the modal
btn.addEventListener ('click', function () {
  modal.style.display = 'block';
  console.log ('working');
});

// When the user clicks on <span> (x), close the modal
close.addEventListener ('click', function () {
  modal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener ('click', function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});
