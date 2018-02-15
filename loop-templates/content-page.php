<?php
/**
 * Partial template for content in page.php
 *
 * @package befluid
 */

?>
<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<header class="card-header entry-header">

		<?php the_title( '<h1 class="entry-title card-title">', '</h1>' ); ?>

	</header><!-- .entry-header -->

	<?php echo get_the_post_thumbnail( $post->ID, 'large' ); ?>

	<div class="entry-content card-body clearfix">

		<?php the_content(); ?>

		<?php
		wp_link_pages( array(
			'before' => '<div class="page-links">' . __( 'Pages:', 'befluid' ),
			'after'  => '</div>',
		) );
		?>

	</div><!-- .entry-content -->

	<footer class="entry-footer">

		<?php edit_post_link( __( 'Edit', 'befluid' ), '<span class="edit-link">', '</span>' ); ?>

	</footer><!-- .entry-footer -->

</article><!-- #post-## -->
