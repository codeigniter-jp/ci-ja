###################################
 





1.5.3 から 1.5.4 へのアップグレード
###################################

アップグレードを行う前に、index.phpファイルを静的ページに置き換えて、
オフラインにする必要があります。



Step 1: CodeIgniter ファイルのアップグレード
============================================

"system" フォルダの以下のファイルとディレクトリを新しいバージョンのも
のに置き換えてください:


-  application/config/mimes.php
-  system/codeigniter
-  system/database
-  system/helpers
-  system/libraries
-  system/plugins


.. note:: ユーザバージョンのファイルがフォルダ内にある場合には、最初にそれらのコピーを取っておいてください。



Step 2: config.php に 文字セットの定義を追加
============================================

application/config/config.php に次のコードを追加してください。

::

	/*
	    |--------------------------------------------------------------------------
	    | Default Character Set
	    |--------------------------------------------------------------------------
	    |
	    | This determines which character set is used by default in various methods
	    | that require a character set to be provided.
	    |
	    */
	    $config['charset'] = "UTF-8";




Step 3: 言語ファイルの自動読み込み
==================================

いずれかの言語ファイルを自動読み込みしたい場合は、application/config/a
utoload.php に次の行を追加してください。

::

	$autoload['language'] = array();




Step 4: ユーザガイドの更新
==========================

また、ユーザガイドのローカルコピーを新しいバージョンのものに置き換えて
ください。

