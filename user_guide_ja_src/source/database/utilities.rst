################################
データベースユーティリティクラス
################################

データベースユーティリティクラスは、データベースの管理に便利なメソッド
を持っています。



目次
~~~~


-  ユーティリティクラスの初期化
-  データベースのリストアップ
-  特定データベースのチェック
-  テーブルの最適化
-  テーブルの修復
-  データベースの最適化
-  問合せ結果からの CSV 生成
-  問合せ結果からの XML 生成
-  データベースのバックアップ




ユーティリティクラスの初期化
============================

Important:
ユーティリティクラスは、データベースドライバに依存しているので、 ユー
ティリティクラスを初期化するには、あらかじめデータベースドライバが実行
されている必要があります。

ユーティリティクラスは次のようにロードします:


::

	$this->load->dbutil()


いったん初期化されれば、ユーティリティのメソッドは、 $this->dbutil
オブジェクトを利用してアクセスできます:


::

	$this->dbutil->some_function()




$this->dbutil->list_databases()
===============================

データベース名の配列を返します:


::

	
	$dbs = $this->dbutil->list_databases();
	
	foreach ($dbs as $db)
	{
	    echo $db;
	}




$this->dbutil->database_exists();
=================================

特定のデータベースが存在するかどうかを知る場合に役立ちます。
ブール値の TRUE/FALSE を返します。使用例:


::

	
	if ($this->dbutil->database_exists('database_name'))
	{
	   // 何らかのコード...
	}


.. note:: *database_name* を探しているテーブル名に置き換えてください。このメソッドは大文字小文字を区別します。



$this->dbutil->optimize_table('table_name');
============================================

.. note:: このメソッドは MySQL / MySQLi データベースでのみ使用できます。
第1引数に指定した名前のテーブルを最適化できます。処理が成功したか失敗
したかにより、TRUE / FALSE を返します:


::

	
	if ($this->dbutil->optimize_table('table_name'))
	{
	    echo '成功!';
	}


.. note:: すべてのデータベースプラットフォームがテーブルの最適化をサポートしているわけではありません。



$this->dbutil->repair_table('table_name');
==========================================

.. note:: このメソッドは MySQL / MySQLi データベースでのみ使用できます。
第1引数に指定した名前のテーブルを修復できます。処理が成功したか失敗し
たかにより、TRUE / FALSE を返します:


::

	
	if ($this->dbutil->repair_table('table_name'))
	{
	    echo '成功!';
	}


.. note:: すべてのデータベースプラットフォームがテーブルの修復をサポートしているわけではありません。



$this->dbutil->optimize_database();
===================================

.. note:: このメソッドは MySQL / MySQLi データベースでのみ使用できます。
現在接続中のデータベースを最適化します。DBステータスメッセージの配列ま
たは、失敗した場合に FALSE を返します。


::

	
	$result = $this->dbutil->optimize_database();
	
	if ($result !== FALSE)
	{
	    print_r($result);
	}


.. note:: すべてのデータベースプラットフォームがデータベースの最適化をサポートしているわけではありません。



$this->dbutil->csv_from_result($db_result)
==========================================

クエリの結果からCSVを生成することができます。
第1引数に結果オブジェクトを指定する必要があります。例:


::

	
	$this->load->dbutil();
	
	$query = $this->db->query("SELECT * FROM mytable");
	
	echo $this->dbutil->csv_from_result($query);


第2、第3、第4引数で、区切り文字(デリミタ)、改行文字と囲み文字をそれぞ
れ指定できます。 デフォルトでは、デリミタにタブ、改行に "\n" (LF)
、囲み文字にダブルクォーテーションを使います。例:


::

	
	$delimiter = ",";
	$newline = "\r\n";
	$enclosure = '"';
	
	echo $this->dbutil->csv_from_result($query, $delimiter, $newline, $enclosure);


Important: このメソッドは、CSV を
ファイルには書き出しません。単に、CSV に整形するだけです。
ファイルに書き込む必要がある場合は、 :doc:`ファイルヘルパー
<../helpers/file_helper>` を利用します。



$this->dbutil->xml_from_result($db_result)
==========================================

クエリの結果からXMLを生成します。第1引数には、結果オブジェクトが入り、
第2引数には、オプションで設定パラメータの配列が入ります。例:


::

	
	$this->load->dbutil();
	
	$query = $this->db->query("SELECT * FROM mytable");
	
	$config = array (
	                  'root'    => 'root',
	                  'element' => 'element', 
	                  'newline' => "\n", 
	                  'tab'    => "\t"
	                );
	
	echo $this->dbutil->xml_from_result($query, $config);


Important: このメソッドは、XML を
ファイルには書き出しません。単に、XML に整形するだけです。
ファイルに書き込む必要がある場合は、 :doc:`ファイルヘルパー
<../helpers/file_helper>` を利用します。



$this->dbutil->backup()
=======================

データベース全体もしくは個別のテーブルをバックアップできます。バックア
ップデータは Zip または Gzip
フォーマットのどちらかの形式で圧縮できます [ 訳注: バックアップ結果を
ファイルに保存するには、ファイルヘルパーを利用する必要があります ]。

.. note:: このメソッドは MySQL データベースでのみ使用できます。
.. note:: 実行制限時間と PHPが利用できる空きメモリ容量に注意してください。 大規模なデータベースの
バックアップはできないかもしれません。データベースが大規模な場合は、
サーバで直接 SQL を使ってバックアップする必要があるかしれません。ルー
ト権限を持たない場合にはサーバ管理者がそれを行う必要があります。



使用例
~~~~~~


::

	
	// DB ユーティリティクラスをロード
	$this->load->dbutil();
	
	// データベース全体をバックアップしその結果を変数に代入
	$backup =& $this->dbutil->backup();
	
	
	// ヘルパーをロードし、サーバにファイルを書き出す
	$this->load->helper('file');
	write_file('/path/to/mybackup.gz', $backup);
	
	
	// ダウンロードヘルパーをロードし、ファイルをデスクトップに送信する
	$this->load->helper('download');
	force_download('mybackup.gz', $backup);




バックアップオプションの設定
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

バックアップのオプションは、バックアップメソッドの第1引数で配列で渡す
ことができます。例:


::

	$prefs = array(
	                'tables'      => array('table1', 'table2'),  // バックアップするテーブルの配列。
	                'ignore'      => array(),           // バックアップしないテーブルのリスト。
	                'format'      => 'txt',             // gzip, zip, txt
	                'filename'    => 'mybackup.sql',    // ファイル名 - ZIP ファイルのときだけ必要
	                'add_drop'    => TRUE,              // バックアップファイルにDROP TABLE 文を追加するかどうか
	                'add_insert'  => TRUE,              // バックアップファイルにINSERT 文を追加するかどうか
	                'newline'     => "\n"               // バックアップファイルで使う改行文字
	              );
	
	$this->dbutil->backup($prefs);




バックアップオプションの説明
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
設定項目
初期値
選択肢
説明
 tables 空の配列 なし バックアップしたいテーブルの配列。空のままにしておけば、全テーブルがエクスポートされます。
 ignore 空の配列 なし バックアップ処理の対象外にするテーブルの配列。
 format gzip gzip, zip, txt エクスポートファイルのファイル形式。
 filename 現在日時 なし バックアップファイルの名前。名前は、ZIP圧縮を使う場合のみ必要になります。
 add_drop TRUE TRUE/FALSE SQL エクスポートファイルに、DROP TABLE 文を追加するかどうか。
 add_insert TRUE TRUE/FALSE SQL エクスポートファイルに、INSERT 文を追加するかどうか。
 newline "\n" "\n", "\r", "\r\n" SQL エクスポートファイルで使う改行文字の種類。



