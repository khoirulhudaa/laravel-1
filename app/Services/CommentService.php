<?php

namespace App\Services;

use App\Models\Comment;

class CommentService
{

    public function destroy(int $id)
    {
        return Comment::findOrFail($id)->delete();
    }

}