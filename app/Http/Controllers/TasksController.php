<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Task::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $data = $request->validate([
           'title' => 'required|string',
           'completed' => 'required|boolean',
       ]);

       $task = Task::create($data);

       return response($task, 201);

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
       $data = $request->validate([
            'title' => 'required|string',
            'completed' => 'required|boolean',
        ]);
 
        $task->update($data);
 
        return response($task, 200);
    }

    public function updateAll(Request $request) 
    {
        $data = $request->validate([
            'completed' => 'required|boolean',
        ]);

        Task::query()->update($data);

        return response('updated', 200);
    }





    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $task->delete();
        
        return response('Deleted task item', 200);
    }

    public function destroyCompleted(Request $request)
    {
       $request->validate([
            'tasks' => 'required|array'
        ]);

            Task::destroy($request->tasks);

        return response('Deleted completed task items', 200);
    }

}
