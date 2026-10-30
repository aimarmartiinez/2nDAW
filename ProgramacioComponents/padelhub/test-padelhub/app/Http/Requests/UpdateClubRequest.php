<?php  
  
namespace App\Http\Requests;  
  
use Illuminate\Foundation\Http\FormRequest;  
  
class UpdateClubRequest extends FormRequest  
{  
    public function authorize(): bool  
    {  
        return auth()->check() && auth()->user()->is_admin;
  
    }  
    
    public function rules(): array  
    {  
        $clubId = $this->route('club')->id ?? null;  
    
        return [  
            'name' => 'sometimes|required|string|max:255',  
            'address' => 'sometimes|required|string|max:255',  
            'city' => 'sometimes|required|string|max:255',  
            'postcode' => 'sometimes|required|string|max:20',  
            'phone' => 'sometimes|required|string|max:30',  
            'opening_time' => 'sometimes|required|date_format:H:i',  
            'closing_time' => 'sometimes|required|date_format:H:i|after:opening_time',  
            'email' => 'sometimes|required|email|unique:clubs,email,' . $clubId,  
            'state' => 'sometimes|required|string|in:active,inactive',  
        ];  
    }  
}  