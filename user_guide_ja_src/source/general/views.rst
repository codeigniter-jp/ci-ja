######
ビュー
######

ビュー は単純には Web ページで、ヘッダ、フッタやサイドバーのようなペー
ジの部品のこともあります。 実践では、ビューには他のビューを柔軟に埋め
込むことができます(埋め込むこのビューにはさらに他のビューが埋め込まれ
る、などなど…)。
このような階層構造が必要であれば、そうすることができます。

ビューは直接的に呼び出されることはなく、 :doc:`コントローラ
<controllers>` によって読み込まれる必要があります。 MVC フレームワーク
においては、コントローラが交通整理を行い、それぞれのビューを取り出す責
任を持つことを覚えておいてください。 :doc:`コントローラ <controllers>`
のページをまだ読んでないのなら、続きを読む前に読んでおいてください。

:doc:`コントローラ <controllers>` のページで作成したサンプルのコントロ
ーラを使って、ビューを追加してみましょう。



ビューの作成
============

テキストエディタを使って blogview.php
という名前のファイルを作成し、その中に下記のように打ち込んでください:


::

	
	<html>
	<head>
	<title>My Blog</title>
	</head>
	<body>
		<h1>Welcome to my Blog!</h1>
	</body>
	</html>


次に、 application/views/ フォルダにこのファイルを保存します。



ビューの読み込み
================

それぞれのビューファイルを読み込むには、次のメソッドを使います:


::

	$this->load->view('name');


上の name はビューファイルの名前になります。 Note: .php ファイルの拡張
子は不要です。ファイルを指定するために、他のフレームワークなどで .php
とするようなことは要りません。

ここで blog.php という名前で前のセクションで作ったコントローラを開き、
echo 文を次の読み込みメソッドに置き換えてください:


::

	
	<?php
	class Blog extends CI_Controller {
	
		function index()
		{
			$this->load->view('blogview');
		}
	}
	?>


前に使った URL でサイトを見ると、新しいビューが見えるはずです。URL
は次に挙げるものと同じです:


::

	example.com/index.php/blog/




複数のビューの読み込み
======================

CodeIgniter は、ひとつのコントローラ内での複数の $this->load->view の
呼び出しをかしこく処理します。もし、ひとつ以上の呼び出しがあれば、順に
追加されます。たとえば、ヘッダビュー、メニュービュー、コンテントビュー
そしてフッタビューを使いたい場合、以下のようになります:


::

	<?php
	
	class Page extends CI_Controller {
	
	    function index()
	   {
	      $data['page_title'] =  'Your title';
	      $this->load->view('header');
	      $this->load->view('menu');
	      $this->load->view('content', $data);
	      $this->load->view('footer');
	   }
	
	}
		?>



上の例では、下の「ビューに動的データを追加する」で説明する動的データを
使用しています。


ビューをサブフォルダに保存する
==============================

サブフォルダでビューを管理したい場合は、ビューのファイルをサブフォルダ
に分けて配置することもできます。 そうした場合、ビューをロードするとき
にフォルダ名を含めて指定する必要があります。 例です:


::

	$this->load->view('folder_name/file_name');




ビューに動的データを追加する
============================

ビュー読み込みメソッドの第2引数に 配列 または オブジェクト
を渡すやり方で、
ビューにデータを渡すことができます。配列を使った例は下記の通りです:


::

	$data = array(
	               'title' => 'My Title',
	               'heading' => 'My Heading',
	               'message' => 'My Message'
	          );
	
	$this->load->view('blogview', $data);


オブジェクトを使った例は下記の通りです:


::

	$data = new Someclass();
	$this->load->view('blogview', $data);


.. note:: オブジェクトを使う場合クラスの変数が配列の要素に変換されます。
コントローラのファイルでやってみましょう。コントローラを開いて次のコー
ドを追加してください:


::

	
	<?php
	class Blog extends CI_Controller {
	
		function index()
		{
			$data['title'] = "My Real Title";
			$data['heading'] = "My Real Heading";
	
			$this->load->view('blogview', $data);
		}
	}
	?>


では、ビューを開き、テキストの部分を渡したデータの配列のキーと同じ名前
の変数に変えます:


::

	
	<html>
	<head>
	<title><?php echo $title;?></title>
	</head>
	<body>
		<h1><?php echo $heading;?></h1>
	</body>
	</html>


次に、前で使った URL
でページを読み込みます。変数が置き換えられているのが見えるはずです。



ループの作成
============

ビューファイルに渡したデータの配列は、単純な変数だけであるとは限りませ
ん。
ループして複数の行を生成できるように、多次元配列を渡すこともできます。
たとえば、データベースから持ってきたデータの場合、典型的には多次元配列
に整形されています。

以下に例を示します。 次のコードをコントローラに追加します:


::

	
	<?php
	class Blog extends CI_Controller {
	
		function index()
		{
			$data['todo_list'] = array('Clean House', 'Call Mom', 'Run Errands');
	
			$data['title'] = "My Real Title";
			$data['heading'] = "My Real Heading";
	
			$this->load->view('blogview', $data);
		}
	}
	?>


ここでビューのファイルを開き、下記のようにループを作成します:


::

	
	<html>
	<head>
	<title><?php echo $title;?></title>
	</head>
	<body>
	<h1><?php echo $heading;?></h1>
	
	<h3>My Todo List</h3>
	
	<ul>
	<?php foreach ($todo_list as $item):?>
	
	<li><?php echo $item;?></li>
	
	<?php endforeach;?>
	</ul>
	
	</body>
	</html>


.. note:: お気付きのように、上の例では、PHP の代替構文を使用しています。PHPの 代替構文に慣れていない場合は、 :doc:`こちら <alternative_php>`
を御覧ください。



ビューをデータとして返す
========================

第3引数 (オプション) でメソッドの振る舞いを変更して、ブラウザにビュー
を送るのではなく文字列としてビューのデータを返します。
このビューのデータをさらに使いたい時に有効です。 パラメータに true
を指定するとビューをデータとして返します。デフォルトの動作は false
で、ブラウザにデータを送ります。
返ってきたデータを変数に格納するのを忘れないでください。


::

	$string = $this->load->view('myfile', '', true);


