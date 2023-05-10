import shutil
import os

# Set the path of the directory to rename
root_path = 'Raw-Data/data-prothoma'

# Loop over all directories and subdirectories in the root directory
for dirpath, dirnames, filenames in os.walk(root_path):
    # Loop over all files in the current directory
    for filename in filenames:
        # Generate the old and new file paths
        old_path = os.path.join(dirpath, filename)
        new_path = os.path.join(dirpath, 'prothoma_' + filename)
        # Rename the file
        os.rename(old_path, new_path)

# Set the path of the directory to rename
root_path = 'Raw-Data/data-tanmoy'

# Loop over all directories and subdirectories in the root directory
for dirpath, dirnames, filenames in os.walk(root_path):
    # Loop over all files in the current directory
    for filename in filenames:
        # Generate the old and new file paths
        old_path = os.path.join(dirpath, filename)
        new_path = os.path.join(dirpath, 'tanmoy_' + filename)
        # Rename the file
        os.rename(old_path, new_path)

# set the source and destination directories
src_dir = 'Raw-Data/data-tanmoy'
dst_dir = 'Raw-Data/data-prothoma'


# Get a list of subdirectories in the source directory
subdirs = [d for d in os.listdir(src_dir) if os.path.isdir(os.path.join(src_dir, d))]

# Loop over the subdirectories
for subdir in subdirs:
    # Check if there is a matching subdirectory in the destination directory
    dst_subdir = os.path.join(dst_dir, subdir)
    if os.path.exists(dst_subdir) and os.path.isdir(dst_subdir):
        # If there is a matching subdirectory, merge the contents of the two directories
        for filename in os.listdir(os.path.join(src_dir, subdir)):
            src_file = os.path.join(src_dir, subdir, filename)
            dst_file = os.path.join(dst_dir, subdir, filename)
            shutil.move(src_file, dst_file)
    else:
        # If there is no matching subdirectory, move the entire subdirectory to the destination directory
        shutil.move(os.path.join(src_dir, subdir), dst_dir)