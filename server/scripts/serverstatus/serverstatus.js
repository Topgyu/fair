function get_failed_server(callback){
	$.ajax({
		url: '/serverstatus.json',
		success: function(x) {
			var server_list = [];
			var data = JSON.parse(x);
			for (var key in data) {
				if (parseInt(data[key]) != 0) {
					server_list.push(key);
				}
			}
			
			$('#status .name').removeClass('red');
			for (var i = 0 ; i < server_list.length ; i++) {
				$('#status .' + server_list[i]).addClass('red');
				$('title')[0].text = '* Server Status';
			}
			if (server_list.length == 0){
				$('title')[0].text = 'Server Status';
			}
		}
	});
}

function t(x){
	if (x < 10) return "0" + x;
	return "" + x;
}

$(function(){
	// initialize
	for (var i = 1; i <= 18 ; i++){
		$('<li></li>').addClass('name').addClass('c' + t(i)).text('c' + t(i)).appendTo('#status');
	}
	for (var i = 1; i <= 4 ; i++){
		$('<li></li>').addClass('name').addClass('x' + t(i)).text('x' + t(i)).appendTo('#status');
	}
	get_failed_server();

	setInterval(function(){
		get_failed_server();
	}, 10000);
});