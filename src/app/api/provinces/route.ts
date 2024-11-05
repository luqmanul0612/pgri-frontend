import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(`${process.env.HOST}/api/v1/address/province`, {
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
