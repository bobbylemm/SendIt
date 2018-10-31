const packageName = document.getElementById ('packageName');
const destination = document.getElementById ('destination');
const pickupLocation = document.getElementById ('pickupLocation');
const weightCategories = document.getElementById ('weightCategories');
const form = document.querySelector ('.courier-form');
const modal = document.getElementById('myModal');
const btn = document.getElementById("submit");
const close = document.querySelector(".close");

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

// When the user clicks on the button, open the modal 
btn.addEventListener('click', function() {
  modal.style.display = "block";
  console.log('working')
});

// When the user clicks on <span> (x), close the modal
close.addEventListener('click', function() {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
});
