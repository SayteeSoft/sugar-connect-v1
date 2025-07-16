
import { getStore } from '@netlify/blobs';
import { NextResponse } from 'next/server';

export const GET = async (
  _req: Request,
  { params }: { params: { filename: string[] } }
) => {
  // This route is primarily for production on Netlify, but the redirect in netlify.toml makes it work for dev too.
  
  const filename = params.filename.join('/');
  const store = getStore('uploads');
  
  try {
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
  } catch (error) {
    console.error(`Error retrieving blob "${filename}":`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const dynamic = 'force-dynamic';

    