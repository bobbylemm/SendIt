const packageName = document.getElementById ('packageName');
const destination = document.getElementById ('destination');
const pickupLocation = document.getElementById ('pickupLocation');
const weightCategories = document.getElementById ('weightCategories');
const form = document.querySelector ('.courier-form');

form.addEventListener ('submit', handleSubmit);
function handleSubmit (e) {
  e.preventDefault ();
  const newDelivery = {
    packageName: packageName.value,
    destination: destination.value,
    pickupLocation: pickupLocation.value,
    weightCategories: weightCategories.value,
  };
  let userId = Object.keys (sessionStorage);
  console.log (userId[1]);
  let user = JSON.parse (sessionStorage.getItem (userId[1]));
  user.newDelivery = newDelivery;
  sessionStorage.setItem (userId[1], JSON.stringify (user));
}
