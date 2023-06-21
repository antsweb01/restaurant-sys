<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kitchen extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function restaurants()
    {
        return $this->hasMany('App\Restaurant');
    }
}
