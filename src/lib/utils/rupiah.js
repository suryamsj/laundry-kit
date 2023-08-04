/**
 * Mengubah angka menjadi format mata uang (Rupiah) dengan pemisah ribuan.
 *
 * @param {number} number Angka yang akan diubah menjadi format mata uang.
 * @returns {string} Format mata uang (Rupiah) dari angka yang diberikan.
 *
 * @example
 * const amount = 50000;
 * const formattedAmount = formatNumberToCurrency(amount);
 * console.log(formattedAmount); // Output: "Rp50.000"
 */
export function formatNumberToCurrency(number) {
    if (isNaN(number)) {
        return "0";
    }

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return formatter.format(number);
}