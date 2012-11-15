<?php if( !in_array( 'fashion', $lens_slugs ) ) : ?>
<a href="http://www.slidedeck.com/lenses-ae69de/?lens=fashion&utm_source=premium_lenses_tab&utm_medium=link&utm_content=SD2LENSFASHION&utm_campaign=sd2_lite<?php echo self::get_cohort_query_string('&'); ?>" target="_blank" class="lens placeholder" rel="lenses">
	<span class="thumbnail"><img src="https://s3.amazonaws.com/slidedeck-pro/upsell_assets/images/lenses/fashion/thumbnail.jpg" /></span>
	<span class="shadow">&nbsp;</span>
	<span class="title">Fashion</span>
</a>
<?php endif; ?>

<?php if( !in_array( 'half-moon', $lens_slugs ) ) : ?>
<a href="http://www.slidedeck.com/lenses-ae69de/?lens=half-moon&utm_source=premium_lenses_tab&utm_medium=link&utm_content=SD2LENSFASHION&utm_campaign=sd2_lite<?php echo self::get_cohort_query_string('&'); ?>" target="_blank" class="lens placeholder" rel="lenses">
	<span class="thumbnail"><img src="https://s3.amazonaws.com/slidedeck-pro/upsell_assets/images/lenses/half-moon/thumbnail.jpg" /></span>
	<span class="shadow">&nbsp;</span>
	<span class="title">Half Moon</span>
</a>
<?php endif; ?>

<?php if( !in_array( 'classic', $lens_slugs ) ) : ?>
<a href="http://www.slidedeck.com/lenses-ae69de/?lens=classic&utm_source=premium_lenses_tab&utm_medium=link&utm_content=SD2LENSFASHION&utm_campaign=sd2_lite<?php echo self::get_cohort_query_string('&'); ?>" target="_blank" class="lens placeholder" rel="lenses">
	<span class="thumbnail"><img src="https://s3.amazonaws.com/slidedeck-pro/upsell_assets/images/lenses/classic/thumbnail.jpg" /></span>
	<span class="shadow">&nbsp;</span>
	<span class="title">Classic</span>
</a>
<?php endif; ?>

<div class="upgrade-license-lenses">
    <span class="upgrade">
        <img src="https://s3.amazonaws.com/slidedeck-pro/lite_upsell_assets/images/need-more-lenses.png" />
        <div class="upgrade-button-cta">
            <a href="<?php echo slidedeck2_action( "/upgrades" ); ?>" class="upgrade-button green">
                <span class="button-noise">
                    <span>Upgrade</span>
                </span>
            </a>
        </div>
    </span>
    <span class="shadow">&nbsp;</span>
</div>