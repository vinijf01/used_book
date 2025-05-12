<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory;

    protected $table = 'order_items';

    protected $fillable = [
        'order_id',
        'book_id',
        'quantity',
        'price',
    ];

    public function order()
    {
        return $this->belongsTo(Orders::class);
    }
    public function book()
    {
        return $this->belongsTo(Books::class);
    }
}
