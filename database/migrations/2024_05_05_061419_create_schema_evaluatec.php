<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchemaEvaluatec extends Migration
{
    const GENDERS = 'genders';

    const IMAGE_USERS = 'image_users';

    const PROFILES = 'profiles';

    const QUESTIONS = 'questions';

    const ANSWERS = 'answers';

    const RESULTS = 'results';

    const USERS = 'users';

    const ASPIRANTS = 'aspirants';

    const INTERVIEWS = 'interviews';

    const QUESTION_ANSWER_INTERVIEW = 'question_answer_interview';

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
            self::ASPIRANTS,
            self::ANSWERS,
            self::QUESTIONS,
            self::IMAGE_USERS,
            self::USERS,
            self::PROFILES,
            self::GENDERS,
        ];

        foreach ($tables as $table) {
            Schema::dropIfExists($table);
        }
    }

    private function createGendersTable()
    {
        Schema::create(self::GENDERS, function (Blueprint $table) {
            $table->id('id');
            $table->string('name');
            $table->timestamps();
        });
    }

    private function createProfilesTable()
    {
        Schema::create(self::PROFILES, function (Blueprint $table) {
            $table->id('id');
            $table->string('name');
            $table->timestamps();
        });
    }

    private function createUsersTable()
    {
        Schema::create(self::USERS, function (Blueprint $table) {
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
            $table->timestamps();
        });
    }

    private function createImageUsersTable()
    {
        Schema::create(self::IMAGE_USERS, function (Blueprint $table) {
            $table->id('id');
            $table->string('url_image');
            $table->foreignId('user_id')->constrained(self::USERS);
            $table->timestamps();
        });
    }

    private function createQuestionsTable()
    {
        Schema::create(self::QUESTIONS, function (Blueprint $table) {
            $table->id('id');
            $table->string('question');
            $table->timestamps();
        });
    }

    private function createAnswersTable()
    {
        Schema::create(self::ANSWERS, function (Blueprint $table) {
            $table->id('id');
            $table->longText('answer');
            $table->timestamps();
        });
    }

    private function createAspirantsTable()
    {
        Schema::create(self::ASPIRANTS, function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('first_last_name');
            $table->string('second_last_name');
            $table->string('email')->unique();
            $table->string('phone')->unique();
            $table->timestamps();
        });
    }

    private function createResultsTable()
    {
        Schema::create(self::RESULTS, function (Blueprint $table) {
            $table->id('id');
            $table->integer('interview_score');
            $table->foreignId('aspirant_id')->nullable()->constrained(self::ASPIRANTS);
            $table->timestamps();
        });
    }

    private function createInterviewsTable()
    {
        Schema::create(self::INTERVIEWS, function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained(self::USERS);
            $table->foreignId('aspirant_id')->nullable()->constrained(self::ASPIRANTS);
            $table->timestamps();
        });
    }

    private function createQuestionResultInterviewTable()
    {
        Schema::create(self::QUESTION_ANSWER_INTERVIEW, function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('question_id')->nullable()->constrained(self::QUESTIONS);
            $table->foreignId('asnswer_id')->nullable()->constrained(self::ANSWERS);
            $table->foreignId('interview_id')->nullable()->constrained(self::INTERVIEWS);
            $table->timestamps();
        });
    }
}
