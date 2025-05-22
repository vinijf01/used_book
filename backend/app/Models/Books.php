<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Books extends Model
{
    use HasFactory;

    protected $table = 'books';

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'author',
        'description',
        'price',
        'category_id',
        'cover_image',
    ];


    // Event booting
    protected static function booted()
    {
        // Hapus file gambar saat buku di hapus
        static::deleting(function ($book) {
            if ($book->cover_image && Storage::disk('public')->exists($book->cover_image)) {
                Storage::disk('public')->delete($book->cover_image);
            }
        });

        //Hapus file lama saat gambar di ganti
        static::updating(function ($book) {
            if ($book->isDirty('cover_image')) {
                $oldImage = $book->getOriginal('cover_image');
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        });
    }


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
        return $this->hasMany(Reviews::class, 'book_id');
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
