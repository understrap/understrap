<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package understrap
 */

$the_theme = wp_get_theme();
$container = get_theme_mod( 'understrap_container_type' );
?>

<?php get_sidebar( 'footerfull' ); ?>

<div class="cls-global-footer cls-global-footer-sponsors d-print-none">
  <div class="container">
    <div class="row align-items-center text-center">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
        <a href="http://www.gblf.co.uk" target="_blank"><img class="img-responsive sponsor center-block" src="https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/gblf.png" srcset="https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/gblf@2x.png 2x, https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/gblf@3x.png 3x" alt="Gordon Brown Law Firm Logo" /></a>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
        <a href="http://www.ukmail.com" target="_blank"><img class="img-responsive sponsor center-block" src="https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/ukmail.png" srcset="https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/ukmail@2x.png 2x, https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/ukmail@3x.png 3x" alt="UK Mail Logo" /></a>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
        <a href="http://www.wssrecruitment.co.uk" target="_blank"><img class="img-responsive sponsor center-block" src="https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/wss.png" srcset="https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/wss@2x.png 2x, https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/wss@3x.png 3x" alt="WSS Recruitment Logo" /></a>
      </div>
      <div class="clearfix visible-sm"></div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
        <a href="http://www.nessswimwear.co.uk" target="_blank"><img class="img-responsive sponsor center-block" src="https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/ness.png" srcset="https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/ness@2x.png 2x, https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/ness@3x.png 3x" alt="NESS Swimwear Logo" /></a>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
        <a href="http://www.michaelenglishroofing.com" target="_blank"><img class="img-responsive sponsor center-block" src="https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/menglish.png" srcset="https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/menglish@2x.png 2x, https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/menglish@3x.png 3x" alt="Michael English Roofing Logo" /></a>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
        <a href="http://www.harlandsaccountants.co.uk" target="_blank"><img class="img-responsive sponsor center-block" src="https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/harlands.png" srcset="https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/harlands@2x.png 2x, https://static.chesterlestreetasc.co.uk/global/img/sponsors/white/harlands@3x.png 3x" alt="Harlands Accountants Logo" /></a>
      </div>
    </div>
  </div>
</div>
<div class="cls-global-footer cls-global-footer-inverse cls-global-footer-body d-print-none">
  <div class="container">
    <div class="hidden-print">
      <div class="row">
        <div class="col-lg-6">
          <div class="row">
            <div class="col-sm-6 col-lg-6">
              <address>
                <strong>Chester-le-Street ASC</strong><br>
                Burns Green Leisure Centre<br>
                Chester-le-Street<br>
                DH3 3QH
              </address>
              <p><i class="fa fa-envelope fa-fw" aria-hidden="true"></i> <a href="mailto:enquiries@chesterlestreetasc.co.uk" target="new">E-Mail Us</a></p>
              <p><i class="fa fa-commenting fa-fw" aria-hidden="true"></i> <a target="new" href="mailto:websitefeedback@chesterlestreetasc.co.uk">Website Feedback</a></p>
            </div>
            <div class="col-sm-6 col-lg-6">
              <ul class="list-unstyled cls-global-footer-link-spacer">
                <li><strong>Key Information</strong></li>
                <li><a title="About Chester-le-Street ASC" target="_self" href="https://www.chesterlestreetasc.co.uk/about">About Us</a></li>
                <li><a title="Committee Members" target="_self" href="https://www.chesterlestreetasc.co.uk/committee#executive">Committee Members</a></li>
                <li><a title="Committee Meetings" target="_self" href="https://www.chesterlestreetasc.co.uk/committee#meetings">Committee Meetings</a></li>
                <li><a title="Policies" target="_self" href="https://www.chesterlestreetasc.co.uk/policies">Policies</a></li>
                <li><a target="_self" href="https://www.chesterlestreetasc.co.uk/policies/cookies/">Cookie Policy</a></li>
                <li><a target="_self" href="https://www.chesterlestreetasc.co.uk/support">Website Support</a></li>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="row">
            <div class="col-sm-6 col-lg-6">
              <ul class="list-unstyled cls-global-footer-link-spacer">
                <li><strong>Downloads</strong></li>
                <li><i class="fa fa-file-pdf-o fa-fw"></i> <a title="Entry Form" target="_blank" href="http://www.chesterlestreetasc.co.uk/wp-content/uploads/2016/06/GalaEntryForm.pdf">Gala Entry Form</a></li>
                <!--<li><i class="fa fa-file-pdf-o fa-fw"></i> <a title="Order Form" target="_blank" href="http://www.chesterlestreetasc.co.uk/wp-content/uploads/2016/06/ClothingOrderFormChild.pdf">Children's Kit Order Form</a></li>
                <li><i class="fa fa-file-pdf-o fa-fw"></i> <a title="Order Form" target="_blank" href="http://www.chesterlestreetasc.co.uk/wp-content/uploads/2016/06/ClothingOrderFormAdult.pdf">Adult Kit Order Form</a></li>-->
              </ul>
              <ul class="list-unstyled cls-global-footer-link-spacer">
                <li><strong>Social Media</strong></li>
                <li><i class="fa fa-twitter fa-fw" aria-hidden="true"></i> <a title="CLSASC on Twitter" target="_blank" href="https://twitter.com/CLSASC">Twitter</a></li>
                <li><i class="fa fa-facebook fa-fw" aria-hidden="true"></i> <a title="CLSASC on Facebook" target="_blank" href="https://www.facebook.com/Chester-le-Street-ASC-349933305154137/">Facebook</a></li>
                <li><i class="fa fa-google-plus fa-fw" aria-hidden="true"></i> <a title="CLSASC on Google Plus" target="_blank" href="https://plus.google.com/&#43;ChesterLeStreetASCUK">Google Plus</a></li>
              </ul>
            </div>
            <div class="col-sm-6 col-lg-6">
              <ul class="list-unstyled cls-global-footer-link-spacer">
                <li><strong>Related Sites</strong></li>
                <li><a title="British Swimming" target="_blank" href="http://www.swimming.org/britishswimming/">British Swimming</a></li>
                <li><a title="the Amateur Swimming Association" target="_blank" href="http://www.swimming.org/swimengland/">Swim England</a></li>
                <li><a title="Swim England North East Region" target="_blank" href="http://asaner.org.uk/swim/">Swim England - North East</a></li>
                <li><a title="N&amp;D Swimming" target="_blank" href="http://asaner.org.uk/northumberland-durham-swimming-association/">N&amp;D Swimming</a></li>
              </ul>

              <p><strong>Committee Services</strong><br><a title="Login to G Suite" target="_blank" href="http://mail.chesterlestreetasc.co.uk/">G Suite Login</a></p>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col source-org vcard copyright">
        <hr style="border-color:#FFF">
        <p class="hidden-print">Designed and Built by Chester&#8209;le&#8209;Street ASC</p>
        <p class="mb-0" style="margin-bottom:0">&copy; <?php echo date( 'Y' ); ?> <span class="org fn">Chester&#8209;le&#8209;Street ASC</span>. CLS ASC is not responsible for the content of external sites.</p>
      </div>
    </div>
  </div>
</div>


</div><!-- #page we need this extra closing tag here -->
<script rel="preload" src="https://static.chesterlestreetasc.co.uk/global/js/jquery.min.js"></script>
<?php wp_footer(); ?>

</body>

</html>
