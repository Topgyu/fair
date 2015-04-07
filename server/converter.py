import csv
csvfile = open('data.csv', 'rb')
datareader = csv.reader(csvfile, delimiter = ',')

table_row = []
table_type = []
data = []
i = 0
for row in datareader:
	if i == 0:
		table_row = row
	elif i == 1:
		table_type = row
	else:
		data.append(row)
	i += 1
csvfile.close()

post_data = []
add_flag = True
for i in range(len(data)):
	cur_elem = data[i][:]
	add_flag = True
	for j in range(len(table_row)):
		if table_type[j] == 'name':
			name_list = data[i][j].split('/')
			for k in range(len(name_list)):
				name = name_list[k].strip()
				elem = data[i][:]
				elem[j] = name
				post_data.append(elem)
			add_flag = False

	if add_flag == True:
		post_data.append(cur_elem)


outfile = open('./scripts/data.js', 'w')
outfile.write('data = [')
for i in range(len(post_data)):
	if i != 0:
		outfile.write(',')
	outfile.write('{')
	for j in range(len(table_row)):
		if j != 0:
			outfile.write(',')
		outfile.write('"%s":' % (table_row[j]))
		if table_type[j] == 'string' or table_type[j] == 'name':
			outfile.write('"%s"' % (post_data[i][j].decode('euc-kr').encode('utf-8')))
		elif table_type[j] == 'integer':
			outfile.write('%s' % (post_data[i][j]))
		elif table_type[j] == 'date':
			date = post_data[i][j].split('-')
			outfile.write('"%s\\/%s\\/%s"' % (date[0], date[1], date[2]))
	outfile.write('}')
outfile.write(']')
outfile.close()