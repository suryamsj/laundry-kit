import { createTransaction } from '$lib/server/transaction';
import { selectCostumer } from '$lib/server/costumer';
import { selectPackage } from '$lib/server/package';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        packages: await selectPackage(),
        costumers: await selectCostumer()
    }
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        try {
            const form = await request.formData();

            // Form Trnasaction
            const costumersId = form.get("costumersId");
            const packagesId = form.get("packagesId");
            const weight = parseInt(form.get("weight"));
            const transaction_finish_date = new Date(form.get("transaction_finish_date"));
            const transaction_status = "proses";
            const transaction_price = parseInt(form.get("transaction_price"));

            const transaction = {
                costumersId, packagesId, weight, transaction_finish_date, transaction_status, transaction_price
            }

            // Form Clothing
            const clothingTypeArray = [];

            let currentType = null;
            for (const [name, value] of form.entries()) {
                if (name.startsWith('clothing_type')) {
                    currentType = value;
                } else if (name === 'clothing_amount') {
                    const clothingAmount = value;
                    if (currentType !== null && clothingAmount !== null) {
                        clothingTypeArray.push({ clothing_type: currentType, clothing_amount: clothingAmount });
                    }
                }
            }

            const res = await createTransaction(transaction, clothingTypeArray);
            return { success: true, message: "Data Transaksi berhasil ditambahkan", data: res }
        } catch (error) {
            return fail(500, {
                error: true,
                message: "Data Transaksi gagal ditambahkan"
            })
        }
    }
};