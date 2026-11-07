<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    // 1. Izinkan kolom-kolom ini diisi dari Form React
    protected $fillable = [
        'title', 
        'week_number', 
        'track_id', 
        'description'
    ];

    // 2. Hubungkan ke model Task untuk dipakai di halaman Beranda
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}