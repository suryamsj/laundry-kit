import { insertData, selectAll } from '$lib/server/db';
import { randomInvoice } from "$lib/utils/invoice";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const [prices, costumers] = await Promise.all([
        selectAll('prices'),
        selectAll('costumers')
    ]);
    return {
        prices, costumers
    };
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const form = await request.formData();

        // Form Trnasaction
        const id = randomInvoice(1, 1000000);
        const transaction_date = Date.now();
        const costumer_id = form.get("costumer_id");
        const price_id = "1";
        const weight = form.get("weight");
        const transaction_finish_date = form.get("transaction_finish_date");
        const transaction_status = "proses";
        const transaction_price = form.get("transaction_price");

        // Form Clothing
        const transaction_id = id;

        const clothingTypeArray = [];

        let currentType = null;
        for (const [name, value] of form.entries()) {
            if (name.startsWith('clothing_type')) {
                currentType = value;
            } else if (name === 'clothing_amount') {
                const clothingAmount = value;
                if (currentType !== null && clothingAmount !== null) {
                    clothingTypeArray.push({ transaction_id, clothing_type: currentType, clothing_amount: clothingAmount });
                }
            }
        }

        const [transactionResponse, clothingResponse] = await Promise.all([
            insertData({ id, transaction_date, costumer_id, price_id, weight, transaction_finish_date, transaction_status, transaction_price }, 'transactions', 'id'),
            insertData(clothingTypeArray, 'clothes', 'id')
        ]);

        return await transactionResponse[0] === 0 && clothingResponse[0] === 0 ? { failed: true, message: 'Data gagal ditambahkan' } : { success: true, message: 'Data berhasil ditambahkan' };
    }
};