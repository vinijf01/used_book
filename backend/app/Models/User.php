<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    //Relasi dengan orders (User memiliki banyak orders)
    public function orders()
    {
        return $this->hasMany(Orders::class);
    }
    //Relasi dengan carts (User memiliki banyak carts)
    public function carts()
    {
        return $this->hasMany(Carts::class);
    }
    //Relasi dengan reviews (User memiliki banyak reviews)
    public function reviews()
    {
        return $this->hasMany(Reviews::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorites::class);
    }
}
