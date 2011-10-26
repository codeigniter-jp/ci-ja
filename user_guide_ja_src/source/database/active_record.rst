####################
Active Record クラス
####################

CodeIgniter は Active Record データベースパターンの改変版を採用して
います。このパターンを利用すると、情報の取得や挿入、そして更新が最小限
のスクリプティングで可能になります。データベース処理をするのに、たった
1、2行しか必要でない場合さえあります。CodeIgniter ではデータベースごと
に専用のクラスを必要としたりはしません。そのおかげで、より単純化された
インターフェースが提供されています。

Active Record 機能を使う大きな利点は、単に単純であるからだけでなく、Active Record 機
能を使えば、クエリの構文は各種のデータベースアダプタが生成してくれるの
で、 データベースから独立したアプリケーションを作成できるということで
す。また、システムにより自動的に値のエスケープ処理が行われるので、より
安全なクエリが利用可能になります。

.. note:: クエリを自分で書きたい場合は、データベース設定ファイルでこの
	クラスを使用できないようにすることもできます。そうすることで、コアの
	データベースライブラリとアダプタに、少ないリソースを有効活用させることができます。

.. contents:: Page Contents

************
データの選択
************

次のメソッドを使えば、SQLの **SELECT** 文を組み立てられます。

$this->db->get()
================

SELECT クエリを実行し、結果を返します。次のように、単独で使うと、
テーブルの全レコードを取得するのに使えます::

	$query = $this->db->get('mytable');  // 次の文を生成します: SELECT * FROM mytable

第2、第3引数で、limit 句と offset 句を
セットできます::

	$query = $this->db->get('mytable', 10, 20);
	// 生成する文: SELECT * FROM mytable LIMIT 20, 10 (MySQL での例。他のデータベースでは、若干違う構文になります)

上の例ではメソッドは $query という名前の変数にアサインされていますが、
この変数は、結果を表示させるのに使用できます::

	$query = $this->db->get('mytable');
	
	foreach ($query->result() as $row)
	{
		echo $row->title;
	}

結果の生成について完全に論じている :doc:`結果メソッド <results>`
ページを見てみてください。

$this->db->get_compiled_select()
================================

Compiles the selection query just like `$this->db->get()`_ but does not *run* 
the query. This method simply returns the SQL query as a string.

Example::

	$sql = $this->db->get_compiled_select('mytable');
	echo $sql;
	
	// Produces string: SELECT * FROM mytable
	
The second parameter enables you to set whether or not the active record query 
will be reset (by default it will be&mdash;just like `$this->db->get()`)::

	echo $this->db->limit(10,20)->get_compiled_select('mytable', FALSE);
	// Produces string: SELECT * FROM mytable LIMIT 20, 10 
	// (in MySQL. Other databases have slightly different syntax)
	
	echo $this->db->select('title, content, date')->get_compiled_select();

	// Produces string: SELECT title, content, date FROM mytable
	
The key thing to notice in the above example is that the second query did not 
utilize `$this->db->from()`_ and did not pass a table name into the first 
parameter. The reason for this outcome is because the query has not been 
executed using `$this->db->get()`_ which resets values or reset directly 
using `$this-db->reset_query()`_.


$this->db->get_where()
======================

db->where() メソッドを使用する代わりに、 "where" 句を
第2引数で追加できること以外は上のメソッドと
同じです::

	$query = $this->db->get_where('mytable', array('id' => $id), $limit, $offset);

where メソッドについては、詳しくは下をご覧ください。

.. note:: get_where() は、以前は getwhere() という名前でした。getwhere() は [ 訳注: 2.0.0 で ] 廃止されました。


$this->db->select()
===================

次のようにすると、クエリの SELECT の部分を指定できます [ 訳注: 選択したい列を指定できるということ ]::

	$this->db->select('title, content, date');
	$query = $this->db->get('mytable');  // 生成される SQL 文: SELECT title, content, date FROM mytable


.. note:: テーブルからすべての列(\*)を取得する場合は、このメソッドは不要です。このメソッドが省略されると、
	CodeIgniter はすべての列を選択する(SELECT * ... )ものとします。

$this->db->select() は追加で第2引数をセットできます。第2引数に FALSE をセットすると、CodeIgniter はバッククォート(バックチック)でフィールド
名やテーブル名を保護しないようになります [ 訳注: 識別子(テーブル名や列名など)が予約語の場合や、特殊文字が含まれる場合、たとえば MySQL では、バッククォート「`」でそれらを囲む必要があります。第2引数に FALSE
をセットするとこれを自動では行いません ]。これは、複合的な SELECT 文が必要な場合に有用です。

::

	$this->db->select('(SELECT SUM(payments.amount) FROM payments WHERE payments.invoice_id=4') AS amount_paid', FALSE); 
	$query = $this->db->get('mytable');


$this->db->select_max()
=======================

クエリの "SELECT MAX(field)" の部分を書き出します。
結果フィールドをリネームするために、追加で第2引数を指定できます。

::

	$this->db->select_max('age');
	$query = $this->db->get('members');  // 次を生成: SELECT MAX(age) as age FROM members
	
	$this->db->select_max('age', 'member_age');
	$query = $this->db->get('members');  // 次を生成: SELECT MAX(age) as member_age FROM members


$this->db->select_min()
=======================

クエリの "SELECT MIN(field)" の部分を書き出します。
select_max() と同様に、結果フィールドをリネームするために、
追加で第2引数を指定できます。

::

	$this->db->select_min('age');
	$query = $this->db->get('members'); // 次を生成: SELECT MIN(age) as age FROM members


$this->db->select_avg()
=======================

クエリの "SELECT AVG(field)" の部分を書き出します。
select_max() と同様に、結果フィールドをリネームするために、
追加で第2引数を指定できます。

::

	$this->db->select_avg('age');
	$query = $this->db->get('members'); // 次を生成: SELECT AVG(age) as age FROM members


$this->db->select_sum()
=======================

クエリの"SELECT SUM(field)"の部分を書き出します。 select_max() と同様
に、結果フィールドをリネームするために、
追加で第2引数を指定できます。

::

	$this->db->select_sum('age');
	$query = $this->db->get('members'); // 次を生成: SELECT SUM(age) as age FROM members


$this->db->from()
=================

次のようにすると、クエリの FROM の部分を指定できます::

	$this->db->select('title, content, date');
	$this->db->from('mytable');
	$query = $this->db->get();  // 生成される SQL 文: SELECT title, content, date FROM mytable

.. note:: 先に示したとおり、クエリの FROM の部分は、$this->db->get()
	メソッドの中で指定できます。どちらを使うかは好みです。

$this->db->join()
=================

次のようにすると、クエリの JOIN の部分を指定できます::

	$this->db->select('*');
	$this->db->from('blogs');
	$this->db->join('comments', 'comments.id = blogs.id');
	$query = $this->db->get();
	
	// 生成される SQL 文:
	// SELECT * FROM blogs JOIN comments ON comments.id = blogs.id

1回のクエリで複数の JOIN が必要な場合は、メソッドを複数回
呼んでください。

特定の種類の結合が必要な場合は、第3引数でその種類を指定できます。
指定可能なのは: left、right、outer、inner、left outer および right
outer。

::

	$this->db->join('comments', 'comments.id = blogs.id', 'left');
	// 生成される SQL 文: LEFT JOIN comments ON comments.id = blogs.id

$this->db->where()
==================

このメソッドを使うと **WHERE** 句を4つの方法で指定することが
できます:

.. note:: このメソッドに渡されるすべての値は自動的にエスケープされ、
	安全なクエリを生成します。

#. **単に キー/値 を指定する方法:**

	::

		$this->db->where('name', $name); // 生成される SQL 文: WHERE name = 'Joe'	

	等号 (=) が付加されることに注意してください。

	複数回このメソッドを呼ぶと、
	それらは AND で連結されます:

::

		$this->db->where('name', $name);
		$this->db->where('title', $title);
		$this->db->where('status', $status);
		// WHERE name = 'Joe' AND title = 'boss' AND status = 'active'  

#. **演算子を指定しながら キー/値 を指定する方法:**
	比較方法を指定するために、
	第1引数に演算子を含めることができます:

	::

		$this->db->where('name !=', $name);
		$this->db->where('id <', $id); // 生成される SQL 文: WHERE name != 'Joe' AND id < 45	

#. **連想配列を使用する方法:**

	::

		$array = array('name' => $name, 'title' => $title, 'status' => $status);
		$this->db->where($array);
		// 生成される SQL 文: WHERE name = 'Joe' AND title = 'boss' AND status = 'active'	

	またこの方法を使う場合も、次のように、演算子を含めて指定することができます:

	::

		$array = array('name !=' => $name, 'id <' => $id, 'date >' => $date);
		$this->db->where($array);

#. **自由に指定できる文字列を使用する方法:**
   WHERE 句の中身を自分で書くこともできます::

		$where = "name='Joe' AND status='boss' OR status='active'";
		$this->db->where($where);


$this->db->where() にはオプションで第3の引数を渡すこともできます。FALSE
を渡した場合、CodeIgniter はフィールド名やテーブル名をバックチック(`)
を使って守りません。

::

	$this->db->where('MATCH (field) AGAINST ("value")', NULL, FALSE); 


$this->db->or_where()
=====================

他の句と OR で連結される以外は、
上のメソッドと同じものです::

	$this->db->where('name !=', $name);
	$this->db->or_where('id >', $id);  // 生成される SQL 文: WHERE name != 'Joe' OR id > 50

.. note:: or_where() は、以前は orwhere() という名前でした。 orwhere() は2.0.0 で
	廃止されました。

$this->db->where_in()
=====================

適切な場合には、AND で連結して、「WHERE field IN ('item', 'item') 」
SQLクエリを生成します

::

	$names = array('Frank', 'Todd', 'James');
	$this->db->where_in('username', $names);
	// 次を生成: WHERE username IN ('Frank', 'Todd', 'James')


$this->db->or_where_in()
========================

適切な場合には、OR で連結して、「WHERE field IN ('item', 'item')」
SQLクエリを生成します

::

	$names = array('Frank', 'Todd', 'James');
	$this->db->or_where_in('username', $names);
	// 次を生成: OR WHERE username IN ('Frank', 'Todd', 'James')


$this->db->where_not_in()
=========================

適切な場合には、AND で連結して、 「WHERE field NOT IN ('item', 'item')」
SQLクエリを生成します

::

	$names = array('Frank', 'Todd', 'James');
	$this->db->where_not_in('username', $names);
	// 次を生成: WHERE username NOT IN ('Frank', 'Todd', 'James')


$this->db->or_where_not_in()
============================

適切な場合には、NOT で連結して、「WHERE field NOT IN ('item',
'item')」 SQLクエリを生成します

::

	$names = array('Frank', 'Todd', 'James');
	$this->db->or_where_not_in('username', $names);
	// 次を生成: OR WHERE username NOT IN ('Frank', 'Todd', 'James')


$this->db->like()
=================

このメソッドを使うと、検索でよく使う **LIKE** 句を
生成できます。

.. note:: このメソッドに渡されるすべての値は自動でエスケープされます。

#. **単に キー/値 を指定する方法:**

	::

		$this->db->like('title', 'match');     // 生成される SQL 文: WHERE title LIKE '%match%'

	複数回このメソッドを呼ぶと、それらは AND で
	連結されます::

		$this->db->like('title', 'match');
		$this->db->like('body', 'match');
		// WHERE title LIKE '%match%' AND  body LIKE '%match%'

	ワイルドカード (%) が付加される場所を制御したい場合は、追加の第3引数を
	利用できます。'before'、'after' そして 'both' (規定値)
	が指定できる選択肢になります。

	::

		$this->db->like('title', 'match', 'before');	// 次を生成: WHERE title LIKE '%match'
		$this->db->like('title', 'match', 'after');		// 次を生成: WHERE title LIKE 'match%'
		$this->db->like('title', 'match', 'both');		// 次を生成: WHERE title LIKE '%match%'

#. **連想配列を使用する方法:**

	::

		$array = array('title' => $match, 'page1' => $match, 'page2' => $match);
		$this->db->like($array);
		// WHERE title LIKE '%match%' AND  page1 LIKE '%match%' AND  page2 LIKE '%match%'


$this->db->or_like()
====================

他の句と OR で連結される以外は、
上のメソッドと同じものです::

	$this->db->like('title', 'match'); $this->db->or_like('body', $match);
	// WHERE title LIKE '%match%' OR  body LIKE '%match%'

.. note:: or_like() は、以前は orlike()という名前でした。 orlike() は2.0.0 で廃止されました。

$this->db->not_like()
=====================

この関数は、NOT LIKE 文を生成する事を除き、 **like()** と
同じです::

	$this->db->not_like('title', 'match');  // WHERE title NOT LIKE '%match%

$this->db->or_not_like()
========================

この関数は、複数のものが、OR で連結されるということ以外は、 **not_like()**
と同じです::

	$this->db->like('title', 'match');
	$this->db->or_not_like('body', 'match'); 
	// WHERE title  LIKE '%match% OR body NOT LIKE '%match%'

$this->db->group_by()
=====================

クエリの GROUP BY の部分を指定できます::

	$this->db->group_by("title"); // 生成される SQL 文: GROUP BY title

また、次のように、複数の値を配列で渡すこともできます::

	$this->db->group_by(array("title", "date");  // 生成される SQL 文: GROUP BY title, date

.. note:: group_by() は、以前は groupby() という名前でした。groupby()は
	廃止されました。

$this->db->distinct()
=====================

"DISTINCT" キーワードをクエリに追加します

::

	$this->db->distinct();
	$this->db->get('table'); // 次を生成: SELECT DISTINCT * FROM table


$this->db->having()
===================

クエリの HAVING の部分を指定できます。1つまたは2つ引数を渡す
2種類の文法があります。::

	$this->db->having('user_id = 45');  // 生成される SQL 文 : HAVING user_id = 45
	$this->db->having('user_id',  45);  // 生成される SQL 文 : HAVING user_id = 45

また、次のように、複数の値を配列で渡すこともできます::

	$this->db->having(array('title =' => 'My Title', 'id <' => $id));
	// 生成される SQL 文: HAVING title = 'My Title', id < 45


CodeIgniter がクエリをエスケープすることのできるデータベースを使ってい
る場合は、第3引数を FALSE
にして、エスケープを無効にすることができます。

::

	$this->db->having('user_id',  45);  // 生成される SQL 文: HAVING `user_id` = 45 in some databases such as MySQL
	$this->db->having('user_id',  45, FALSE);  // 生成される SQL 文: HAVING user_id = 45


$this->db->or_having()
======================

複数の句を "OR" で分つ以外は、having() と同じです。

$this->db->order_by()
=====================

ORDER BY 句を指定できます。第1引数は、並べ替えたい列の名前を指定します。
第2引数は、並べ替え結果の順序を指定します。選択肢は asc または desc
または random です。

::

	$this->db->order_by("title", "desc");  // 生成される SQL 文: ORDER BY title DESC

第1引数で、自由に文字列で指定することもできます::

	$this->db->order_by('title desc, name asc');  // 生成される SQL 文: ORDER BY title DESC, name ASC

あるいは、複数のフィールドが必要な場合は、複数回のメソッド呼び出しもできます。

::

	$this->db->order_by("title", "desc");
	$this->db->order_by("name", "asc"); // 次を生成: ORDER BY title DESC, name ASC


.. note:: order_by() は、以前は orderby() という名前でした。orderby() は
	廃止されました。

.. note:: 現在のところ Oracle または MSSQL ドライバでは、ランダムな並べ替えはサポートされていません。
	これらは、'ASC' が規定値に設定されます。

$this->db->limit()
==================

クエリで返す結果の行数の上限を指定できます。::

	$this->db->limit(10);  // 生成される SQL 文: LIMIT 10

第2引数でオフセットを指定できます。

::

	$this->db->limit(10, 20);  // 生成される SQL 文: LIMIT 20, 10 (MySQLでの例。他のデータベースでは、若干違う構文になります。)

$this->db->count_all_results()
==============================

特定の Active Record クエリの行数を調べることができます。
クエリは、where()、 or_where()、like()、or_like()などの Active Record
の絞り込みが利用できます。例::

	echo $this->db->count_all_results('my_table');  // 25のような整数が出力されます
	$this->db->like('title', 'match');
	$this->db->from('my_table');
	echo $this->db->count_all_results(); // 17 のような整数が出力されます

$this->db->count_all()
======================

特定のテーブルのデータ件数(行数)をカウントします。
第1引数にテーブル名を指定します。例::

	echo $this->db->count_all('my_table');  // 「25」のような整数が生成されます。

************
データの挿入
************

$this->db->insert()
===================

与えられたデータをもとに INSERT 文を生成し実行します。
**配列** または **オブジェクト** のどちらかでメソッドにデータを渡せます。
配列を使った例は次の通りです::

	$data = array(
		'title' => 'My title',
		'name' => 'My Name',
		'date' => 'My date'
	);
	
	$this->db->insert('mytable', $data);
	// 生成される SQL 文: INSERT INTO mytable (title, name, date) VALUES ('My title', 'My name', 'My date')

第1引数はテーブル名で、第2引数は、値の連想配列で
指定します。

オブジェクトを使った例は次の通りです::

	/*
	class Myclass {
		var  $title = 'My Title';
		var  $content = 'My Content';
		var  $date = 'My Date';
	}
	*/
	
	$object = new Myclass;
	$this->db->insert('mytable', $object);
	// 生成される SQL 文: INSERT INTO mytable (title, content, date) VALUES ('My Title', 'My Content', 'My Date')

第1引数はテーブル名で、第2引数はオブジェクトに
なります。

.. note:: すべての値は自動的にエスケープされ、安全なクエリを生成します。
$this->db->get_compiled_insert()
================================
Compiles the insertion query just like `$this->db->insert()`_ but does not 
*run* the query. This method simply returns the SQL query as a string.

Example::

	$data = array(
		'title' => 'My title',
		'name'  => 'My Name',
		'date'  => 'My date'
	);
	
	$sql = $this->db->set($data)->get_compiled_insert('mytable');
	echo $sql;
	
	// Produces string: INSERT INTO mytable (title, name, date) VALUES ('My title', 'My name', 'My date')

The second parameter enables you to set whether or not the active record query 
will be reset (by default it will be--just like `$this->db->insert()`_)::
	
	echo $this->db->set('title', 'My Title')->get_compiled_insert('mytable', FALSE);
	
	// Produces string: INSERT INTO mytable (title) VALUES ('My Title')
	
	echo $this->db->set('content', 'My Content')->get_compiled_insert();

	// Produces string: INSERT INTO mytable (title, content) VALUES ('My Title', 'My Content')
	
The key thing to notice in the above example is that the second query did not 
utlize `$this->db->from()`_ nor did it pass a table name into the first 
parameter. The reason this worked is because the query has not been executed 
using `$this->db->insert()`_ which resets values or reset directly using 
`$this->db->reset_query()`_.

$this->db->insert_batch()
=========================

与えられたデータをもとに INSERT 文を生成し実行します。
**配列** または **オブジェクト** のどちらかでメソッドにデータを渡せます。
配列を使った例は次の通りです::

	$data = array(
		array(
			'title' => 'My title',
			'name' => 'My Name',
			'date' => 'My date'
		),
		array(
			'title' => 'Another title',
			'name' => 'Another Name',
			'date' => 'Another date'
		)
	);
	
	$this->db->insert_batch('mytable', $data);
	// 生成される SQL 文: INSERT INTO mytable (title, name, date) VALUES ('My title', 'My name', 'My date'),  ('Another title', 'Another name', 'Another date')

第1引数はテーブル名で、第2引数は、
値の連想配列で指定します。

.. note:: すべての値は自動的にエスケープされ、安全なクエリを生成します。

$this->db->set()
================

inserts または updates で値をセットするのに使います。

**これは次のように、 insert または update メソッドに直接データの
配列を渡す代わりに使用できます:**

::

	$this->db->set('name', $name);
	$this->db->insert('mytable');  // 生成される SQL 文: INSERT INTO mytable (name) VALUES ('{$name}')

もし複数のメソッドをコールした場合、それらは insert か update
かに基づき適切に組み立てられます::

	$this->db->set('name', $name);
	$this->db->set('title', $title);
	$this->db->set('status', $status);
	$this->db->insert('mytable'); 

また、 **set()** は、FALSE
をセットするとデータをエスケープするのを回避する、
第3引数($escape)をセットできます。違いを示すため、escape パラメータを
利用する場合と利用しない場合、両方の set() の使用の
説明を挙げます。

::

	$this->db->set('field', 'field+1', FALSE);
	$this->db->insert('mytable'); // INSERT INTO mytable (field) VALUES (field+1) を生成
	$this->db->set('field', 'field+1');
	$this->db->insert('mytable'); // INSERT INTO mytable (field) VALUES ('field+1') を生成


このメソッドに連想配列を渡すこともできます::

	$array = array(
		'name' => $name,
		'title' => $title,
		'status' => $status
	);
	
	$this->db->set($array);
	$this->db->insert('mytable');

あるいはオブジェクトを渡すこともできます::

	/*
	class Myclass {
		var  $title = 'My Title';
		var  $content = 'My Content';
		var  $date = 'My Date';
	}
	*/
	
	$object = new Myclass;
	$this->db->set($object);
	$this->db->insert('mytable');


************
データの更新
************

$this->db->update()
===================

指定されたデータをもとに UPDATE 文を生成してクエリを実行します。
**配列** または **オブジェクト** をメソッドに渡すことができます。
配列を使った例は次の通りです::

	$data = array(
		'title' => $title,
		'name' => $name,
		'date' => $date
	);
	
	$this->db->where('id', $id);
	$this->db->update('mytable', $data);
	// 生成される SQL 文: // UPDATE mytable // SET title = '{$title}', name = '{$name}', date = '{$date}' // WHERE id = $id

あるいは、次のようにオブジェクトを渡すこともできます::

	/*
	class Myclass {
		var  $title = 'My Title';
		var  $content = 'My Content';
		var  $date = 'My Date';
	}
	*/
	
	$object = new Myclass;
	$this->db->where('id', $id);
	$this->db->update('mytable', $object);
	// 生成される SQL 文: // UPDATE mytable // SET title = '{$title}', name = '{$name}', date = '{$date}' // WHERE id = $id

.. note:: すべての値は自動的にエスケープされ、安全なクエリを生成します。

$this->db->where() メソッドを使えば WHERE 句をセットできます。
次のように、オプションで、更新メソッドに直接文字列で情報を渡すことも
できます::

	$this->db->update('mytable', $data, "id = 4");

あるいは、配列でも渡せます::

	$this->db->update('mytable', $data, array('id' => $id));

先に述べた、 $this->db->set() メソッドを更新に利用することも
できます。

$this->db->update_batch()
=========================

与えられたデータをもとに UPDATE 文を生成し実行します。
**配列** または **オブジェクト** のどちらかでメソッドにデータを渡せます。
配列を使った例は次の通りです::

	$data = array(
	   array(
	      'title' => 'My title' ,
	      'name' => 'My Name 2' ,
	      'date' => 'My date 2'
	   ),
	   array(
	      'title' => 'Another title' ,
	      'name' => 'Another Name 2' ,
	      'date' => 'Another date 2'
	   )
	);

	$this->db->update_batch('mytable', $data, 'title');

	// 生成される SQL 文: 
	// UPDATE `mytable` SET `name` = CASE
	// WHEN `title` = 'My title' THEN 'My Name 2'
	// WHEN `title` = 'Another title' THEN 'Another Name 2'
	// ELSE `name` END,
	// `date` = CASE 
	// WHEN `title` = 'My title' THEN 'My date 2'
	// WHEN `title` = 'Another title' THEN 'Another date 2'
	// ELSE `date` END
	// WHERE `title` IN ('My title','Another title')

第1引数はテーブル名、第2引数は値の連想配列、第3引数は where
句を指定します。

.. note:: すべての値は自動的にエスケープされ、安全なクエリを生成します。

$this->db->get_compiled_update()
================================

This works exactly the same way as ``$this->db->get_compiled_insert()`` except
that it produces an UPDATE SQL string instead of an INSERT SQL string.

For more information view documentation for `$this->get_compiled_insert()`_.


************
データの削除
************

$this->db->delete()
===================

SQL の DELETE 文を生成して実行します。

::

	$this->db->delete('mytable', array('id' => $id)); // 生成される SQL 文: // DELETE FROM mytable // WHERE id = $id

第1引数はテーブル名で、第2引数は、WHERE
句です。次のように、メソッドの第2引数にデータを渡す代わりに、 where()
または or_where() メソッドを使うこともできます::

	$this->db->where('id', $id);
	$this->db->delete('mytable');
	
	// 生成される SQL 文:
	// DELETE FROM mytable
	// WHERE id = $id


1つよりも多いテーブルを削除したい場合は、delete()
にテーブル名の配列を渡すことができます

::

	$tables = array('table1', 'table2', 'table3');
	$this->db->where('id', '5');
	$this->db->delete($tables);


テーブルの全データを削除したい場合は、 truncate() メソッドか
empty_table() が利用できます。

$this->db->empty_table()
========================

「delete」 SQL 文字列 を生成し、クエリを
実行します。::

	  $this->db->empty_table('mytable'); // 次を生成: DELETE FROM mytable


$this->db->truncate()
=====================

「truncate」 SQL 文字列を生成し、クエリを実行します。

::

	$this->db->from('mytable');
	$this->db->truncate();
	
	// または
	
	$this->db->truncate('mytable');
	
	// 次を生成:
	// TRUNCATE mytable 

.. note:: TRUNCATE コマンドが使えない場合は、truncate() メソッドは
	"DELETE FROM table" として実行します。
	
$this->db->get_compiled_delete()
================================
This works exactly the same way as ``$this->db->get_compiled_insert()`` except
that it produces a DELETE SQL string instead of an INSERT SQL string.

For more information view documentation for `$this->get_compiled_insert()`_.

**************
メソッドの連結
**************

メソッドの連結を使えば、複数のメソッドをつなぐのがシンプルになります。
次のような例が挙げられます::

	$query = $this->db->select('title')
				->where('id', $id)
				->limit(10, 20)
				->get('mytable');

.. _ar-caching:

**************************
Active Record キャッシング
**************************

"本当の" キャッシングではないのですが、Active Record では、後で再利用
するためにクエリの特定の部分を保存(あるいは、"キャッシュ")することがで
きます。 通常は、Active Record の呼び出しが完了したときには、保存され
た全情報は、次の呼び出しのためにリセットされます。キャッシングを利用す
ると、このリセットを回避することができ、情報を簡単に再利用できます。

キャッシュされた呼び出しは、累積されます。2回のキャッシュされた
select() を呼び出し、その後に 2回キャッシュされていないselect() を呼び出した場合、
4回 select() を呼び出したことになります。3つのキャッシュ関連メソッドが利用できます:

$this->db->start_cache()
========================

このメソッドは、キャッシュを開始する際にコールされる必要があります。適合する
タイプ(サポートされるクエリについては下記をご覧ください)のすべての Active Record クエリが、
後の使用のために保管されます。

$this->db->stop_cache()
=======================

このメソッドは、キャッシュを停止するときに呼ぶことができます。

$this->db->flush_cache()
========================

このメソッドは、Active Record キャッシュからすべてのアイテムを削除します。

次は使用例です::

	$this->db->start_cache();
	$this->db->select('field1');
	$this->db->stop_cache();
	$this->db->get('tablename');
	// 次のようになります: SELECT `field1` FROM (`tablename`)
	
	$this->db->select('field2');
	$this->db->get('tablename');
	// 次のようになります: SELECT `field1`, `field2` FROM (`tablename`)
	
	$this->db->flush_cache();
	$this->db->select('field2');
	$this->db->get('tablename');
	// 次のようになります: SELECT `field2` FROM (`tablename`)


.. note:: 次のフィールドがキャッシュ可能です: select、from、join、
	where、like、group_by、having、order_by、set



*******************
Reset Active Record
*******************

Resetting Active Record allows you to start fresh with your query without 
executing it first using a method like $this->db->get() or $this->db->insert(). 
Just like the methods that execute a query, this will *not* reset items you've 
cached using `Active Record Caching`_.

This is useful in situations where you are using Active Record to generate SQL 
(ex. ``$this->db->get_compiled_select()``) but then choose to, for instance, 
run the query::

	// Note that the second parameter of the get_compiled_select method is FALSE
	$sql = $this->db->select(array('field1','field2'))
					->where('field3',5)
					->get_compiled_select('mytable', FALSE);

	// ...
	// Do something crazy with the SQL code... like add it to a cron script for
	// later execution or something...
	// ...

	$data = $this->db->get()->result_array();

	// Would execute and return an array of results of the following query:
	// SELECT field1, field1 from mytable where field3 = 5;
