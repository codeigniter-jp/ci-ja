######################################
データベース Quick Start: コードの例文
######################################

このページでは、データベースクラスの使用方法が示されています。
詳細を全部知るには、各機能についての個別のページをご覧ください。



データベースクラスの初期化
==========================

次のコードは :doc:`設定ファイル <configuration>`
での設定に基づいてデータベースクラスをロードし初期化します:


::

	$this->load->database();


いったんロードされれば、クラスは、後述する例のように使うための準備が整
います。

.. note:: 全ページでデータベースアクセスが必要な場合は、自動的に接続することもできます。 :doc:`接続 <connecting>` のページで詳細をご覧ください。



複数の結果を取得する標準的な問い合わせ(オブジェクトを用いる方法)
================================================================


::

	$query = $this->db->query('SELECT name, title, email FROM my_table');
	
	foreach ($query->result() as $row)
	{
	    echo $row->title;
	    echo $row->name;
	    echo $row->email;
	}
	
	echo 'Total Results: ' . $query->num_rows();


上の result() メソッドは オブジェクト の配列を返します。例：
$row->title



複数の結果を取得する標準的な問い合わせ (配列を用いる方法)
=========================================================


::

	$query = $this->db->query('SELECT name, title, email FROM my_table');
	
	foreach ($query->result_array() as $row)
	{
	    echo $row['title'];
	    echo $row['name'];
	    echo $row['email'];
	}


上の result_array() メソッドは標準的な添字を使う配列を返します。例:
$row['title']



結果を調べる
============

問い合わせが結果を 返さない かもしれない場合は、まず num_rows()
メソッドを使って、結果を調べるようにしてみてください:


::

	
	$query = $this->db->query("YOUR QUERY");
	
	if ($query->num_rows() > 0)
	{
	   foreach ($query->result() as $row)
	   {
	      echo $row->title;
	      echo $row->name;
	      echo $row->body;
	   }
	}




一つの結果を返す標準的な問い合わせ
==================================


::

	$query = $this->db->query('SELECT name FROM my_table LIMIT 1');
	
	$row = $query->row();
	echo $row->name;


上の row() メソッドは オブジェクト を返します。例: $row->name



一つの結果を返す標準的な問い合わせ (配列を使う方法)
===================================================


::

	$query = $this->db->query('SELECT name FROM my_table LIMIT 1');
	
	$row = $query->row_array();
	echo $row['name'];


上の row_array() メソッドは 配列 を返します。 例: $row['name']



標準的な新規レコード作成
========================


::

	
	$sql = "INSERT INTO mytable (title, name) 
	        VALUES (".$this->db->escape($title).", ".$this->db->escape($name).")";
	
	$this->db->query($sql);
	
	echo $this->db->affected_rows();




Active Record を使った問い合わせ
================================

:doc:`Active Record パターン <active_record>`
を使うと、データの取得が簡単になります:


::

	
	$query = $this->db->get('table_name');
	
	foreach ($query->result() as $row)
	{
	    echo $row->title;
	}


上の get() メソッドは 指定されたテーブルの全データを取得します。
:doc:`Active Record <active_record>`
クラスは、データを処理するためのフル装備のメソッドをもっています。



Active Record を使った新規レコード作成
======================================


::

	
	$data = array(
	               'title' => $title,
	               'name' => $name,
	               'date' => $date
	            );
	
	$this->db->insert('mytable', $data);
	
	// SQL文: INSERT INTO mytable (title, name, date) VALUES ('{$title}', '{$name}', '{$date}')


