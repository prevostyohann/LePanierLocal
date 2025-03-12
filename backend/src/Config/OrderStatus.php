<?php

namespace App\Config;

class OrderStatus
{
    const PENDING = 'pending';   // Commande en attente
    const COMPLETED = 'completed';  // Commande terminée
    const ARCHIVED = 'archived';   // Commande archivée

    // Retourne tous les statuts possibles
    public static function getAllStatuses(): array
    {
        return [
            self::PENDING,
            self::COMPLETED,
            self::ARCHIVED
        ];
    }
}