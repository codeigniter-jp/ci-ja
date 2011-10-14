############
数字ヘルパー
############

数字ヘルパーのファイルの中身は、数字データを扱うのに役立つ関数です。



ヘルパーのロード
================

このヘルパーは次のコードを使ってロードします:

::

	$this->load->helper('number');


次の関数が利用できます:



byte_format()
=============

サイズに基づいて、バイト (bytes)
としての数字をフォーマットして、適切な接尾語を加えます。 例:


::

	
	echo byte_format(456); // 456 Bytes を返す
	echo byte_format(4567); // 4.5 KB を返す
	echo byte_format(45678); // 44.6 KB を返す
	echo byte_format(456789); // 447.8 KB を返す
	echo byte_format(3456789); // 3.3 MB を返す
	echo byte_format(12345678912345); // 1.8 GB を返す
	echo byte_format(123456789123456789); // 11,228.3 TB を返す


オプションの第2引数で、結果の精度を指定出来ます。


::

	
	echo byte_format(45678, 2); // 44.61 KB を返す


.. note:: この関数によって生成されたテキストは次の言語ファイルにあります:language/ /number_lang.php

