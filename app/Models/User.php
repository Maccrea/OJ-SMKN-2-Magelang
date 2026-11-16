<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Track;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Nah, pastikan fillable dan hidden ada DI DALAM class ini
    protected $fillable = [
        'name',
        'email',
        'password',
        'nisn',
        'role',
        'track_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function track()
    {
        return $this->belongsTo(Track::class, 'track_id');
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}