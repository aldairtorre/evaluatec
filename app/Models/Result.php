<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    protected $table = 'results';

    public $timestamps = false;

    protected $fillable = [
        'course_score',
        'course_score_percentage',
        'correct_reagents',
        'correct_reagents_percentage',
        'weighing',
        'interview_score',
        'interview_score_percentage',
        'final_score',
    ];

    public function aspirant()
    {
        return $this->hasOne(Aspirant::class, 'aspirant_id');
    }
}
