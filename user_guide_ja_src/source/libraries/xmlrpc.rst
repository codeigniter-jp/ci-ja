###################################
XML-RPC および XML-RPC サーバクラス
###################################

CodeIgniter の XML-RPC クラスを使うと、他のサーバにリクエストを送信し
たり、リクエストを受信するために XML-
RPCサーバをセットアップしたりできます。



XML-RPCとは?
============

インターネット上の2つのコンピュータが対話する方法で非常にシンプルなの
は、XML を使うものです。 クライアント と呼ばれる一方のコンピュータは
、XML-RPC リクエスト を サーバ と呼ばれるもう一方のコンピュータに送信
します。サーバがリクエストを受信し、処理すると、 クライアントに
レスポンス を返します。

たとえば、MetaWeblog API を使う場合、XML-RPC クライアント
(大抵は、デスクトップの投稿ツール) は、 サイトで実行されている XML-RPC
サーバにリクエストを送ります。記事を公開するために、 新しいブログの記
事を作成するリクエストであったり、既存の記事を編集するためのリクエスト
であったりします。 XML-RPC サーバはリクエストを受信すると、リクエスト
を処理するために、どのクラス/メソッドを呼び出せばいいのかを決定します
。 処理されると、サーバはレスポンスメッセージを送り返します。

仕様の詳細については、 `XML-RPC <http://www.xmlrpc.com/>`_
のサイトをみてください。



クラスの初期化
==============

CodeIgniter のほとんどのクラスと同様、XML-RPC および XML-RPCS
クラスは、コントローラの中で $this->load->library
メソッドを使って初期化します:

XML-RPC クラスを読み込むには次のようにします:

::

	$this->load->library('xmlrpc');


一旦読み込まれると、xml-rpc
ライブラリのオブジェクトは、次のようにして利用できます: $this->xmlrpc

XML-RPC Server クラスを読み込むには次のようにします:

::

	
	$this->load->library('xmlrpc');
	$this->load->library('xmlrpcs');


読み込まれると、xml-rpcs
ライブラリのオブジェクトは次のようにして利用できます: $this->xmlrpcs

.. note:: XML-RPC Sever クラスを使うときは、XML-RPC クラスと XML-RPCServer クラスの「両方」を読み込む必要があります。



XML-RPC リクエストの送信
========================

XML-RPC
サーバにリクエストを送信するには、次の情報を指定する必要があります:


-  サーバの URL
-  呼び出したいサーバ上のメソッド
-  *リクエスト* データ (後述)


以下は、 `Ping-o-Matic <http://pingomatic.com/>`_
で、単純にWeblogs.comにPingを送信する基本的な例です。


::

	$this->load->library('xmlrpc');
	
	$this->xmlrpc->server('http://rpc.pingomatic.com/', 80);
	$this->xmlrpc->method('weblogUpdates.ping');
	
	
	$request = array('My Photoblog', 'http://www.my-site.com/photoblog/');
	$this->xmlrpc->request($request);
	
	if ( ! $this->xmlrpc->send_request())
	{
	    echo $this->xmlrpc->display_error();
	}




解説
~~~~

上のコードでは、XML-RPC クラスを初期化し、サーバの URL
と呼び出すメソッド(weblogUpdates.ping)をセットしています。 リクエスト
(この場合は、タイトルと自分のサイトの URL) が送信用に配列に格納され、
request() メソッドを使ってコンパイルされます。
最後に、完全なリクエストが送信されます。 send_request() メソッドが
FALSE を返した場合は、 XML-RPC
サーバから返ってきたエラーメッセージを表示します。



リクエストの詳細
================

リクエスト とは単純に XML-RPC サーバに送信するデータのことです。
リクエストの中の各データは リクエストパラメータ
として参照されます。上の例では、2つのパラメータをもっています:
自分のサイトの URL と タイトルです。XML-RPC
サーバがリクエストを受信したとき、必要なパラメータを探します。

リクエストパラメータは、送信のため、配列に格納する必要があり、
各パラメータは7つのデータ型(文字列、数値、日付 など)
のうちのどれかになります。 パラメータが文字列型以外の場合は、データ型
をリクエストの配列に含める必要があります。

下記は、3つのパラメータの単純な配列の例です:


::

	$request = array('John', 'Doe', 'www.some-site.com');
	$this->xmlrpc->request($request);


文字列でないデータ型のデータや何種類かの異なるデータ型のデータを指定す
るときは、
各パラメータを配列にし、その配列の2番目でデータ型を指定します:


::

	
	$request = array (
	                   array('John', 'string'),
	                   array('Doe', 'string'),
	                   array(FALSE, 'boolean'),
	                   array(12345, 'int')
	                 );
	
	$this->xmlrpc->request($request);

下のデータ型のセクションにデータ型の全リストがあります。


XML-RPC サーバの作成
====================

XML-RPC
サーバは交通整理役として動作し、送信されてくるリクエストを待ち受け、
その処理を行う適切なメソッドへリダイレクトします。

XML-RPC サーバを作成するには、XML-RPC Server クラスを、
送信されてくるリクエストを受け取るコントローラで初期化し、 処理できる
適切なクラス/メソッドに送信されてきたリクエストを送るためにマッピング
を指示した配列をセットアップする必要があります。

次は、説明のための例です:


::

	
	$this->load->library('xmlrpc');
	$this->load->library('xmlrpcs');
	
	$config['functions']['new_post'] = array('function' => 'My_blog.new_entry'),
	$config['functions']['update_post'] = array('function' => 'My_blog.update_entry');
	$config['object'] = $this;
	
	$this->xmlrpcs->initialize($config);
	$this->xmlrpcs->serve();


上のサンプルには、サーバが処理できる2つのメソッドが配列に指定されてい
る箇所があります。 処理できる公開メソッドは、配列の左側になります。メ
ソッドのどちらかのリクエストが受信されると、右側で指定したクラスとメソ
ッドにマッピングされます。

' object '
キーは、インスタンス化されたクラスを渡すための特別なキーです。
これは、あなたがマッピングするメソッドが CodeIgniter
スーパーオブジェクトの一部でない場合に必要となります。

言い換えると、XML-RPC クライアントが new_post
メソッドを呼び出すリクエストを送信した場合、 サーバは My_blog
クラスを読み込み、 new_entry メソッドを呼び出します。 update_post
メソッドを呼び出すリクエストを送信した場合は、 サーバは My_blog
クラスを読み込み、 update_entry メソッドを呼び出します。

上のサンプルのメソッド名には、任意のものを指定できます。サーバで上でど
のように呼ばれるべきかを決めるか、 Blogger や MetaWeblog API
などの標準のAPIを使う場合は、それらのメソッド名にします。

補足的な2つの設定キーがあり、それらは XML-RPC
サーバクラスを初期化するときに使用するものとします: debug に TRUE
をセットすることでデバッグ機能を有効にできます、そして xss_clean
は、FALSE をセットすることで、Security ライブラリの xss_clean
関数を通さずにデータを送信します。



サーバリクエストの処理
======================

XML-RPC サーバがリクエストを受信し、処理のためにクラス/メソッドを読み
込んだとき、 クライアントから送信されたデータを含むオブジェクトとして
、そのメソッドにリクエストが渡されます。

上の例を使うと、 new_post メソッドがリクエストされた場合、
サーバは次のようなクラスがあることを期待します:


::

	class My_blog extends CI_Controller {
	
	    function new_post($request)
	    {
		
	    }
	}


$request 変数は、サーバによってコンパイルされたオブジェクトで、XML-RPC
クライアントによって送信されたデータが含まれます。
このオブジェクトを使って、リクエストの処理を可能にする
*リクエストパラメータ* にアクセスします。 処理が終わったら レスポンス
をクライアントに送り返します。

下は、Blogger API を使った実際のサンプルです。Blogger API
のメソッドには、 getUserInfo() というものがあります。
このメソッドを使うと XML-RPC
クライアントはサーバにユーザ名とパスワードを送信し、 特定ユーザの情報
(ニックネーム、ユーザID、email アドレスなど)
をサーバに送り返してもらうことができます。
以下は、このメソッドを使った処理方法がどのようになるかを示した例です:


::

	class My_blog extends CI_Controller {
	
	    function getUserInfo($request)
	    {
	
	        $username = 'smitty';
	        $password = 'secretsmittypass';
	
	        $this->load->library('xmlrpc');
	    
	        $parameters = $request->output_parameters();
	    
	        if ($parameters['1'] != $username AND $parameters['2'] != $password)
	        {
	            return $this->xmlrpc->send_error_message('100', 'Invalid Access');
	        }
	    
	        $response = array(array('nickname'  => array('Smitty','string'),
	                                'userid'    => array('99','string'),
	                                'url'       => array('http://yoursite.com','string'),
	                                'email'     => array('jsmith@yoursite.com','string'),
	                                'lastname'  => array('Smith','string'),
	                                'firstname' => array('John','string')
	                                ),
	                         'struct');
	
	        return $this->xmlrpc->send_response($response);
	    }
	}




Notes:
~~~~~~

output_parameters() メソッドは、クライアントによって送信されたリクエス
トパラメータに対応する配列を取得します。
上の例では、出力されたパラメータは、ユーザ名とパスワードになります。

クライアントから送信されたユーザ名とパスワードが正しくない場合、
send_error_message() を使ってエラーメッセージを返します。

操作が成功した場合、ユーザ情報が格納された配列がクライアントに返送され
ます。



レスポンスのフォーマット
========================

*リクエスト* と同様、
*レスポンス*も配列でフォーマットされる必要があります。
しかし、リクエストと違って、レスポンスは 項目を一つずつ格納した
配列になります。 配列を構成する項目は、複数の追加の配列からなる配列で
あってもかまいませんが、ルート(プライマリ)の配列は、1次元でなければな
りません。言い換えると、基本的な例は次のようになります:


::

	$response = array('Response data', 'array');


しかし、レスポンスは、通常複数のデータをもっています。これを実現するた
めには、ルート(プライマリ)の配列は、1次元でなければならないので、 レス
ポンスそのものを配列にする必要があります。以下は、どのようにして実現す
るかを示した例です:


::

	
	$response = array (
	                   array(
	                         'first_name' => array('John', 'string'),
	                         'last_name' => array('Doe', 'string'),
	                         'member_id' => array(123435, 'int'),
	                         'todo_list' => array(array('clean house', 'call mom', 'water plants'), 'array'),
	                        ),
	                 'struct'
	                 );


上の配列は struct としてフォーマットされているのを注意してください。こ
れはレスポンスのもっとも一般的なデータ型になります。

リクエストと同様、レスポンスもデータ型のセクションでリストアップされて
いる7つのデータ型のどれかになります。



エラー応答の送信
================

クライアントにエラー応答を送信する必要があるときは、次のようなコードを
使います:


::

	return $this->xmlrpc->send_error_message('123', 'Requested data not available');


第1引数には、エラー番号を、第2引数には、エラーメッセージを指定します。



独自のクライアントとサーバの作成
================================

ここまで見てきた全部を理解するのに役立てるため、XML-RPC クライアントと
サーバとして動作する2つのコントローラを作成してみましょう。 クライアン
トをサーバにリクエストを送信するのに使い、サーバでそのリクエストを受信
します。



クライアント
~~~~~~~~~~~~

テキストエディタを使って xmlrpc_client.php
という名前のコントローラを作成します。 その中に下記のコードを書いて、
applications/controllers/ フォルダに保存します:


::

<?php class Xmlrpc_client extends CI_Controller { function index() {
$this->load->helper('url'); $server_url = site_url('xmlrpc_server');
$this->load->library('xmlrpc'); $this->xmlrpc->server($server_url,
80); $this->xmlrpc->method('Greetings'); $request = array('How is it
going?'); $this->xmlrpc->request($request); if ( !
$this->xmlrpc->send_request()) { echo $this->xmlrpc->display_error();
} else { echo '

::

	';
				print_r($this->xmlrpc->display_response());
				echo '

	'; 		} 	} } ?>


.. note:: 上のコードでは、"url helper" を使っています。 :doc:`ヘルパー関数<../general/helpers>` のページでより詳しい情報を閲覧できます。



サーバ
~~~~~~

テキストエディタを使って、 xmlrpc_server.php
.という名前のファイルを作成します。 その中に、下記のコードを書いて
applications/controllers/ フォルダにそれを保存します:


::

	<?php
	
	class Xmlrpc_server extends CI_Controller {
	
		function index()
		{
			$this->load->library('xmlrpc');
			$this->load->library('xmlrpcs');
	
			$config['functions']['Greetings'] = array('function' => 'Xmlrpc_server.process');
	
			$this->xmlrpcs->initialize($config);
			$this->xmlrpcs->serve();
		}
	
	
		function process($request)
		{
			$parameters = $request->output_parameters();
	
			$response = array(
								array(
										'you_said' => $parameters['0'],
										'i_respond' => 'Not bad at all.'),
								'struct');
	
			return $this->xmlrpc->send_response($response);
		}
	}
	?>




やってみよう!
~~~~~~~~~~~~~

では、次の URL を使ってサイトを表示させてみます:

::

	example.com/index.php/xmlrpc_client/


サーバに送ったメッセージとその応答を見ることができるはずです。

作成したクライアントでは、メッセージ ("How's is going?") を
"Greetings" メソッドを使うリクエストとともにサーバに送信しました。
サーバはそのリクエストを受信して、レスポンスが返送される "process"
メソッドにリクエストをマッピングしました。



リクエストパラメータに連想配列を使用する
========================================

メソッドパラメータに連想配列を使用したい場合は、struct
データタイプを使用する必要があります:


::

	$request = array(
		                 array(
		                       // Param 0
		                       array(
		                             'name'=>'John'
		                            	),
		                             'struct'
		                       ),
		                       array(
		                             // Param 1
		                             array(
		                                  	'size'=>'large',
		                                   'shape'=>'round'
		                                  	),
		                             'struct'
		                       )
		                 );
		$this->xmlrpc->request($request);


サーバでリクエストを処理する際、以下の連想配列を取得できます。


::

	$parameters = $request->output_parameters();
		$name = $parameters['0']['name'];
		$size = $parameters['1']['size'];
		$size = $parameters['1']['shape']; 




XML-RPC メソッドリファレンス
############################



$this->xmlrpc->server()
=======================

リクエストが送信されるサーバの URL とポート番号をセットします:

::

	$this->xmlrpc->server('http://www.sometimes.com/pings.php', 80);




$this->xmlrpc->timeout()
========================

リクエストをキャンセルするタイムアウトの時間 (秒) を設定します:

::

	$this->xmlrpc->timeout(6);




$this->xmlrpc->method()
=======================

XML-RPC サーバのリクエスト先メソッドを設定します:

::

	$this->xmlrpc->method('method');


ここでの method はメソッドの名前になります。



$this->xmlrpc->request()
========================

データの配列をもとに、XML-RPC サーバに送信するリクエストを構築します:

::

	$request = array(array('My Photoblog', 'string'), 'http://www.yoursite.com/photoblog/');
	$this->xmlrpc->request($request);




$this->xmlrpc->send_request()
=============================

リクエスト送信メソッド。条件判断ができるように、成功か失敗かに応じてブ
ール値の TRU Eか FALSE を返します。



$this->xmlrpc->set_debug(TRUE);
===============================

開発中に役立つ、様々な情報とエラーを表示させるデバッグ機能を有効化しま
す。



$this->xmlrpc->display_error()
==============================

何らかの理由でリクエストが失敗したときにエラーメッセージを文字列として
返します。

::

	echo $this->xmlrpc->display_error();




$this->xmlrpc->display_response()
=================================

リクエストが受信された後にサーバから返送されるレスポンスを返します。レ
スポンスは、通常は連想配列になります。

::

	$this->xmlrpc->display_response();




$this->xmlrpc->send_error_message()
===================================

このメソッドを使うと、サーバからクライアントにエラーメッセージを送信で
きます。
第1引数にエラー番号を、第2引数にエラーメッセージを指定します。

::

	return $this->xmlrpc->send_error_message('123', 'Requested data not available');




$this->xmlrpc->send_response()
==============================

サーバからクライアントにレスポンスを送信できます。正しいデータは、この
メソッドで送信される必要があります。

::

	$response = array(
	                 array(
	                        'flerror' => array(FALSE, 'boolean'),
	                        'message' => "Thanks for the ping!"
	                     )
	                 'struct');
	return $this->xmlrpc->send_response($response);




データ型
========

`XML-RPC の仕様 <http://www.xmlrpc.com/spec>`_ によれば、 XML-
RPC経由で送信できるデータ型は7つあります:


-  *int* または *i4*
-  *boolean*
-  *string*
-  *double*
-  *dateTime.iso8601*
-  *base64*
-  *struct* (値の配列を含む)
-  *array* (値の配列を含む)


