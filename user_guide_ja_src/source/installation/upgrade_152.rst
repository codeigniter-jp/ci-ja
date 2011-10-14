###################################
1.5.0 から 1.5.2 へのアップグレード
###################################

.. note:: このページは、バージョン 1.5.0 または 1.5.1 向けです。それ以外のバージョンをお使いなら、まず最初にアップグレードしてください。

アップグレードを行う前に、index.phpファイルを静的ページに置き換えて、
オフラインにする必要があります。



Step 1: CodeIgniter ファイルのアップグレード
============================================

"system" フォルダの以下のファイルとディレクトリを新しいバージョンのも
のに置き換えてください:

-  system/helpers/download_helper.php
-  system/helpers/form_helper.php
-  system/libraries/Table.php
-  system/libraries/User_agent.php
-  system/libraries/Exceptions.php
-  system/libraries/Input.php
-  system/libraries/Router.php
-  system/libraries/Loader.php
-  system/libraries/Image_lib.php
-  system/language/english/unit_test_lang.php
-  system/database/DB_active_rec.php
-  system/database/drivers/mysqli/mysqli_driver.php
-  codeigniter/


.. note:: ユーザバージョンのファイルがフォルダ内にある場合には、最初にそれらのコピーを取っておいてください。



Step 2: ユーザガイドの更新
==========================

また、ユーザガイドのローカルコピーを新しいバージョンのものに置き換えて
ください。

