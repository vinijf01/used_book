<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categories extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'name',
        'description',
    ];

    /*
     * Get the books Associated with the category.
     *
     */
    public function books()
    {
        return $this->hasMany(Books::class);
    }
}
