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
        return auth()->user()->tasks;
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

       $task = Task::create([
           'user_id' => auth()->user()->id,
           'title' => $request->title,
           'completed' => $request->completed,
       ]);

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


        if ($task->user_id != auth()->user()->id) {
            return response()->json('Unauthorized', 401);
        }



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

        Task::where('user_id', auth()->user()->id)->update($data);

        return response()->json('Updated', 200);
    }





    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {

        if ($task->user_id != auth()->user()->id) {
            return response()->json('Unauthorized', 401);
        }

        $task->delete();
        
        return response('Deleted task item', 200);
    }

    public function destroyCompleted(Request $request)
    {

        // [6,9] task ids we are passing and want to delete

        // [5,6,9] all of the users task ids


        $tasksToDelete = $request->tasks;

        $userTaskIds = auth()->user()->tasks->map(function ($task) {
            return $task->id;
        });

        $valid = collect($tasksToDelete)->every(function ($value, $key) use ($userTaskIds){
            return $userTaskIds->contains($value);
        });

        if(!$valid) {
            return response()->json('Unauthorized', 401);
        }


       $request->validate([
            'tasks' => 'required|array',
        ]);

        Task::destroy($request->tasks);

        return response()->json('Deleted completed task items', 200);
    }

}
