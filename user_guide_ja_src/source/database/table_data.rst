##############
テーブルの情報
##############

下記のメソッドでテーブル情報を取得できます。



$this->db->list_tables();
=========================

現在接続中のデータベースにある全テーブルの名前を配列で返します。例:


::

	$tables = $this->db->list_tables();
	
	foreach ($tables as $table)
	{
	   echo $table;
	}




$this->db->table_exists();
==========================

テーブルを操作する前に、特定のテーブルが存在するかどうかを知りたい場合
に使えます。 ブール値のTRUE / FALSE が返ります。使用例:


::

	
	if ($this->db->table_exists('table_name'))
	{
	   // 何かのコード...
	}


.. note:: *table_name* を探したいテーブル名に置き換えてください。
