<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BooksController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;


// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Books
Route::get('/books', [BooksController::class, 'index']);

Route::middleware('auth:sanctum')->get('/books/{slug}', [BooksController::class, 'show']);
