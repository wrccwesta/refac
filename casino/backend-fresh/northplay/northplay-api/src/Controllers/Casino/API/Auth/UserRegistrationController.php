<?php

namespace Northplay\NorthplayApi\Controllers\Casino\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Cache;
use Northplay\NorthplayApi\Controllers\Casino\API\CasinoTrait;

class UserRegistrationController extends Controller
{
    use CasinoTrait;
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

    public function store(Request $request): Response
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        
        $select_email = User::where("email", $request->email)->first();
        if($select_email) {
            abort(400, "User with this email already exist.");
        }
        $select_name = User::where("name", $request->name)->first();

        if($select_name) {
            
            abort(400, "User with this name already exist.");
        }
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $this->sendNotification(
            $user->id,
            "Email Verification",
            "Please make sure to verify your e-mail in order to be able to recover your e-mail.",
            "Please make sure to verify your e-mail in order to be able to recover your e-mail.",
            "account",
            "/user/profile/verify-email"
        );

        event(new Registered($user));
        
        Auth::login($user);
        
        
        return response()->noContent();
    }


    
}
