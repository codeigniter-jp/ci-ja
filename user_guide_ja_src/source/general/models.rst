######
モデル
######

より慣例に沿った MVC アプローチを利用したい人向けに、モデルは
オプションで 利用可能です。


-  モデルとは？
-  モデルの詳細
-  モデルの読み込み
-  モデルの自動読み込み
-  データベースへの接続




モデルとは?
===========

モデルは、データベースに格納された情報を用いて機能するようデザインされ
た PHP のクラスです。たとえば、 CodeIgniter を使ってブログを管理する場
合について考えてみましょう。モデルクラスには、ブログのデータを作成、更
新そして取得するためのメソッドが含まれます。
そういったモデルクラスは、どのようになっているかを示した例です:


::

	
	class Blogmodel extends CI_Model {
	
	    var $title   = '';
	    var $content = '';
	    var $date    = '';
	
	    function __construct()
	    {
	        // Model クラスのコンストラクタを呼び出す
	        parent::__construct();
	    }
	    
	    function get_last_ten_entries()
	    {
	        $query = $this->db->get('entries', 10);
	        return $query->result();
	    }
	
	    function insert_entry()
	    {
	        $this->title   = $_POST['title']; // 下の Note を参照してください
	        $this->content = $_POST['content'];
	        $this->date    = time();
	
	        $this->db->insert('entries', $this);
	    }
	
	    function update_entry()
	    {
	        $this->title   = $_POST['title'];
	        $this->content = $_POST['content'];
	        $this->date    = time();
	
	        $this->db->update('entries', $this, array('id' => $_POST['id']));
	    }
	
	}


.. note:: 上の例で使用しているメソッドは、 :doc:`Active Record<../database/active_record>` のデータベース関連メソッドです。

.. note:: この例を簡単にするため、$_POSTを直接利用しています。これは一般的に悪い方法です。一般的には、
:doc:`入力クラス <../libraries/input>` の $this->input->post('title')
を利用してください。



モデルの詳細
============

モデルクラスは application/models/ フォルダに格納されます。
サブフォルダで構成したければ、
サブフォルダ内に入れ子にして格納することができます。

モデルクラスの基本的な原型はつぎのとおりです:


::

	
	class Model_name extends CI_Model {
	
	    function __construct()
	    {
	        parent::__construct();
	    }
	}


ここでの Model_name はクラス名になります。クラス名は 必ず
大文字で始め、他の文字は小文字にする必要があります。 基底クラスの
Model クラスを確実に継承してください。

ファイル名は、クラス名を小文字にしたものになります。たとえばクラスがこ
んな感じの場合は:


::

	
	class User_model extends CI_Model {
	
	    function __construct()
	    {
	        parent::__construct();
	    }
	}


ファイルは次のようになります:


::

	application/models/user_model.php




モデルの読み込み
================

モデルは、典型的には、 :doc:`コントローラ <controllers>`
のメソッドの中で読み込まれ、呼び出されます。
モデルを読み込むには、次のようなメソッドを使用します:


::

	$this->load->model('Model_name');


サブフォルダにモデルを格納している場合は、モデル格納用のフォルダからの
相対パスを指定します。たとえば、 application/models/blog/queries.php
にモデルを保存している場合、それを使うには、下記のようにします:


::

	$this->load->model('blog/queries');


いったん読み込まれると、モデルのメソッドは、クラス名と同じ名前のオブジ
ェクトを使ってアクセスできます:


::

	
	$this->load->model('Model_name');
	
	$this->Model_name->function();


モデルを違う名前に割り当てたいときは、読み込みメソッドの第2引数に渡す
ことで 指定できます:


::

	
	$this->load->model('Model_name', 'fubar');
	
	$this->fubar->function();


下の例では、コントローラがモデルを読み込み、ビューを表示しています:


::

	
	class Blog_controller extends CI_Controller {
	
	    function blog()
	    {
	        $this->load->model('Blog');
	
	        $data['query'] = $this->Blog->get_last_ten_entries();
	        $this->load->view('blog', $data);
	    }
	}




モデルの自動読み込み
====================

もし特定のモデルが、あなたのアプリケーションの中でグローバルに必要な場
合、CodeIgniter
の初期化時に自動的に読み込むように設定することができます。
application/config/autoload.php ファイルを開き、そのモデルを autoload
配列に追加してください。



データベースへの接続
====================

モデルが読み込まれても自動的にはデータベースに 接続しません 。DB
接続については、次のオプションが選べます:


-  コントローラまたはモデルのクラス内のどちらからも
   :doc:`こちらで述べている <../database/connecting>`
   標準のデータベース関連メソッドを利用して接続できます。
-  あらかじめデータベース設定ファイルで接続情報に関して設定しておき、
   自動接続するかどうかについて TRUE (ブール値)
   をモデル読み込みメソッドの第3引数に渡すことで接続できます:

::

	$this->load->model('Model_name', '', TRUE);


  -
  第3引数にデータベース接続に関する設定を渡して手動で行うことができます:

::

	$config['hostname'] = "localhost";
			$config['username'] = "myusername";
			$config['password'] = "mypassword";
			$config['database'] = "mydatabase";
			$config['dbdriver'] = "mysql";
			$config['dbprefix'] = "";
			$config['pconnect'] = FALSE;
			$config['db_debug'] = TRUE;
			
	$this->load->model('Model_name', '', $config);




