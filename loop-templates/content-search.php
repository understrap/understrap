<?php
/**
 * Search results partial template.
 *
 * @package befluid
 */

?>
<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<header class="card-header entry-header">

		<?php the_title( sprintf( '<h2 class="card-title entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ),
		'</a></h2>' ); ?>

		<?php if ( 'post' == get_post_type() ) : ?>

			<div class="entry-meta card-subtitle">

				<?php befluid_posted_on(); ?>

			</div><!-- .entry-meta -->

		<?php endif; ?>

	</header><!-- .entry-header -->

	<div class="entry-summary card-body clearfix">

		<?php the_excerpt(); ?>

	</div><!-- .entry-summary -->

	<footer class="entry-footer card-footer small">

		<?php befluid_entry_footer(); ?>

	</footer><!-- .entry-footer -->

</article><!-- #post-## -->
