import { PrismaClient } from '@prisma/client';

import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const result = await prisma.galerys.findMany();
    return Response.json({ message: 'Ok', status: 200, data: result });
}

export const POST = async (req: NextRequest) => {
    const { id_Galery, title, content, img_url, categor } = await req.json();

    const galery_POST = await prisma.galerys.create({
        data: {
            id_Galery,
            title,
            content,
            img_url,
            categor
        }
    });
    return NextResponse.json({ galery_POST });
};


// export const PUT = async (req: NextRequest, res: NextResponse) => {
//     const { id, title, content, img_url, categor } = await req.json();

//     try {
//         const galery_UPDATE = await prisma.galerys.update({
//             where: {
//                 id: id
//             },
//             data: {
//                 title,
//                 content,
//                 img_url,
//                 categor
//             }
//         });
//         return res.json({ success: true, data: galery_UPDATE });
//     } catch (error) {
//         console.error('Error updating gallery item:', error);
//         return res.status(500).json({ success: false, error: 'Failed to update data' });
//     }
// };

export const DELETE = async (req: NextRequest, { params }: { params: { id: number } }) => {
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
