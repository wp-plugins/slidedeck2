/**
 * SlideDeck Preview Updater
 * 
 * @author dtelepathy
 * @package SlideDeck
 * @since 2.0.0
 */

/*
Copyright 2012 digital-telepathy  (email : support@digital-telepathy.com)

This file is part of SlideDeck.

SlideDeck is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

SlideDeck is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with SlideDeck.  If not, see <http://www.gnu.org/licenses/>.
*/
var SlideDeckPreview;var SlideDeckPrefix="sd2-";(function(a){window.SlideDeckPreview={elems:{},updates:{},ajaxOptions:["options[size]","options[date-format]","options[randomize]","options[total_slides]","options[verticalTitleLength]","options[start]","options[slideTransition]","options[width]","options[height]","options[show-front-cover]","options[show-back-cover]","options[excerptLengthWithImages]","options[excerptLengthWithoutImages]","options[titleLengthWithImages]","options[titleLengthWithoutImages]","options[linkAuthorName]","options[linkTitle]","options[linkTarget]","options[navigation]"],importedFonts:[],outerWidth:0,outerHeight:0,timerDelay:250,validations:{},invalidKeyCodes:[9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,91,92,93,112,113,114,115,116,117,118,119,120,121,122,123,144,145],ajaxUpdate:function(){var b=this;var c=this.elems.form.serialize();c=c.replace(/action\=([a-zA-Z0-9\-_]+)/gi,"action=slidedeck_preview_iframe_update");this.elems.slideDimensions.addClass("getting-dimensions");this.elems.iframeBody.find("#mask").addClass("visible");a.ajax({url:ajaxurl+"?action=slidedeck_preview_iframe_update",type:"GET",dataType:"json",data:c,success:function(f){var e=false;var d=a("#slidedeck-section-preview .inner");if(b.outerWidth!=f.outer_width||b.outerHeight!=f.outer_height){b.outerWidth=f.outer_width;b.outerHeight=f.outer_height;e=true}if(e){b.elems.slideDimensions.addClass("slidedeck-resizing");if(d.height()>0){d.height("")}b.elems.iframe.animate({width:parseInt(f.outer_width,10)+2,height:parseInt(f.outer_height,10)+2},500,function(){b.elems.iframe[0].src=f.url;b.elems.slideDimensions.css("margin-left",(0-parseInt(f.outer_width,10)/2)).removeClass("slidedeck-resizing")})}else{b.elems.iframe[0].src=f.url}}})},eventOnLoad:function(){this.elems.iframeContents=this.elems.iframe.contents();this.elems.iframeBody=this.elems.iframeContents.find("body");this.elems.slidedeck=this.elems.iframeBody.find(".slidedeck");this.elems.slidedeckFrame=this.elems.slidedeck.closest(".slidedeck-frame");this.elems.noContent=this.elems.iframeBody.find(".no-content-found");this.slidedeck=this.elems.slidedeck.slidedeck();if(this.elems.noContent.length){this.elems.iframeBody.find("#mask").removeClass("visible");this.elems.noContent.find(".no-content-source-configuration").bind("click",function(b){b.preventDefault();a(".slidedeck-content-source").removeClass("hidden")})}this.elems.slidedeckFrame.find(".slidedeck-overlays .slidedeck-overlays-wrapper a").bind("click",function(b){b.preventDefault();return false}).attr("title","Overlay links disabled for preview");this.updateSlideDimensions()},getSlideDimensions:function(){var b=this.elems.slidedeck.find("dd.slide").eq(0);if(this.isVertical()){b=b.find(".slidesVertical dd").eq(0)}var c={width:b.width(),height:b.height()};return c},isVertical:function(){if(typeof(this.slidedeck.deck=="undefined")){if(this.elems.slidedeck.find(".slidesVertical").length>0){return true}return false}else{if(this.slidedeck.verticalSlides){if(this.slidedeck.verticalSlides[this.slidedeck.current-1]){if(this.slidedeck.verticalSlides[this.slidedeck.current-1].navChildren){return true}else{return false}}}}return false},realtime:function(d,e){var b=a.data(d,"$elem");if(!b){b=a(d);a.data(d,"$elem",b)}var c=b.attr("name");if(typeof(this.updates[c])=="function"){this.updates[c](b,e)}this.updateSlideDimensions()},update:function(g,h){var b=true;if(g.type=="text"){var c=jQuery.data(g,"previousValue");if(c==h){return false}else{jQuery.data(g,"previousValue",h)}}for(var f=0;f<this.ajaxOptions.length;f++){if(this.ajaxOptions[f]==g.name){b=false}}for(var e in this.updates){if(e==g.name){b=true}}if(this.validate(g,h)){var d=this;if(b){this.realtime(g,h)}else{d.ajaxUpdate()}}},updateSlideDimensions:function(){var b=this.getSlideDimensions();this.elems.slideDimensions.find(".width").text(b.width+"x");this.elems.slideDimensions.find(".height").text(b.height);this.elems.slideDimensions.removeClass("getting-dimensions")},validate:function(b,c){var d=true;if(typeof(this.validations[b.name])=="function"){d=this.validations[b.name](b,c)}return d},initialize:function(){var b=this;this.elems.form=a("#slidedeck-update-form");if(this.elems.form.length<1){return false}this.elems.form.delegate("select","change",function(d){var c=this.getElementsByTagName("option"),e="";for(var f in c){if(c[f].selected){e=c[f].value}}b.update(this,e)}).delegate('input[type="text"]',"blur change",function(c){b.update(this,this.value)}).delegate('input[type="text"]',"keyup",function(e){for(var c in b.invalidKeyCodes){if(b.invalidKeyCodes[c]==e.keyCode){return false}}var d=this;if(this.timer){clearTimeout(d.timer)}this.timer=setTimeout(function(){b.update(d,d.value)},b.timerDelay);return true}).delegate('input[type="text"]',"keydown",function(c){if(13==c.keyCode){c.preventDefault();b.update(this,this.value);return false}}).delegate('input[type="radio"], input[type="checkbox"]',"click",function(c){var d=this.value;if(this.type=="checkbox"){d=this.checked}b.update(this,d)});this.elems.form.delegate(".slidedeck-ajax-update","click",function(c){c.preventDefault();a(".slidedeck-content-source").addClass("hidden");b.ajaxUpdate()});this.elems.form.find('input[type="text"]').each(function(){a.data(this,"previousValue",a(this).val())});this.elems.iframe=a("#slidedeck-preview");this.elems.iframe.bind("load",function(){b.eventOnLoad()});this.elems.slideDimensions=a("#slidedeck-slide-dimensions");this.outerWidth=this.elems.iframe.width();this.outerHeight=this.elems.iframe.height();this.size=this.elems.form.find('input[name="options[size]"]:checked').val();this.elems.slideDimensions.css("margin-left",(0-this.outerWidth/2)).removeClass("slidedeck-resizing")}};SlideDeckPreview.updates["options[show-link-slide]"]=function(b,c){c=c==1?true:false;if(c){SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix+"show-link-slide")}else{SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix+"show-link-slide")}};SlideDeckPreview.updates["options[titleFont]"]=SlideDeckPreview.updates["options[bodyFont]"]=function(c,f){var b=SlideDeckFonts[f];if(b["import"]){var g=true;for(var d=0;d<SlideDeckPreview.importedFonts.length;d++){if(SlideDeckPreview.importedFonts[d]==b["import"]){g=false}}if(g){SlideDeckPreview.elems.iframeBody.append('<style type="text/css">@import url('+b["import"]+");</style>")}}if(c[0].name=="options[titleFont]"){var e=SlideDeckPreview.elems.slidedeck.find(".slide-title, .sd2-slide-title").add(SlideDeckPreview.elems.slidedeckFrame.find(".sd2-custom-title-font"));e.css("font-family",b.stack);if(b.weight){e.css("font-weight",b.weight)}}else{if(c[0].name=="options[bodyFont]"){SlideDeckPreview.elems.slidedeck.css("font-family",b.stack)}}};SlideDeckPreview.updates["options[accentColor]"]=function(c,g){var b=SlideDeckPreview.elems.iframeContents.find("#slidedeck-footer-styles");var f=b.text().replace(/\.accent-color(-background)?\{(background-)?color:([\#0-9a-fA-F]+);?\}/gi,".accent-color$1{$2color:"+g+"}");b.text(f);var e=SlideDeckPreview.elems.slidedeckFrame.find(".icon-shape");if(e.length){for(var d=0;d<e.length;d++){SlideDeckPreview.elems.iframe[0].contentWindow.jQuery.data(e[d],"slidedeck-accent-shape").attr("fill",g)}}if(a.browser.msie&&parseInt(a.browser.version,10)<9){SlideDeckPreview.elems.slidedeckFrame.find(".accent-color").css("color",g);SlideDeckPreview.elems.slidedeckFrame.find(".accent-color-background").css("background-color",g)}};SlideDeckPreview.updates["options[lensVariations]"]=function(c,d){var b=c.find("option");b.each(function(e){if(d==this.value){SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix+this.value)}else{SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix+this.value)}})};SlideDeckPreview.updates["options[overlays]"]=function(c,d){var b=c.find("option");b.each(function(e){if(d==this.value){SlideDeckPreview.elems.slidedeckFrame.addClass("show-overlay-"+this.value)}else{SlideDeckPreview.elems.slidedeckFrame.removeClass("show-overlay-"+this.value)}})};SlideDeckPreview.updates["options[overlays_open]"]=function(b,c){c=c==1?true:false;if(c){SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix+"overlays-open");SlideDeckPreview.elems.iframe[0].contentWindow.jQuery.data(SlideDeckPreview.elems.slidedeck[0],"SlideDeckOverlay").open()}else{SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix+"overlays-open");SlideDeckPreview.elems.iframe[0].contentWindow.jQuery.data(SlideDeckPreview.elems.slidedeck[0],"SlideDeckOverlay").close()}};SlideDeckPreview.updates["options[hyphenate]"]=function(b,c){c=c==1?true:false;if(c){SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix+"hyphenate")}else{SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix+"hyphenate")}};SlideDeckPreview.updates["options[continueScrolling]"]=function(b,c){SlideDeckPreview.slidedeck.setOption("continueScrolling",c)};SlideDeckPreview.updates["options[cycle]"]=function(b,c){c=c==1?true:false;SlideDeckPreview.slidedeck.setOption("cycle",c);SlideDeckFadingNav.prototype.checkHorizontal(SlideDeckPreview.slidedeck);SlideDeckFadingNav.prototype.checkVertical(SlideDeckPreview.slidedeck)};SlideDeckPreview.updates["options[keys]"]=function(b,c){c=c==1?true:false;SlideDeckPreview.slidedeck.setOption("keys",c)};SlideDeckPreview.updates["options[scroll]"]=function(b,c){c=c==1?true:false;SlideDeckPreview.slidedeck.setOption("scroll",c);if(SlideDeckPreview.slidedeck.deck.find(".slidesVertical").length){SlideDeckPreview.slidedeck.vertical().options.scroll=c}};SlideDeckPreview.updates["options[touch]"]=function(b,c){c=c==1?true:false;SlideDeckPreview.slidedeck.setOption("touch",c)};SlideDeckPreview.updates["options[touchThreshold]"]=function(b,c){SlideDeckPreview.slidedeck.options.touchThreshold.x=c;SlideDeckPreview.slidedeck.options.touchThreshold.y=c};SlideDeckPreview.updates["options[autoPlay]"]=function(b,c){c=c==1?true:false;SlideDeckPreview.slidedeck.pauseAutoPlay=!c;SlideDeckPreview.slidedeck.setOption("autoPlay",c)};SlideDeckPreview.updates["options[autoPlayInterval]"]=function(b,c){SlideDeckPreview.slidedeck.options.autoPlayInterval=parseInt(c,10)*1000};SlideDeckPreview.updates["options[speed]"]=function(b,c){SlideDeckPreview.slidedeck.setOption("speed",c);if(SlideDeckPreview.slidedeck.deck.find(".slidesVertical").length){SlideDeckPreview.slidedeck.vertical().options.speed=c}};SlideDeckPreview.updates["options[transition]"]=function(b,c){SlideDeckPreview.slidedeck.setOption("transition",c)};SlideDeckPreview.updates["options[display-nav-arrows]"]=function(b,c){b.find("option").each(function(){if(this.value!=c){SlideDeckPreview.elems.slidedeckFrame.removeClass("display-nav-"+this.value)}else{SlideDeckPreview.elems.slidedeckFrame.addClass("display-nav-"+this.value)}})};SlideDeckPreview.validations["options[size]"]=function(b,c){if(SlideDeckPreview.size==c){return false}else{SlideDeckPreview.size=c;return true}};SlideDeckPreview.updates["options[show-excerpt]"]=function(b,c){c=c==1?true:false;if(c){SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix+"show-excerpt")}else{SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix+"show-excerpt")}};SlideDeckPreview.updates["options[hyphenate]"]=function(b,c){c=c==1?true:false;if(c){SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix+"hyphenate")}else{SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix+"hyphenate")}};SlideDeckPreview.updates["options[show-title]"]=function(b,c){c=c==1?true:false;if(c){SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix+"show-title")}else{SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix+"show-title")}};SlideDeckPreview.updates["options[show-readmore]"]=function(b,c){c=c==1?true:false;if(c){SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix+"show-readmore")}else{SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix+"show-readmore")}};SlideDeckPreview.updates["options[show-author]"]=function(b,c){c=c==1?true:false;if(c){SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix+"show-author")}else{SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix+"show-author")}};SlideDeckPreview.updates["options[show-author-avatar]"]=function(b,c){c=c==1?true:false;if(c){SlideDeckPreview.elems.slidedeckFrame.addClass(SlideDeckPrefix+"show-author-avatar")}else{SlideDeckPreview.elems.slidedeckFrame.removeClass(SlideDeckPrefix+"show-author-avatar")}};a(document).ready(function(){SlideDeckPreview.initialize()})})(jQuery);