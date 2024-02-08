const storageName = 'weatherPlaces'

function addPlaceToLocalStorage(place) {
    const getPlaces = window.localStorage.getItem(storageName)
    const places = JSON.parse(getPlaces) ?? []

    if (!places.includes(place)) {
        const newPlaces = [...places, place]
        window.localStorage.setItem(storageName, JSON.stringify(newPlaces))
    }
}

function getPlacesFromLocalStorage() {
    const getPlaces = window.localStorage.getItem(storageName)
    return JSON.parse(getPlaces) ?? []
}

export {
    addPlaceToLocalStorage,
    getPlacesFromLocalStorage
}
