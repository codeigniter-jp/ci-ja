##############
文字列ヘルパー
##############

文字列ヘルパーの中身は、文字列を処理するのに
役立つ関数です。

.. contents:: Page Contents

ヘルパーのロード
================

このヘルパーは次のコードを使ってロードします:

::

	$this->load->helper('string');

次の関数が利用できます:

random_string()
===============

指定したタイプとサイズのランダムな文字列を生成します。パスワードを作成
したり、ランダムなハッシュ値を生成したりするのに役立ちます。

第1引数には文字列のタイプを指定し、第2引数には文字列のサイズ (文字数)
を指定します。次の選択肢が使えます:

alpha, alunum, numeric, nozero, unique, md5, encrypt and sha1

-  **alpha** : 大文字小文字の文字列。
-  **alnum** : 大文字小文字の英数字。
-  **numeric** : 数字文字列。
-  **nozero** : ゼロ以外の数字文字列。
-  **unique** : MD5 と uniqid() での暗号化。 Note: このタイプにはサイズのパ
   ラメータは存在しません。
   固定長の32文字の文字列を返します。
-  **sha1** : :doc:`セキュリティヘルパー <security_helper>` の do_hash()
   に基づいた暗号化された乱数。

使用例です:

::

	echo random_string('alnum', 16);

increment_string()
==================

番号を付加する、または増やすことで、文字列を増加させます。"コピー" ま
たはファイル、ユニークなタイトルかスラッグを持たせたデータベースのコン
テンツの複製に便利です。

使用例です:

::

	echo increment_string('file', '_'); // "file_1"
	echo increment_string('file', '-', 2); // "file-2"
	echo increment_string('file-4'); // "file-5"

alternator()
============

ループの中でローテーションで使うように、2つ以上の文字列を入れ替え可能
にします。例:

::

	for ($i = 0; $i < 10; $i++)
	{
	    echo alternator('string one', 'string two');
	}

必要な数だけ追加でき、
各ループで繰り返す度に次の項目が返ります。

::

	for ($i = 0; $i < 10; $i++)
	{     
		echo alternator('one', 'two', 'three', 'four', 'five');
	}

.. note:: この関数を複数回に分けて呼び出すとき、再度初期化するために、
	一度、引数なしでこの関数を呼び出してください。

repeater()
==========

渡したデータのコピーを繰り返し生成します。例:

::

	$string = "\n"; echo repeater($string, 30);

上の例では、30の新しい行が生成されます。

reduce_double_slashes()
=======================

http:// のダブルスラッシュを除いて、文字列中のダブルスラッシュをシング
ルスラッシュに変換します。例:

::

	$string = "http://example.com//index.php";
	echo reduce_double_slashes($string); // "http://example.com/index.php" を返します

trim_slashes()
==============

文字列から、先頭と末尾のスラッシュを除去します。例:

::

	$string = "/this/that/theother/";
	echo trim_slashes($string); // this/that/theother を返します


reduce_multiples()
==================

連続した文字を縮約します。
例::

	$string="Fred, Bill,, Joe, Jimmy";
	$string=reduce_multiples($string,","); // "Fred, Bill, Joe, Jimmy" を返します

次の引数を指定することができます。

::

	reduce_multiples(string: 対象文字列, string: 縮約文字, boolean: 先頭と末尾の縮約文字を削除するかどうか)

第1引数は縮約文字を含む文字列を指定します。第2引数は縮約文字を指定しま
す。第3引数はデフォルトでは FALSE が指定されます。 TRUE
を指定した場合は先頭と末尾にある縮約文字が削除されます。
例:

::

	$string=",Fred, Bill,, Joe, Jimmy,";
	$string=reduce_multiples($string,",",TRUE); // "Fred, Bill, Joe, Jimmy" を返します



quotes_to_entities()
====================

文字列の中のシングルおよびダブルクオートを HTML 文字参照に変換します。
例:

::

	$string="Joe's \"dinner\"";
	$string=quotes_to_entities($string); // "Joe's "dinner"" を返します

strip_quotes()
==============

文字列からシングルおよびダブルクオートを除去します。例::

	$string="Joe's \"dinner\"";
	$string=strip_quotes($string); // "Joes dinner" を返します

