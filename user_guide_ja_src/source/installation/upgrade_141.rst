###################################
1.3.3 から 1.4.0 へのアップグレード
###################################

.. note:: このページは、バージョン 1.4.0 向けです。それ以外のバージョンをお使いなら、まず最初にアップグレードしてください。

アップグレードを行う前に、index.phpファイルを静的ページに置き換えて、
オフラインにする必要があります。



Step 1: CodeIgniter ファイルのアップグレード
============================================

"system" フォルダの以下のファイルとディレクトリを新しいバージョンのも
のに置き換えてください:

.. note:: ユーザバージョンのファイルがフォルダ内にある場合には、最初にそれらのコピーを取っておいてください。


-  codeigniter
-  drivers
-  helpers
-  libraries




Step 2: config.php ファイルのアップグレード
===========================================

application/config/config.php
ファイルを開いて、以下の要素を追加してください:


::

	
	
	/*
	|--------------------------------------------------------------------------
	| Output Compression
	|--------------------------------------------------------------------------
	|
	| Enables Gzip output compression for faster page loads. When enabled,
	| the output class will test whether your server supports Gzip.
	| Even if it does, however, not all browsers support compression
	| so enable only if you are reasonably sure your visitors can handle it.
	|
	| VERY IMPORTANT: If you are getting a blank page when compression is enabled it
	| means you are prematurely outputting something to your browser. It could
	| even be a line of whitespace at the end of one of your scripts. For
	| compression to work, nothing can be sent before the output buffer is called
	| by the output class. Do not "echo" any values with compression enabled.
	|
	*/
	$config['compress_output'] = FALSE;
	




Step 3: Autoload 要素の名前変更
===============================

次のファイルを開いてください: application/config/autoload.php

以下の配列要素を探します:


::

	$autoload['core'] = array();


上記を以下のように変更します:


::

	$autoload['libraries'] = array();


この変更は、ユーザ独自のライブラリをオートロードできることを明確にする
ためになされました。



Step 4: ユーザガイドの更新
==========================

また、ユーザガイドのローカルコピーを新しいバージョンのものに置き換えて
ください。

