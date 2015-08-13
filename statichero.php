<?php if ( is_active_sidebar( 'statichero' ) ): ?>
    <!-- ******************* The Hero Widget Area ******************* -->
    <div class="wrapper" id="wrapper-statichero">
        <div class="container">
        	<div class="row">
        		<div class="col-md-12">
            		<?php dynamic_sidebar( 'statichero' ); ?>
            	</div>
            </div>
        </div>
    </div>

<?php else : ?>

<?php endif; ?>
