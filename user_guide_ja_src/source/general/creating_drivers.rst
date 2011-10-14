##############
ドライバの作成
##############



ドライバのディレクトリとファイル構成
====================================

ドライバのディレクトリとファイル配置の例:


-  /application/libraries/Driver_name

   -  Driver_name.php
   -  drivers

      - Driver_name_subclass_1.php
      - Driver_name_subclass_2.php
      - Driver_name_subclass_3.php




NOTE:
大文字と小文字を区別するファイルシステムの上で互換性を維持するために、
Driver_name ディレクトリの名前は ucfirst() [ 訳注: 先頭が大文字 ]
でなければいけません。

