export const getBaseURLWithPrefix = (string = "") => {
    // jika string mengandung space, maka ganti dengan %20
    // string = string.replace(/\s/g, "%20");
    const url = `${import.meta.env.VITE_BACKEND_URL + string}`;
    // // console.log("url", url);
    return url;
}

export const capitalizeEachWord = (string) => {
    return string.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });
}