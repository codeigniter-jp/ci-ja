###################################
2.0.0 から 2.0.1 へのアップグレード
###################################

アップグレードの前には index.php
を静的ページと置き換えてサイトを停止してください。



ステップ 1: CodeIgniter ファイルの更新
======================================

"system" フォルダ内のすべてのファイルとディレクトリを置き換え、そして
index.php ファイルを置き換えます。もし、index.php
に変更を加えている場合、新しい index.php
に再度変更を加える必要があります。

.. note:: もし、これらのフォルダの中のファイルを更新している場合は、必ず最初にコピーを残しておいてください。



ステップ 2: config/mimes.php の置き換え
=======================================

この設定ファイルに MIME タイプが追加されていますので、このファイルを
application/config/mimes.php にコピーしてください。



ステップ 3: デフォルトコントローラへ POST するフォームの確認
============================================================

引数なしで呼び出される form_open()
のデフォルトの動作は、以前はデフォルトコントローラへ POST
されていましたが、現在は、空の action="" を残し、そのフォームは現在の
URL へサブミットします。 もし、デフォルトコントローラへのサブミットを
期待する場合、以下のコードは:


::

	echo form_open(); //<form action="" method="post" accept-charset="utf-8">


/ か base_url() を使うように変更が必要です:


::

	echo form_open('/'); //<form action="http://example.com/index.php/" method="post" accept-charset="utf-8">
	echo form_open(base_url()); //<form action="http://example.com/" method="post" accept-charset="utf-8">


