import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        // Mengambil data terbaru berdasarkan createdAt
        const result = await prisma.galerys.findMany({
            orderBy: {
                createdAt: 'desc' // Urutkan berdasarkan createdAt secara menurun (terbaru ke terlama)
            }
        });

        return Response.json({ message: 'Ok', status: 200, data: result });
    } catch (error) {
        console.error('Error fetching data:', error);
        return Response.json({ message: 'Error fetching data', status: 500 });
    }
}
