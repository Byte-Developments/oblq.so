import { NextResponse } from 'next/server';
import { PasteService } from '@/lib/services/paste.service';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await PasteService.create(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create paste' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'ID is required' },
      { status: 400 }
    );
  }

  try {
    const result = await PasteService.getById(id);
    if (!result) {
      return NextResponse.json(
        { error: 'Paste not found or expired' },
        { status: 404 }
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch paste' },
      { status: 500 }
    );
  }
}