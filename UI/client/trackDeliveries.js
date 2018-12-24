const token = localStorage.getItem('x-auth-token');
const tableBody = document.querySelector('#tableBody');
const url = `/api/v1/user/:1/parcels`;
let optia = '';

fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        }
    })
    .then(res => res.json())
    .then(data => {
            const norm = data.parcels[0].filter(parcel => {
                    if(parcel.status !== 'delivered') {
                            return parcel;
                    }
            })
        norm.forEach(parcel => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                        <td><span class="mobile-view-title">Package name:</span><span class="parcel-detail">${parcel.package_name}</span></td>
                        <td class="editMe"><span class="mobile-view-title">Dropoff location:</span><span class="parcel-detail dropofflocation">${parcel.dropoff_location}</span></td>
                        <td><span class="mobile-view-title">Present location:</span><span class="parcel-detail presentlocation">${parcel.present_location}</span></td>
                        <td><span class="mobile-view-title">Status</span><span class="parcel-detail">${parcel.status}</span></td>
                        <td><span class="mobile-view-title">Cancelled:</span><span class="parcel-detail">${parcel.cancelled}</span></td>
                        <td class="td"><button class="table-action-btn ml-1" id="editBtn" onclick="track(this)">Track</button></td>
            `;
            tableBody.appendChild(tr);
        })
    })
.catch(err => console.log(err))

const track = (e) => {
        const dropOff = e.closest('tr').querySelector('.dropofflocation');
        const presentLoca = e.closest('tr').querySelector('.presentlocation');
        const dropofflocation = dropOff.innerHTML;
        const presentlocation = presentLoca.innerHTML;
        const url1 = `https://maps.googleapis.com/maps/api/geocode/json?address=${dropofflocation}&region=ng&key=AIzaSyARDWNdmnFjV51FeFBWW_HtPpZlOnghPBQ`;
        fetch(url1, {
                method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
                let latDropOff = '';
                let lngDropOff = '';
                if(data.status === 'OK') {
                        latDropOff = data.results[0].geometry.location.lat;
                        lngDropOff = data.results[0].geometry.location.lng;
                        const url2 = `https://maps.googleapis.com/maps/api/geocode/json?address=${presentlocation}&region=ng&key=AIzaSyARDWNdmnFjV51FeFBWW_HtPpZlOnghPBQ`;
                        fetch(url2, {
                                method: 'GET'
                        })
                        .then(res => res.json())
                        .then(data1 => {
                                document.querySelector('#map').style.display = 'block';
                                let latPresentLoca = '';
                                let lngPresentLoca = '';
                                const initMap = (latDrop, lngDrop, latPresent, lngPresent) => {
                                        const options = {
                                                zoom: 14,
                                                center: {lat: latDrop, lng: lngDrop}
                                        }
                                        const map = new google.maps.Map(document.getElementById('map'), options);
                                        const directionsDisplay = new google.maps.DirectionsRenderer({
                                                map,
                                                polylineOptions: {
                                                        strokeColor: "red"
                                                }
                                        });
                                        const directionsService = new google.maps.DirectionsService;
                                        const origin = new google.maps.LatLng(latPresent, lngPresent);
                                        const destination = new google.maps.LatLng(latDrop, lngDrop);
                                        // calculate the distance
                                        const origin1 = {lat: latPresent, lng: lngPresent};
                                        const destinationA = {lat: latDrop, lng: lngDrop};

                                        const service = new google.maps.DistanceMatrixService;
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
                                                document.querySelector('.distanceInfo').style.display = 'block';
                                                const distance = response.rows[0].elements[0].distance.text;
                                                const duration = response.rows[0].elements[0].duration.text;
                                                const distanceInfo = document.querySelector('.distanceInfo');
                                                distanceInfo.innerHTML = `This Parcel travel distance is ${distance}, so it will take ${duration}`;
                                        };
                                        }
                                        )
                                        // add the markers
                                        const marker1 = new google.maps.Marker({
                                                position: {
                                                        lat: latDrop,
                                                        lng: lngDrop
                                                },
                                                map,
                                        })
                                        const marker2 = new google.maps.Marker({
                                                position: {
                                                        lat: latPresent,
                                                        lng: lngPresent
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
                                if(data1.status === 'OK') {
                                        latPresentLoca = data1.results[0].geometry.location.lat;
                                        lngPresentLoca = data1.results[0].geometry.location.lng;
                                        initMap(latDropOff, lngDropOff, latPresentLoca, lngPresentLoca);
                                }
                        })
                }
        })
        .catch(err => console.log(err))
        //
}

