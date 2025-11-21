from google.cloud import storage

# set your project ID and bucket name
# finish this tmr
PROJECT_ID = "your-project-id"
BUCKET_NAME = "your-bucket-name"

# initialize client
client = storage.Client(project=PROJECT_ID)

# get bucket
bucket = client.get_bucket(BUCKET_NAME)

def make_images_dict():
    """
    Purpose: Make a dictionary of image names -> public URLs from a GCS bucket
    Input: None
    Output: dict {image_name: public_url}
    """
    images_dict = {}

    # list all blobs in bucket
    for blob in bucket.list_blobs():
        # get key without extension
        key = blob.name.rsplit('.', 1)[0]  # removes file extension
        # construct public url
        public_url = f"https://storage.googleapis.com/{BUCKET_NAME}/{blob.name}"
        images_dict[key] = public_url

    return images_dict

def upload_pfp_andflying(path,flyingimg,pfpimg):
    # this is for templates
    # and for when users create more Blurb templates.
    '''
    Each Blurb template should have its own folder
    Thats why there can be the same name "flying.png" across the different folders

    Can use this to override if I set the same path.
    '''

    flying_blob = bucket.blob(f"{path}/flying.png")
    # upload from filename reads it on the local machine and uploads
    flying_blob.upload_from_filename(flyingimg)
    print(f"Uploaded flying image to {flying_blob.name}")

    # Upload profile image
    pfp_blob = bucket.blob(f"{path}/pfp.png")
    pfp_blob.upload_from_filename(pfpimg)
    print(f"Uploaded profile image to {pfp_blob.name}")
    



def upload_pfp_image_user():
    pass

# example usage
if __name__ == "__main__":
    images = make_images_dict()
    print(images)