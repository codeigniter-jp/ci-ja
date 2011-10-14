##########################
データベースフォージクラス
##########################

データベースフォージクラスは、データベースを管理するメソッドで構成され
ています。



目次
~~~~


-  フォージクラスの初期化
-  データベースの作成
-  データベースの削除
-  フィールドの追加
-  キーの追加
-  テーブルの作成
-  テーブルの削除
-  テーブル名の変更
-  テーブルの変更




フォージクラスの初期化
======================

Important: フォージクラスはデータベースドライバに依存しているので、 フ
ォージクラスを初期化するには、あらかじめデータベースドライバが実行され
ている必要があります。

フォージクラスは次のようにロードします:


::

	$this->load->dbforge()


いったん初期化されれば、フォージのメソッドは、 $this->dbforge
オブジェクトを利用してアクセスできます:


::

	$this->dbforge->some_function()



$this->dbforge->create_database('db_name')
==========================================

最初の引数で渡した名前でデータベースを作成します。戻り値は TRUE/FALSE
で成功したか失敗したかを示します:


::

	if ($this->dbforge->create_database('my_db'))
	{
	    echo 'Database が作成されました!';
	}




$this->dbforge->drop_database('db_name')
========================================

最初の引数で示された名前のデータベースを削除します。戻り値は
TRUE/FALSE で成功か失敗を示します:


::

	if ($this->dbforge->drop_database('my_db'))
	{
	    echo 'Database が削除されました!';
	}




テーブルの作成と削除
####################

テーブルを作成するためには、やらなければならないことがいくつかあります
。フィールドを追加したり、キーをテーブルに追加したり、カラムを変更した
りです。CodeIgniter
はこのようなことに関してのメカニズムを提供しています。


フィールドの追加
================

フィールドは連想配列を通して作成されます。配列の中には、フィールドのデ
ータタイプを指定する 'type' キーが必要となります。たとえば、
INT、VARCHAR、TEXT などです。多くのデータタイプ (たとえば VARCHAR
など) は 'constraint' キーも必要です。


::

	$fields = array(
	                        'users' => array(
		                                                 'type' => 'VARCHAR',
		                                                 'constraint' => '100',
		                                          ),
		                );
		
	// "users VARCHAR(100)" と解釈され、フィールドが追加されます。



さらに、以下のキー/値が使えます:


-  unsigned/true : フィールド定義として "UNSIGNED" を生成します。
-  default/値 : フィールド定義としてデフォルト値を生成します。
-  null/true : フィールド定義として "NULL"
   を生成します。この指定がないと、フィールドは "NOT NULL" となります。
-  auto_increment/true : フィールドのフラグとして、auto_increment を立
   てます。フィールドタイプは整数の様なタイプをサポートするものでないとい
   けません。



::

	$fields = array(
		                        'blog_id' => array(
		                                                 'type' => 'INT',
		                                                 'constraint' => 5, 
		                                                 'unsigned' => TRUE,
		                                                 'auto_increment' => TRUE
		                                          ),
		                        'blog_title' => array(
	                                                 'type' => 'VARCHAR',
	                                                 'constraint' => '100',
	                                          ),
	                        'blog_author' => array(
	                                                 'type' =>'VARCHAR',
	                                                 'constraint' => '100',
	                                                 'default' => 'King of Town',
	                                          ),
	                        'blog_description' => array(
	                                                 'type' => 'TEXT',
	                                                 'null' => TRUE,
	                                          ),
	                );



フィールドが定義された後で、 $this->dbforge->add_field($fields);
の後に呼ばれる create_table() メソッドでフィールドが追加されます。


$this->dbforge->add_field()
~~~~~~~~~~~~~~~~~~~~~~~~~~~

add_fields メソッドは上のような配列を受け入れます。


フィールド定義を文字列として渡す
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

フィールド作成をどのようにしたらよいか正確にわかっている場合、add_fiel
d() メソッドを使って、フィールド定義を文字列として渡すこともできます。


::

	$this->dbforge->add_field("label varchar(100) NOT NULL DEFAULT 'default label'");



Note： add_field() を複数回呼ぶと、複数回の処理が累積されていきます。


id フィールドの作成
~~~~~~~~~~~~~~~~~~~

ひとつの特別な例外として、id フィールドの作成があります。type が id
のフィールドは、自動的に INT(9) の auto_increment な主キーになります。


::

	$this->dbforge->add_field('id');
		// これで id は INT(9) NOT NULL AUTO_INCREMENT になります。




キーの追加
==========

一般的にテーブルにはキーがあります。キーは
$this->dbforge->add_key('field')
で設定できます。オプションの2つ目の引数は、TRUE
を指定すると主キーになります。 add_key() の後に create_table()
を呼ぶ必要があることに注意してください。

主キー(PRIMARY KEY)ではないコラムは配列で送信されます。以下は MySQL
用のサンプルです。


::

	$this->dbforge->add_key('blog_id', TRUE);
		// PRIMARY KEY は `blog_id`(`blog_id`) になります。
		
		$this->dbforge->add_key('blog_id', TRUE);
		$this->dbforge->add_key('site_id', TRUE);
		// PRIMARY KEY は `blog_id_site_id` (`blog_id`, `site_id`) になります。
		
		$this->dbforge->add_key('blog_name');
		// KEY は `blog_name` (`blog_name`) になります。
		
		$this->dbforge->add_key(array('blog_name', 'blog_label'));
		// KEY は `blog_name_blog_label` (`blog_name`, `blog_label`) になります。




テーブルの作成
==============

フィールドとキーが宣言された後、新しいテーブルを次に紹介するメソッドを
呼ぶことで作成することができます。


::

	$this->dbforge->create_table('table_name');
	// CREATE TABLE table_name になります



オプションの 2つ目の引数が TRUE のとき、"IF NOT EXISTS"
を定義に追加します。


::

	$this->dbforge->create_table('table_name', TRUE);
	// CREATE TABLE IF NOT EXISTS table_name になります




テーブルの削除
==============

DROP TABLE sql を実行します。


::

	$this->dbforge->drop_table('table_name');
		// DROP TABLE IF EXISTS  table_name になります




テーブル名の変更
================

TABLE rename を実行します。


::

	$this->dbforge->rename_table('old_table_name', 'new_table_name'); 
		// ALTER TABLE old_table_name RENAME TO new_table_name になります





テーブルの変更
##############


$this->dbforge->add_column()
============================

add_column() メソッドは既存のテーブルを変更するときに使います。上記と
同じフィールド定義の配列を採り、いくつでもフィールドを追加することがで
きます。


::

	$fields = array(
		                        'preferences' => array('type' => 'TEXT')
	);
	$this->dbforge->add_column('table_name', $fields);
	
	// ALTER TABLE table_name ADD   	preferences TEXT となります



オプションの第3引数は存在するカラムの後ろに新しいカラムを追加するよう
に指定することができます。


::

	
	$this->dbforge->add_column('table_name', $fields, 'after_field');




$this->dbforge->drop_column()
=============================

テーブルのカラムを削除します。


::

	$this->dbforge->drop_column('table_name', 'column_to_drop');




$this->dbforge->modify_column()
===============================

このメソッドの使用法は、add_column() と同じです。ただし、新しいカラム
を追加するのではなく、既存のカラムを変更します。カラム名を変更するには
配列の "name" キーで指定します。


::

	$fields = array(
	                        'old_name' => array(
	                                                         'name' => 'new_name',
	                                                         'type' => 'TEXT',
	                                                ),
	);
	$this->dbforge->modify_column('table_name', $fields);
		
		// ALTER TABLE table_name CHANGE   	old_name new_name TEXT になります





