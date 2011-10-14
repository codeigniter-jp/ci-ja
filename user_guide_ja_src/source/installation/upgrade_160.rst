###################################
1.5.4 から 1.6.0 へのアップグレード
###################################

アップデートを行う前に、index.php
ファイルを静的ページに置き換えて、オフラインにする必要があります。



Step 1: CodeIgniterファイルのアップデート
=========================================

"system" フォルダの中のこれらのファイルとディレクトリを新しいものと入
れ替えます:


-  system/codeigniter
-  system/database
-  system/helpers
-  system/libraries
-  system/plugins
-  system/language


.. note:: ユーザバージョンのファイルがフォルダ内にある場合には、最初にそれらのコピーを取っておいてください。



Step 2: config.php に "time_to_update" を追加
=============================================

application/config/config.php に以下のセッション設定を追加します。


::

	$config['sess_time_to_update'] 		= 300;




Step 3: $autoload['model'] を追加
=================================

application/config/autoload.php に以下を追加します。


::

	 /*
		| -------------------------------------------------------------------
		| Auto-load Model files
		| -------------------------------------------------------------------
		| Prototype:
		|
		| $autoload['model'] = array('my_model');
		|
		*/
		
		$autoload['model'] = array();




Step 4: database.php に追加
===========================

application/config/database.php ファイルに以下を追加します。:

以下の変数をデータベース設定オプションに $active_group
として追加します


::

	$active_record = TRUE;



以下の行をデータベース設定オプションからはずします。


::

	$db['default']['active_r'] = TRUE;



以下の行をデータベース設定オプションに追加します。


::

	$db['default']['char_set'] = "utf8";
	$db['default']['dbcollat'] = "utf8_general_ci";





Step 5: ユーザガイドの更新
==========================

また、ユーザガイドのローカルコピーを新しいバージョンのものに置き換えて
ください。

