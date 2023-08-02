import pkg from 'knex';
import { DB_PATH } from '$env/static/private';

const { knex } = pkg;

const db = knex({
    client: 'better-sqlite3', // or 'better-sqlite3'
    connection: {
        filename: DB_PATH
    },
    useNullAsDefault: true
});

/**
 * Mengambil semua data dari tabel.
 *
 * @param {string} table - Nama tabel yang akan diambil datanya.
 * @returns {Promise<Object|null>} - Sebuah Promise yang akan mengeksekusi operasi pengambilan data dari tabel.
 */
export const selectAll = async (table) => {
    return db.select().table(table);
}

/**
 * Mengambil satu data dari tabel berdasarkan nilai kolom tertentu.
 * Ini perlu diganti supaya gak conflict, jangan make raw data supaya di atas table gak bisa di selct.
 *
 * @param {string} table - Nama tabel yang akan diambil datanya.
 * @param {string} column - Nama kolom yang akan digunakan sebagai filter.
 * @param {any} value - Nilai yang akan digunakan untuk mencocokkan data pada kolom tertentu.
 * @returns {Promise<Object|null>} - Sebuah Promise yang akan mengeksekusi operasi pengambilan satu data dari tabel.
 */
export const selectOneData = async (table, column, value) => {
    return db.select().table(table).where(column, value).first();
}

/**
 * Melakukan operasi SELECT pada database dengan melakukan JOIN antara dua tabel.
 *
 * @async
 * @param {string} table1 - Nama tabel pertama yang akan di-JOIN.
 * @param {string} table2 - Nama tabel kedua yang akan di-JOIN.
 * @param {string} column1 - Nama kolom pada tabel pertama yang akan di-JOIN.
 * @param {string} column2 - Nama kolom pada tabel kedua yang akan di-JOIN.
 * @returns {Promise<Object|null>} Promise yang akan mengembalikan objek hasil JOIN atau null jika tidak ada hasil.
 */
export const selectJoinTransaction = async () => {
    return db.select(
        'transactions.id as id_t',
        'transactions.transaction_date as trans_date',
        'transactions.costumer_id as customer_id',
        'transactions.weight',
        'transactions.transaction_finish_date as finish_date',
        'transactions.transaction_status as status',
        'transactions.transaction_price as price',
        'costumers.name as customer_name',
    )
        .from('transactions')
        .join('costumers', 'transactions.costumer_id', 'costumers.id');
}

export const selectDetailTransaction = async () => {
    return db.select(
        'transactions.id as id_t',
        'transactions.transaction_date as trans_date',
        'transactions.costumer_id as customer_id',
        'transactions.weight',
        'transactions.transaction_finish_date as finish_date',
        'transactions.transaction_status as status',
        'transactions.transaction_price as price',
        'clothes.clothing_type',
        'clothes.clothing_amount',
        'costumers.name as customer_name',
    )
        .from('transactions')
        .join('clothes', 'transactions.id', 'clothes.transaction_id')
        .join('costumers', 'transactions.costumer_id', 'costumers.id');
}

/**
 * Memasukkan data ke dalam tabel dengan opsi mengabaikan duplikasi berdasarkan kolom 'username'.
 * Ini juga harusnya conflict nya di buat supaya bukan username aja yang dimasukin. Kalo bisa kolom lain juga bisa
 *
 * @param {Object} data - Data yang akan dimasukkan ke dalam tabel.
 * @param {string} table - Nama tabel yang akan diisi.
 * @param {string} conflict - Unique kolom.
 * @returns {Promise<number>} - Sebuah Promise yang akan mengeksekusi operasi pemasukan data ke dalam tabel dan mengembalikan ID data yang dimasukkan.
 */
export const insertData = async (data, table, conflict) => {
    return db.insert(data).onConflict(conflict).ignore().into(table);
}

/**
 * Mengubah data dalam tabel berdasarkan nilai kolom dan ID tertentu.
 *
 * @param {Object} data - Data yang akan diubah dalam tabel.
 * @param {string} table - Nama tabel yang akan diubah datanya.
 * @param {string} column - Nama kolom yang akan digunakan sebagai filter.
 * @param {number} id - ID yang akan digunakan untuk mencocokkan data dalam tabel.
 * @returns {Promise<number>} - Sebuah Promise yang akan mengeksekusi operasi perubahan data dalam tabel dan mengembalikan jumlah data yang diubah.
 */
export const updateData = async (data, table, column, id) => {
    return db.update(data).table(table).where(column, id);
}

/**
 * Menghapus data dari tabel berdasarkan ID tertentu.
 * Ini harusnya bisa ngapus data array, coba mas dibuat jadi array. Supaya gak cuma bisa 1 data aja yang di delete.
 *
 * @param {string} table - Nama tabel yang akan dihapus datanya.
 * @param {number} id - ID yang akan digunakan untuk mencocokkan data dalam tabel yang akan dihapus.
 * @returns {Promise<number>} - Sebuah Promise yang akan mengeksekusi operasi penghapusan data dari tabel dan mengembalikan jumlah data yang dihapus.
 */
export const deleteData = async (table, id) => {
    return db.table(table).where('id', id).del();
}