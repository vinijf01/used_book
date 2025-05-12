<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reviews extends Model
{
    use HasFactory;
    protected $table = 'reviews';
    protected $fillable = [
        'book_id',
        'user_id',
        'rating',
        'content',
        'photo',
    ];

    public function book()
    {
        return $this->belongsTo(Books::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
