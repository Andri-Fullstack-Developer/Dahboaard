import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { Galerys } from '@prisma/client';

const prisma = new PrismaClient();

export const DELETE = async (request: Request, { params }: { params: { id: number } }) => {
    try {
        const res = await prisma.galerys.delete({
            where: {
                id: params.id
            }
        });
        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        console.error('Error deleting gallery item:', error);
        return NextResponse.error();
    }
};
