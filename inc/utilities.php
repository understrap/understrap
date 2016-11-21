<?php
/**
 * Utility functions
 *
 * @package understrap
 */

/**
 * Generate a custom length excerpt.
 * If the content of the post is less than the provided length,
 * the entire content is returned.
 *
 * @param int $post_id Post's ID.
 * @param int $word_count How many words to keep.
 *
 * @return string
 */
function understrap_excerpt_with_length( $post_id, $word_count ) {
	$post = get_post( $post_id );
	$permalink = get_post_permalink( $post_id );
	$content   = strip_tags( $post->post_content );

	if ( str_word_count( $content, 0 ) > $word_count ) {
		$words   = str_word_count( $content, 2 );
		$keys    = array_keys( $words );
		$excerpt = substr( $content, 0, $keys[ $word_count ] );
		$link_class = ' class=\"btn btn-secondary understrap-read-more-link\"';
		$excerpt = '<p>' . $excerpt . '[...]</p>';
		$excerpt .= '<p><a href="' . $permalink . '"' . $link_class . '>Read More</a></p>';
	} else {
		return $content;
	}

	return $excerpt;
}

