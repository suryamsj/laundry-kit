/**
 * Mendapatkan angka acak dalam rentang tertentu dan mengembalikan string yang diawali dengan "INV".
 *
 * @param {number} min - Angka terkecil dalam rentang yang diinginkan (inklusif).
 * @param {number} max - Angka terbesar dalam rentang yang diinginkan (inklusif).
 * @returns {string} String yang diawali dengan "INV" diikuti oleh angka acak antara min dan max (inklusif).
 */
export function randomInvoice(min, max) {
    // Mendapatkan nilai acak antara 0 (inklusif) dan 1 (eksklusif)
    const random = Math.random();

    // Menghitung angka acak dalam rentang min hingga max
    const range = max - min + 1;
    const randomNumber = Math.floor(random * range) + min;

    // Menggabungkan "INV" dengan angka randomNumber menggunakan interpolasi string (template literal)
    const result = `INV${randomNumber}`;

    return result;
}