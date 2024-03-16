import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const result = await prisma.galerys.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return Response.json({ message: 'Ok', status: 200, data: result });
}
