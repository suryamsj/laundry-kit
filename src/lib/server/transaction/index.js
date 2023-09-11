import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient;

// Create Transaction
export async function createTransaction(request, clothes) {
    const transaction = await prisma.transaction.create({
        data: {
            costumersId: request.costumersId,
            packagesId: request.packagesId,
            weight: request.weight,
            transaction_finish_date: request.transaction_finish_date,
            transaction_status: request.transaction_status,
            transaction_price: request.transaction_price,
            clothes: {
                create: clothes
            }
        },
        include: {
            clothes: true
        }
    });
    return transaction;
}

// Select All
export async function selectTransaction() {
    const transaction = await prisma.transaction.findMany({
        include: {
            clothes: true,
            costumer: {
                select: {
                    id: true,
                    name: true,
                    phone_number: true,
                    address: true
                }
            },
            packages: {
                select: {
                    name: true,
                    price: true
                }
            }
        },
        orderBy: {
            transaction_date: "desc"
        }
    })
    return transaction;
}

// Select By Id
export async function selectTransactionById(request) {
    const transaction = await prisma.transaction.findUnique({
        where: { id: request },
        include: { clothes: true, costumer: true }
    })
    return transaction;
}

// Update Transaction
export async function updateTransaction(id, request) {
    const transaction = await prisma.transaction.update({
        where: { id: id },
        data: request
    })
    return transaction;
}

// Delete Transaction
export async function deleteTransaction(request) {
    const transaction = await prisma.transaction.delete({
        where: { id: request }
    })
    return transaction;
}