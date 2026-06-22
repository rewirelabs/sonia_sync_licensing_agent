import { NextResponse } from 'next/server';
import { splitStems } from '@/lib/connectors/lalal';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { previewUrl } = body;

    if (!previewUrl) {
      return NextResponse.json({ error: 'Missing previewUrl' }, { status: 400 });
    }

    const stems = await splitStems(previewUrl);

    if (!stems) {
      return NextResponse.json({ error: 'Stem splitting failed or disabled' }, { status: 500 });
    }

    return NextResponse.json(stems);

  } catch (error: any) {
    console.error('[Stems API] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
