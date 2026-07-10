export interface Task{
    id:string;
title:string;
description:string;
status:'pending'|'in-progress'|'completed';
priority:'low'|'medium'|'high';
dueDate:string;
}

export interface AuthState{
    isAuthenticated:boolean;
    user:{email:string}|null;
}