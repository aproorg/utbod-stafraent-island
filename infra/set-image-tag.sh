#!/usr/bin/env bash

set -euxo pipefail

SUB=islandis
COMMIT=false
DEPLOY=false

while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -e|--environment)
    shift
    ENVIRONMENT="$1"
    shift
    ;;
    -t|--image-tag)
    shift
    IMAGE_TAG="$1"
    shift
    ;;
    --sub)
    shift
    SUB="$1"
    shift
    ;;
    --commit)
    COMMIT=true
    shift
    ;;
    --deploy)
    shift
    DEPLOY=true
    ;;
    *)
    >&2 echo "Unknown option $1"
    exit 1
    ;;
esac
done

COMMIT_MSG="Updating '$SUB' image tag to '$IMAGE_TAG' in environment '$ENVIRONMENT'"

if [[ "$COMMIT" == "true" ]]; then
  git diff --quiet || (>&2 echo 'Git directory dirty, exiting' && exit 1)
fi

target_file=$SUB/$ENVIRONMENT/services/services.tf

# This should be the only output if the user is not going to be committing
echo "$COMMIT_MSG"

[[ ! -f $target_file ]] && >&2 echo "$target_file does not exist, exiting..." && exit 1

sed -i 's/\(.*image_tag[^=]*=[^"]*"\)[^"]*/\1'"$IMAGE_TAG"'/g' "$target_file"

files_changed_count=$(git diff --name-only | wc -l)

[ "$files_changed_count" -gt "1" ] && (>&2 echo "Expected at most 1 file change after replacement, got $files_changed_count" && exit 1)

if [[ "$COMMIT" == "true" ]]; then
    >&2 git add "$target_file"
    >&2 git commit -m "$COMMIT_MSG"
fi


if [[ "$DEPLOY" == "true" ]]; then
    (
        cd $(dirname "$target_file")
        >&2 tfenv init
        >&2 tfenv install
        >&2 terraform init
        # This should only be called by a user that
        # only has permissions to update task definition
        >&2 terraform apply --auto-approve
    )
fi