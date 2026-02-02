<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpsertAspirantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::guard('admin')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'aspirant.name' => 'required|string|max:255',
            'aspirant.email' => 'required|email',
            'aspirant.phone' => 'nullable|string|max:20',
            'aspirant.first_last_name' => 'required|string|max:255',
            'aspirant.second_last_name' => 'nullable|string|max:255',
        ];
    }
}
