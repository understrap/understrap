<?php if ( comments_open() ) : ?>

    <!-- Kommentar eingeben -->

            <h3><?php _e( 'Write Comment.', 'understrap' ); ?> <small class="text-danger"><?php _e( '*Mandatory', 'understrap' ); ?></small></h3>

            <input type="hidden" name="redirect_to" value="<?php echo htmlspecialchars($_SERVER['REQUEST_URI']); ?>" />

            <form action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post" id="commentform" role="form">

                <hr/>
                <div class="form-group">
                    <label for="author"><?php _e( 'Name', 'understrap' ); ?> <small class="text-danger">*</small></label>
                    <input class="form-control" type="text" name="author" id="author" value="<?php echo $comment_author; ?>" size="22"/>
                </div>

                <hr/>
                <div class="form-group">
                    <label for="email"><?php _e( 'E-Mail', 'understrap' ); ?> <small>( <?php _e( 'Not public.', 'understrap' ); ?> )</small><small class="text-danger">*</small></label>
                    <input class="form-control" type="email" name="email" id="email" value="<?php echo $comment_author_email; ?>" size="22" tabindex="2"/>
                </div>
                <hr/>
                <div class="form-group">
                    <label for="url"><?php _e( 'Website', 'understrap' ); ?></label>
                    <input class="form-control" type="url" name="url" id="url" value="<?php echo $comment_author_url; ?>" size="22" tabindex="3" />
                </div>
                <hr/>
                <div class="form-group">
                    <label><?php _e( 'Your Comment', 'understrap' ); ?> <small class="text-danger">*</small></label>
                    <textarea class="form-control" name="comment" id="comment" style="width: 100%;" rows="10" tabindex="4"></textarea>
                </div>



                <div class="form-group  text-center">
                    <input class="form-control btn btn-primary" name="submit" type="submit" id="submit" tabindex="5" value="<?php _e( 'Send comment.', 'understrap' ); ?>" />
                    <input class="form-control" type="hidden" name="comment_post_ID" value="<?php echo $id; ?>" />
                </div>

                <?php do_action('comment_form', $post->ID); ?>

            </form>

<?php endif ?>