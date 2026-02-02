<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'first_last_name',
        'second_last_name',
        'email',
        'password',
        'phone',
        'gender_id',
        'profile_id'
    ];

    protected $appends = [
        'full_name'
    ];
   
    protected $hidden = [
        'password',
        'remember_token',
    ];

   
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function gender()
    {
        return $this->belongsTo(Gender::class, 'gender_id');
    }

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class, 'profile_id');
    }

    public function imageUser()
    {
        return $this->hasOne(ImageUser::class, 'user_id');
    }

    public function interview()
    {
        return $this->hasOne(Interview::class, 'user_id');
    }

    public function getFullNameAttribute(): string
    {
        $fullName = '';
        if ($this->name != null) $fullName.= $this->name;
        if ($this->first_last_name != null) $fullName.= ' ' . $this->first_last_name;
        if ($this->second_last_name != null) $fullName.= ' ' . $this->second_last_name;
        return trim($fullName);
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
