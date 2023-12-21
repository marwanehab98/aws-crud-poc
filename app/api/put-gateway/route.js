import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export async function PUT(request) {
  try {
    const authorization = request.headers.get('authorization');

    const body = await request.json();
    const { id, price, name } = body;

    let tempId = id || randomUUID();

    console.log(id);

    const response = await fetch(
      'https://6vkqtfzlw1.execute-api.us-west-1.amazonaws.com/test/items',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({
          id: tempId,
          price: `${price}`,
          name: `${name}`,
        }),
      },
    );

    const res = await response.json();

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
