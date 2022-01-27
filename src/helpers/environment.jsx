let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http:/localhost:3060';
        break;
    case 'project-fmr-client.herokuapp.com':
        APIURL = 'https://project-fmr-server.herokuapp.com';
}

export default APIURL;