<?php

namespace App\Http\Controllers\Datatables;

use App\User;
use Yajra\DataTables\DataTables;

class KitchenAdminDatatable
{
    /**
     * @return mixed
     */
    public function kitchenAdminDatatable()
    {
        $users = User::role('Kitchen');

        return Datatables::of($users)
            ->editColumn('created_at', function ($user) {
                return '<span data-popup="tooltip" data-placement="left" title="' . $user->created_at->diffForHumans() . '">' . $user->created_at->format('Y-m-d - h:i A') . '</span>';
            })
            ->addColumn('action', function ($user) {
                return '<div class="btn-group btn-group-justified"> <a href="' . route('admin.get.manageKitchenAdminKitchen', $user->id) . '" class="btn btn-sm btn-secondary mr-2"> Manage Kitchen</a> <a href="' . route('admin.get.editUser', $user->id) . '" class="btn btn-sm btn-primary"> View</a> </div>';
            })
            ->rawColumns(['action', 'created_at', 'status'])
            ->make(true);
    }
}
