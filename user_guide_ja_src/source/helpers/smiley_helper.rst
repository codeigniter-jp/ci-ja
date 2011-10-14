##################
スマイリーヘルパー
##################

スマイリーヘルパーのファイルは、スマイリー (顔文字)
を管理できる関数で構成されています。



ヘルパーのロード
================

このヘルパーは次のコードを使ってロードします:

::

	$this->load->helper('smiley');




概要
====

スマイリーヘルパーは、 :-) [ 訳注: 日本の顔文字の（＾＾）に相当 ]
のようなプレーンテキストの顔文字をもとに、
のような画像の表現に変換して描画します。

また、クリックしたときにフォームフィールドに挿入できる顔文字画像のセッ
トも表示できます。 たとえば、ユーザがコメントをつけられるブログを作成
しているとき、顔文字のセットをコメントフォームの下に表示させることがで
きます。 ユーザはセットしたい顔文字をクリックでき、JavaScript
で選択した顔文字がフォームフィールドに置かれます。



クリッカブルスマイリーのチュートリアル
======================================

以下は、フォームフィールドの下にクッリクできる顔文字を作成する方法を説
明した例です。このサンプルでは、 まず、顔文字の画像をダウンロードして
インストールする必要があります。そのあと、説明通りにコントローラとビュ
ーを作成します。

重要: 始める前に、 `顔文字をダウンロード
<http://codeigniter.com/download_files/smileys.zip>`_ して、 サーバの
パブリックにアクセスできる場所に設置してください。また、このヘルパーは
、 application/config/smileys.php
にある顔文字置き換え設定の配列が必要になります



コントローラ
~~~~~~~~~~~~

application/controllers/ フォルダの中に、 smileys.php
という名前のファイルを作成し、その中に下のコードを書いて下さい。

重要: get_clickable_smileys() 関数で、URL を smiley
フォルダの場所を指すように変更します。

スマイリーヘルパーのほか、 :doc:`HTML テーブルクラス
<../libraries/table>` を使っているのがわかると思います。


::

	
	<?php
	
	class Smileys extends CI_Controller {
	
		function __construct()
		{
			parent::__construct();
		}
	
		function index()
		{
			$this->load->helper('smiley');
			$this->load->library('table');
	
			$image_array = get_clickable_smileys('http://example.com/images/smileys/', 'comments');
	
			$col_array = $this->table->make_columns($image_array, 8);
	
			$data['smiley_table'] = $this->table->generate($col_array);
	
			$this->load->view('smiley_view', $data);
		}
	
	}
	?>


application/views/ フォルダの中に、 smiley_view.php
という名前のファイルを作成し、その中に下記のコードを書いてください:


::

	
	<html>
	<head>
	<title>Smileys</title>
	
	<?php echo smiley_js(); ?>
	
	</head>
	<body>
	
	<form name="blog">
	<textarea name="comments" id="comments" cols="40" rows="4"></textarea>
	</form>
	
	<p>Click to insert a smiley!</p>
	
	<?php echo $smiley_table; ?>
	
	</body>
	</html>


上のコントローラとビューを作成したら、次の URL
を訪問して読み込んでください http://www.example.com/index.php/smileys/



フィールドの別名
~~~~~~~~~~~~~~~~

ビューへの変更を行う際に、コントローラにフィールド ID を持たせていては
扱いにくい場合があります。このような問題に対処するため、
ビューの中の特定の ID に関連づけようとしているスマイリーリンクに、一般
的な名前を付けることができます。

::

	$image_array = get_smiley_links("http://example.com/images/smileys/", "comment_textarea_alias");


別名をフィールド ID にマッピングするには、smiley_js
関数に、それら両方を渡します：

::

	$image_array = smiley_js("comment_textarea_alias", "comments");




関数リファレンス
################



get_clickable_smileys()
=======================

クッリク可能なリンクで囲まれた顔文字画像の配列を返します。顔文字画像の
フォルダの URL と、 フィールドの ID か別名を指定する必要があります:


::

	$image_array = get_smiley_links("http://example.com/images/smileys/", "comment");


.. note:: js_insert_smiley と組み合わせて使う、第2引数を用いないこの関数の利用方法は、非推奨になりました。



smiley_js()
===========

顔文字画像をクリックし、フォームフィールドに挿入可能にする JavaScript
を生成します。 スマイリーリンクを生成する際に、ID
の代わりに別名を指定する場合、 関数に、別名とそれに関連するフォーム ID
を渡す必要があります。 この関数は、Web ページの <head>
領域に設置するように設計されています。


::

	<?php echo smiley_js(); ?>


.. note:: この関数は、非奨励となった js_insert_smiley の代わりになります。


parse_smileys()
===============

テキストを入力として、プレーンテキストの顔文字を同じ種類の画像の顔文字
に変換します。 第1引数には文字列を、第2引数には顔文字画像のフォルダの
URL を指定する必要があります:


::

	
	$str = 'Here are some simileys: :-)  ;-)';
	
	$str = parse_smileys($str, "http://example.com/images/smileys/");
	
	echo $str;


Previous Topic: :doc:`セキュリティヘルパー <security_helper>`
