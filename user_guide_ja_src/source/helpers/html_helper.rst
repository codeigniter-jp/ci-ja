#############
HTML ヘルパー
#############

HTML ヘルパーファイルの中身は、HTML
を処理するのに役立つ関数になります。


-  br()
-  heading()
-  img()
-  link_tag()
-  nbs()
-  ol() and ul()
-  meta()
-  doctype()




ヘルパーのロード
================

このヘルパーは、次のコードを使うと読み込まれます:

::

	$this->load->helper('html');


次の関数が利用できます:



br()
====

改行タグ (<br />) を指定した回数だけ生成します。例:

::

	echo br(3);


上のコードは次のような HTML を生成します: <br /><br /><br />



heading()
=========

HTML <h1> タグを生成できます。
第1引数にデータを、第2引数には見出しレベルを指定します。例としては:

::

	echo heading('Welcome!', 3);


上のコードは次のような HTML を生成します: <h3>Welcome!</h3>

加えて、HTML クラス、ID、またはインラインスタイルなどの属性を見出しタ
グに追加するために、第3引数が使用可能です。

::

	echo heading('Welcome!', 3, 'class="pink"')


上のコードは次のような HTML を生成します: <h3
class="pink">Welcome!<<h3>



img()
=====

<img /> タグを生成できます。第1引数には画像のソースを指定します。 例:

::

	echo img('images/picture.jpg');
	// 結果 <img src="http://site.com/images/picture.jpg" alt="" />


第2引数には、$config['index_page'] に設定されている値を src
に含めるかどうかを TRUE/FALSE で指定します。


::

	echo img('images/picture.jpg', TRUE);
	// 結果 <img src="http://site.com/index.php/images/picture.jpg" />



また、連想配列を使うことですべての属性と値を渡すことができます。alt
属性が与えられない場合は空の文字列を出力します。


::

	 $image_properties = array(
		          'src' => 'images/picture.jpg',
		          'alt' => 'Me, demonstrating how to eat 4 slices of pizza at one time',
		          'class' => 'post_images',
		          'width' => '200',
		          'height' => '200',
		          'title' => 'That was quite a night',
		          'rel' => 'lightbox',
		);
		
		img($image_properties);
		// <img src="http://site.com/index.php/images/picture.jpg" alt="Me, demonstrating how to eat 4 slices of pizza at one time" class="post_images" width="200" height="200" title="That was quite a night" rel="lightbox" />





link_tag()
==========

<link /> タグを生成できます。
スタイルシートなどの参照に使うことができます。 引数には href
と、オプションで rel、type、title、media、index_page を指定できます。
index_page には $config['index_page']
で設定されている値を含めるかどうかをTRUE/FALSEで指定します。

::

	
	echo link_tag('css/mystyles.css');
	// 結果 <link href="http://site.com/css/mystyles.css" rel="stylesheet" type="text/css" />



その他の例:


::

	
		echo link_tag('favicon.ico', 'shortcut icon', 'image/ico');
		// <link href="http://site.com/favicon.ico" rel="shortcut icon" type="image/ico" /> 
		
		
		echo link_tag('feed', 'alternate', 'application/rss+xml', 'My RSS Feed');
		// <link href="http://site.com/feed" rel="alternate" type="application/rss+xml" title="My RSS Feed" /> 


また、連想配列を使うことですべての属性と値を渡すことができます。


::

	
		$link = array(
		          'href' => 'css/printer.css',
		          'rel' => 'stylesheet',
		          'type' => 'text/css',
		          'media' => 'print'
		);
		
		echo link_tag($link);
		// <link href="http://site.com/css/printer.css" rel="stylesheet" type="text/css" media="print" />





nbs()
=====

改行なしスペース( ) を指定した数だけ生成します。例:

::

	echo nbs(3);


上のコードは次のような HTML を生成します:    



ol() と ul()
============

順番付き、または、順番なし HTML
リストを単純な配列または多次元配列から生成できます。例:


::

	
	$this->load->helper('html');
	
	$list = array(
	            '赤', 
	            '青', 
	            '緑',
	            '黄'
	            );
	
	$attributes = array(
	                    'class' => 'boldlist',
	                    'id'    => 'mylist'
	                    );
	
	echo ul($list, $attributes);


上のコードは次のような HTML を生成します:


::

	
	<ul class="boldlist" id="mylist">
	  <li>赤</li>
	  <li>青</li>
	  <li>緑</li>
	  <li>黄</li>
	</ul>


多次元配列を使ったもう少し複雑な例です:


::

	
	$this->load->helper('html');
	
	$attributes = array(
	                    'class' => 'boldlist',
	                    'id'    => 'mylist'
	                    );
	
	$list = array(
	            '色' => array(
	                                '赤',
	                                '青',
	                                '緑'
	                            ),
	            '形' => array(
	                                '角が丸いもの', 
	                                '四角いもの',
	                                '円形' => array(
	                                                    '楕円', 
	                                                    '卵型', 
	                                                    '円'
	                                                    )
	                            ),
	            '雰囲気'    => array(
	                                '幸福', 
	                                '動揺' => array(
	                                                    '挫折' => array(
	                                                                        '意気消沈',
	                                                                        '落胆',
	                                                                        'うつ状態'
	                                                                        ),
	                                                    'いらいら',
	                                                    '不機嫌',
	                                                    '怒り'
	                                                )
	                            )
	            );
	
	
	echo ul($list, $attributes);


上のコードは次のような HTML を生成します:


::

	
	<ul class="boldlist" id="mylist">
	  <li>色
	    <ul>
	      <li>赤</li>
	      <li>青</li>
	      <li>緑</li>
	    </ul>
	  </li>
	  <li>形
	    <ul>
	      <li>角が丸いもの</li>
	      <li>四角いもの</li>
	      <li>円形
	        <ul>
	          <li>楕円</li>
	          <li>卵型</li>
	          <li>円</li>
	        </ul>
	      </li>
	    </ul>
	  </li>
	  <li>気持ち
	    <ul>
	      <li>幸福</li>
	      <li>動揺
	        <ul>
	          <li>挫折感
	            <ul>
	              <li>意気消沈</li>
	              <li>落胆</li>
	              <li>うつ状態</li>
	            </ul>
	          </li>
	          <li>いらいら</li>
	          <li>不機嫌</li>
	          <li>怒り</li>
	        </ul>
	      </li>
	    </ul>
	  </li>
	</ul>




meta()
======

メタタグの生成を手伝います。この関数には、文字列、または単純な配列、ま
たは多次元配列を渡す事が出来ます。例:


::

	
	echo meta('description', 'My Great site');
	// 生成するメタタグ: <meta name="description" content="My Great Site" />
	
	
	echo meta('Content-type', 'text/html; charset=utf-8', 'equiv'); // Note the third parameter. Can be "equiv" or "name"
	// 生成するメタタグ: <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	
	
	
	echo meta(array('name' => 'robots', 'content' => 'no-cache'));
	// 生成するメタタグ: <meta name="robots" content="no-cache" />
	
	
	
	$meta = array(
	        array('name' => 'robots', 'content' => 'no-cache'),
	        array('name' => 'description', 'content' => 'My Great Site'),
	        array('name' => 'keywords', 'content' => 'love, passion, intrigue, deception'),
	        array('name' => 'robots', 'content' => 'no-cache'),
	        array('name' => 'Content-type', 'content' => 'text/html; charset=utf-8', 'type' => 'equiv')
	    );
	
	echo meta($meta);
	
	// 生成するメタタグ: 
	// <meta name="robots" content="no-cache" />
	// <meta name="description" content="My Great Site" />
	// <meta name="keywords" content="love, passion, intrigue, deception" />
	// <meta name="robots" content="no-cache" />
	// <meta http-equiv="Content-type" content="text/html; charset=utf-8" />




doctype()
=========

DOCTYPE 宣言、または DTD 生成を手伝います。デフォルトで利用されるのは
XHTML 1.0 Strict ですが、多くの DOCTYPE が利用可能です。


::

	
	echo docytype();
	// <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	
	echo doctype('html4-trans');
	// <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">


以下は、DOCTYPE 選択の一覧です。これらは、
application/config/doctypes.php で指定可能です。
 
	DOCTYPE
	引数
	生成結果
	 XHTML 1.1
	 doctype('xhtml11')
	 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
	 XHTML 1.0 Strict
	 doctype('xhtml1-strict')
	 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	 XHTML 1.0 Transitional
	 doctype('xhtml1-trans')
	 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	 XHTML 1.0 Frameset
	 doctype('xhtml1-frame')
	 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
	 XHTML Basic 1.1
	 doctype('xhtml-basic11')
	 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">
	 HTML 5
	 doctype('html5')
	 <!DOCTYPE html>
	 HTML 4 Strict
	 doctype('html4-strict')
	 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
	 HTML 4 Transitional
	 doctype('html4-trans')
	 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
	 HTML 4 Frameset
	 doctype('html4-frame')
	 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
	


