// Function for getting icon url based on id
const getIconUrl = function (id) {
    // Icon urls. Key is icon's id.
    const icon_urls = {300:"http://openweathermap.org/img/wn/11d@2x.png",400:"http://openweathermap.org/img/wn/10d@2x.png",600:"http://openweathermap.org/img/wn/10d@2x.png",700:"http://openweathermap.org/img/wn/13d@2x.png",800:"http://openweathermap.org/img/wn/50d@2x.png",801:"http://openweathermap.org/img/wn/01d@2x.png",900:"http://openweathermap.org/img/wn/03d@2x.png"};
    const not_found = "a";

    // Check if parameter is valid.
    if(isNaN(id)) {
        return not_found;
    }
    
    let to_be_returned = not_found;
    let id_smaller_than_key = false;

    Object.keys(icon_urls).forEach(key => {
        if(id_smaller_than_key === false) {
            if(key > id) {
                to_be_returned = icon_urls[key];
                id_smaller_than_key = true;
            }
        }
    })
    return to_be_returned;
}
export default getIconUrl;