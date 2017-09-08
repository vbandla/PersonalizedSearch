chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //sendResponse({"background": request});
	console.log(request);
    $.ajax({
        url: 'http://localhost:8080/users/BehavioralTracking',
        contentType: "text/plain",
        dataType: "text",
		data: request,
        type: 'POST'
    });
});