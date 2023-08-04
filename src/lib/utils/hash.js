import { SECRET_KEY } from '$env/static/private';
import CryptoJS from "crypto-js";

/**
 * Menghasilkan hash dari string menggunakan algoritma SHA-256.
 *
 * @param {string} string String yang akan di-hash.
 * @returns {string} Nilai hash dari string yang diberikan.
 *
 */
export function hashPassword(string) {
    const value = CryptoJS.SHA256(string).toString();
    return value;
}

/**
 * Mengenkripsi string menggunakan algoritma AES dengan kunci rahasia.
 *
 * @param {string} string String yang akan dienkripsi.
 * @returns {string} String terenkripsi.
 *
 */
export function cookieEncrypted(string) {
    const value = CryptoJS.AES.encrypt(string, SECRET_KEY).toString();
    return value;
}

/**
 * Mendekripsi string yang telah dienkripsi menggunakan algoritma AES.
 *
 * @param {string} string String terenkripsi yang akan didekripsi.
 * @returns {string} String hasil dekripsi.
 *
 */
export function cookieDecrypted(string) {
    const value = CryptoJS.AES.decrypt(string, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return value;
}