<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Question extends Model
{
    protected $table = 'questions';

    public $timestamps = false;

    protected $fillable = [
        'question',
        'number_question',
        'section_id'
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
