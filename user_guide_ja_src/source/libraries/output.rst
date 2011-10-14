##########
出力クラス
##########

出力クラスはリクエストを発信したブラウザに処理済みの Web ページを送信
するという一つの主要機能をもった小さなクラスです。また、このクラスは、
キャッシュ機能を利用する場合にページを :doc:`キャッシュ
<../general/caching>` する責任も持っています。

.. note:: このクラスは、システムで自動的に初期化されるので、手動で初期化する必要はありません。

出力クラスは、ユーザの介入なしに隠れて動作するので、通常の環境では、出
力クラスを意識することはありません。
たとえばビューファイルを読み込むために :doc:`ローダ(読み込み処理)
<../libraries/loader>` クラスを使用した場合、
ビューファイルは出力クラスに自動的に渡され、CodeIgniter
のシステムによって実行の最後で呼ばれます。 しかし、必要があれば、次の
いずれかのメソッドを使って、手動で出力に介入することもできます:



$this->output->set_output();
============================

最終出力の文字列を手動でセットできます。使用例:


::

	$this->output->set_output($data);


Important: 手動で出力をセットしたとき、呼ばれているメソッドの処理がそ
こで終わります。 たとえば、コントローラのメソッドの中で、ページを構築
した場合、処理の最後になるまで、出力をセットしてはいけません。



$this->output->set_content_type();
==================================

JSON データや JPEG データ、XML などを簡単に提供できるように、ページの
MIME タイプを設定できます。


::

	$this->output
	    ->set_content_type('application/json')
	    ->set_output(json_encode(array('foo' => 'bar')));
	
	$this->output
	    ->set_content_type('jpeg') // ".jpeg" とすることもでき、その場合、ピリオドは config/mimes.php を検索する前に削除されます
	    ->set_output(file_get_contents('files/something.jpg'));


重要: config.mimes.php に存在する MIME タイプをこのメソッドに渡してい
ることを確認してください。そうでないと、効果はありません。



$this->output->get_output();
============================

出力クラスに保存するために送られた出力を手動で読み取ることができます。
使用例:

::

	$string = $this->output->get_output();


$this->load->view() などの CodeIgniter の機能を使って、すでに出力クラ
スに送られたデータの場合、このメソッドを使ってのみ、
そのデータを取得できるということに注意しておいてください。



$this->output->append_output();
===============================

出力文字列にデータを追加する。使用例:


::

	$this->output->append_output($data);




$this->output->set_header();
============================

最終レンダリングされた表示を出力クラスが出力する際に、サーバが返すHTTP
レスポンスのヘッダを手動でセットできます。例:


::

	
	$this->output->set_header("HTTP/1.0 200 OK");
	$this->output->set_header("HTTP/1.1 200 OK");
	$this->output->set_header('Last-Modified: '.gmdate('D, d M Y H:i:s', $last_update).' GMT');
	$this->output->set_header("Cache-Control: no-store, no-cache, must-revalidate");
	$this->output->set_header("Cache-Control: post-check=0, pre-check=0");
	$this->output->set_header("Pragma: no-cache");	




$this->output->set_status_header( code , ' text ');
===================================================

サーバが返すHTTPレスポンスヘッダのステータスを手動でセットできます。例
:


::

	$this->output->set_status_header('401');
	// ヘッダは Unauthorized に設定されます


`すべてのHTTPレスポンスヘッダの一覧
<http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html>`_
をご覧ください。



$this->output->enable_profiler();
=================================

デバッグあるいは最適化のためにベンチマークなどのデータをページの末尾に
表示する :doc:`プロファイラ <../general/profiling>`
を有効/無効にします。

プロファイラを有効にするには、 :doc:`コントローラ
<../general/controllers>`
のメソッド内のいずれかの場所に、次のメソッドを設置してください:

::

	$this->output->enable_profiler(TRUE);


有効化されると、レポートが生成され、ページの最下部に挿入されます。

プロファイラを無効にするには、次のコードを使います:

::

	$this->output->enable_profiler(FALSE);




$this->output->set_profiler_sections();
=======================================

プロファイラが有効な場合に各セクションの有効／無効を指定することができ
ます。より詳しい情報は :doc:`プロファイラ <../general/profiling>`
をご覧下さい。



$this->output->cache();
=======================

CodeIgniterの出力クラスはキャッシュ操作も可能です。より詳しい情報は、
:doc:`Webページのキャッシュ <../general/caching>` をご覧下さい。



実行変数の解析
==============

初期状態において CodeIgniter は出力中に擬似変数 {elapsed_time} と
{memory_usage} を解析します。これを無効にするには、コントローラー内で
クラスプロパティの $parse_exec_vars を FALSE に設定します。


::

	$this->output->parse_exec_vars = FALSE;


