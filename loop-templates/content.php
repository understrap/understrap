<?php
/**
 * Post rendering content according to caller of get_template_part.
 *
 * @package befluid
 *
 */
/*
 <div class="card-body">
   <h5 class="card-title">Card title</h5>
   <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
   <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
   <a href="#" class="card-link">Card link</a>
   <a href="#" class="card-link">Another link</a>
 </div>
*/

?>

<article <?php post_class(''); ?> id="post-<?php the_ID(); ?>">

	<header class="card-header entry-header">

		<?php the_title( sprintf( '<h2 class="card-title entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ),
		'</a></h2>' ); ?>

		<?php if ( 'post' == get_post_type() ) : ?>

			<div class="card-subtitle mb-1 mt-1 entry-meta">
				<?php befluid_posted_on(); ?>
			</div><!-- .entry-meta -->

		<?php endif; ?>

	</header><!-- .entry-header -->

	<?php echo get_the_post_thumbnail( $post->ID, 'large' ); ?>

	<div class="card-body entry-content clearfix">
		<?php
		the_excerpt();
		?>
		<?php
		wp_link_pages( array(
			'before' => '<div class="page-links">' . __( 'Pages:', 'befluid' ),
			'after'  => '</div>',
		) );
		?>

	</div><!-- .entry-content -->

	<footer class="card-footer small entry-footer">

		<?php befluid_entry_footer(); ?>

	</footer><!-- .entry-footer -->

</article><!-- #post-## -->
