
import { getStore } from '@netlify/blobs';
import { NextResponse } from 'next/server';

export const GET = async (
  _req: Request,
  { params }: { params: { filename: string[] } }
) => {
  if (!process.env.NETLIFY_CONTEXT) {
    return new NextResponse('Not found', { status: 404 });
  }

  const filename = params.filename.join('/');
  const store = getStore('uploads');
  const blob = await store.get(filename, { type: 'blob' });

  if (!blob) {
    return new NextResponse('Not found', { status: 404 });
  }

  const { type } = await store.getMetadata(filename);

  return new NextResponse(blob, {
    headers: {
      'Content-Type': type || 'application/octet-stream',
    },
  });
};

export const dynamic = 'force-dynamic';
