<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Permintaan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentableRelationTest extends TestCase
{
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
            'isi' => 'Ok Keren sekali fiturnya!',
            'commentable_id' => $permintaan->id,
            'commentable_type' => Permintaan::class,
        ]);

        $this->assertCount(3, $permintaan->comments);
    }
}
