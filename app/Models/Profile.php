<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profiles';

    protected $fillable = [
        'name',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'profile_id');
    }
}
