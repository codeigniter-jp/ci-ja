################
クエリ結果の生成
################

クエリ結果を生成する方法はいくつかあります:



result()
========

このメソッドは、結果を オブジェクト
の配列として、または失敗した場合には 空の配列 を返します。
典型的には、次のように、これをforeach ループで使用します:


::

	
		$query = $this->db->query("ここにクエリ");
		
		foreach ($query->result() as $row)
		{
		   echo $row->title;
		   echo $row->name;
		   echo $row->body;
		}


上の メソッド は result_object() の別名です。

実行したクエリでは、結果が 生成されない
可能性があるときは、最初に結果を調べるようにしてください:


::

	
		$query = $this->db->query("ここにクエリ");
		
		if ($query->num_rows() > 0)
		{
		   foreach ($query->result() as $row)
		   {
		      echo $row->title;
		      echo $row->name;
		      echo $row->body;
		   }
		}


result() に各々の結果オブジェクトをインスタンス化するための文字列を渡
すこともできます (note: このクラスはロードされなければなりません)


::

	
		$query = $this->db->query("SELECT * FROM users;");
		
		foreach ($query->result('User') as $user)
		{
		   echo $user->name; // 属性を呼び出す
		   echo $user->reverse_name(); // または、'User' クラスに定義されたメソッド
		}
		




result_array()
==============

このメソッドは、結果を純粋な配列として、あるいは結果が生成されなかった
ときには空の配列を返します。典型的には、次のように、foreach
ループで使用されます:


::

	
		$query = $this->db->query("YOUR QUERY");
		
		foreach ($query->result_array() as $row)
		{
		   echo $row['title'];
		   echo $row['name'];
		   echo $row['body'];
		}




row()
=====

このメソッドは単一行を返します。クエリの応答が一つ以上の行になる場合は
、最初の行だけが返ります。 結果は オブジェクト
で返ります。使用方法の例です:


::

	
		$query = $this->db->query("ここにクエリ");
		
		if ($query->num_rows() > 0)
		{
		   $row = $query->row();
		
		   echo $row->title;
		   echo $row->name;
		   echo $row->body;
		}
		


特定の行を返したいときは、第１引数に、行番号を数値として渡すことができ
ます:


::

	$row = $query->row(5);


第2引数に文字列を渡すこともでき、その列をインスタンス化するためのクラ
ス名を指定します:


::

	
		$query = $this->db->query("SELECT * FROM users LIMIT 1;");
		
		$query->row(0, 'User')
		echo $row->name; // 属性を呼び出す
		echo $row->reverse_name(); // または、'User' クラスに定義されたメソッド
		




row_array()
===========

配列を返すこと以外は、上の row() メソッドと同じです。例:


::

	
		$query = $this->db->query("ここにクエリ");
		
		if ($query->num_rows() > 0)
		{
		   $row = $query->row_array();
		
		   echo $row['title'];
		   echo $row['name'];
		   echo $row['body'];
		}
		


特定の行を返したいときは、第１引数に、行番号を数値として渡すことができ
ます:


::

	$row = $query->row_array(5);


さらに、次のようなバリエーションで、結果を
進む/もどる/最初に移動/最後に移動 してデータを見ていくことができます:

$row = $query->first_row()
$row = $query->last_row()
$row = $query->next_row()
$row = $query->previous_row()

引数に"array"と指定しなければ、デフォルトでは、これらのメソッドはオブ
ジェクトを返します:

$row = $query->first_row('array')
$row = $query->last_row('array')
$row = $query->next_row('array')
$row = $query->previous_row('array')



結果ヘルパーメソッド
####################



$query->num_rows()
==================

クエリで返された行数を取得します。Note: 下記の例では $query
は、クエリの結果オブジェクトを代入した変数です:


::

	$query = $this->db->query('SELECT * FROM my_table');
	echo $query->num_rows();




$query->num_fields()
====================

問い合わせ結果のフィールド数 (列数) を返します。このメソッドは、クエリ
結果オブジェクトを使っていることを確かめてから呼び出してください:


::

	$query = $this->db->query('SELECT * FROM my_table');
	echo $query->num_fields();




$query->free_result()
=====================

結果に関連付けられたメモリを解放し、結果のリソースIDを削除します。ふつ
うは、PHP は、スクリプトの実行を終えると、メモリを自動で解放します。
しかし、特定のスクリプトで多くのクエリを実行しているとき、 メモリの使
用量を削減するために、各クエリの結果が生成されたあとにメモリを開放した
い場合があります。例:


::

	$query = $this->db->query('SELECT title FROM my_table');
	foreach ($query->result() as $row)
	{
	   echo $row->title;
	}
	$query->free_result();  // 結果オブジェクトの $query はもう利用できなくなります
	
	$query2 = $this->db->query('SELECT name FROM some_table');
	$row = $query2->row();
	echo $row->name;
	$query2->free_result();  // 結果オブジェクトの $query2 はもう利用できなくなります


