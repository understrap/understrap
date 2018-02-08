<?php
// unregister all widgets
 function unregister_default_widgets() {
     unregister_widget('WP_Widget_Pages');
     unregister_widget('WP_Widget_Calendar');
     unregister_widget('WP_Widget_Archives');
     unregister_widget('WP_Widget_Links');
     unregister_widget('WP_Widget_Meta');
     unregister_widget('WP_Widget_Text');
     unregister_widget('WP_Widget_Categories');
     unregister_widget('WP_Widget_Recent_Posts');
     unregister_widget('WP_Widget_Recent_Comments');
     unregister_widget('WP_Widget_RSS');
     unregister_widget('WP_Widget_Tag_Cloud');
     unregister_widget('WP_Nav_Menu_Widget');
     unregister_widget('Twenty_Eleven_Ephemera_Widget');
     unregister_widget('WP_Widget_Media_Audio');
     unregister_widget('WP_Widget_Media_Image');
     unregister_widget('WP_Widget_Media_Video');
     unregister_widget('WP_Widget_Media_Gallery');
     unregister_widget('WP_Widget_Custom_HTML');
 }
 add_action('widgets_init','unregister_default_widgets', 11);
 ?>
