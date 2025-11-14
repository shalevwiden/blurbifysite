# gotta do some google cloud stuff with this one
# bucket stuff
from google.cloud import storage


# use this to import stuff from other python files
import importlib.util

from jinja2 import Environment, FileSystemLoader

class Templates:
    def __init__(self):
        # templates env
        self.env = Environment(loader=FileSystemLoader("/Users/shalevwiden/Downloads/Projects/dvwebsitecreation/templating/templates/degreeplan_templates"))
    def make_template():
        template = self.env.get_template("main.html")

        rendered_html = template.render(variables)
