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
	function audioCancel(event){
		speechSynthesis.cancel();
		$('#post'+event.data.id).html('<span class="menu-icon"><i class="fa fa-play-circle"></i></span>Audio');
		$('#post'+event.data.id).unbind();
		$('#post'+event.data.id).on('click',{id:event.data.id}, speech);
	}
	function speech(event){
		var post_text = $('li[data-index="'+event.data.id+'"] .content').text().trim();
		sentences = post_text.match(/.{1,200}/g);
		for (i = 0; i < sentences.length; i++) {
		  	sentence = sentences[i]
			var speech = new SpeechSynthesisUtterance();
			speech.text = sentence;
			speech.lang = config.defaultLang;
			speechSynthesis.speak(speech);
			$('#post'+event.data.id).html('<span class="menu-icon"><i class="fa fa-stop-circle"></i></span>Audio');
			$('#post'+event.data.id).on("click",{ id: event.data.id }, audioCancel );
		}
	}	
	function addLinks(){
		$('li[component="post"]').each(function( index ) {
			var id = $(this).attr('data-index');
			if($('#post'+id).length > 0) return;
			$(this).find('.post-tools').prepend('<a component="text2speech/addText2speech" href="#none" id="post'+id+'">'+
									'<span class="menu-icon"><i class="fa fa-play-circle"></i></span>Audio'+
								  '</a>');
			//added event
			$('#post'+id).on('click',{id:id}, speech);	
		})
	}
});