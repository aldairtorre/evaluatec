<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function indexContent()
    {
        return response()->json([
            'data' => Section::all(),
        ]);
    }
}
