<?php
/**
 * Right sidebar check.
 *
 * @package understrap
 */


$sidebar_pos = get_theme_mod( 'understrap_sidebar_position' );

if ( 'right' === $sidebar_pos || 'both' === $sidebar_pos ) : 

  get_sidebar( 'right' ); 

endif;
