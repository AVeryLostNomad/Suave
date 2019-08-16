import os
# Returns a list of all trigger methods in the provided plugin package
def get_all_triggers(module):
	list = dir(module)
	to_return = []
	for i in list:
		mthd = getattr(module, i)
		if hasattr(mthd, 'trigger'):
			to_return.append({
			    'codename': mthd.__name__,
				'name': mthd.tname,
				'desc': mthd.tdesc,
				'requirements': mthd.treqs,
				'generates': mthd.tgen
			})
	return to_return

def get_all_actions(module):
	list = dir(module)
	to_return = []
	for i in list:
		mthd = getattr(module, i)
		if hasattr(mthd, 'action'):
			to_return.append({
			    'codename': mthd.__name__,
				'name': mthd.aname,
				'desc': mthd.adesc,
				'requirements': mthd.areqs,
				'generates': mthd.agen
			})
	return to_return

def get_all_prelaunch(module):
	list = dir(module)
	to_return = []
	for i in list:
		mthd = getattr(module, i)
		if hasattr(mthd, 'prelaunch'):
			to_return.append({
			    'codename': mthd.__name__
			})
	return to_return

if __name__ == "__main__":
	# Let's look for an argument specifying which module to scope out
	import sys, importlib.util
	module_qualified_path = sys.argv[1]

	os.chdir(os.path.split(module_qualified_path)[0])

	spec = importlib.util.spec_from_file_location('testmod', module_qualified_path)
	module = importlib.util.module_from_spec(spec)
	spec.loader.exec_module(module)
	print(get_all_triggers(module))
	print(get_all_actions(module))
	print(get_all_prelaunch(module))
