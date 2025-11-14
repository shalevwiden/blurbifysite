'''
This file will make a json file full of whatever you pass in

'''
import os
import json
import sys
print(sys.executable)

from jinja2 import Environment, FileSystemLoader
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
templatesfolder=os.path.join(BASE_DIR, "../templates")
jsonfolder = os.path.join(BASE_DIR, "../jsonfolder")

env=Environment(loader=FileSystemLoader(templatesfolder))


def make_json(data,filename):
    # pass filename with a folder
    savepath=os.path.join(jsonfolder,filename)
    
    os.makedirs(os.path.dirname(savepath), exist_ok=True)

    with open(savepath, "w") as jsonfile:
        json.dump(data, jsonfile, indent=4)

# this makes the json data. Then in createtemplate.py we will use that data to make a template
# Then in the FUTURE, we'll use the data in react.

def get_pfp_data(width,marginright, margintop):

    adjustmentwidth=width*2
    adjustment_marginright=marginright*2
    adjustment_margintop=margintop*2

    scalefactor=74/100
    phonewidth=width*scalefactor
    phone_marginright=marginright*scalefactor
    phone_margintop=margintop*scalefactor
    return {
        "width": f"{width}px",
        "marginright": f"{marginright}px",
        "margintop": f"{margintop}px",
        "adjustmentwidth": f"{adjustmentwidth}px",
        "adjustment_marginright": f"{adjustment_marginright}px",
        "adjustment_margintop": f"{adjustment_margintop}px",
        "phonewidth": f"{phonewidth}px",
        "phone_marginright": f"{phone_marginright}px",
        "phone_margintop": f"{phone_margintop}px"
    }

# Call the function
styletemplate=env.get_template("styletag.html")

size_data = get_pfp_data(100, 10, 5)

style=styletemplate.render(size_data)


data={
    "title": "title",
     "name": "Tiger",
    "username": "tiger_blurb",
    "bordercolor": "#da2323",
    "blurbbackgroundcolor":'#000',
    "pfpurl":"../",
    "flyingimageurl":'',
# this will set the border around their pfp
    "realuser":False,
    "style":style
}
make_json(data,'animals/tiger.json')
