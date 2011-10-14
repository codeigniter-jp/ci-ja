############
URL ヘルパー
############

URL ヘルパーのファイルには、URL
を処理するのを支援する関数が含まれます。



ヘルパーのロード
================

このヘルパーは次のコードでロードできます:

::

	$this->load->helper('url');


次の関数が利用可能です:



site_url()
==========

設定ファイルで指定されているサイトの URL を返します。 index.php
ファイル (または、設定ファイルで設定しているユーザサイトの index_page
) が URL に追加され、この関数に渡された URI
セグメントと設定ファイルで指定された url_suffix が追加されます。

ローカルの(サイト内の) URL
を生成する必要がある時は、いつもこの関数を使うようおすすめします。
この関数を使うと、URL が変更になった時でも、移植性が高まります。

オプションで、セグメントを文字列または配列としてこの関数に渡すことがで
きます。下記は文字列での例です:


::

	echo site_url("news/local/123");


上の例では、次のようなものが返されます:
http://example.com/index.php/news/local/123

次は、配列でセグメントを渡す例です:


::

	
	$segments = array('news', 'local', '123');
	
	echo site_url($segments);




base_url()
==========

設定ファイルで指定されているサイトのベース URL を返します。例:

::

	echo base_url();


この関数は index_page がないことと、また、 url_suffix
が追加されること以外は site_url() と同じ結果を返します。

また site_url() のように、セグメントを文字列または配列として、この関数
に渡すことができます。下記は文字列での例です:


::

	echo base_url("blog/post/123");


上の例では、次のようなものが返されます:
http://example.com/blog/post/123

この関数は site_url() とは違い、画像やスタイルシートなどのファイルへの
文字列を渡すことができるのが便利です。例:


::

	echo base_url("images/icons/edit.png");


上の例では、次のようなものが返されます:
http://example.com/images/icons/edit.png



current_url()
=============

現在表示されているページの完全な URL (セグメントを含む) を返します。



uri_string()
============

この関数が呼び出されたページの URI セグメントを返します。たとえば、URL
が以下のようなものであれば:

::

	http://some-site.com/blog/comments/123


この関数は次のような値を返します:

::

	/blog/comments/123




index_page()
============

設定ファイルで指定されているサイトの "index" ページを返します。例:

::

	echo index_page();




anchor()
========

サイトの URL にもとづいて、標準の HTML アンカーリンクを生成します:


::

	<a href="http://example.com">Click Here</a>


このコードには、3つのオプションの引数があります:


::

	anchor(uri segments, text, attributes)


第1引数は、URL に追加したいセグメントを指定します。 上の site_url()
関数のように、文字列または、配列でセグメントを指定します。

.. note:: アプリケーション内部のリンクを生成するときは、ベースURL(http://...) を含まないようにしてください。
設定ファイルで指定されている情報から、ベース URL
は自動的に追加されます。URL に追加したい URI
セグメントだけを含めるようにしてください。

第2引数は、リンクに指定したいテキストになります。空のままにしておくと
、URL が使用されます。

第3引数はリンクタグに追加したい属性のリストを指定できます。属性は、文
字列または、連想配列で指定します。

いくつか例を挙げます:


::

	echo anchor('news/local/123', 'ニュース', 'title="ニュースタイトル"');


上のコードは次の HTML を生成します: <a
href="http://example.com/index.php/news/local/123"
title="ニュースタイトル">ニュース</a>


::

	echo anchor('news/local/123', 'ニュース', array('title' => 'ベストニュース！'));


上のコードは次の HTML を生成します: <a
href="http://example.com/index.php/news/local/123"
title="べストニュース！">ニュース</a>



anchor_popup()
==============

新しいウィンドで URL を開くこと以外は、 anchor()
関数とほとんど同じです。
ウィンドウの開き方をコントロールするために、JavaScript の window
オブジェクトの属性(プロパティ)を第3引数で指定できます。 第3引数が設定
されていない場合は、ユーザのブラウザの設定により新しいウィンドウを開き
ます。 下記は、属性を指定する場合の例です:


::

	
	
	$atts = array(
	              'width'      => '800',
	              'height'     => '600',
	              'scrollbars' => 'yes',
	              'status'     => 'yes',
	              'resizable'  => 'yes',
	              'screenx'    => '0',
	              'screeny'    => '0'
	            );
	
	echo anchor_popup('news/local/123', 'Click Me!', $atts);


.. note:: 上の属性は、この関数の初期値になりますので、これと異なる値にしたい箇所を設定するだけで構いません。 すべての属性に初期値を使用する場合
は、単に第3引数に空の配列を渡してください:


::

	echo anchor_popup('news/local/123', 'Click Me!', array());




mailto()
========

標準の HTML メールリンクを作成します。使用例:


::

	echo mailto('me@my-site.com', 'コンタクトするにはここをクリック');


上の anchor() 関数のように、第3引数で属性を指定できます。



safe_mailto()
=============

この関数は、スパムロボットにメールアドレスが収集されてしまうのを防ぐた
め、メールアドレスのリンクを JavaScript で書き出すために、
序数を使った難読化バージョンの mailto
タグを書き出します。この点を除いて、上の関数と同じです。



auto_link()
===========

自動で、文字列に含まれる URL とメールアドレスをリンクに変換します。例:


::

	$string = auto_link($string);


第2引数は、URL とメールアドレスのどちらを変換するか、あるいは両方を変
換するかを指定します。
指定しない場合、デフォルトでは両方を変換するようになっています。Email
リンクは上にあるように safe_mailto() を使ってエンコードされます。

URL のみを変換する場合は:

::

	$string = auto_link($string, 'url');


メールアドレスのみを変換する場合は:

::

	$string = auto_link($string, 'email');


第3引数は、リンクを新しいウィンドウで開くかどうかを指定します。値は、T
RUE または FALSE (ブール値) になります:

::

	$string = auto_link($string, 'both', TRUE);




url_title()
===========

入力として文字列をとり、人間にわかりやすい URL 文字列を生成します。
これはたとえば、ブログを作成していたとして、その中で記事のタイトルを
URL に使いたいときなどに役立ちます。例:


::

	$title = "What's wrong with CSS?";
	
	$url_title = url_title($title);
	
	// 次のコードを生成します: Whats-wrong-with-CSS


第2引数で、単語の区切りを決めます。初期状態では、ダッシュ ( "-" )
が使用されます。次のオプションが選べます: dash または underscore :


::

	$title = "What's wrong with CSS?";
	
	$url_title = url_title($title, 'underscore');
	
	// 次のコードを生成します: Whats_wrong_with_CSS


第3引数で、文字列を強制的に小文字に変換するかどうかを決めます。デフォ
ルトでは変換されません。次のオプション (ブール値) が選べます: TRUE /
FALSE :


::

	$title = "What's wrong with CSS?";
	
	$url_title = url_title($title, 'underscore', TRUE);
	
	// 次のコードを生成します: whats_wrong_with_css




prep_url()
~~~~~~~~~~

この関数は、与えられた URL の文字列にスキーマがない場合に http://
を追加します。次のように URL の文字列を渡します:

::

	
	$url = "example.com";
	$url = prep_url($url);




redirect()
==========

指定した URI に対して "ヘッダ リダイレクト" します。フル URL
(http://...) を指定しても生成されますが、
ローカルのリンクなら単にコントローラのセグメントから指定します。URL
は設定ファイルの値を元に生成されます。

オプションの第2引数で "location" (デフォルト) を使う方法か "refresh"
を使う方法かを選べます。Location は高速ですが、Windows
サーバでは時々問題を起こします。オプションの第3引数では送りたい HTTP
Response Code を指定することができます。 たとえば検索エンジンが起こし
た301リダイレクトを送ることができます。デフォルトの Response Code
は302です。第3引数は "location" * だけで*使え、"refresh"
では使えません。例です:


::

	if ($logged_in == FALSE)
	{
	     redirect('/login/form/', 'refresh');
	} 
	 
	// 301リダイレクトの場合 
	redirect('/article/13', 'location', 301);


.. note:: この関数はサーバのヘッダを利用するので、動作させるにはブラウザに何かを出力する前に、この関数を使う必要があります。
.. note:: とても細かいヘッダのコントロールを行う場合は、 :doc:`出力クラス<../libraries/output>` の set_header() メソッドを使うべきです。

