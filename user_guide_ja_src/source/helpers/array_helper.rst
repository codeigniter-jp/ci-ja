############
配列ヘルパー
############

配列ヘルパーのファイルの中身は、配列を使って処理をするのに役立つ関数で
す。



ヘルパーのロード
================

このヘルパーは次のコードを使ってロードします:

::

	$this->load->helper('array');


次の関数が利用できます:



element()
=========

配列から要素を取り出すことができます。この関数は、配列に添字がセットさ
れ、それが値を持つかどうかをテストします。 値を持っている場合はその値
が返されます。もし値がない場合は、FALSEまたは、第3引数で指定した値が返
ります。例:


::

	
	$array = array('color' => 'red', 'shape' => 'round', 'size' => '');
	
	// "red" を返します。
	echo element('color', $array);
	
	// NULLを返します。
	echo element('size', $array, NULL);




random_element()
================

配列を入力として要素をランダムに選んで返します。使用例:


::

	$quotes = array(
	            "I find that the harder I work, the more luck I seem to have. - Thomas Jefferson",
	            "Don't stay in bed, unless you can make money in bed. - George Burns",
	            "We didn't lose the game; we just ran out of time. - Vince Lombardi",
	            "If everything seems under control, you're not going fast enough. - Mario Andretti",
	            "Reality is merely an illusion, albeit a very persistent one. - Albert Einstein",
	            "Chance favors the prepared mind - Louis Pasteur"
	            );
	
	echo random_element($quotes);




elements()
==========

配列から一部の要素のみを取得します。このメソッドは、配列の指定されたキ
ーに要素があるか確認し、なければ FALSE をセットします。第3引数でデフォ
ルト値が指定されている場合は、その値をセットします。例:


::

	
	$array = array(
	    'color' => 'red',
	    'shape' => 'round',
	    'radius' => '10',
	    'diameter' => '20'
	
	);
	
	$my_shape = elements(array('color', 'shape', 'height'), $array);


上記の例では、次の配列が返されます:


::

	
	array(
	    'color' => 'red',
	    'shape' => 'round',
	
	    'height' => FALSE
	);


次のように、第3引数でデフォルト値を指定することもできます。


::

	
	$my_shape = elements(array('color', 'shape', 'height'), $array, NULL);


この場合、次の配列が返されます。


::

	
	array(
	    'color' => 'red',
	    'shape' => 'round',
	    'height' => NULL
	);


このメソッドは、モデルにおいて $_POST
配列を使用するときに便利です。これにより、余計な POST
データがテーブルに送られるのを防ぐことができます。


::

	
	$this->load->model('post_model');
	
	$this->post_model->update(elements(array('id', 'title', 'content'), $_POST));


この例では、id, title および content
フィールドだけがアップデートされます。

