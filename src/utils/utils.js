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

export const mod = (x, y) => {
    return ((x%y) + y)%y;
}

export const numSuffix = (x) => {
    const tens = x%100
    switch (x%10) {
        case 1: 
            if (tens < 10 || tens > 20)
                return `${x}st`
        case 2: 
            if (tens < 10 || tens > 20)
                return `${x}nd`
        case 3: 
            if (tens < 10 || tens > 20)
                return `${x}rd`
        default:
            return `${x}th`
    }
}