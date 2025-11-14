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

# this makes the json data. Then in createtemplate.py we will use that data to make a template
# Then in the FUTURE, we'll use the data in react.
data={
    "title": "title",
     "name": "Lion",
    "username": "lionblurb",
    "bordercolor": "#ffffff",
    "backgroundcolor":'#000',
    "pfpurl":"../"

    "pfp_size": 125,
    "pfp_coords": [1, 2, 3, 4]
}
make_json(data,'animals/lion.json')
