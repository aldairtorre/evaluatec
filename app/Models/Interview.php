<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    protected $table = 'interviews';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'aspirant_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function aspirant()
    {
        return $this->belongsTo(Aspirant::class, 'aspirant_id');
    }

    public function questionAnswers()
    {
        return $this->hasMany(QuestionAnswerInterview::class);
    }
}
