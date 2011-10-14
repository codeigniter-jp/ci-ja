################
語形変換ヘルパー
################

語形変換ヘルパーのファイルには、語句を複数形、単数形、キャメル記法など
に変換できる関数が含まれます。



ヘルパーのロード
================

このヘルパーは次のコードを使ってロードします:

::

	$this->load->helper('inflector');


次の関数が利用できます:



singular()
==========

複数形の単語を単数形に変換します。例:


::

	
	$word = "dogs";
	echo singular($word); // "dog" を返します




plural()
========

単数形の単語を複数形に変換します。例:


::

	
	$word = "dog";
	echo plural($word); // "dogs" を返します


強制的に "es" で終わるようにするには、第2引数に "true" を指定します。

::

	 $word = "pass";
	echo plural($word, TRUE); // "passes" を返します




camelize()
==========

スペースまたはアンダースコアで区切られた語句をキャメル記法に変換します
。例:


::

	
	$word = "my_dog_spot";
	echo camelize($word); // "myDogSpot" を返します




underscore()
============

スペースで区切られた複数の単語を取り出して、アンダースコアでつなぎます
。例:


::

	
	$word = "my dog spot";
	echo underscore($word); // "my_dog_spot" を返します 




humanize()
==========

アンダースコアで区切られた複数の単語を取り出して、スペースでつなぎます
。各単語は大文字ではじめられます。例:


::

	
	$word = "my_dog_spot";
	echo humanize($word); // "My Dog Spot" を返します


