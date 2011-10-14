################
フィールドの情報
################



$this->db->list_fields()
========================

フィールド名のリストを返します。２つの方法で問い合わせできます:

1. $this->db-> オブジェクトで使うときは、テーブル名を指定できます:


::

	
	$fields = $this->db->list_fields('table_name');
	
	foreach ($fields as $field)
	{
	   echo $field;
	}


2. 結果オブジェクトでこのメソッドを使えば、実行したクエリに関連するフ
ィールド名を知ることができます:


::

	
	$query = $this->db->query('SELECT * FROM some_table');
	
	
	foreach ($query->list_fields() as $field)
	{
	   echo $field;
	}




$this->db->field_exists()
=========================

実行前に、特定のフィールドが存在するか知りたい場合に役立ちます。ブール
値で TRUE / FALSE を返します。使用例:


::

	
	if ($this->db->field_exists('field_name', 'table_name'))
	{
	   // 何かのコード...
	}


注意: *field_name* を探したい列名に置き換え、 *table_name*
を列を探すテーブル名に置き換えてください。



$this->db->field_data()
=======================

フィールド情報のオブジェクトを配列で返します。

フィールド名や型や最大サイズなどのその他のメタデータを知りたい場合に役
立ちます。

.. note:: すべてのデータベースがメタデータを提供するわけではありません。
使用例:


::

	
	$fields = $this->db->field_data('table_name');
	
	foreach ($fields as $field)
	{
	   echo $field->name;
	   echo $field->type;
	   echo $field->max_length;
	   echo $field->primary_key;
	}


すでにクエリを実行した後であれば、テーブル名を指定する代わりに、次のよ
うに、結果オブジェクトを使用できます:


::

	
	$query = $this->db->query("クエリ");
	$fields = $query->field_data();


利用するデータベースが対応していれば、このメソッドで次のデータが利用可
能になります:


-  name - 列名
-  max_length - 列データの最大サイズ
-  primary_key - カラムが主キーであれば 1 が設定
-  type - 列の型


