###############################################
1.0(ベータ) から 1.1(ベータ) へのアップグレード
###############################################

1.1(ベータ)
にアップグレードするには、以下のステップを実行してください:



Step 1: index ファイルの置き換え
================================

メインの index.php ファイルを新しい index.php
ファイルに置き換えてください。 Note: "system"フォルダの名前を変更して
いる場合は、その情報を新しいファイルに書き込んでください。



Step 2: config フォルダの移動
=============================

このバージョンの CodeIgniter は、複数の"applications"が1つのバックエン
ドファイルを共有する事を許可しています。
各アプリケーションは自身の設定情報を持っており、 その config
ディレクトリが application
フォルダ内になくてはいけませんので、それらをそこへ移動してください。



Step 3: ディレクトリの置き換え
==============================

以下のディレクトリを新しいバージョンのものに置き換えてください:


-  drivers
-  helpers
-  init
-  libraries
-  scaffolding




Step 4: calendar 言語ファイルの追加
===================================

language フォルダに、新しいカレンダークラスに対応した新たな言語ファイ
ルを追加する必要があります。 以下のファイルを追加してください:
language/english/calendar_lang.php



Step 5: config ファイルの編集
=============================

オリジナルの application/config/config.php には記述ミスがありますので
、ファイル内のcookieに関連する項目を探してください:


::

	$conf['cookie_prefix']	= "";
	$conf['cookie_domain']	= "";
	$conf['cookie_path']	= "/";


以下のように、配列の変数名を $conf から $config に変更してください:


::

	$config['cookie_prefix']	= "";
	$config['cookie_domain']	= "";
	$config['cookie_path']	= "/";


最後に、 config ファイルに以下の新しい要素を追加してください
(必要であればオプションを編集してください):


::

	
	/*
	|------------------------------------------------
	| URI PROTOCOL
	|------------------------------------------------
	|
	| This item determines which server global 
	| should be used to retrieve the URI string. The 
	| default setting of "auto" works for most servers.
	| If your links do not seem to work, try one of 
	| the other delicious flavors:
	| 
	| 'auto'			Default - auto detects
	| 'path_info'		Uses the PATH_INFO 
	| 'query_string'	Uses the QUERY_STRING
	*/
	
	$config['uri_protocol']	= "auto";


