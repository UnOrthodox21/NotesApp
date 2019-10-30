<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::resource('/notes', 'NotesController');

Route::get('/tasks', 'TasksController@index');


Route::post('/tasks', 'TasksController@store');

Route::patch('/tasks/{task}', 'TasksController@update');
Route::patch('/tasksCheckAll', 'TasksController@updateAll');

Route::delete('/tasks/{task}', 'TasksController@destroy');
Route::delete('/tasksDeleteCompleted', 'TasksController@destroyCompleted');
