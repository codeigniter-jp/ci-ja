###############################
1.2 から 1.3 へのアップグレード
###############################

.. note:: このページは、バージョン 1.2 向けです。 それ以外のバージョンをお使いなら、まず最初にアップグレードしてください。

アップデートを行う前に、index.php ファイルを静的ページに置き換えて、
オフラインにする必要があります。



Step 1: CodeIgniterファイルのアップデート
=========================================

"system" フォルダの以下のファイルとディレクトリを新しいバージョンのも
のに置き換えてください:

.. note:: ユーザバージョンのファイルがフォルダ内にある場合には、最初にそれらのコピーを取っておいてください。


-  application/ models / (1.3 用の新しいディレクトリ)
-  codeigniter (1.3 用の新しいディレクトリ)
-  drivers
-  helpers
-  init
-  language
-  libraries
-  plugins
-  scaffolding




Step 2: エラーファイルのアップデート
====================================

バージョン 1.3 では、エラー表示用に2つの新しいテンプレートが
application/errors に配置されており、
一貫性を保つ為に他のエラー用テンプレートは名前が変更されました。

もしエラー用テンプレートをカスタマイズして いない 場合は、
単純にこのフォルダを置き換えてください:


-  application/errors/


もしエラー用テンプレートをカスタマイズして いる
場合は、以下のように名前を変更してください:


-  404.php = error_404.php
-  error.php = error_general.php
-  error_db.php (新しいファイル)
-  error_php.php (新しいファイル)




Step 3: index.php ファイルのアップデート
========================================

index.php ファイル(アプリケーションのルートディレクトリにあります)を開
いてください。そのファイルの最下部にある、以下の箇所を変更します:


::

	require_once BASEPATH.'libraries/Front_controller'.EXT;


このように変更してください:


::

	require_once BASEPATH.'codeigniter/CodeIgniter'.EXT;




Step 4: config.php ファイルのアップデート
=========================================

application/config/config.php
ファイルを開いて、以下の要素を追加してください:


::

	
	/*
	|------------------------------------------------
	| URL suffix
	|------------------------------------------------
	|
	| This option allows you to add a suffix to all URLs.
	| For example, if a URL is this:
	|
	| example.com/index.php/products/view/shoes
	|
	| You can optionally add a suffix, like ".html",
	| making the page appear to be of a certain type:
	|
	| example.com/index.php/products/view/shoes.html
	|
	*/
	$config['url_suffix'] = "";
	
	
	/*
	|------------------------------------------------
	| Enable Query Strings
	|------------------------------------------------
	|
	| By default CodeIgniter uses search-engine and
	| human-friendly segment based URLs:
	|
	| example.com/who/what/where/
	|
	| You can optionally enable standard query string
	| based URLs:
	|
	| example.com?who=me=something=here
	|
	| Options are: TRUE or FALSE (boolean)
	|
	| The two other items let you set the query string "words"
	| that will invoke your controllers and functions:
	| example.com/index.php?c=controller=function
	|
	*/
	$config['enable_query_strings'] = FALSE;
	$config['controller_trigger'] = 'c';
	$config['function_trigger'] = 'm';




Step 5: database.php ファイルのアップデート
===========================================

application/config/database.php
ファイルを開いて、以下の要素を追加してください:


::

	
	$db['default']['dbprefix'] = "";
	$db['default']['active_r'] = TRUE;




Step 6: ユーザガイドの更新
==========================

また、ユーザガイドのローカルコピーを新しいバージョンのものに置き換えて
ください。

