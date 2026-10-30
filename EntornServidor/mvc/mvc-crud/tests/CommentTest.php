<?php

namespace Tests;

use PHPUnit\Framework\TestCase;
use App\Models\Comment;

class CommentTest extends TestCase
{
    /**
     * Test finding a comment by ID
     */
    public function testFind()
    {
        // Test finding an existing comment
        $comment = Comment::find(1);
        $this->assertIsArray($comment);
        $this->assertEquals(1, $comment['id']);
        $this->assertEquals('John Doe', $comment['author']);
        $this->assertEquals('First Comment', $comment['title']);
        $this->assertEquals('This is a comment.', $comment['body']);

        // Test finding another existing comment
        $comment = Comment::find(2);
        $this->assertIsArray($comment);
        $this->assertEquals(2, $comment['id']);
        $this->assertEquals('Jane Smith', $comment['author']);
        $this->assertEquals('Second Comment', $comment['title']);

        // Test finding a non-existent comment
        $comment = Comment::find(999);
        $this->assertNull($comment);
    }
}
