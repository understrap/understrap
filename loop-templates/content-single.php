<?php
/**
 * Single post partial template.
 *
 * @package befluid
 */

?>
<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<header class="card-header entry-header">

		<?php the_title( '<h1 class="entry-title card-title">', '</h1>' ); ?>

		<div class="entry-meta card-subtitle">

			<?php befluid_posted_on(); ?>

		</div><!-- .entry-meta -->

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

	<footer class="entry-footer card-footer small">

		<?php befluid_entry_footer(); ?>

	</footer><!-- .entry-footer -->

</article><!-- #post-## -->
