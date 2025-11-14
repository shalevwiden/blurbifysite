'''
This file will make a json file full of whatever you pass in

'''
import os
import json
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
jsonfolder = os.path.join(BASE_DIR, "../jsonfolder")

def make_json(data,filename):
    # pass filename with a folder
    savepath=os.path.join(jsonfolder,filename)
    
    os.makedirs(os.path.dirname(savepath), exist_ok=True)

    with open(savepath, "w") as jsonfile:
        json.dump(data, jsonfile, indent=4)

data={
     "name": "Lion",
    "username": "lionblurb",
    "bordercolor": "#ffffff",

    "pfp_size": 125,
    "pfp_coords": [1, 2, 3, 4]
}
make_json(data,'animals/lion.json')
