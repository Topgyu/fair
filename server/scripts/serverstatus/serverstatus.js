function get_failed_server(callback){
	$.ajax({
		url: '/serverstatus.json',
		success: function(x) {
			var result = [];
			var data = JSON.parse(x);
			for (var key in data) {
				if (parseInt(data[key]) != 0) {
					result.push(key);
				}
			}
			callback(result);
		}
	});
}

get_failed_server(function(server_list){
	$('#status').children().remove();
	for (var i = 0 ; i < server_list.length ; i++) {
		$('<li></li>').text(server_list[i]).appendTo('#status');
	}
});

setInterval(function(){
	get_failed_server(function(server_list){
		$('#status').children().remove();
		for (var i = 0 ; i < server_list.length ; i++) {
			$('<li></li>').text(server_list[i]).appendTo('#status');
			$('title').text = '* Server Status';
		}
		if (server_list.length === 0) {
			$('<li></li>').text('All servers are running well!').appendTo('#status');
			$('title').text = 'Server Status';
		}
	});
}, 10000);