<?php
/**
 * Befluid modify editor
 *
 * @package befluid
 */

/**
 * Registers an editor stylesheet for the theme.
 */
function befluid_wpdocs_theme_add_editor_styles() {
  add_editor_style( 'css/custom-editor-style.css' );
}
add_action( 'admin_init', 'befluid_wpdocs_theme_add_editor_styles' );

// Add TinyMCE style formats.
add_filter( 'mce_buttons_2', 'befluid_tiny_mce_style_formats' );

function befluid_tiny_mce_style_formats( $styles ) {

    array_unshift( $styles, 'styleselect' );
    return $styles;
}

add_filter( 'tiny_mce_before_init', 'befluid_tiny_mce_before_init' );

function befluid_tiny_mce_before_init( $settings ) {

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
  
    if ( isset( $settings['style_formats'] ) ) {
      $orig_style_formats = json_decode($settings['style_formats'],true);
      $style_formats = array_merge($orig_style_formats,$style_formats);
    }

    $settings['style_formats'] = json_encode( $style_formats );
    return $settings;
}
