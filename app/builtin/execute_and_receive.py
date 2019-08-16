import os
if __name__ == "__main__":
    # Let's look for an argument specifying which module to scope out
    import sys, importlib.util, json
    module_qualified_path = sys.argv[1]  # A module to scope out

    os.chdir(os.path.split(module_qualified_path)[0])

    code_name = sys.argv[2]  # The method we want to be calling here

    to_send = []
    for i in range(3, len(sys.argv)):
        to_send.append(sys.argv[i])

    spec = importlib.util.spec_from_file_location('testmod', module_qualified_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    method = getattr(module, code_name)

    if len(to_send) == 0:
        response = method()
    else:
        response = method(*to_send)
    print(json.dumps(response))
