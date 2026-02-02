<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'questions';

    public $timestamps = false;

    protected $fillable = [
        'question',
        'number_question',
        'section_id',
    ];

    public function section()
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function interviews()
    {
        return $this->belongsToMany(Interview::class, 'question_answer_interview')
            ->withPivot('asnswer_id');
    }
}
