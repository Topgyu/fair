// this approach is interesting if you need to dynamically create data in Javascript 
var table_content = [];
var name_list = []

function on_name_filter_changed(e) {
	$('tr').removeClass('highlight');
	if(this.value == 0)
		return;
	name = name_list[this.value - 1];
	len = table_content.length;
	value = 0;
	for(var i = 0; i < len; ++i) {
		elem = table_content[i];
		if (elem.values.name === name) {
			value += elem.values.amount;
		}
	}
	$('#total_amount').text(value);
	console.log(value);

	$('td').each(function(){
		var ele = $(this);
		if (ele.text() == name){
			ele.parent().addClass('highlight');
		}
	});
}

function on_load() {
	var metadata = [];
	metadata.push({ name: "name", label: "이름", datatype: "string", editable: false});
	metadata.push({ name: "amount", label: "금액", datatype: "integer", editable: false});
	metadata.push({ name: "date", label: "날짜", datatype: "date", editable: false});
	metadata.push({ name: "reason", label: "사유", datatype: "string", editable: false});

	len = data.length;
	for(var i = 0; i < len; i++) {
		elem = data[i];
		table_content.push({id:i, values: elem})
	}

	name_sort = {}
	len = table_content.length;
	for(var i = 0; i < len; i++) {
		elem = table_content[i];
		name_sort[elem.values.name] = 1;
	}
	var name_filter = $('#name_filter');
	name_filter.append(new Option("선택", 0));
	i = 1
	for(var name in name_sort) {
		name_list.push(name);
		name_filter.append(new Option(name, i));
		i++;
	}
	name_filter.on('change', on_name_filter_changed);
	editableGrid = new EditableGrid("DemoGridJsData");
	editableGrid.load({"metadata": metadata, "data": table_content});
	editableGrid.renderGrid("tablecontent", "testgrid", "tableid");
}