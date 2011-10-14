########
共通関数
########

CodeIgniter にはグローバルで定義された関数がいくつか存在し、ライブラリ
やヘルパーをロードすること無くどの場所でも使うことができます。



is_php(' version_number ')
==========================

is_php() は、 version_number で指定したバージョン以降の PHP
が利用されているかを判定します。


::

	if (is_php('5.3.0'))
	{
	    $str = quoted_printable_encode($str);
	}


指定したバージョンと同じかそれ以降のバージョンの PHP
がインストールされていれば、ブール値の TRUE
を返します。指定したバージョン未満の PHP がインストールされていれば、
FALSE を返します。



is_really_writable(' path/to/file ')
====================================

is_writable() は、Windows サーバーの場合、OS
が本当はファイルに書けないのだけれども OS が PHP
に書き込み可能と言ってきたときに TRUE を返し、read-only
属性がマークされている場合だけ FALSE を返します。この関数は本当にその
ファイルに書き込みができるのかどうかを、実際にファイルに書き込みをして
みて判断します。この関数は書き込み情報が当てにならない OS
の場合のみ使うようにしてください。


::

	if (is_really_writable('file.txt'))
	{
	    echo "書きたい時に書き込みができます";
	}
	else
	{
	    echo "ファイルに書き込みはできません";
	}




config_item(' item_key ')
=========================

:doc:`設定(Config)ライブラリ <../libraries/config>`
に設定情報を入れておくことが推奨されていますが、config_item() を使って
1つだけのキーを使って取得することも可能です。設定ライブラリに詳細があ
ります。


show_error(' message '), show_404(' page '), log_message(' level ', '
message ')
==========

これらの詳細は :doc:`エラーの処理 <errors>` ページにあります。



set_status_header( code , ' text ');
====================================

サーバが返す HTTP
レスポンスヘッダのステータスを手動でセットできます。例:


::

	set_status_header(401);
	// ヘッダは Unauthorized に設定されます


`すべての HTTP レスポンスヘッダの一覧
<http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html>`_
をご覧ください。



remove_invisible_characters( $str )
===================================

Java\0script のように、文字列にヌル文字が混入されるのを防ぎます。



html_escape( $mixed )
=====================

この関数は htmlspecialchars() 関数へのショートカットです。文字列と配列
を受けとります。クロスサイトスクリプティング(XSS)を防ぐために、とても
便利です。

