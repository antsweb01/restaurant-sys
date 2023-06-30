<?php

namespace App\Http\Controllers;

use App\Kitchen;
use App\Kot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class KitchenController extends Controller
{
    /**
     * @param $email
     * @param $password
     * @return mixed
     */
    private function getToken($email, $password)
    {
        $token = null;
        try {
            if (!$token = JWTAuth::attempt(['email' => $email, 'password' => $password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid..',
                    'token' => $token,
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }
        return $token;
    }

    /**
     * @param $kitchen_id
     * @param $status
     * @return mixed
     */
    private function getKotByStatus($kitchen_id, $status)
    {
        $data = [];
        $count = 0;
        $query = DB::table('kots');
            $query->join('orders', 'kots.order_id', '=', 'orders.id');
            $query->select('kots.*', 'orders.unique_order_id');
            $query->where('kots.kitchen_id', $kitchen_id);
            $query->where('kots.status', $status);

        $count = $query->count();
        if($count > 0)
            $data = $query->get()->toArray();

        $res = array();
        $res['data'] = $data;
        $res['count'] = $count;

        return $res;
    }

    /**
     * @param Request $request
     */
    public function login(Request $request)
    {
        $user = \App\User::where('email', $request->email)->get()->first();
        if ($user && \Hash::check($request->password, $user->password)) {

            if ($user->hasRole('Kitchen')) {
                $token = self::getToken($request->email, $request->password);
                $user->auth_token = $token;
                $user->save();

                $newKotCount = DB::table('kots')
                                    ->join('kitchens', 'kots.kitchen_id', '=', 'kitchens.id')
                                    ->where('kots.status', 'pending')
                                    ->where('kitchens.user_id', $user->id)
                                    ->count();

                $acceptedKotCount = DB::table('kots')
                                    ->join('kitchens', 'kots.kitchen_id', '=', 'kitchens.id')
                                    ->where('kots.status', 'accept')
                                    ->where('kitchens.user_id', $user->id)
                                    ->count();

                $completedOrderCount = DB::table('kots')
                                    ->join('kitchens', 'kots.kitchen_id', '=', 'kitchens.id')
                                    ->where('kots.status', 'complete')
                                    ->where('kitchens.user_id', $user->id)
                                    ->count();

                $kitchen = Kitchen::where('user_id', $user->id)->first();
                if($kitchen){
                    $kitchen->status = 1;
                    $kitchen->save();
                }

                $response = [
                    'success' => true,
                    'data' => [
                        'id' => $user->id,
                        'auth_token' => $user->auth_token,
                        'name' => $user->name,
                        'email' => $user->email,
                        'status' => $user->kitchen->status,
                        'newKotCount' => $newKotCount,
                        'acceptedKotCount' => $acceptedKotCount,
                        'completedOrderCount' => $completedOrderCount,
                    ],
                ];
            } else {
                $response = ['success' => false, 'data' => 'Record doesnt exists'];
            }
        } else {
            $response = ['success' => false, 'data' => 'Record doesnt exists...'];
        }
        return response()->json($response, 201);
    }

    /**
     * @param Request $request
     */
    public function toggleKitchenStatus(Request $request)
    {
        $kitchenUser = auth()->user();

        $response = ['success' => false, 'data' => 'Record doesnt exists'];

        if ($kitchenUser && $kitchenUser->hasRole('Kitchen')) {

            if($kitchenUser->kitchen) {
                $toggle_status = 0;
                if($request->toggle_status === true){
                    $toggle_status = 1;
                }
                $kitchenUser->kitchen->status = $toggle_status;
                $kitchenUser->kitchen->save();

                $newKotCount = DB::table('kots')
                                    ->join('kitchens', 'kots.kitchen_id', '=', 'kitchens.id')
                                    ->where('kots.status', 'pending')
                                    ->where('kitchens.user_id', $kitchenUser->id)
                                    ->count();

                $acceptedKotCount = DB::table('kots')
                                    ->join('kitchens', 'kots.kitchen_id', '=', 'kitchens.id')
                                    ->where('kots.status', 'accept')
                                    ->where('kitchens.user_id', $kitchenUser->id)
                                    ->count();

                $completedOrderCount = DB::table('kots')
                                    ->join('kitchens', 'kots.kitchen_id', '=', 'kitchens.id')
                                    ->where('kots.status', 'complete')
                                    ->where('kitchens.user_id', $kitchenUser->id)
                                    ->count();
                
                $response = [
                    'success' => true,
                    'data' => [
                        'id' => $kitchenUser->id,
                        'auth_token' => $kitchenUser->auth_token,
                        'name' => $kitchenUser->name,
                        'email' => $kitchenUser->email,
                        'status' => $kitchenUser->kitchen->status,
                        'newKotCount' => $newKotCount,
                        'acceptedKotCount' => $acceptedKotCount,
                        'completedOrderCount' => $completedOrderCount,
                    ]
                ];
            }
        }
        return response()->json($response, 201);
    }

    /**
     * @param Request $request
     */
    public function getKots(Request $request)
    {
        $kitchenUser = auth()->user();

        $response = ['success' => false, 'data' => 'Record doesnt exists'];

        if ($kitchenUser && $kitchenUser->hasRole('Kitchen')) {

            if($request->status == "pending"){
                $new_kots = $this->getKotByStatus($kitchenUser->kitchen->id, 'pending');
                $response = [
                    'newKotCount' => $new_kots['count'],
                    'new_kots' => $new_kots['data'],
                ];
            }
            else if($request->status == "accept"){
                $accept_kots = $this->getKotByStatus($kitchenUser->kitchen->id, 'accept');
                $response = [
                    'acceptedKotCount' => $accept_kots['count'],
                    'accept_kots' => $accept_kots['data'],
                ];
            }
            else if($request->status == "complete"){
                $complete_kots = $this->getKotByStatus($kitchenUser->kitchen->id, 'complete');
                $response = [
                    'completedOrderCount' => $complete_kots['count'],
                    'complete_kots' => $complete_kots['data'],
                ];
            }
            else{
                $new_kots = $this->getKotByStatus($kitchenUser->kitchen->id, 'pending');
                $accept_kots = $this->getKotByStatus($kitchenUser->kitchen->id, 'accept');
                $complete_kots = $this->getKotByStatus($kitchenUser->kitchen->id, 'complete');

                $response = [
                    'newKotCount' => $new_kots['count'],
                    'new_kots' => $new_kots['data'],
                    'acceptedKotCount' => $accept_kots['count'],
                    'accept_kots' => $accept_kots['data'],
                    'completedOrderCount' => $complete_kots['count'],
                    'complete_kots' => $complete_kots['data'],
                ];
            }
            
            return response()->json($response, 201);
        }
    }
}
