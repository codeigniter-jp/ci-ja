####################
補助的なクラスの作成
####################

コントローラの既存クラスから別クラスを開発するような場合でも、CodeIgni
ter のすべてのリソースを利用することが可能です。
以下のように簡単にできます。



get_instance()
==============

コントローラ内部でインスタンス化されたあらゆるクラスは、
get_instance() メソッドを用いることにより、 簡単に CodeIgniter
のネイティブリソースにアクセスすることができます。
このメソッドは、CodeIgniter の主オブジェクトを返します。

通常、CodeIgniter の利用可能な機能を呼び出すには、 $this
変数の初期化メソッドを用います:


::

	
	$this->load->helper('url');
	$this->load->library('session');
	$this->config->item('base_url');
	など


しかし、 $this
変数は、コントローラ、モデル、ビューの中で直接使うときだけ動作します。
もし、自作クラスで CodeIgniter
のクラスを使用したい場合は、以下のようにします。

まず、CodeIgniter オブジェクトを変数に代入します:


::

	$CI =& get_instance();


オブジェクトを変数に代入したら、 $this
変数の代わりにその変数を用います:


::

	
	$CI =& get_instance();
	$CI->load->helper('url');
	$CI->load->library('session');
	$CI->config->item('base_url');
	など


.. note:: 上で get_instance()メソッドが「参照渡し」されていることに注意してください:

$CI =& get_instance();

これは非常に重要です。「参照渡し」することで、コピーではなく、本来の
CodeIgniter のオブジェクトを利用することができます。

