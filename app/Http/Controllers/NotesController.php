<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Note;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function index()
    {
        return Note::all();
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

       $note = Note::create($data);

       return response($note, 201);

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Note $note)
    {
       $data = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'completed' => 'required|boolean',
            'user_id' => 'required|integer',
            'is_public' => 'required|boolean',
        ]);
 
        $note->update($data);
 
        return response($note, 200);
    }

    public function updateAll(Request $request) 
    {
        $data = $request->validate([
            'completed' => 'required|boolean',
        ]);

        Note::query()->update($data);

        return response('updated', 200);
    }





    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function destroy(Note $note)
    {
        $note->delete();
        
        return response('Deleted note item', 200);
    }

    public function destroyCompleted(Request $request)
    {
       $request->validate([
            'notes' => 'required|array'
        ]);

            Note::destroy($request->notes);

        return response('Deleted completed note items', 200);
    }
}
