import CryptoJS from "crypto-js";

/**
 * 
 * @param {string} string 
 * @returns {string}
 */
export function hashPassword(string) {
    const value = CryptoJS.SHA256(string).toString();
    return value;
}

/**
 * 
 * @param {string} string 
 * @returns {string}
 */
export function cookieEncrypted(string) {
    const value = CryptoJS.AES.encrypt(string, 'Sw3CWv)+syEn,V_').toString();
    return value;
}

/**
 * 
 * @param {string} string 
 * @returns {string}
 */
export function cookieDecrypted(string) {
    const value = CryptoJS.AES.decrypt(string, 'Sw3CWv)+syEn,V_').toString(CryptoJS.enc.Utf8);
    return value;
}