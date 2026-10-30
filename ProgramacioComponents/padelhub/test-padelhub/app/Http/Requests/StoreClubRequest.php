<?php  
  
namespace App\Http\Requests;  
  
use Illuminate\Foundation\Http\FormRequest;  
  
class StoreClubRequest extends FormRequest  
{  
    public function authorize(): bool  
    {  
        //solo admins pueden crear clubes.
        return auth()->check() && auth()->user()->is_admin;
    }  
    
    public function rules(): array  
    {  
        return [  
            'name' => 'required|string|max:255',  
            'address' => 'required|string|max:255',  
            'city' => 'required|string|max:255',  
            'postcode' => 'required|string|max:20',  
            'phone' => 'required|string|max:30',  
            'opening_time' => 'required|date_format:H:i',  
            'closing_time' => 'required|date_format:H:i|after:opening_time',  
            'email' => 'required|email|unique:clubs,email',  
            'state' => 'nullable|string|in:active,inactive',  
        ];  
    }  
}  