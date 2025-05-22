<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    public function index()
    {
        $books = Books::with('category')
            ->latest()
            ->get()
            ->map(function ($book) {
                return [
                    'id' => $book->id,
                    'title' => $book->title,
                    'slug' => $book->slug,
                    'author' => $book->author,
                    'price' => $book->price,
                    'description' => $book->description,
                    'cover_image' => $book->cover_image ? asset('storage/' . $book->cover_image) : null,
                    'category' => $book->category->name,
                ];
            });

        return response()->json([
            'status' => 'success',
            'data' => $books,
        ]);
    }

    public function show($slug)
    {
        $book = Books::with(['reviews.user']) // ambil relasi user dari review
            ->where('slug', $slug)
            ->firstOrFail();

        $averageRating = $book->reviews->avg('rating');

        return response()->json([
            'data' => $book,
            'average_rating' => round($averageRating, 1),
            'total_reviews' => $book->reviews->count(),
        ]);
    }
}
