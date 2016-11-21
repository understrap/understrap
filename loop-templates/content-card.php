<?php
/**
 * Card patrial template responsible to show individual posts in home.php page.
 *
 * @package understrap
 */

?>
<div class="card">
	<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

		<header class="entry-header">
			<?php if ( has_post_thumbnail() ) : ?>
				<?php
				$alt = get_post_meta( get_post_thumbnail_id( $post->ID ), '_wp_attachment_image_alt', true );
				?>
				<img src="<?php echo get_the_post_thumbnail_url( $post->ID, 'large' ); ?>"
				     alt="<?php echo $alt; ?>"
				     class="card-img-top img-fluid">
			<?php endif; ?>
			<div class="card-block">
				<?php the_title( sprintf( '<h2 class="entry-title card-title"><a href="%s" rel="bookmark">',
				esc_url( get_permalink() ) ), '</a></h2>' ); ?>

				<?php if ( 'post' === get_post_type() ) : ?>

					<div class="entry-meta">
						<p class="card-text"> <?php understrap_posted_on(); ?> </p>
					</div><!-- .entry-meta -->

				<?php endif; ?>
			</div>
		</header><!-- .entry-header -->

		<div class="card-block">
			<div class="entry-content card-text">
				<?php
				echo understrap_excerpt_with_length( $post->ID, 15 );
				?>

				<?php
				wp_link_pages( array(
					'before' => '<div class="page-links">' . __( 'Pages:', 'understrap' ),
					'after'  => '</div>',
				) );
				?>
			</div><!-- .entry-content -->


		</div>
	</article><!-- #post-## -->
</div>
