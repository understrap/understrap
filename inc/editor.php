<?php

/**
 * Understrap modify editor
 *
 * @package understrap
 */


// Remove h1 from block formats dropdown
add_filter('tiny_mce_before_init', 'understrap_tiny_mce_remove_h1_format' );

function understrap_tiny_mce_remove_h1_format($init) {

	$init['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Pre=pre';
	return $init;
}


// Add TinyMCE style formats
add_filter( 'mce_buttons_2', 'understrap_tiny_mce_style_formats' );

function understrap_tiny_mce_style_formats( $styles ) {

    array_unshift( $styles, 'styleselect' );
    return $styles;
}

add_filter( 'tiny_mce_before_init', 'understrap_tiny_mce_before_init' );

function understrap_tiny_mce_before_init( $settings ) {

  $style_formats = array(
      array(
          'title' => 'Lead Paragraph',
          'selector' => 'p',
          'classes' => 'lead',
          'wrapper' => true
          ),
      array(
          'title' => 'Small',
          'inline' => 'small'
      ),
      array(
          'title' => 'Blockquote',
          'block' => 'blockquote',
          'classes' => 'blockquote',
          'wrapper' => true
      ),
			array(
          'title' => 'Blockquote Footer',
          'block' => 'footer',
          'classes' => 'blockquote-footer',
          'wrapper' => true
      ),
			array(
          'title' => 'Cite',
          'inline' => 'cite'
      )
  );
    $settings['style_formats'] = json_encode( $style_formats );
    return $settings;
}
