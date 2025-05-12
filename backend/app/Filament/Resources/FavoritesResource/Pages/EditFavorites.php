<?php

namespace App\Filament\Resources\FavoritesResource\Pages;

use App\Filament\Resources\FavoritesResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFavorites extends EditRecord
{
    protected static string $resource = FavoritesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
