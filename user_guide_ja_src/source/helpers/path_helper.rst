############
パスヘルパー
############

パスヘルパーのファイルは、サーバのファイルパスを操作する関数で構成され
ています。



ヘルパーのロード
================

このヘルパーは次のコードを使ってロードします:

::

	$this->load->helper('path');


次の関数が利用できます:



set_realpath()
==============

パスが存在するかチェックします。この関数はシンボリックリンクか相対的デ
ィレクトリ構造になっていないサーバのパスを返します。オプションの
2番目の引数はパスが存在しないとエラーを返します。


::

	$directory = '/etc/passwd';
	echo set_realpath($directory);
	// "/etc/passwd" を返します
	
	$non_existent_directory = '/path/to/nowhere';
	echo set_realpath($non_existent_directory, TRUE);
	// パスが解決できないとして error を返します
	
	echo set_realpath($non_existent_directory, FALSE);
	// "/path/to/nowhere" を返します
	
	
	




