import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { Galerys } from '@prisma/client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jexcnbaxxougbjcyvmnn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpleGNuYmF4eG91Z2JqY3l2bW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwMDM4MjQsImV4cCI6MjAyNTU3OTgyNH0.UzZjeyF4XZWUJtV84tIAgE4Mam5tSGnlGRAHvUi6gC0';

const supabase = createClient(supabaseUrl, supabaseKey);

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
