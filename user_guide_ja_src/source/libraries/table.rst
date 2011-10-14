###################
HTML テーブルクラス
###################

テーブルクラスは、配列またはデータベースの結果セットからHTMLテーブルを
自動生成するメソッドを提供します。



クラスの初期化
==============

CodeIgniter
の他の大部分のクラスと同様に、テーブルクラスは、コントローラの中で
$this->load->library メソッドを使用することで初期化できます:


::

	$this->load->library('table');


ロードされれば、HTMLテーブルクラスのオブジェクトは、次のようにして利用
できます: $this->table



例
==

次は、多次元配列からテーブルを作成する方法を示した例です。
配列の最初の要素は、テーブルのヘッダになるのを覚えておいてください
(または、後述のメソッドリファレンスに書いてある set_heading()
メソッドを使って、ユーザ定義のヘッダをセットすることもできます)。


::

	
	$this->load->library('table');
	
	$data = array(
	             array('Name', 'Color', 'Size'),
	             array('Fred', 'Blue', 'Small'),
	             array('Mary', 'Red', 'Large'),
	             array('John', 'Green', 'Medium')	
	             );
	
	echo $this->table->generate($data);


次は、データベースのクエリ結果からテーブルを作成する方法を示した例です
。 テーブルクラスは、テーブルに設定された名前をもとにヘッダを自動的に
生成します(または、後述のメソッドリファレンスに書いてある
set_heading()
メソッドを使って、ユーザ定義のヘッダをセットすることもできます)。


::

	
	$this->load->library('table');
	
	$query = $this->db->query("SELECT * FROM my_table");
	
	echo $this->table->generate($query);


次は、個別のパラメータを使ってテーブルを作成したい場合のその方法を示し
た例です:


::

	
	$this->load->library('table');
	
	$this->table->set_heading('Name', 'Color', 'Size');
	
	$this->table->add_row('Fred', 'Blue', 'Small');
	$this->table->add_row('Mary', 'Red', 'Large');
	$this->table->add_row('John', 'Green', 'Medium');
	
	echo $this->table->generate();


次は、個別のパラメータを使う代わりに、配列を使っている同様の例です:


::

	
	$this->load->library('table');
	
	$this->table->set_heading(array('Name', 'Color', 'Size'));
	
	$this->table->add_row(array('Fred', 'Blue', 'Small'));
	$this->table->add_row(array('Mary', 'Red', 'Large'));
	$this->table->add_row(array('John', 'Green', 'Medium'));
	
	echo $this->table->generate();




テーブルの見かけを変更する
==========================

テーブルクラスでは、レイアウトのデザインを指定可能なテーブルテンプレー
トをセットすることができます。 下記は、テンプレートの見本です:


::

	
	$tmpl = array (
	                    'table_open'          => '<table border="0" cellpadding="4" cellspacing="0">',
	
	                    'heading_row_start'   => '<tr>',
	                    'heading_row_end'     => '</tr>',
	                    'heading_cell_start'  => '<th>',
	                    'heading_cell_end'    => '</th>',
	
	                    'row_start'           => '<tr>',
	                    'row_end'             => '</tr>',
	                    'cell_start'          => '<td>',
	                    'cell_end'            => '</td>',
	
	                    'row_alt_start'       => '<tr>',
	                    'row_alt_end'         => '</tr>',
	                    'cell_alt_start'      => '<td>',
	                    'cell_alt_end'        => '</td>',
	
	                    'table_close'         => '</table>'
	              );
	
	
	$this->table->set_template($tmpl);


.. note:: テンプレートに2セットの"row"ブロックがあるのがわかると思います。 これにより、繰り返すたびに交互に
変わる行の色やデザイン要素のパターンを作成することができます。

完全なテンプレートを指定しなくても構いません。レイアウトの一部分だけを
変更したい場合、単にその部分だけを指定することができます。
次の例では、テーブルの開始タグだけが変更されます:


::

	
	$tmpl = array ( 'table_open'  => '<table border="1" cellpadding="2" cellspacing="1" class="mytable">' );
	
	
	$this->table->set_template($tmpl);




メソッドリファレンス
####################



$this->table->generate()
========================

生成されたテーブルを文字列で返します。オプションで、配列かデータベース
の結果オブジェクトを引数にとります。



$this->table->set_caption()
===========================

テーブルのキャプションを追加できます。


::

	$this->table->set_caption('Colors');




$this->table->set_heading()
===========================

テーブルのヘッダを追加できます。配列か個別のパラメータが指定できます:


::

	$this->table->set_heading('Name', 'Color', 'Size');


::

	$this->table->set_heading(array('Name', 'Color', 'Size'));




$this->table->add_row()
=======================

テーブルに行を追加できます。配列か個別のパラメータが指定できます:


::

	$this->table->add_row('Blue', 'Red', 'Green');


::

	$this->table->add_row(array('Blue', 'Red', 'Green'));


個別のセルのタグ属性を設定したい場合は連想配列を用いることができます。
その連想配列の 'data' キーはセルのデータを定義します。その他のキーは
key => val の組がタグの属性 key='val' として追加されます。


::

	$cell = array('data' => 'Blue', 'class' => 'highlight', 'colspan' => 2);
	$this->table->add_row($cell, 'Red', 'Green');
	
	// 生成
	// <td class='highlight' colspan='2'>Blue</td><td>Red</td><td>Green</td>




$this->table->make_columns()
============================

このメソッドは、一次元配列を入力として、指定した列数になるような深さの
多次元配列を生成します。
これを使うと、たくさんのデータが入った1次元配列を、
固定の行数のテーブルに表示させることができます。
次のような例が挙げられます:


::

	
	$list = array('one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve');
	
	$new_list = $this->table->make_columns($list, 3);
	
	$this->table->generate($new_list);
	
	// 次のような例のテーブルを生成します
	
	<table border="0" cellpadding="4" cellspacing="0">
	<tr>
	<td>one</td><td>two</td><td>three</td>
	</tr><tr>
	<td>four</td><td>five</td><td>six</td>
	</tr><tr>
	<td>seven</td><td>eight</td><td>nine</td>
	</tr><tr>
	<td>ten</td><td>eleven</td><td>twelve</td></tr>
	</table>




$this->table->set_template()
============================

テンプレートを設定できます。完全なテンプレートか部分的なテンプレートを
指定できます。


::

	
	$tmpl = array ( 'table_open'  => '<table border="1" cellpadding="2" cellspacing="1" class="mytable">' );
	
	
	$this->table->set_template($tmpl);




$this->table->set_empty()
=========================

テーブルのセルが空だった場合に使用される初期値をセットできます。たとえ
ば、改行なしスペースを指定したいときは次のようにします:


::

	
	$this->table->set_empty(" ");




$this->table->clear()
=====================

テーブルのヘッダとテーブルの行データをクリアします。もとになるデータが
異なる複数のテーブルを表示する必要がある場合、 各テーブルが作成された
あとに、以前のテーブルの情報を空にするため、このメソッドを呼び出さなく
てはなりません。例:


::

	
	$this->load->library('table');
	
	$this->table->set_heading('Name', 'Color', 'Size');
	$this->table->add_row('Fred', 'Blue', 'Small');
	$this->table->add_row('Mary', 'Red', 'Large');
	$this->table->add_row('John', 'Green', 'Medium');
	
	echo $this->table->generate();
	
	$this->table->clear();
	
	$this->table->set_heading('Name', 'Day', 'Delivery');
	$this->table->add_row('Fred', 'Wednesday', 'Express');
	$this->table->add_row('Mary', 'Monday', 'Air');
	$this->table->add_row('John', 'Saturday', 'Overnight');
	
	echo $this->table->generate();




$this->table->function
======================

ネイティブのPHP関数や適切な関数を指定することで配列オブジェクトの全セ
ルデータに適用することができます。


::

	$this->load->library('table');
	
	$this->table->set_heading('Name', 'Color', 'Size');
	$this->table->add_row('Fred', '<strong>Blue</strong>', 'Small');
	
	$this->table->function = 'htmlspecialchars';
	echo $this->table->generate();


上記の例では、すべてのセルデータはPHPの htmlspecialchars()
関数を通過することになり、結果は以下の通りです:


::

	<td>Fred</td><td><strong>Blue</strong></td><td>Small</td>


