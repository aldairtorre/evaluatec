<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $table = 'sections';

    public $timestamps = false;

    protected $fillable = [
        'name'
    ];

   public function questions()
   {
     return $this->hasOne(Question::class, 'section_id');
   }
}
