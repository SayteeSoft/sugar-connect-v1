
import { getStore } from '@netlify/blobs';
import { NextResponse } from 'next/server';

export const GET = async (
  _req: Request,
  { params }: { params: { filename: string[] } }
) => {
  if (process.env.NODE_ENV !== 'production') {
    // This route is only for production on Netlify
    return new NextResponse('Not found', { status: 404 });
  }

  const filename = params.filename.join('/');
  const store = getStore('uploads');
  const blob = await store.get(filename, { type: 'blob' });

  if (!blob) {
    return new NextResponse('Not found', { status: 404 });
  }

  const { metadata } = (await store.getMetadata(filename)) || {};
  const type = (metadata?.type && typeof metadata.type === 'string') ? metadata.type : 'application/octet-stream';

  return new NextResponse(blob, {
    headers: {
      'Content-Type': type,
    },
  });
};

export const dynamic = 'force-dynamic';
