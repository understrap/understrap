<?php
/**
 * Partial template to display latest posts (home.php) as grid.
 *
 * @package understrap
 */

$col = get_theme_mod( 'understrap_grid_post_columns' );
?>
<a href="<?php echo esc_url( get_permalink() ); ?>" rel="bookmark">
	<div class="col-md-<?php echo esc_html( $col ); ?> col-xs-12">


		<div class="card card-inverse ">

			<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
				<?php $alt = get_post_meta( get_post_thumbnail_id( $post->ID ), '_wp_attachment_image_alt', true ); ?>
				<img class="card-img "
				     src="<?php echo esc_html( get_the_post_thumbnail_url( $post->ID, 'large' ) ) ?>" alt="<?php echo esc_html( $alt ); ?>">

				<div class="card-img-overlay">

					<header class="entry-header">
						<h4 class="card-title"><?php the_title(); ?></h4>

						<?php if ( 'post' === get_post_type() ) : ?>

							<p class="entry-meta card-text">
								<small>Posted: <?php the_date(); ?> at: <?php the_time();  ?></small>
							</p>

						<?php endif; ?>

					</header>

				</div>

			</article>


		</div>


	</div>
</a>
