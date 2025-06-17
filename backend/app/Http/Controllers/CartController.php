<?php

namespace App\Http\Controllers;

use App\Models\Carts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{

    public function index()
    {
        $user = Auth::user();
        $cartItems = Carts::with('book')
            ->where('user_id', $user->id)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'book_id' => $item->book_id,
                    'title' => $item->book->title ?? '',
                    'price' => $item->book->price ?? 0,
                    'cover_image' => $item->book->cover_image ? asset('storage/' . $item->book->cover_image) : null,
                    'quantity' => $item->quantity,
                ];
            });
        return response()->json([
            'status' => 'success',
            'data' => $cartItems,
        ]);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Carts::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'book_id' => $request->book_id,
            ],
            [
                'quantity' => DB::raw('quantity + ' . ($request->quantity ?? 1))
            ]
        );

        return response()->json([
            'message' => 'Book added to cart successfully',
            'cart' => $cart,
        ], 200);
    }
}
