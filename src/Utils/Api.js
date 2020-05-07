import CONSTANTS from '../constants';


export const postData = (url, body, callback) => {
    fetch(`${CONSTANTS.API_URL}${url}`, {
        method: "POST",
        body: body
    }).then(res => res.json())
        .then(result => callback(result))
        .catch(err => callback(err))
}


