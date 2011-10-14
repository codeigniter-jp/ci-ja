###################################
1.4.1 から 1.5.0 へのアップグレード
###################################

.. note:: このページは、バージョン 1.4.1 向けです。それ以外のバージョンをお使いなら、まず最初にアップグレードしてください。

アップグレードを行う前に、index.phpファイルを静的ページに置き換えて、
オフラインにする必要があります。



Step 1: CodeIgniter ファイルのアップグレード
============================================

"system" フォルダの以下のファイルとディレクトリを新しいバージョンのも
のに置き換えてください:

-  application/config/user_agents.php (1.5 向けの新しいファイル)
-  application/config/smileys.php (1.5 向けの新しいファイル)
-  codeigniter/
-  database/ (1.5
   向けの新しいファイル。"drivers"フォルダを置き換えます)
-  helpers/
-  language/
-  libraries/
-  scaffolding/


.. note:: ユーザバージョンのファイルがフォルダ内にある場合には、最初にそれらのコピーを取っておいてください。



Step 2: database.php ファイルのアップグレード
=============================================

application/config/database.php
を開いて、以下の新しい要素を追加してください:


::

	
	$db['default']['cache_on'] = FALSE;
	$db['default']['cachedir'] = '';




Step 3: config.php ファイルのアップグレード
===========================================

application/config/config.php ファイルを開いて、以下の新しい要素を
追加 してください:


::

	
	/*
	|--------------------------------------------------------------------------
	| Class Extension Prefix
	|--------------------------------------------------------------------------
	|
	| This item allows you to set the filename/classname prefix when extending
	| native libraries. For more information please see the user guide:
	|
	| http://codeigniter.com/user_guide/general/core_classes.html
	| http://codeigniter.com/user_guide/general/creating_libraries.html
	|
	*/
	$config['subclass_prefix'] = 'MY_';
	
	/*
	|--------------------------------------------------------------------------
	| Rewrite PHP Short Tags
	|--------------------------------------------------------------------------
	|
	| If your PHP installation does not have short tag support enabled CI
	| can rewrite the tags on-the-fly, enabling you to utilize that syntax
	| in your view files.  Options are TRUE or FALSE (boolean)
	|
	*/
	$config['rewrite_short_tags'] = FALSE;


同じファイルにある、以下の要素を 削除 してください:


::

	
	/*
	|--------------------------------------------------------------------------
	| Enable/Disable Error Logging
	|--------------------------------------------------------------------------
	|
	| If you would like errors or debug messages logged set this variable to
	| TRUE (boolean). Note: You must set the file permissions on the "logs" folder
	| such that it is writable.
	|
	*/
	$config['log_errors'] = FALSE;


エラーのロギングは、現在しきい値をゼロに設定する事で無効になります。



Step 4: メインの index.php ファイルのアップグレード
===================================================

元の index.php
ファイルをそのまま利用しているなら、それを単に置き換えてください。

もし index.php ファイル内部に変更を加えているなら、それらの変更を新し
いファイルに追加して利用してください。



Step 5: ユーザガイドの更新
==========================

また、ユーザガイドのローカルコピーを新しいバージョンのものに置き換えて
ください。

