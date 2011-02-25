#!/bin/sh

# 2011/2/9  Kenji Suzuki


dir="_export"

show_usage() {
  echo " usage: $0 ci-ja_version tag"
  echo "    eg: $0 2.0.0-1 v2.0.0-1-ja"
}


if [ $# -eq 0 ]; then
  show_usage
  exit
fi

ci_ja_version="$1"
tag="$2"

pkg="ci-ja-all-in-one-${ci_ja_version}"
rm -rf "$dir"
mkdir -p "$dir/$pkg"

hg archive -r "$tag" "$dir/$pkg"


cd "$dir/$pkg"
rm .hg_archival.txt .hgignore .hgtags
rm -rf _scripts


cd ..
zip -r "$pkg.zip" "$pkg"

