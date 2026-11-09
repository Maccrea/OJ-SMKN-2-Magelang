<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // Izinkan pengisian data ini
    protected $fillable = [
        'module_id', 
        'title', 
        'study_case_html', 
        'deadline', 
        'starter_code_path'
    ];

    // Relasi balik ke modul
    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}