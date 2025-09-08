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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id(); // Primary key: id
            $table->string('name'); // Task name
            $table->string('priority'); // Low / Medium / High
            $table->string('status'); // Pending / In Progress / Completed
            $table->date('due_date'); // Due date
            $table->timestamps(); // created_at & updated_at auto-managed by Laravel
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
