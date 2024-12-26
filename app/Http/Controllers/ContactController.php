<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contact\StorePostRequest;
use App\Http\Requests\Contact\UpdatePostRequest;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::where('user_id', Auth::user()->id)->get();
        return Inertia::render('Contacts/Index', compact('contacts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Contacts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $data = $request->only('name', 'phone', 'visibility');
        $data['user_id'] = Auth::user()->id;
        if($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $routeImage = $file->store('avatars', ['disk' => 'public']);
            $data['avatar'] = $routeImage;
        }
        Contact::create($data);

        return to_route('contact.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        return Inertia::render('Contacts/Edit', compact('contact'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Contact $contact)
    {
        $data = $request->only('name', 'phone', 'visibility');
        $data['user_id'] = Auth::user()->id;
        if($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $routeImage = $file->store('avatars', ['disk' => 'public']);
            $data['avatar'] = $routeImage;
            if($contact->avatar) {
                Storage::disk('public')->delete($contact->avatar);
            }
        }
        $contact->update($data);
        return to_route('contact.edit', $contact);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        if($contact->avatar) {
            Storage::disk('public')->delete($contact->avatar);
        }
        $contact->delete();
        return to_route('contact.index');
    }
}
