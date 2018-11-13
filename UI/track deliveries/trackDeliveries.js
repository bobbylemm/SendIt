initMap = () => {
        let options = {
                zoom: 10,
                center: {lat: 6.5244, lng: 3.3792}
        }
        const map = new google.maps.Map(document.getElementById('map'), options);
        // add the markers
        const marker = new google.maps.Marker({
                position: {
                        lat: 6.5244,
                        lng: 3.3792
                },
                map,
        })
}