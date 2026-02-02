<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchemaEvaluatec extends Migration
{
   const 
        GENDERS = 'genders',
        IMAGE_USERS = 'image_users',
        PROFILES = 'profiles',
        QUESTIONS = 'questions',
        ANSWERS = 'answers',
        RESULTS = 'results',
        USERS = 'users',
        ASPIRANTS = 'aspirants',
        INTERVIEWS = 'interviews',
        QUESTION_ANSWER_INTERVIEW = 'question_answer_interview';

    public function up()
    {
       $this->createGendersTable();
       $this->createProfilesTable();
       $this->createUsersTable();
       $this->createImageUsersTable();
       $this->createQuestionsTable();
       $this->createAnswersTable();
       $this->createAspirantsTable();
       $this->createResultsTable();
       $this->createInterviewsTable();
       $this->createQuestionResultInterviewTable();
    }

    public function down()
    {
        $tables = [
            self::QUESTION_ANSWER_INTERVIEW,
            self::INTERVIEWS,
            self::RESULTS,
            self:: ASPIRANTS,
            self::ANSWERS,
            self::QUESTIONS,
            self::IMAGE_USERS,
            self::USERS,
            self::PROFILES,
            self::GENDERS,
        ];

        foreach($tables as $table){
            Schema::dropIfExists($table);
        }
    }

    private function createGendersTable()
    {
        Schema::create(self::GENDERS, function(Blueprint $table){
            $table->id('id');
            $table->string('name');
        });
    }

    private function createProfilesTable()
    {
        Schema::create(self::PROFILES, function(Blueprint $table){
            $table->id('id');
            $table->string('name');
        });
    }

    private function createUsersTable()
    {
        Schema::create(self::USERS, function(Blueprint $table){
            $table->id();
            $table->string('name');
            $table->string('first_last_name');
            $table->string('second_last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone');
            $table->rememberToken();
            $table->boolean('active')->default(true);
            $table->foreignId('gender_id')->constrained(self::GENDERS);
            $table->foreignId('profile_id')->constrained(self::PROFILES);
        });
    }

    private function createImageUsersTable()
    {
        Schema::create(self::IMAGE_USERS, function(Blueprint $table){
            $table->id('id');
            $table->string('url_image');
            $table->foreignId('user_id')->constrained(self::USERS);
        });
    }

    private function createQuestionsTable()
    {
        Schema::create(self::QUESTIONS, function(Blueprint $table){
            $table->id('id');
            $table->string('question');
        });
    }

    private function createAnswersTable()
    {
        Schema::create(self::ANSWERS, function(Blueprint $table){
            $table->id('id');
            $table->longText('answer');
        });
    }
   
    private function createAspirantsTable()
    {
        Schema::create(self::ASPIRANTS, function(Blueprint $table){
            $table->id();
            $table->string('name');
            $table->string('first_last_name');
            $table->string('second_last_name');
            $table->string('email')->unique();
            $table->string('phone')->unique();
        });
    }

    private function createResultsTable()
    {
        Schema::create(self::RESULTS, function(Blueprint $table){
            $table->id('id');
            $table->integer('interview_score');
            $table->foreignId('aspirant_id')->nullable()->constrained(self::ASPIRANTS);
        });
    }

    private function createInterviewsTable()
    {
        Schema::create(self::INTERVIEWS, function(Blueprint $table){
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained(self::USERS);            
            $table->foreignId('aspirant_id')->nullable()->constrained(self::ASPIRANTS);
        });
    }
    private function createQuestionResultInterviewTable()
    {
        Schema::create(self::QUESTION_ANSWER_INTERVIEW, function(Blueprint $table){
            $table->id('id');
            $table->foreignId('question_id')->nullable()->constrained(self::QUESTIONS);
            $table->foreignId('asnswer_id')->nullable()->constrained(self::ANSWERS);
            $table->foreignId('interview_id')->nullable()->constrained(self::INTERVIEWS);
        });
    }
}
