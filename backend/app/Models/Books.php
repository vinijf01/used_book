<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Books extends Model
{
    use HasFactory;

    protected $table = 'books';

    protected $fillable = [
        'title',
        'slug',
        'author',
        'description',
        'price',
        'category_id',
        'cover_image',
    ];



    public function getRouteKeyName()
    {
        return 'slug';
    }

    // Mutator ini secara khusus memproses atribut title dan secara otomatis menghasilkan nilai untuk kolom slug berdasarkan title.
    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function category()
    {
        return $this->belongsTo(Categories::class);
    }
    public function reviews()
    {
        return $this->hasMany(Reviews::class);
    }
    public function orders()
    {
        return $this->hasMany(Orders::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorites::class);
    }
    public function cart()
    {
        return $this->hasMany(Carts::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
