import sys
import json

def add_dataset(data_name : str, format : str):
    index = None
    with open("index.json", 'r') as fd:
        index = json.load(fd)
    
    index[data_name] = {
                'name' : '',
                'description' : '',
                'dataset_type': format,
                'publishers': [],
                'url_dir': data_name,
                'schema': False, 
                'visualizer': [],
                'editable': False
            }

    with open("index.json", 'w') as fd:
        
        json.dump(index, fd)

if __name__ == "__main__":
    add_dataset(sys.argv[1], sys.argv[2])