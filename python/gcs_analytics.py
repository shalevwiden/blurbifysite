# gcs-analytics.py (Google Cloud Storage CLI analytics)

import subprocess

PROJECT_ID = "blurbify"
BUCKET_NAME = "blurbify-assets"

def run_cmd(cmd: list[str]):
    """Run a gcloud command and print output including errors."""
    print(f"\n>>> Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, text=True, capture_output=True)
    
    if result.stdout.strip():
        print("STDOUT:\n", result.stdout)
    if result.stderr.strip():
        print("STDERR:\n", result.stderr)
    
    print("Return Code:", result.returncode)


# ----------------------------------------
# Bucket Info Commands
# ----------------------------------------

def bucket_info(bucket_name: str):
    run_cmd(["gcloud", "storage", "buckets", "describe", f"gs://{bucket_name}"])
    run_cmd(["gcloud", "storage", "buckets", "get-iam-policy", f"gs://{bucket_name}"])
    run_cmd(["gcloud", "storage", "buckets", "describe", f"gs://{bucket_name}", "--format=json(publicAccessPrevention)"])
    run_cmd(["gcloud", "storage", "buckets", "describe", f"gs://{bucket_name}", "--format=json(iamConfiguration.uniformBucketLevelAccess)"])
    run_cmd(["gcloud", "storage", "buckets", "describe", f"gs://{bucket_name}", "--format=json(lifecycle)"])

# ----------------------------------------
# Project-Level Info Commands
# ----------------------------------------

def project_info(project_id: str):
    run_cmd(["gcloud", "projects", "get-iam-policy", project_id])
    run_cmd(["gcloud", "beta", "billing", "projects", "describe", project_id])
    run_cmd(["gcloud", "services", "list", "--project", project_id])

# ----------------------------------------

if __name__ == "__main__":
    bucket_info(BUCKET_NAME)
    project_info(PROJECT_ID)
