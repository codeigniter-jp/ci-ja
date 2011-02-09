#!/bin/sh

# 2011/2/9  Kenji Suzuki


dir="_export"

show_usage() {
  echo " usage: $0 ci-ja_version tag"
  echo "    eg: $0 2.0.0-1 v2.0.0-1"
}


if [ $# -eq 0 ]; then
  show_usage
  exit
fi

ci_ja_version=$1
tag=$2

pkg="ci-ja-all-in-one-${ci_ja_version}"
rm -rf $dir
mkdir -p $dir/$pkg

hg archive -r "$tag" "$dir/$pkg"


v=`echo $ci_ja_version | cut -f 1 -d '-'`
ci_dir="CodeIgniter_$v"
ci_pkg="CodeIgniter_$v.zip"
if [ ! -f $ci_pkg ]; then
  echo "Error: $ci_pkg not found"
  exit 1
fi

rm -rf "$ci_dir"
unzip "$ci_pkg"


cd $dir/$pkg
rm -rf _scripts
mv user_guide user_guide_ja
cp -pr "../../$ci_dir/user_guide" .


cd ..
zip -r "$pkg.zip" "$pkg"

