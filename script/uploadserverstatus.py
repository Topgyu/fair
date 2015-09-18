import httplib
import urllib
import os
import time

def toGETParams(params):
	ret = ""
	for k, v in params.iteritems():
		ret += urllib.quote(str(k)) + "=" + urllib.quote(str(v))
		ret += '&'
	return ret

def checkServerStatus():
	status = {}
	for i in xrange(1, 19):
		servername = "c" + ("0"+str(i) if i < 10 else str(i))
		response = os.system("ping -c 1 " + servername + " > /dev/null")
		status[servername] = response
	for i in xrange(1, 5):
		servername = "x" + ("0"+str(i) if i < 10 else str(i))
		response = os.system("ping -c 1 " + servername + " > /dev/null")
		status[servername] = response
	return status


while True:
	try:
		conn = httplib.HTTPConnection("fair.kaist.ac.kr", 80, timeout=3)
		conn.request("GET", "/uploadserverstatus?" + toGETParams(checkServerStatus()))
		conn.close()
	except:
		print "Cannot connect to fair.kaist.ac.kr:80.. Retrying..."
	time.sleep(60 * 10)
