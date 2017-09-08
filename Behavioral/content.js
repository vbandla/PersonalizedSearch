
$( document ).ready(function(event) {
    
	$("#submit-button").on("click", function () {
		chrome.runtime.sendMessage(' PostAnswer, ' + window.location.href + ', posted an answer ')
	})
});


$( document ).ready(function(event) {
	
	$(".vote-up-off").on("click", function () {
		chrome.runtime.sendMessage(' UpVote, ' + window.location.href + ', upvoted an answer ')
	})
	
});


$( document ).ready(function(event) {
	
	$(".vote-down-off").on("click", function () {
		chrome.runtime.sendMessage(' DownVote, ' + window.location.href + ', downvoted an answer ')
	})
	
});

$( document ).ready(function(event) {
	
	$(".question-hyperlink").on("click", function () {
		chrome.runtime.sendMessage(' Question, ' + window.location.href + ', selected to look up a Question ')
	})
	
});

$( document ).ready(function(event) {
	
	$(".comments-link").on("click", function () {
		chrome.runtime.sendMessage(' AddComment, ' + window.location.href + ', commented on an answer')
	})
	
});

