<?php

namespace App\Config;

enum OrderStatus: string {
    case Pending = 'pending';
    case Shipped = 'shipped';
    case Delivered = 'delivered';
}