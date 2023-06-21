<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kot extends Model
{
    /**
     * @return mixed
     */
    public function order()
    {
        return $this->belongsTo('App\Order');
    }
}
