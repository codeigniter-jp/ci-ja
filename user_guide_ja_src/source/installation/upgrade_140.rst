###################################
1.3.3 から 1.4.0 へのアップグレード
###################################

.. note:: このページは、バージョン 1.3.3 向けです。 それ以外のバージョンをお使いなら、まず最初にアップグレードしてください。

アップグレードを行う前に、index.phpファイルを静的ページに置き換えて、
オフラインにする必要があります。



Step 1: CodeIgniter ファイルのアップグレード
============================================

"system" フォルダの以下のファイルとディレクトリを新しいバージョンのも
のに置き換えてください:

.. note:: ユーザバージョンのファイルがフォルダ内にある場合には、最初にそれらのコピーを取っておいてください。


-  application/config/ hooks.php
-  application/config/ mimes.php
-  codeigniter
-  drivers
-  helpers
-  init
-  language
-  libraries
-  scaffolding




Step 2: config.php ファイルのアップグレード
===========================================

application/config/config.php
ファイルを開いて、以下の要素を追加してください:


::

	
	
	/*
	|--------------------------------------------------------------------------
	| Enable/Disable System Hooks
	|--------------------------------------------------------------------------
	|
	| If you would like to use the "hooks" feature you must enable it by
	| setting this variable to TRUE (boolean). See the user guide for details.
	|
	*/
	$config['enable_hooks'] = FALSE;
	
	
	/*
	|--------------------------------------------------------------------------
	| Allowed URL Characters
	|--------------------------------------------------------------------------
	|
	| This lets you specify which characters are permitted within your URLs.
	| When someone tries to submit a URL with disallowed characters they will
	| get a warning message.
	|
	| As a security measure you are STRONGLY encouraged to restrict URLs to
	| as few characters as possible. By default only these are allowed: a-z 0-9~%.:_-
	|
	| Leave blank to allow all characters -- but only if you are insane.
	|
	| DO NOT CHANGE THIS UNLESS YOU FULLY UNDERSTAND THE REPERCUSSIONS!!
	|
	*/
	$config['permitted_uri_chars'] = 'a-z 0-9~%.:_-';




Step 3: ユーザガイドの更新
==========================

また、ユーザガイドのローカルコピーを新しいバージョンのものに置き換えて
ください。

