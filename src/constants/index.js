const isLocalHost = window.location.href.includes('localhost');
const values = {
    API_URL: isLocalHost ? 'http://localhost:5000' : 'https://ielts-peer-prep.herokuapp.com'
}


export default values;