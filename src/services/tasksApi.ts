import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Task} from '../types';

export const tasksApi=createApi(
    {
        reducerPath:'tasksApi',
        baseQuery:fetchBaseQuery({baseUrl:'/api'}),
        tagTypes:['Task'],
        endpoints:(builder)=>({
            getTasks:builder.query<Task[],void>({
                query:()=>'/tasks',
                providesTags:['Task'],
            }),
            addTask:builder.mutation<Task,Partial<Task>>({
                query:(body)=>({
                    url:'/tasks',
                method:'POST',
                body}),
                invalidatesTags:['Task'],
            }),
        })
    }
)
export const {useGetTasksQuery,useAddTaskMutation}=tasksApi;