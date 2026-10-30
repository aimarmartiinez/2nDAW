<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Club;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class HomeController extends Controller
{
    public function index()
    {
        $clubs = Club::where('state', 'active')
                    ->with('courts')
                    ->get();

        foreach ($clubs as $club) {
            $slug = Str::slug($club->name);
            $path = public_path("img/clubs/{$slug}");
            
            $images = collect([]);
            
            if (File::exists($path)) {
                $images = collect(File::files($path))
                    ->filter(fn ($file) => in_array(strtolower($file->getExtension()), ['png']))
                    ->sort() 
                    ->map(fn ($file) => asset("img/clubs/{$slug}/" . $file->getFilename()));
            }
            
            $club->images = $images;
        }

        return view('home', compact('clubs'));
    }
}