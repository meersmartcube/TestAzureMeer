import SecureLS from 'secure-ls';

export function authHeader() {
    // return authorization header with jwt token
    var ls = new SecureLS({encodingType: 'aes'});
    let user = localStorage.getItem('_secure__metadata__info_') ? ls.get('_secure__metadata__info_') : null;
    if (user && user.authenticationToken) {
        return user.authenticationToken;
    } else {
        return null;
    }
}