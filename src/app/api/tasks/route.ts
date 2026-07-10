import { NextResponse } from 'next/server';
import { tasks } from './_data';
import { taskSchema } from '@/lib/validations';

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = taskSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const newTask = { ...parsed.data, id: Date.now().toString() };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}
