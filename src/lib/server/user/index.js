import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Create User
export async function createUser(request) {
    const user = await prisma.users.create({
        data: request
    })
    return user;
}

// Select User
export async function selectUserByUsername(request) {
    const user = await prisma.users.findUnique({
        where: {
            username: request
        }
    })
    return user;
}

// Update Data User
export async function updateUser(id, request) {
    const user = await prisma.users.update({
        where: { id: id },
        data: {
            name: request.name,
            username: request.username
        }
    })
    return user;
}

// Update Password
export async function updateUserPassword(id, request) {
    const user = await prisma.users.update({
        where: { id: id },
        data: {
            password: request.password
        }
    })
    return user;
}