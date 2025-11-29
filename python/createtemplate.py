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
        self.env=Environment(loader=FileSystemLoader(templatesfolder),auto_reload=True
)

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
    <script src="{'../'*depth}static/js/images.js"></script>

    <script src="{'../'*depth}static/js/flyingimage.js"></script>'''

        name='Pecan Tree'
        pfpurl=''
        flyingimageurl=''

        # name shouldnt affect username
        # because username has limit chars

        data={
            "title": f"{name} Blurb Template",
            "name": name,
            "username": "pecantree_blurb",
            "disabledinputs":True,
            "pfpchanging":False,
            "bordercolor": "#16793c",
            "blurbbackgroundcolor":"#BBAE76",
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

    def update_templates(self):
        '''
        
        Ok this is important. So what this does is it reads all the templates in the templates folder.

        It will open up that templates respective JSON file.
        (There cannot be JSON files with the same name)

        This will also allow me to go direct into the JSON folder and add a template
        
        '''

        # json folder is set and no changed
        
        
        jsonfiles = []

        for root, dirs, files in os.walk(jsonfolder):
            for file in files:
                if file.endswith(".json"):
                    fullpath=os.path.join(root,file)

                    # Convert to a relative web path
                    rel_path = fullpath.split("jsonfolder", 1)[1]
                    rel_path = "jsonfolder" + rel_path  # Add folder back to front
                    # windows too
                    rel_path = rel_path.replace("\\", "/")  

                    jsonfiles.append(rel_path)
        
        # this works and has all the jsonfile paths
        # print(jsonfiles)

        def update_html_now(jsonfiles):
            blurbtemplate = self.env.get_template("main.html")

            for file in jsonfiles:
                htmlfile=file.replace('jsonfolder','templates')
                htmlfile=htmlfile.replace('.json','.html')

                # make the dirs if they dont exist yet
                savedirs = os.path.dirname(htmlfile)


                # creates missing folders
                os.makedirs(savedirs, exist_ok=True)

                with open(file) as jsondata:
                    data=json.load(jsondata)

                

                rendered = blurbtemplate.render(data)
                with open(htmlfile,'w') as markup:
                    markup.write(rendered)
        update_html_now(jsonfiles)

    def template_sections(self):
        templatesection_template = self.env.get_template("templatesection.html")
        # section dict will have the template name and the url
        # for the url they will all be in the same folder
        templatesections = [
            folder for folder in os.listdir(jsonfolder)
            if os.path.isdir(os.path.join(jsonfolder, folder))
        ]
        print(f'templatesections:\n{ templatesections}')
        # the sections come from the json folder automatically
        for foldername in templatesections:

            fulltemplatesfolder=os.path.join(templatesfolder,foldername)
            templatesectionname=f'{foldername}templates.html'
            templatesectionfilepath=os.path.join(fulltemplatesfolder,templatesectionname)
            print(f'templatesectionfilepath: \n{templatesectionfilepath}')
            print(f'foldername :\n {foldername}')

            
            def make_templatesection_data():
                data={
                    "sectionname":foldername
                }

                # get all the URL's, exclude the index type one we're building in this function
                templateurls=[file for file in os.listdir(fulltemplatesfolder) if "templates" not in file]
                templatenames=[url.replace("html","") for url in templateurls]

                # build the dict dynamically
                sectiondict = {
                    name: url for name, url in zip(templatenames, templateurls)
                }
                data["sectiondict"]=sectiondict
                return data
            data = make_templatesection_data()

            def renderit():
                rendered = templatesection_template.render(data)
                with open(templatesectionfilepath,'w') as markup:
                    markup.write(rendered)
            renderit()





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
    <script src="static/js/images.js"></script>
    <script src="static/js/navbar.js"></script>


    <script src="static/js/flyingimage.js"></script>
    <script src="static/js/pasteclear.js"></script>

                    ''')
        # print(f'data:\n{data}')

        root_dir = os.path.abspath(os.path.join(BASE_DIR, "..", ))

        studiopath = os.path.abspath(os.path.join(root_dir, "blurbifystudio.html"))

        rendered = blurbtemplate.render(data)

        with open(studiopath,'w') as studiomarkup:
            studiomarkup.write(rendered)


def main():
    # this is what gets set. So itll make the json, and the template
    newpath='plants/pecantree'

    templateObj=Templates()
    def make_new(newpath):
        templateObj.make_json(newpath)
        templateObj.make_template(newpath)
        
    # make_new(newpath)

    templateObj.update_templates()
    # update studio regardless

    templateObj.update_studio()
    templateObj.template_sections()


main()