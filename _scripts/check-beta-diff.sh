#!/bin/sh

# 2011/3/28  Kenji Suzuki


dir="_export"
diff="diff.txt"
diff_docs="diff.docs.txt"

show_usage() {
  echo " usage: $0 ci-ja_version"
  echo "    eg: $0 2.0.1-beta1"
}


if [ $# -eq 0 ]; then
  show_usage
  exit
fi

ci_ja_version="$1"
ci_version=`echo "$ci_ja_version" | cut -f 1 -d "-"`
ci_ja_dir="$dir/ci-ja-all-in-one-$ci_ja_version"
ci_dir="CodeIgniter_$ci_version"

if [ ! -d $ci_dir ]; then
  echo "$ci_dir not found!"
  exit 1;
fi
if [ ! -d $ci_ja_dir ]; then
  echo "$dir/$ci_dir not found!"
  exit 1;
fi

diff -urN $ci_dir/user_guide $ci_ja_dir/user_guide > $diff_docs
if [ -s $diff_docs ]; then
  echo "$diff_docs created"
fi

rm -rf "$ci_ja_dir/user_guide_ja"
rm -rf "$ci_ja_dir/system/language/japanese"

diff -urN $ci_dir $ci_ja_dir > $diff
if [ -s $diff ]; then
  echo "$diff created"
fi

