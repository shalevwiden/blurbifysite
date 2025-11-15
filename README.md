# Blurbify site

### Oct 18

So far its a web based version with no python pillow or frame functionality.
It does the job.

I am creating a mobile responsive site so I can use it from my phone too.

Inputs to change the username, name, text content, and pfp without writing any code (user friendly)

Next I need to add google analytics tracking

### Oct 19

Added form so users can submit data.
It is deployed on Vercel at [this link](https://blurbifysite.vercel.app/)

### Oct 20

Added post image functionality
Also line 514

in the img#postimage thats where animations for when the image shows up can be set
Options

- make it drop down
- make it blur in
- Many more

Added view count setting

Worth noting is my own image has custom width. 206px small one 412 adjustment one.

### Nov 2, 2025

Docs may be limited, but I should have a bunch of linkedin posts explaining the technicalities behind this stuff.

### Nov 5, 2025

I need to write a lot of docs for this
Because theres a lot of technicalities.
Using the 450px media quiery breakpoint for phone size stuff.

The profile picture sizing is tricky since theres a preview div.
The .adjustmentsdiv
But since the pfp is smaller it needs to be adjusted proportionally.

### Nov 11

Need to add templates.
And user accounts for sure.

### Adding Navbar

For SCSS, the underscore \_ tells scss not to compile it directly

### Nov 14

Making a Jinja template now
In the future with React I'll have to pivot.
Doing this is great practice. Practice as in like routiine.
`BASE_DIR = os.path.dirname(os.path.abspath(__file__))`

Today added better pfp selecting.
Fixed size bug.
Fixed positioning slider bug.

Hmm well I could use Flask.
Or I could compute all of the css files and js file depths manually.

### Nov 14 again

In the JSON theres a style and a scripts.
The scripts should be updated based on the path.
But there should be a check so if its left empty it does the default amount of scripts anyway.

Inputs.js is for user JavaScript

template_inputs is for template js, which doesnt have verified icons or pfp uploading in most cases.

Update main.html so now its used for both Blurbify studio and for templates.
The Blurbify studio json is "blurbifystudio.json" and it is only changed from that file.

Now the templates and the studio can all be updated from updating main.html
