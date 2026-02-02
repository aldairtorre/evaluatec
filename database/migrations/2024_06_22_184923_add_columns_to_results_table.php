<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('results', function (Blueprint $table) {
            $table->dropColumn('interview_score');
        });

        Schema::table('results', function (Blueprint $table) {
            $table->double('course_score');
            $table->string('course_score_percentage');
            $table->integer('correct_reagents');
            $table->string('correct_reagents_percentage');
            $table->string('weighing');
            $table->double('interview_score');
            $table->string('interview_score_percentage');
            $table->double('final_score');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('results', function (Blueprint $table) {
            $table->integer('interview_score');
            $table->dropColumn('interview_score');
            $table->dropColumn('course_score');
            $table->dropColumn('correct_reagents');
        });
    }
}
