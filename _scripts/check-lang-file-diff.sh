#!/bin/sh

# 2011/3/24  Kenji Suzuki


show_usage() {
  echo " usage: $0 old_version new_version"
  echo "    eg: $0 2.0.0 2.0.1"
}


if [ $# -eq 0 ]; then
  show_usage
  exit
fi

downloads_url="http://downloads.codeigniter.com/reactor/"
old_version="CodeIgniter_$1"
new_version="CodeIgniter_$2"

rm -rf "$old_version"
rm -rf "$new_version"

if [ ! -f $old_version.zip ]; then
  wget ${downloads_url}$old_version.zip
  if [ $? -ne 0 ]; then
    echo "$old_version not found!"
    exit 1;
  fi
fi
if [ ! -f $new_version.zip ]; then
  wget ${downloads_url}$new_version.zip
  if [ $? -ne 0 ]; then
    echo "$old_version not found!"
    exit 1;
  fi
fi

unzip "$old_version.zip"
unzip "$new_version.zip"

diff -urN "$old_version/system/language" "$new_version/system/language"

