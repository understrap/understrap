<?php
/**
 * Content wrappers
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/global/wrapper-start.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see        https://docs.woocommerce.com/document/template-structure/
 * @author        WooThemes
 * @package    WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

// load container setting
$container = get_theme_mod( 'understrap_container_type' );

// if we use container-fluid add some margin
if ( 'container-fluid' === $container ) {
	echo '<div class="wrapper" id="page-wrapper"><div class="' . $container . '" id="content" tabindex="-1"> <div class="row mx-1">';
} else {
	echo '<div class="wrapper" id="page-wrapper"><div class="' . $container . '" id="content" tabindex="-1"> <div class="row">';
}
