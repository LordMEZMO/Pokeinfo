const capitalize = (text) => {
    if (text.length > 0)
    return text.at(0).toUpperCase() + text.slice(1)
    else return ""
}
export const format = (text) => text.replaceAll("-", " ").split(' ').map(word => capitalize(word)).join(' ')