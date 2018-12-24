const token1 = localStorage.getItem('x-auth-token');
const admin = localStorage.getItem('admin');

if(!token1) {
        window.location.replace('/');
    }
    if (admin) {
        adminLink.classList.add('enabled');
    }else {
        adminLink.classList.add('disabled');
    }

initMap = () => {
        let options = {
                zoom: 12,
                center: {lat: 6.5244, lng: 3.3792}
        }
        const map = new google.maps.Map(document.getElementById('map'), options);
        const directionsDisplay = new google.maps.DirectionsRenderer({
                map,
                polylineOptions: {
                        strokeColor: "red"
                }
        });
        const directionsService = new google.maps.DirectionsService;
        const origin = new google.maps.LatLng(6.4926, 3.3490);
        const destination = new google.maps.LatLng(6.5095, 3.3711);

        let origin1 = {lat: 6.4926, lng: 3.3490};
        let destinationA = {lat: 6.5095, lng: 3.3711};

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [origin1],
          destinations: [destinationA],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, (response, status) => {
          if (status !== 'OK') {
            console.log('error',status)
          } else {
                  console.log('response',response.rows[0].elements[0])
          };
        }
        )
        // add the markers
        const marker1 = new google.maps.Marker({
                position: {
                        lat: 6.4926,
                        lng: 3.3490
                },
                map,
        })
        const marker2 = new google.maps.Marker({
                position: {
                        lat: 6.5095,
                        lng: 3.3711
                },
                map,
        })
        calculateRoute = () => {
                let request = {
                        origin,
                        destination,
                        travelMode: 'DRIVING'
                };
                directionsService.route(request, (result, status) => {
                        if(status == 'OK') {
                                directionsDisplay.setDirections(result);
                        }
                });
        }
        calculateRoute();
    }