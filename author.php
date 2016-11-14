<?php
/**
 * The template for displaying the author pages.
 *
 * Learn more: https://codex.wordpress.org/Author_Templates
 *
 * @package understrap
 */
 get_header();

  $container = get_theme_mod('understrap_container_type');
  $sidebar_pos = get_theme_mod('understrap_sidebar_position');
?>

<div class="wrapper" id="author-wrapper">

  <div class="row">
      <?php if ( 'left' === $sidebar_pos || 'both' === $sidebar_pos ): ?>
        <?php get_sidebar( 'left' ); ?>
      <?php endif; ?>

      <?php if ( 'right' === $sidebar_pos || 'left' === $sidebar_pos ): ?>
      <div class="<?php if ( is_active_sidebar( 'right-sidebar' ) || is_active_sidebar( 'left-sidebar' )) : ?>col-md-8<?php else : ?>col-md-12<?php endif; ?> content-area" id="primary">

      <?php elseif ( is_active_sidebar( 'right-sidebar' ) && is_active_sidebar( 'left-sidebar' ) ): ?>
        <div class="<?php if ( 'both' === $sidebar_pos ) : ?>col-md-6<?php else : ?>col-md-12<?php endif; ?> content-area" id="primary">
      <?php endif; ?>

        <main class="site-main" id="main" role="main">

          <header class="page-header author-header">

            <?php
              $curauth = (isset($_GET['author_name'])) ? get_user_by('slug', $author_name) : get_userdata(intval($author));
            ?>

            <h1><?php esc_html_e( 'About:', 'understrap' ); ?> <?php echo $curauth->nickname; ?></h1>

            <?php if ( ! empty( $curauth->ID ) ) : ?>
              <?php echo get_avatar($curauth->ID); ?>
            <?php endif; ?>

            <dl>
              <?php if ( ! empty( $curauth->user_url ) ) : ?>
                <dt><?php esc_html_e( 'Website', 'understrap' ); ?></dt>
                <dd><a href="<?php echo $curauth->user_url; ?>"><?php echo $curauth->user_url; ?></a></dd>
              <?php endif; ?>

              <?php if ( ! empty( $curauth->user_description ) ) : ?>
                <dt><?php esc_html_e( 'Profile', 'understrap' ); ?></dt>
                <dd><?php echo $curauth->user_description; ?></dd>
              <?php endif; ?>
            </dl>

            <h2><?php esc_html_e( 'Posts by', 'understrap' ); ?> <?php echo $curauth->nickname; ?>:</h2>

          </header><!-- .page-header -->

          <ul>

            <!-- The Loop -->
            <?php if ( have_posts() ) : ?>
              <?php while ( have_posts() ) : the_post(); ?>
              <li>
                <a rel="bookmark" href="<?php the_permalink() ?>" title="Permanent Link: <?php the_title(); ?>">
                <?php the_title(); ?></a>,
                <?php the_time('d M Y'); ?> in <?php the_category('&');?>
              </li>
              <?php endwhile; ?>

              <?php the_posts_navigation(); ?>

            <?php else : ?>

              <?php get_template_part( 'loop-templates/content', 'none' ); ?>

            <?php endif; ?>

            <!-- End Loop -->

          </ul>

        </main><!-- #main -->

      </div><!-- #primary -->

      <?php if ( 'right' === $sidebar_pos || 'both' === $sidebar_pos ): ?>
        <?php get_sidebar( 'right' ); ?>
      <?php endif; ?>

    </div> <!-- .row -->

  </div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
