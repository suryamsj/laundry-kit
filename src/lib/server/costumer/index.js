import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Create Costumer
export async function createCostumer(request) {
    const costumer = await prisma.costumers.create({
        data: request
    });
    return costumer;
}

// Select All
export async function selectCostumer() {
    const costumer = prisma.costumers.findMany({
        orderBy: {
            id: "desc"
        },
    })
    return costumer;
}

// Select By Id
export async function selectCostumerById(request) {
    const costumer = await prisma.costumers.findUnique({
        where: { id: request }
    })
    return costumer;
}

// Update Costumer
export async function updateCostumer(id, request) {
    const costumer = await prisma.costumers.update({
        where: {
            id: id
        },
        data: request
    });
    return costumer;
}

// Delete Costumer
export async function deleteCostumer(request) {
    const costumer = await prisma.costumers.delete({
        where: {
            id: request
        }
    });
    return costumer;
}