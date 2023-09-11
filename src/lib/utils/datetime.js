/**
 * Mengubah format tanggal ISO 8601 menjadi format "tanggal bulan tahun".
 * @param {string} isoDateString - Tanggal dalam format ISO 8601.
 * @param {string} [language='id-ID'] - Kode bahasa untuk nama bulan (opsional).
 * @returns {string} Tanggal dalam format "tanggal bulan tahun".
 */
export function formatDate(isoDateString, language = 'id-ID') {
    // Ubah menjadi objek Date
    const date = new Date(isoDateString);

    // Definisikan nama bulan dalam bahasa yang diinginkan
    const monthNames = new Intl.DateTimeFormat(language, { month: 'long' }).formatToParts(date).find(part => part.type === 'month').value;

    // Dapatkan tanggal, bulan, dan tahun dari objek Date
    const day = date.getDate();
    const month = monthNames;
    const year = date.getFullYear();

    // Buat format tanggal yang diinginkan
    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
}