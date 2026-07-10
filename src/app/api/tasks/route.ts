import { NextResponse } from 'next/server';
import { tasks } from './_data';

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTask = { ...body, id: Date.now().toString() };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}
