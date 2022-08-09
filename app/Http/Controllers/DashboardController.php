<?php

namespace App\Http\Controllers;

use App\Jobs\ImageDownloading;
use App\Models\ImageUpload;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function imageUpload(Request $request)
    {

        $request->validate([
            'src' => 'required'
        ], [
            'src.required' => 'image link can not be null'
        ]);

        ImageUpload::create([
            'user_id' => Auth::id(),
            'image' => $request->src
        ]);

        return response()->json('upload successfully', 200);
    }

    public function getImage()
    {
        $images = ImageUpload::all();
        return response()->json(['status' => 200, 'images' => $images]);
    }

    public function downloadImage($id)
    {        
        $jobs = (new ImageDownloading($id))->delay(Carbon::now()->addSecond(1));
        
        dispatch($jobs);
        return response()->json('Downloding....');
    }
}
