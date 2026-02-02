<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aspirant extends Model
{
    protected $table = 'aspirants';

    public $timestamps = false;

    protected $fillable = [
        'name',
        'first_last_name',
        'second_last_name',
        'email',
        'phone',
    ];

    protected $appends = [
        'full_name',
    ];

    public function interview()
    {
        return $this->hasOne(Interview::class, 'aspirant_id');
    }

    public function result()
    {
        return $this->hasOne(Result::class, 'aspirant_id');
    }

    public function getFullNameAttribute(): string
    {
        $fullName = '';
        if ($this->name != null) {
            $fullName .= $this->name;
        }
        if ($this->first_last_name != null) {
            $fullName .= ' '.$this->first_last_name;
        }
        if ($this->second_last_name != null) {
            $fullName .= ' '.$this->second_last_name;
        }

        return trim($fullName);
    }
}
