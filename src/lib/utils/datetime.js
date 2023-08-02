/**
 * Mengubah objek Date menjadi string dengan format "tanggal - bulan - tahun".
 *
 * @param {Date} date - Objek Date yang akan diubah.
 * @returns {string} Tanggal dengan format "tanggal - bulan - tahun".
 */
export function formatDateToDDMMYYYY(date) {
    // Mendapatkan informasi tanggal, bulan, dan tahun
    const year = date.getFullYear(); // Tahun (contoh: 2023)
    const month = date.getMonth(); // Bulan (0 - 11, 0 untuk Januari, 11 untuk Desember)
    const day = date.getDate(); // Tanggal (1 - 31)

    // Fungsi untuk menambahkan nol di depan angka jika nilainya kurang dari 10
    function addLeadingZero(number) {
        return number < 10 ? `0${number}` : number.toString();
    }

    // Format tanggal dalam format "tanggal - bulan - tahun"
    const formattedDate = `${addLeadingZero(day)}-${addLeadingZero(
        month + 1
    )}-${year}`;

    return formattedDate;
}

/**
 * Mengubah string tanggal dengan format "tahun-bulan-tanggal" menjadi "tanggal-bulan-tahun".
 *
 * @param {string} date - Tanggal dengan format "tahun-bulan-tanggal".
 * @returns {string} Tanggal dengan format "tanggal-bulan-tahun".
 */
export function formatDateReverse(date) {
    // Pisahkan tanggal, bulan, dan tahun dari inputDate
    const [year, month, day] = date.split('-');

    // Format tanggal dalam format "tanggal - bulan - tahun"
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}