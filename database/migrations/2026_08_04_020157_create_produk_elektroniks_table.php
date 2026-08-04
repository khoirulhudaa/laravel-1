<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produk_elektroniks', function (Blueprint $table) {
            $table->id();
            $table->string('nameProduk');
            $table->string('category');
            $table->string('supplier');
            $table->string('buyer');
            $table->string('catalog');
            $table->string('type');
            $table->string('condition');
            $table->string('description');
            $table->string('price');
            $table->string('kodeseri');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produk_elektroniks');
    }
};
