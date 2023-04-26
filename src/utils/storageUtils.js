const loadJSON = key => key && JSON.parse(localStorage.getItem(key));
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const deleteJSON = key => key && localStorage.removeItem(key);
const isFavourite = key => {
    if(loadJSON(key)) return true;
    return false;
}
const isPokemonData = key => {
    if(key.match(/^pokemon:\w+$/)) return true;
    return false;
}

export {
    saveJSON,
    deleteJSON,
    isFavourite,
    isPokemonData
};