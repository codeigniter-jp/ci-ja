#################
Note: このドライバは実験的なものです。機能や実装は将来のリリースで変更
されるかもしれません。

訳注: 現時点では、このページの記述は一部正しくない可能性があります。




JavaScript クラス
#################

CodeIgniter では一般的な JavaScript
の機能を提供します。ここで注意していただきたいのは、CodeIgniter
の動作に jQuery ライブラリは必須ではありません。ここでは単に、jQuery
ライブラリが便利であるということを紹介します。


クラスの初期化
==============

JavaScript
クラスをコントローラのコンストラクタで手動で初期化するには、
$this->load->library メソッドを使います。
現在のところ、使用できるライブラリは jQuery
のみで、これは次のようにすると自動的にロードされます。


::

	$this->load->library('javascript');


また、JavaScript クラスでは js_library_driver (文字列型) 初期値
'jquery' と autoload (ブール型) 初期値 TRUE
というパラメータを指定することができます。
次のように連想配列を渡すことで、初期値が上書きされます:


::

	$this->load->library('javascript', array('js_library_driver' => 'scripto', 'autoload' => FALSE));


繰り返しになりますが、現在は 'jquery'
のみ使用できます。もっとも、出力される script タグに jQuery
のファイルを含めたくない場合は、 autoload を FALSE
とします。これは、CodeIgniter の外部でロードしている場合や、すでにビュ
ーなどに直接記述している場合に有効です。

一度ロードすれば、jQuery
ライブラリのオブジェクトは次のようにして使用できます:
$this->javascript


準備と設定
==========


ビューに変数をセットする
~~~~~~~~~~~~~~~~~~~~~~~~

アプリケーションから JavaScript
ライブラリを読み込めるようにする必要があります。

JavaScript はクライアントサイドの言語なので、ライブラリは最終的な出力
(つまりビュー) に含まれなければいけません。次の変数をビューの <head>
タグ内に挿入します。


::

	<?php echo $library_src;?>
	<?php echo $script_head;?>



$library_src は、実際のライブラリやその後呼び出されるプラグインのスク
リプトファイルが読み込まれる場所です。$script_head
はイベントや関数、その他のコマンドが表示される場所です。


設定ファイルでライブラリのパスを指定する
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

JavaScript
ライブラリにはいくつかの設定項目があります。これらは、設定ファイル
config/javascript.php または application/config.php
内に記述するか、任意のコントローラ内で set_item()
メソッドにより指定します。

"ajax loader" や進捗表示で使用される画像が指定されていない場合、単に
"loading" というテキストが表示されます。


::

	$config['javascript_location'] = 'http://localhost/codeigniter/themes/js/jquery/';
			$config['javascript_ajax_img'] = 'images/ajax-loader.gif';



ダウンロードしてからディレクトリを変更していない場合、設定する必要はあ
りません



jQuery クラス
=============

jQuery
クラスをコントローラのコンストラクタで手動で初期化するには、次のように
$this->load->library メソッドを使います:


::

	$this->load->library('jquery');


オプションのパラメータにより、ライブラリをロードする際に jQuery の
script タグを自動的に読み込むかどうか指定できます。デフォルトでは生成
されますが、これをやめるには次のようにライブラリをロードします:


::

	$this->load->library('jquery', FALSE);


一度ロードすれば、jQuery
ライブラリのオブジェクトは次のようにして使用できます: $this->jquery



jQuery イベント
===============

イベントは以下の構文を使用してセットされます。


::

	$this->jquery->event('element_path', code_to_run());



上記の例:


-  "event" は次のどれかです: blur, change, click, dblclick, error,
   focus, hover, keydown, keyup, load, mousedown, mouseup, mouseover,
   mouseup, resize, scroll または unload
-  "element_path" は有効な `jQuery のセレクタ
   <http://docs.jquery.com/Selectors>`_ です。jQuery
   固有のセレクタの構文により、これはたいてい element id か CSS
   セレクタになります。たとえば、"#notice_area" は <div id="notice_area">
   に、"#content a.notice" は id が "content" の div
   の中にあるすべてのアンカーに効果があります。
-  "code_to_run()" はあなた自信が書くスクリプトか、以下の jQuery
   ライブラリにある効果のようなアクションです。




効果
====

Jquery ライブラリには、強力な `効果 <http://docs.jquery.com/Effects>`_
のレパートリーがあります。効果を利用する前に、まず次のようにしてロード
します。


::

	$this->jquery->effect([オプションのパス名] プラグイン名);
	// 例: 
	$this->jquery->effect('bounce');





hide() / show()
~~~~~~~~~~~~~~~

ページ上のアイテムの可視性 (表示/非表示) に作用します。hide()
はアイテムを非表示にし、show() はそれを表示します。


::

	$this->jquery->hide(target, optional speed, optional extra information);
		$this->jquery->show(target, optional speed, optional extra information);




-  "target" は有効な jQuery のセレクタです (複数可)。
-  "speed" はオプションで、slow (ゆっくり), normal (普通), fast (速い)
   のどれか、またはミリ秒単位の数値を指定します。
-  "extra information"
   はオプションで、コールバック関数他の追加情報を指定できます。




toggle()
~~~~~~~~

アイテムの 表示/非表示
を切り替えます。見えている場合は隠し、隠れている場合は表示します。


::

	$this->jquery->toggle(target);




-  "target" は有効な jQuery のセレクタです (複数可)。




animate()
~~~~~~~~~


::

	 $this->jquery->animate(target, parameters, optional speed, optional extra information);




-  "target" は有効な jQuery のセレクタです (複数可)。
-  "paramters" 変化させたい CSS のプロパティです。
-  "speed" はオプションで、slow (ゆっくり), normal (普通), fast (速い)
   のどれか、またはミリ秒単位の数値を指定します。
-  "extra information"
   はオプションで、コールバック関数他の追加情報を指定できます。


詳細は次のページを参照してください:
`http://docs.jquery.com/Effects/animate
<http://docs.jquery.com/Effects/animate>`_

以下は、id が "note" の div に animate() を使用したときの例で、 jQuery
ライブラリの click() イベントを使用してクリックをトリガにしています。


::

	 $params = array(
		'height' => 80,
		'width' => '50%',
		'marginLeft' => 125
	);
	$this->jquery->click('#trigger', $this->jquery->animate('#note', $params, normal));





fadeIn() / fadeOut()
~~~~~~~~~~~~~~~~~~~~


::

	$this->jquery->fadeIn(target, optional speed, optional extra information);
		$this->jquery->fadeOut(target, optional speed, optional extra information);




-  "target" は有効な jQuery のセレクタです (複数可)。
-  "speed" はオプションで、slow (ゆっくり), normal (普通), fast (速い)
   のどれか、またはミリ秒単位の数値を指定します。
-  "extra information"
   はオプションで、コールバック関数他の追加情報を指定できます。




toggleClass()
~~~~~~~~~~~~~

ターゲットに対して CSS クラスを追加または削除します。


::

	$this->jquery->toggleClass(target, class)




-  "target" は有効な jQuery のセレクタです (複数可)。
-  "class" は CSS のクラス名です。このクラス名は、ロード済みの CSS
   で定義されていて利用可能でなければならないことに注意してください。




fadeIn() / fadeOut()
~~~~~~~~~~~~~~~~~~~~

一定時間後に要素を非表示化または再表示します。


::

	$this->jquery->fadeIn(target, optional speed, optional extra information);
		$this->jquery->fadeOut(target, optional speed, optional extra information);




-  "target" は有効な jQuery のセレクタです (複数可)。
-  "speed" はオプションで、slow (ゆっくり), normal (普通), fast (速い)
   のどれか、またはミリ秒単位の数値を指定します。
-  "extra information"
   はオプションで、コールバック関数他の追加情報を指定できます。




slideUp() / slideDown() / slideToggle()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

要素をスライドします。


::

	$this->jquery->slideUp(target, optional speed, optional extra information);
		$this->jquery->slideDown(target, optional speed, optional extra information);
	$this->jquery->slideToggle(target, optional speed, optional extra information);




-  "target" は有効な jQuery のセレクタです (複数可)。
-  "speed" はオプションで、slow (ゆっくり), normal (普通), fast (速い)
   のどれか、またはミリ秒単位の数値を指定します。
-  "extra information"
   はオプションで、コールバック関数他の追加情報を指定できます。




プラグイン
==========


このライブラリによりいくつかの jQuery プラグインが使用可能です。



corner()
~~~~~~~~

ページの要素の角を特徴的 [ 訳注: 角丸など ]
にします。詳細は次のページを参照してください:
`http://www.malsup.com/jquery/corner/
<http://www.malsup.com/jquery/corner/>`_


::

	$this->jquery->corner(target, corner_style);




-  "target" は有効な jQuery のセレクタです (複数可)。
-  "corner_style" はオプションで、round, sharp, bevel, bite, dog などの
   有効なスタイルを指定できます。個々の角を指定することもできます。スタイ
   ル名の後、スペースに続けて次のように指定します: "tl" (左上), "tr"
   (右上), "bl" (左下), "br" (右下)



::

	$this->jquery->corner("#note", "cool tl br");





tablesorter()
~~~~~~~~~~~~~

description to come (執筆中)



modal()
~~~~~~~

description to come (執筆中)



calendar()
~~~~~~~~~~

description to come (執筆中)

