"use strict";

$('document').ready(function() {
	$(window).on('action:ajaxify.end', function(err, data) {
		if(window.speechSynthesis != undefined){
			init();
		}
	});
	function init(){
		addLinks();
		$(window).on('action:post.tools.load', addLinks);
		$(window).on('action:posts.loaded', addLinks);
	}
	function speech(event){
		var post_text = $('li[data-index="'+event.data.id+'"] .content').text().trim();
		var speech = new SpeechSynthesisUtterance();
		speech.text = post_text;
		speech.lang = config.defaultLang;
		speechSynthesis.speak(speech);
	}	
	function addLinks(){
		$('li[component="post"]').each(function( index ) {
			var id = $(this).attr('data-index');
			if($('#post'+id).length > 0) return;
			$(this).find('.post-tools').prepend('<a component="text2speech/addText2speech" href="#" id="post'+id+'">'+
									'<span class="menu-icon"><i class="fa fa-play-circle"></i></span>Audio'+
								  '</a>');
			//added event
			$('#post'+id).on('click',{id:id}, speech);	
		})
	}
});