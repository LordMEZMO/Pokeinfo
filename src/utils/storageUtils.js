const loadJSON = key => key && JSON.parse(localStorage.getItem(key));
export const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));
export const deleteJSON = key => key && localStorage.removeItem(key);
export const isFavourite = key => {
    if(loadJSON(key)) return true;
    return false;
}
export const isPokemonData = key => {
    if(key.match(/^pokemon:\d+$/)) return true;
    return false;
}