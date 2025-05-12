<?php

namespace App\Filament\Resources\FavoritesResource\Pages;

use App\Filament\Resources\FavoritesResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateFavorites extends CreateRecord
{
    protected static string $resource = FavoritesResource::class;
}
