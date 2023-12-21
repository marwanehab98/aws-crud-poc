import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const authorization = request.headers.get('authorization');

    const response = await fetch(
      'https://6vkqtfzlw1.execute-api.us-west-1.amazonaws.com/test/items',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${authorization}`,
        },
      },
    );

    const res = await response.json();

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(null);
  }
}
