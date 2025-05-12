<?php

namespace App\Filament\Resources\FavoritesResource\Pages;

use App\Filament\Resources\FavoritesResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFavorites extends ListRecords
{
    protected static string $resource = FavoritesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
