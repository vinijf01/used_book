<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        //Admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@usedbook.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'address' => '123 Admin St, Admin City, Admin State, 12345',
            'profile_photo' => 'https://example.com/admin-profile.jpg',
            'profile_photo' => null,
        ]);
    }
}
