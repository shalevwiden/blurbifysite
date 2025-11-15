# gotta do some google cloud stuff with this one
# bucket stuff
from google.cloud import storage
import os
import json
import sys

# use this to import stuff from other python files
import importlib.util

from jinja2 import Environment, FileSystemLoader

# use paths relative to file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
templatesfolder = os.path.abspath(os.path.join(BASE_DIR, "../templates"))
jsonfolder = os.path.join(BASE_DIR, "../jsonfolder")


class Templates:
    def __init__(self):
        # templates env
        self.env=Environment(loader=FileSystemLoader(templatesfolder))

    def make_json(self,newpath):

        def save_json(data,jsonpath):
        # pass newpath with a folder
            jsondata=f'{jsonpath}.json'
            savepath=os.path.join(jsonfolder,jsondata)
            
            os.makedirs(os.path.dirname(savepath), exist_ok=True)

            with open(savepath, "w") as jsonfile:
                json.dump(data, jsonfile, indent=4)

# this makes the json data. Then in createtemplate.py we will use that data to make a template
# Then in the FUTURE, we'll use the data in react.

        def get_pfp_data(width,marginright, margintop):

            adjustmentwidth=width*2
            adjustment_marginright=marginright*2
            adjustment_margintop=margintop*2

            # the scale factor for Mobile screens
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
        styletemplate=self.env.get_template("styletag.html")

        size_data = get_pfp_data(100, 10, 5)

        style=styletemplate.render(size_data)

        depth=len(newpath.split('/'))
        stylepath=f"{'../'*depth}static/css/main.css"
        print(f'stylepath:{stylepath}')

        scripts=f'''  
        <script src="{'../'*depth}static/js/toggleanimations.js"></script>

    <script src="{'../'*depth}static/js/template_inputs.js"></script>

    <script src="{'../'*depth}static/js/dropdown.js"></script>
    <script src="{'../'*depth}static/js/icons.js"></script>
    <script src="{'../'*depth}static/js/flyingimage.js"></script>'''

        name='Tiger'
        pfpurl=''
        flyingimageurl=''
        data={
            "title": f"{name} Blurb Template",
            "name": name,
            "username": "tiger_blurb",
            "disabledinputs":True,
            "pfpchanging":False,
            "bordercolor": "#da4823",
            "blurbbackgroundcolor":"#F79152",
            "pfpurl":pfpurl,
            "flyingimageurl":flyingimageurl,
        # this will set the border around their pfp
            "realuser":False,
            "style":style,
            "stylepath":stylepath,
            "scripts":scripts
        }

        save_json(data,newpath)

    def make_template(self,newpath):

        # if I pass in animals/mammals/elephant this will be animals/mammals

        
        savehtmlpath=os.path.join(templatesfolder,f'{newpath}.html')
        savedirs = os.path.dirname(savehtmlpath)


        os.makedirs(savedirs, exist_ok=True)
        blurbtemplate = self.env.get_template("main.html")

        # now deal with json stuff
        currentjson=os.path.join(jsonfolder,f'{newpath}.json')

        with open(currentjson) as jsondata:
            data=json.load(jsondata)

        rendered = blurbtemplate.render(data)
        with open(savehtmlpath,'w') as newtemplate:
            newtemplate.write(rendered)

    def update_studio(self):
        blurbtemplate = self.env.get_template("main.html")

        # now deal with json stuff
        # change it from the studio.json folder, it shouldnt change too much
        studiojson=os.path.join(jsonfolder,'blurbifystudio.json')

        with open(studiojson) as jsondata:
            data=json.load(jsondata)
        data.update(scripts='''<script src="static/js/toggleanimations.js"></script>

                    
    <script src="static/js/inputs.js"></script>

    <script src="static/js/dropdown.js"></script>
    <script src="static/js/icons.js"></script>
    <script src="static/js/flyingimage.js"></script>''')

        root_dir = os.path.abspath(os.path.join(BASE_DIR, "..", ))

        studiopath = os.path.abspath(os.path.join(root_dir, "blurbifystudio.html"))

        rendered = blurbtemplate.render(data)
        with open(studiopath,'w') as newtemplate:
            newtemplate.write(rendered)


def main():
    newpath='animals/tiger'

    newtemplate=Templates()
    newtemplate.make_json(newpath)
    newtemplate.make_template(newpath)
    newtemplate.update_studio()

main()