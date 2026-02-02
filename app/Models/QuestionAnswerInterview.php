<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuestionAnswerInterview extends Model
{
    protected $table = 'question_answer_interview';

    public $timestamps = false;

    protected $fillable = [
        'question_id',
        'asnswer_id',
        'interview_id',
    ];

    public function interview(): BelongsTo
    {
        return $this->belongsTo(Interview::class, 'interview_id');
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class, 'question_id');
    }

    public function answer(): BelongsTo
    {
        return $this->belongsTo(Answer::class, 'asnswer_id');
    }
}
