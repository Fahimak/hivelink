#!/bin/bash

# Check if a commit message is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <commit_message>"
  exit 1
fi

# Define the commit message
commit_message="$1"

# Define the list of branches you want to push to
branches=("prod-vee" "prod-dtt" "prod-svk")

# Loop through the branches
for branch in "${branches[@]}"; do
  # Merge with aug_2 branch
  git checkout $branch
  git merge --no-edit neutral
  sleep 2

  git checkout --ours -- src/app/layout.tsx
  git checkout --ours -- .env.local
  git checkout --ours -- push_to_multiple_branches.sh

  # Add and commit changes
  git add .
  git commit -m "$commit_message"

  # Push to the branch
  git push -u origin $branch

  # Add a wait time before the next iteration (adjust the duration as needed)
  sleep 5
done

# Return to the original branch
git checkout neutral
