###################################
1.5.2 から 1.5.3 へのアップグレード
###################################

アップグレードを行う前に、index.phpファイルを静的ページに置き換えて、
オフラインにする必要があります。



Step 1: CodeIgniter ファイルのアップデート
==========================================

"system" フォルダの以下のファイルとディレクトリを新しいバージョンのも
のに置き換えてください:


-  system/database/drivers
-  system/helpers
-  system/libraries/Input.php
-  system/libraries/Loader.php
-  system/libraries/Profiler.php
-  system/libraries/Table.php


.. note:: ユーザバージョンのファイルがフォルダ内にある場合には、最初にそれらのコピーを取っておいてください。



Step 2: ユーザガイドの更新
==========================

また、ユーザガイドのローカルコピーを新しいバージョンのものに置き換えて
ください。

