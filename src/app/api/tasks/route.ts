import { NextResponse } from "next/server";

let tasks = [
{
    id:'1',
    title:'Task 1',
    description:'This is task 1',
    status:'pending',
    priority:'low',
    dueDate:new Date('2024-06-30')
},
{
    id:'2',
    title:'Task 2',
    description:'This is task 2',
    status:'in-progress',
    priority:'medium',
    dueDate:new Date('2024-07-15')
}
];

export async function GET() {
    return NextResponse.json(tasks);
}

export async function POST(request: Request) {
    const newTask = await request.json();
    tasks.push({...newTask, id:Date.now().toString()});
    return NextResponse.json(newTask,{status:201});
}