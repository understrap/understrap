<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package understrap
 */
?>

<div class="wrapper wrapper-footer">
    
    <div class="container">
    
        <footer id="colophon" class="container site-footer" role="contentinfo">

            <div class="site-info">
                <a href="<?php echo esc_url( __( 'http://wordpress.org/', 'understrap' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'understrap' ), 'WordPress' ); ?></a>
                <span class="sep"> | </span>
                <?php printf( __( 'Theme: %1$s by %2$s.', 'understrap' ), 'understrap', '<a href="http://www.holgerkoenemann.de/" rel="designer">holgerkoenemann.de</a>' ); ?>
            </div><!-- .site-info -->

        </footer><!-- #colophon -->
        
    </div><!-- container end -->
    
</div><!-- wrapper end -->

</div><!-- #page -->

<?php wp_footer(); ?>
</body>

</html>
