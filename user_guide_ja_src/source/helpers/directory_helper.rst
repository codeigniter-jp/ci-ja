####################
ディレクトリヘルパー
####################

ディレクトリヘルパーのファイルの中身は、ディレクトリを処理するのに役立
つ関数です。



ヘルパーのロード
================

このヘルパーは次のコードを使ってロードします:

::

	$this->load->helper('directory');


次の関数が利用できます:



directory_map(' source directory ')
===================================

この関数を使うと、第1引数で指定されたディレクトリのパスを読み取って、 
そのディレクトリが含んでいるすべてのファイルを配列の形で表現します。例
:


::

	$map = directory_map('./mydirectory/');


.. note:: パスは、index.php ファイルからの相対パスになります。
ディレクトリに含まれるサブフォルダも同様にマップされます。 第2引数
(integer) で再帰的にマップされる階層を指定出来ます。1を指定すると最上
位階層のディレクトリのみマッピングされます。


::

	$map = directory_map('./mydirectory/', 1);


初期設定では、戻り値の配列に隠しファイルは含まれません。
この動作をオーバーライドするには、第3引数に true (ブール値)
を指定します:


::

	$map = directory_map('./mydirectory/', FALSE, TRUE);


各フォルダ名は、配列の添字になり、それらは、数字のインデックスがつけら
れたファイルを含みます。 以下は、典型的な配列の例です:


::

	Array
	(
	   [libraries] => Array
	   (
	       [0] => benchmark.html
	       [1] => config.html
	       [database] => Array
	       (
	             [0] => active_record.html
	             [1] => binds.html
	             [2] => configuration.html
	             [3] => connecting.html
	             [4] => examples.html
	             [5] => fields.html
	             [6] => index.html
	             [7] => queries.html
	        )
	       [2] => email.html
	       [3] => file_uploading.html
	       [4] => image_lib.html
	       [5] => input.html
	       [6] => language.html
	       [7] => loader.html
	       [8] => pagination.html
	       [9] => uri.html
	)


