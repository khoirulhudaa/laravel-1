<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Permintaan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentableRelationTest extends TestCase
{
    // use RefreshDatabase;

    // public function test_comment_dapat_terhubung_ke_permintaan()
    // {
    //     $user = User::factory()->create();
    //     $permintaan = Permintaan::factory()->create();

    //     $comment = Comment::create([
    //         'isi' => 'Tolong dicek lagi',
    //         'user_id' => $user->id,
    //         'commentable_id' => $permintaan->id,
    //         'commentable_type' => Permintaan::class
    //     ]);

    //     $this->assertInstanceOf(Permintaan::class, $comment->commentable);
    //     $this->assertEquals($permintaan->id, $comment->commentable->id);
    // }

    // public function test_permintaan_dapat_punya_banyak_komen()
    // {
    //     $permintaan = Permintaan::factory()->create();
    //     $user = User::factory()->create();

    //     Comment::factory()->count(3)->create([
    //         'commentable_id' => $permintaan->id,
    //         'commentable_type' => Permintaan::class,
    //         'user_id' => $user->id
    //     ]);

    //     dump($permintaan->comments()->count());

    //     $this->assertCount(3, $permintaan->comments);
    // }



    use RefreshDatabase;

    public function test_comment_terhubung_permintaan()
    {
        $user = User::factory()->create();
        $permintaan = Permintaan::factory()->create();

        $comment = Comment::create([
            'isi' => 'Ok keren',
            'commentable_type' => Permintaan::class,
            'commentable_id' => $permintaan->id,
            'user_id' => $user->id
        ]);

        $this->assertInstanceOf(Permintaan::class, $comment->commentable);
        $this->assertEquals($permintaan->id, $comment->commentable->id);
    }

    public function test_permintaan_punya_banyak_commment()
    {
        $user = User::factory()->create();
        $permintaan = Permintaan::factory()->create();

        Comment::factory()->count(3)->create([
            'user_id' => $user->id,
            'commentable_id' => $permintaan->id,
            'commentable_type' => Permintaan::class,
            'isi' => 'Test aman'
        ]);

        $this->assertCount(3, $permintaan->comments);
    }


    /**
     * A basic feature test example.
     */
    // public function test_example(): void
    // {

    //     $response = $this->get('/');

    //     $response->assertStatus(200);
    // }
}
