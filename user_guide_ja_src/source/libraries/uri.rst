##########
URI クラス
##########

URI クラスは、URI
文字列から情報を取り出すのに役立つメソッドを提供しています。 また、URI
ルーティングを利用している場合、再ルーティングされたあとのセグメントに
ついての情報を取り出すことができます。

.. note:: このクラスは、システムで自動的に初期化されるので、手動で初期化する必要はありません。



$this->uri->segment( n )
========================

特定のセグメントを取り出すことができます。ここでの n
は取り出したいセグメント番号になります。
セグメントは左から順に番号がつけられています。たとえば、完全な URL
が次のようなものだった場合:


::

	http://example.com/index.php/news/local/metro/crime_is_up


セグメント番号は次のようになります:


#. news
#. local
#. metro
#. crime_is_up


このメソッドは、初期状態では、セグメントが存在しない場合にFALSE
(ブール値) を返します。 第2引数はオプションで、セグメントが存在しなか
った場合のデフォルト値をセットすることができます。 たとえば、以下では
、失敗したときに0を返すよう、このメソッドに通知しています:


::

	$product_id = $this->uri->segment(3, 0);


このようにすれば、次のようなコードを書かなくて済みます:


::

	if ($this->uri->segment(3) === FALSE)
	{
	    $product_id = 0;
	}
	else
	{
	    $product_id = $this->uri->segment(3);
	}




$this->uri->rsegment( n )
=========================

このメソッドは、CodeIgniter の :doc:`URI ルーティング
<../general/routing>` 機能を使っている場合にできる再ルートされた後のUR
Iの特定のセグメントを取得することを除いて、先のメソッドと同じものです
。



$this->uri->slash_segment( n )
==============================

このメソッドはまた、第2引数で指定した方法に従って、セグメントの末尾/先
頭にスラッシュを追加すること以外は、 $this->uri->segment() メソッドと
同じものです。第2引数が指定されなかった場合、末尾にスラッシュを付加し
ます。例:


::

	$this->uri->slash_segment(3);
	$this->uri->slash_segment(3, 'leading');
	$this->uri->slash_segment(3, 'both');


それぞれ次の値を返します:


#. segment/
#. /segment
#. /segment/




$this->uri->slash_rsegment( n )
===============================

このメソッドは、CodeIgniterの :doc:`URI ルーティング
<../general/routing>` 機能を使っている場合にできる再ルートされた後のUR
Iの特定のセグメントにスラッシュを追加することを除いて、先のメソッドと
同じものです。



$this->uri->uri_to_assoc( n )
=============================

このメソッドは、URI セグメントを キー/値
ペアの連想配列に変換します。次のような URI があるとします:


::

	index.php/user/search/name/joe/location/UK/gender/male


このメソッドを使うと、次の例のように、URI が連想配列に変換されます:


::

	[array]
	(
	    'name' => 'joe'
	    'location'	=> 'UK'
	    'gender'	=> 'male'
	)


メソッドの第1引数で、オフセットを設定できます。通常は第1、第2セグメン
トは、コントローラ/メソッドになっているので、 デフォルトでは 3
に設定されています。例:


::

	
	$array = $this->uri->uri_to_assoc(3);
	
	echo $array['name'];


第2引数では、デフォルトのキー名をセットできます。こうすることで、URI 
に存在しない場合でも、返される配列には、常に期待される添字が含まれるこ
とになります。例:


::

	
	$default = array('name', 'gender', 'location', 'type', 'sort');
	
	$array = $this->uri->uri_to_assoc(3, $default);


もともと URI
に値が含まれない場合、配列の添字はその名前にセットされ、値には、FALSE
がセットされます。

最後に、キーが指定されているにもかかわらず、対応する値が見つからなかっ
た場合 (URI セグメント数が奇数だった場合)、値はFALSE (ブール値)
にセットされます。



$this->uri->ruri_to_assoc( n )
==============================

このメソッドは、CodeIgniterの :doc:`URI ルーティング
<../general/routing>` 機能を使っている場合にできる再ルートされた後の
URI
を使って連想配列に変換することを除いて、先のメソッドと同じものです。



$this->uri->assoc_to_uri()
==========================

連想配列を入力とし、URI
文字列をそこから生成します。配列のキーがURL文字列に含まれます。例:


::

	$array = array('product' => 'shoes', 'size' => 'large', 'color' => 'red');
	
	$str = $this->uri->assoc_to_uri($array);
	
	// 次の文字列を生成します: product/shoes/size/large/color/red




$this->uri->uri_string()
========================

完全な URI をもとにして、URL
文字列を返します。たとえば、次のような完全URLだった場合:


::

	http://example.com/index.php/news/local/345


このメソッドは次の文字列を返します:


::

	/news/local/345




$this->uri->ruri_string()
=========================

このメソッドは、CodeIgniterの :doc:`URI ルーティング
<../general/routing>` 機能を使っている場合にできる再ルートされた後の
URI を返すことを除いて、先のメソッドと同じものです。



$this->uri->total_segments()
============================

合計のセグメント数を返します。



$this->uri->total_rsegments()
=============================

このメソッドは、CodeIgniterの :doc:`URI ルーティング
<../general/routing>` 機能を使っている場合にできる再ルートされた後のUR
Iのセグメント総数を返すことを除いて、先のメソッドと同じものです。



$this->uri->segment_array()
===========================

URIセグメントからなる配列を返します。例:


::

	
	$segs = $this->uri->segment_array();
	
	foreach ($segs as $segment)
	{
	    echo $segment;
	    echo '<br />';
	}




$this->uri->rsegment_array()
============================

このメソッドは、CodeIgniter の :doc:`URI ルーティング
<../general/routing>` 機能を使っている場合にできる再ルートされた後の
URI
セグメントからなる配列を返すことを除いて、先のメソッドと同じものです。

