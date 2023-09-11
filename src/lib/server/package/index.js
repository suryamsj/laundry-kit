import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Create package
export async function createPackage(request) {
    const packages = await prisma.packages.create({
        data: request
    })
    return packages;
}

// Select All
export async function selectPackage() {
    const packages = await prisma.packages.findMany({
        orderBy: {
            id: "desc"
        }
    })
    return packages;
}

// Select By Id
export async function selectPackageById(request) {
    const packages = await prisma.packages.findUnique({
        where: {
            id: request
        }
    })
    return packages;
}

// Update Package
export async function updatePackage(id, request) {
    const packages = await prisma.packages.update({
        where: {
            id: id
        },
        data: request
    })
    return packages;
}

// Delete Package
export async function deletePackage(request) {
    const packages = await prisma.packages.delete({
        where: { id: request }
    })
    return packages;
}