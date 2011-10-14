##################
CodeIgniter の URL
##################

CodeIgniter のデフォルトの URL
は、検索エンジンにも人間にもわかりやすいように設計されています。 動的
システムの代名詞といえる一般的な"クエリ文字列"アプローチを採用する代わ
りに、CodeIgniter では次のような セグメントベースアプローチ
を採用しています:


::

	example.com/news/article/my_article


.. note:: 後述するように、クエリ文字列をURLで使用することもできます。


URI セグメント
==============

Model-View-Controller アプローチに従うと、URL
の中では、セグメントは大抵次のように表現されます:


::

	example.com/class/function/ID



#. 最初のセグメントは呼び出すべきコントローラ クラス をあらわします。
#. 2番目のセグメントは、クラスの呼び出されるべき 関数
   またはメソッドをあらわします。
#. 3番目以降のセグメントは、コントローラに渡される ID
   などの値をあらわします。


:doc:`URI クラス <../libraries/uri>` と :doc:`URL ヘルパー
<../helpers/url_helper>` には URI
データを簡単に扱うためのメソッドが用意されています。 さらに、
:doc:`URI ルーティング <routing>` 機能を用いれば、より柔軟に URL
を再マッピングすることができます。



index.php ファイルをURLから除去する
===================================

初期状態では、 index.php ファイルが URL
の中に含まれる格好になっています:


::

	example.com/index.php/news/article/my_article


単純なルールを記述した .htaccess
ファイルを使えば、簡単にこれを取り除くことができます。 特定の項目を除
くすべてがリダイレクトされるという、「除外」ルールを用いた方法を使った
ファイルの例です:


::

	RewriteEngine on
	RewriteCond $1 !^(index\.php|images|robots\.txt)
	RewriteRule ^(.*)$ /index.php/$1 [L]


上の例では、index.php、images、および robots.txt 以外のあらゆる HTTP
リクエストは、 index.php ファイルへのリクエストとして取り扱われます。



URL サフィックス(接尾辞)の追加
==============================

config/config.php ファイルの中で、CodeIgniter で生成されるすべての URL
に付加されるサフィックス(接尾辞)を指定することができます。
たとえば、URL が次のようなものだったとき:


::

	example.com/index.php/products/view/shoes


ページを何かの種類に見せかけるために、オプションで .html
などのサフィックスを追加することができます:


::

	example.com/index.php/products/view/shoes.html




クエリ文字列の有効化
====================

URL に次のようなクエリ文字列を使用したい場面もあると思います:


::

	index.php?c=products&m=view&id=345


CodeIgniter ではオプションでこのようなことにも対応しています。
この機能は、 application/config.php ファイルで有効にすることができます
。設定ファイルを開くと次のような項目があると思います:


::

	$config['enable_query_strings'] = FALSE;
	$config['controller_trigger'] = 'c';
	$config['function_trigger'] = 'm';


"enable_query_strings" を TRUE
に変更すると、この機能が有効になります。
次の例のように、コントローラとメソッドを呼び出すために
"トリガ(trigger)"に指定した語句 [ 訳注:
この例では、「c」と「m」。上の設定の $config['controller_trigger']
などのところで指定している語句 ]
を使ってコントローラとメソッドにアクセスします:


::

	index.php?c=controller&m=method


Please note: クエリ文字列を使用している場合は、 セグメントベースの URL
で機能するように設計されている URL
ヘルパー(それと、フォームヘルパーなどの URL
を生成するヘルパー)で便利に利用できる機能が使えないので、 かわりに URL
を自分で組み立てる必要があります。

