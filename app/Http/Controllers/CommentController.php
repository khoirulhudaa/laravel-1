<?php

namespace App\Http\Controllers;

use App\Services\CommentService;

class CommentController extends Controller
{
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CommentService $commentService, string $id)
    {
        $commentService->destroy($id);
        return redirect()->back();
    }
}
