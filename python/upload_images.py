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

# example usage
if __name__ == "__main__":
    images = make_images_dict()
    print(images)