<?php  

namespace App\Http\Controllers\Api;  

use App\Http\Controllers\Controller;  
use App\Models\Club;  
use App\Http\Requests\StoreClubRequest;  
use App\Http\Requests\UpdateClubRequest;  
use OpenApi\Annotations as OA;

class ClubController extends Controller  
{  
    /**
     * @OA\Get(
     *     path="/api/clubs",
     *     summary="Obtener todos los clubs",
     *     tags={"Clubs"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de clubs"
     *     )
     * )
     */
    public function index()  
    {  
        return response()->json(Club::with('courts')->get(), 200);  
    }  

    /**
     * @OA\Post(
     *     path="/api/clubs",
     *     summary="Crear un club",
     *     tags={"Clubs"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","address","city","postcode","phone","opening_time","closing_time","email","state"},
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="address", type="string"),
     *             @OA\Property(property="city", type="string"),
     *             @OA\Property(property="postcode", type="string"),
     *             @OA\Property(property="phone", type="string"),
     *             @OA\Property(property="opening_time", type="string"),
     *             @OA\Property(property="closing_time", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="state", type="boolean")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Club creado")
     * )
     */
    public function store(StoreClubRequest $request)  
    {  
        $club = Club::create($request->validated());  
        return response()->json($club, 201);  
    }  

    /**
     * @OA\Get(
     *     path="/api/clubs/{id}",
     *     summary="Obtener un club por ID",
     *     tags={"Clubs"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Club encontrado"),
     *     @OA\Response(response=404, description="Club no encontrado")
     * )
     */
    public function show(Club $club)  
    {  
        return response()->json($club->load('courts'), 200);  
    }  

    /**
     * @OA\Put(
     *     path="/api/clubs/{id}",
     *     summary="Actualizar un club",
     *     tags={"Clubs"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="address", type="string"),
     *             @OA\Property(property="city", type="string"),
     *             @OA\Property(property="postcode", type="string"),
     *             @OA\Property(property="phone", type="string"),
     *             @OA\Property(property="opening_time", type="string"),
     *             @OA\Property(property="closing_time", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="state", type="boolean")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Club actualizado")
     * )
     */
    public function update(UpdateClubRequest $request, Club $club)  
    {  
        $club->update($request->validated());  
        return response()->json($club, 200);  
    }  

    /**
     * @OA\Delete(
     *     path="/api/clubs/{id}",
     *     summary="Eliminar un club",
     *     tags={"Clubs"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Club eliminado")
     * )
     */
    public function destroy(Club $club)  
    {  
        $club->delete();  
        return response()->json(null, 204);  
    }  
}
