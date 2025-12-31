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
Main.html is the main template (no way).

To make a new template just change newpath in createtemplate.py

newpath='animals/elephant'

### Nov 16, 2025

Worked on new Nav Bar
And on Random Blurb Button.
Click the random blurb button, go to a random blurb template.
Since I added images.json and images.js, that needs to be another argument in the create template file.

### Nov 21, 2025

Not setting the flying images src in images.js
Instead we are going to set it with the json which is passed in.
This makes more sense because a user will pass a custom flying image to each of their templates as well.

For flying images, I simply need to adjust their start and end vals for mobile.
When the site is pivoted to React, then there should be a single "styling" bar which changes so the user doesnt have to move around to many different places to add styling.
And I as the number one user will certainly appreciate that.

--
Every time I come back to work on this theres some new bug that needs to be fixed.

Going to set default placeholder name and username values with JavaScript.
So that way if the file is on Blurbify Studio then it will be replaced.

**Ok more stuff**

So I have to make all the templates update based on their json files whenever theres a change, not just when make_template and make_json is called.
Im really doing a lot of extra stuff to make this all static.
Hopefully it pays off lol.

The good news is all of this template logic is gonna help with users.
And user templates too.

I HAVE TO ADD USERS
Like so bad lol.

Going to try to add custom web sharing now.
Ooooo also an idea make it so when the save button is clicked,
the Blurb is saved to ones device.

I also need to add a scaling bar for the entire blurb so that I dont have to resize, for Instagram, X, YouTube all that stuff

Now I have to code up a way to upload files to google cloud very efficiently.

### Overall Site Plan:

Heres the plan for the site:

- keep templates largely static
- thats cause I want Millions of users on them, everyday.
- Then build out a real Blurbify site. Where users can come on and create templates. And simply see other users templates.

### Flask Plan:

- sign up form with email and main username and main name.

User comes on without setting any data like colors or pfp and is greeted with a single default blurbify template. User will also have a "page" which details all of their templates.

Each template will have the Blurb preview, and a little description about what it is.

Then user can set their profile picture on actual Blurbify, and a bio.
Very limited social networking features, but there WILL be accounts. Which I think is cool. The templates will be in boxes, and the main template will have that nice gradient that goes around the pfp also on the Template.

Not by college probs, but lowkey it kinda is just gonna be for college students.
Why? Cause I'm going to Blurbify the entire course catalog of many schools, and put it on Degreeview.

Then allow users to create 5 more templates. These templates will have the green, yellow, orangish, blue gradients.

I wanna build a form that me as the Dev can use to create a ton of templates.
That same form will be slightly repurposed and use by USERS to create new templates.

### Nov 22, 2025

Gotta work on a user profile page.
Users will have Blurb "templates".
On each of their template selectors we will need to have a preview of how the Blurb looks.
So we could craft it dynamically as like a mini blurb or save as a photo.

Nah I think crafting it dynamically as a mini blurb is the best idea.
And then have a on hover animation, like if the user hovers it scales and the text content also changes.

### Nov 23, 2025

Working on Template Section a lot.
Worked on about page.
New footer.

Templates page is the most pressing issue currently.

Heres the idea:

- have a template for the template_subsection page
- Assign it to a folder. For example for the historical one, assign it to that historical one too.
  Create it by reading all of the

### Nov 29, 2025

Made a lot of progress.

Mostly worked on save blurb button.

And it STILL doesnt work in production.
It does in development though.

What I still need to do:

- Make the Blurbify plane page on the site instead of redirecting to the external site
- make the footer better.
- Other than that we've certainly made progress.

### Dec 30, 2025

This needs Flask, badly
I wanted to do this static so I could have thousands of templates

I'll do that later, for now I need Flask for real users.
