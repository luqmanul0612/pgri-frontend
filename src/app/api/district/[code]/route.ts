import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { code: string } }) {
  const { code } = params;

  // Mengganti URL ke endpoint district
  const res = await fetch(`${process.env.HOST}/api/v1/address/district/${code}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return NextResponse.error();
  }

  const data = await res.json();
  return NextResponse.json(data);
}
