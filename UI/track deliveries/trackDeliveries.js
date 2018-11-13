initMap = () => {
        let options = {
                zoom: 8,
                center: {lat: 6.5244, lng: -3.3792}
        }
        const map = new google.maps.Map(document.getElementById('map'), options)
}