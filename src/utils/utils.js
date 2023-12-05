export const capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
}

export const capitalizeTitle = (t) => {
    if (t) {
        const capt = t.split(' ')
        capt.forEach((w, i) => capt[i] = capitalize(w))
        //capt = capt.map((w) => capitalize(w))
        return capt.join(' ')
    }
}

export const decodeJwt = (token) => {
    const decodedString = decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    return JSON.parse(decodedString)
    //console.log(decodedstring)
}