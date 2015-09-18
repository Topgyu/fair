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
		}
	});
}, 10000);