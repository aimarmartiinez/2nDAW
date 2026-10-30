<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    public function up(){
        Schema::create('courts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('club_id')->constrained('clubs')->onDelete('cascade')->index();
            $table->string('name');
            $table->string('type'); 
            $table->integer('capacity');
            $table->decimal('price_per_hour', 8, 2);
            $table->string('state')->default('available');
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('courts');
    }
};
