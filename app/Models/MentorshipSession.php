<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorshipSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'mentor_id',
        'session_date',
        'time_slot',
        'location_type', // 'offline' atau 'online'
        'topic',
        'notes',
        'status', // 'scheduled', 'completed', 'cancelled'
        'mentor_reflection',
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function mentor()
    {
        return $this->belongsTo(User::class, 'mentor_id');
    }
}