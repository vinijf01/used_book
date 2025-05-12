<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Carts extends Model
{
    use HasFactory;

    protected $table = 'carts';

    protected $fillable = [
        'user_id',
        'book_id',
        'quantity',
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
