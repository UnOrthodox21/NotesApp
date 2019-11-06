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


Route::middleware('auth:api')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });


    Route::get('/tasks', 'TasksController@index');

    Route::post('/tasks', 'TasksController@store');

    Route::patch('/tasks/{task}', 'TasksController@update');

    Route::patch('/tasksCheckAll', 'TasksController@updateAll');

    Route::delete('/tasks/{task}', 'TasksController@destroy');

    Route::delete('/tasksDeleteCompleted', 'TasksController@destroyCompleted');

    Route::post('/logout', 'AuthController@logout');


});




// Route::resource('/notes', 'NotesController');


Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');




// Notes

Route::get('/notes', 'NotesController@index');

Route::post('/notes', 'NotesController@store');

Route::patch('/notes/{note}', 'NotesController@update');
Route::patch('/notesCheckAll', 'NotesController@updateAll');

Route::delete('/notes/{note}', 'NotesController@destroy');
Route::delete('/notesDeleteCompleted', 'NotesController@destroyCompleted');


// Tasks





