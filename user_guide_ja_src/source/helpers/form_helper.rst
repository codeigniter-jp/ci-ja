################
フォームヘルパー
################

フォームヘルパーのファイルには、HTML
フォームを使って作業するのを支援する関数が含まれています。



ヘルパーのロード
================

このヘルパーは次のコードを使ってロードします:

::

	$this->load->helper('form');


次の関数が利用できます:



form_open()
===========

設定ファイルに基づいて構築した ベース URL を設定して form
の開始タグを作成します。 オプションで、form タグの属性と隠しフィールド
を追加する事が出来、設定ファイルの文字コードの値に基づき、常に accept-
charset 属性が付与されます。

HTML をハードコーディングせずにこのコードを使う主なメリットは、URL
が変更になった時に、 移植性が高まることです。

シンプルな例です:


::

	echo form_open('email/send');


上の例では、次のように、ベースの URL に "email/send" URI
セグメントを追加したところを参照する form タグを生成します:


::

	<form method="post" accept-charset="utf-8" action="http://example.com/index.php/email/send" />




属性の追加
``````````

次のように、第2引数に連想配列で渡すことで、属性を追加できます:


::

	
	$attributes = array('class' => 'email', 'id' => 'myform');
	
	echo form_open('email/send', $attributes);


上の例は、次のようなフォームを生成します:


::

	<form method="post" accept-charset="utf-8" action="http://example.com/index.php/email/send"  class="email"  id="myform" />




隠しフィールドの追加
````````````````````

次のように、第3引数に連想配列で渡すことで、隠しフィールドを追加できま
す:


::

	
	$hidden = array('username' => 'Joe', 'member_id' => '234');
	
	echo form_open('email/send', '', $hidden);


上の例は、次のようなフォームを生成します:


::

	<form method="post" accept-charset="utf-8" action="http://example.com/index.php/email/send">
	<input type="hidden" name="username" value="Joe" />
	<input type="hidden" name="member_id" value="234" />




form_open_multipart()
=====================

ファイルをアップロードする際に使うマルチパート (multipart)
の指定を属性に追加する以外は、 この関数は上の form_open()
とまったく同じです。



form_hidden()
=============

隠しフィールドを生成します。1つのフィールドの 名前 / 値
の両方の文字列を渡すことができます:


::

	form_hidden('username', 'johndoe');
	
	// 下記のようなタグを生成します:
	<input type="hidden" name="username" value="johndoe" />


あるいは、複数のフィールドを作成するために、連想配列を渡すこともできま
す:


::

	$data = array(
	              'name'  => 'John Doe',
	              'email' => 'john@example.com',
	              'url'   => 'http://example.com'
	            );
	
	echo form_hidden($data);
	
	// 下記のようなタグを生成します:
	<input type="hidden" name="name" value="John Doe" />
	<input type="hidden" name="email" value="john@example.com" />
	<input type="hidden" name="url" value="http://example.com" />




form_input()
============

通常のテキストフィールドを生成します。
最低限、第1、第2引数に、名前(name 属性)、値(value
属性)をそれぞれ渡します:


::

	echo form_input('username', 'johndoe');


あるいは、フォームに設定すべきデータを含んだ連想配列を渡すこともできま
す:


::

	$data = array(
	              'name'        => 'username',
	              'id'          => 'username',
	              'value'       => 'johndoe',
	              'maxlength'   => '100',
	              'size'        => '50',
	              'style'       => 'width:50%',
	            );
	
	echo form_input($data);
	
	// 下記のようなタグを生成します:
	<input type="text" name="username" id="username" value="johndoe" maxlength="100" size="50" style="width:50%" />


Javascript のような追加のデータをフォームに設定したい場合、
第3引数に文字列として渡すことができます:


::

	$js = 'onClick="some_function()"';
	
	echo form_input('username', 'johndoe', $js);




form_password()
===============

この関数は、"password" タイプのフィールドをセットする以外は、 上の
form_input() 関数とあらゆる点で同じです。



form_upload()
=============

この関数は、ファイルのアップロード時に使用できる "file"
タイプのフィールドをセットする以外は、 上の form_input()
関数とあらゆる点で同じです。



form_textarea()
===============

この関数は、"textarea" のフィールドをセットする以外は、 上の
form_input() 関数とあらゆる点で同じです。 Note: 上の例で "maxlength"
と "size" 属性を指定する代わりに、"rows" と "cols" 属性を指定します。



form_dropdown()
===============

ドロップダウンフィールドを生成します。第1引数にフィールド名を、
第2引数に選択肢 (option)
の連想配列を、そして第3引数には、選択済み状態にしたい項目の値を
設定します。 第3引数に複数の項目の配列を渡すことで、複数選択を生成する
ことができます。 例:


::

	$options = array(
	                  'small'  => 'Small Shirt',
	                  'med'    => 'Medium Shirt',
	                  'large'   => 'Large Shirt',
	                  'xlarge' => 'Extra Large Shirt',
	                );
	
	$shirts_on_sale = array('small', 'large');
	
	echo form_dropdown('shirts', $options, 'large');
	
	// 下記のようなタグを生成します:
	
	<select name="shirts">
	<option value="small">Small Shirt</option>
	<option value="med">Medium Shirt</option>
	<option value="large" selected="selected">Large Shirt</option>
	<option value="xlarge">Extra Large Shirt</option>
	</select>
	
	echo form_dropdown('shirts', $options, $shirts_on_sale);
	
	// 下記のようなタグを生成します:
	
	<select name="shirts" multiple="multiple">
	<option value="small" selected="selected">Small Shirt</option>
	<option value="med">Medium Shirt</option>
	<option value="large" selected="selected">Large Shirt</option>
	<option value="xlarge">Extra Large Shirt</option>
	</select>


<select> の開始タグで、 id 属性や JavaScript
などの追加データを設定したい場合は、
第4引数にそれを文字列として渡すことができます:


::

	$js = 'id="shirts" onChange="some_function();"';
	
	echo form_dropdown('shirts', $options, 'large', $js);


$options に渡される配列が多次元配列である場合、form_dropdown()
は配列のキーをラベルとした <optgroup> を生成します。



form_multiselect()
==================

標準的な複数選択フィールドを生成します。第1引数はフィールド名、
第2引数はオプションの連想配列、第3引数は選択状態にしたい値です。
フィールド名に foo[] のような POST
の配列構文を利用する必要がある、という点を除けば、
引数の使い方は上記の form_dropdown() と同じです。



form_fieldset()
===============

fieldset/legend フィールドを生成します。

::

	echo form_fieldset('Address Information');
	echo "<p>fieldset content here</p>\n";
	echo form_fieldset_close();
	
	
	// 下記のようなタグを生成します
	<fieldset>
	
	<legend>Address Information</legend>
	
	<p>form content here</p>
	
	</fieldset>


他の関数同様、各属性に値を設定したい場合は、第2引数に連想配列を渡すこ
とができます。


::

	$attributes = array('id' => 'address_info', 'class' => 'address_info');
	    echo form_fieldset('Address Information', $attributes);
	echo "<p>fieldset content here</p>\n";
	echo form_fieldset_close(); 
	
	// 下記のようなタグを生成します:
	<fieldset id="address_info" class="address_info"> 
	<legend>Address Information</legend> 
	<p>form content here</p> 
	</fieldset>




form_fieldset_close()
=====================

</fieldset> の閉じタグを生成します。
タグの下に追加するデータを渡せるというのがこの関数を使う
唯一の利点になります。

::

	$string = "</div></div>";
	
	echo form_fieldset_close($string);
	
	// 下記のようなタグを生成します:
	</fieldset>
	</div></div>



form_checkbox()
===============

チェックボックスフィールドを生成します。簡単な例です:

::

	echo form_checkbox('newsletter', 'accept', TRUE);
	
	// 下記のようなタグを生成します:
	
	<input type="checkbox" name="newsletter" value="accept" checked="checked" />


第3引数には、チェックボックスがチェック済みかそうでないかを決めるブー
ル値の TRUE/FALSE を設定できます。

このヘルパーも他の関数と同様に属性を連想配列で渡すことができます:


::

	$data = array(
	    'name'        => 'newsletter',
	    'id'          => 'newsletter',
	    'value'       => 'accept',
	    'checked'     => TRUE,
	    'style'       => 'margin:10px',
	    );
	
	echo form_checkbox($data);
	
	// 下記のようなタグを生成します:
	<input type="checkbox" name="newsletter" id="newsletter" value="accept" checked="checked" style="margin:10px" />


他の関数のように、このタグに JavaScript
などの追加データを設定したい場合は、
第4引数にそれを文字列として渡すことができます:


::

	$js = 'onClick="some_function()"';
	
	 echo form_checkbox('newsletter', 'accept', TRUE, $js)




form_radio()
============

この関数は、"radio" タイプのフィールドをセットする以外は、上の
form_checkbox() 関数とあらゆる点で同じです。



form_submit()
=============

通常の送信ボタンを生成します。簡単な例です:

::

	echo form_submit('mysubmit', 'Submit Post!');
	
	// 下記のようなタグを生成します:
	
	<input type="submit" name="mysubmit" value="Submit Post!" />


他の関数同様、各属性に値を設定したい場合は、第1引数に、連想配列を渡す
ことができます。 第3引数で、JavaScript
のような追加データをフォームに設定できます。


form_label()
============

<label> を生成します。 簡単な例です:

::

	echo form_label('What is your Name', 'username');
	
	// 下記のようなタグを生成します:
	
	<label for="username">What is your Name</label>


他の関数同様、各属性に値を設定したい場合は、第3引数に連想配列を渡すこ
とができます。


::

	$attributes = array(
	    'class' => 'mycustomclass',
	    'style' => 'color: #000;',
	);
	    echo form_label('What is your Name', 'username', $attributes);
	        
	// 下記のようなタグを生成します: 
	<label for="username" class="mycustomclass" style="color: #000;">What is your Name</label>




form_reset()
============

通常のリセットボタンを生成します。 使い方は form_submit() と同様です。



form_button()
=============

通常のボタンを作成します。1つ目と2つ目の引数にボタンの名前とコンテンツ
を渡すだけでもボタンを作ることができます

::

	
	echo form_button('name','content');
	
	// 生成されるボタン
	<button name="name" type="button">Content</button>

フォーム内に持たせたいデータを連想配列で渡すことができます：

::

	
	$data = array(
	    'name' => 'button',
	    'id' => 'button',
	    'value' => 'true',
	    'type' => 'reset',
	    'content' => 'Reset'
	);
	
	echo form_button($data);
	
	// この結果できるボタン：
	<button name="button" id="button" value="true" type="reset">Reset</button>

フォームに追加のデータを持たせたい場合、JavaScript
の様に3番目の引数に文字列で渡すことができます。

::

	
	$js = 'onClick="some_function()"';
	echo form_button('mybutton', 'Click Me', $js);




form_close()
============

</form> の閉じタグを生成します。タグの下に追加するデータを渡せるという
のがこの関数を使う唯一の利点になります。 たとえば次のような感じです:


::

	$string = "</div></div>";
	
	echo form_close($string);
	
	// 下記のようなタグを生成します:
	
	</form>
	</div></div>




form_prep()
===========

フォームを崩れさせないように、HTML
要素の中のクォーテーションなどの文字列を HTML
で安全に使えるようにします。次のような例が挙げられます:


::

	$string = 'これは "クォーテーションで囲まれた" テキストがある文字列です。';
	
	<input type="text" name="myform" value="$string" />


上の文字列には、フォームを崩れさせる原因になる、ダブルクォーテーション
のセットが含まれています。 form_prep
関数はこれを安全に使えるよう、HTML を変換します:


::

	<input type="text" name="myform" value="<?php echo form_prep($string); ?>" />


.. note:: このページにリストアップされたいずれのフォームヘルパー関数を使うときも、
値は自動的に整形処理されるので、この関数を呼び出す必要はありません。
自分で書いた Form 要素の中でだけ、この関数を使用してください。



set_value()
===========

入力フォームやテキストエリアの値を設定します。 関数の第1引数でフィール
ド名を指定します。第2引数(オプション)では、フォームの初期値を指定でき
ます。例:


::

	<input type="text" name="quantity" value="<?php echo set_value('quantity', '0'); ?>" size="50" />


上記のフォームは、最初に読み込まれた時には"0"を表示します。



set_select()
============

<select> メニューを利用している場合、この関数はメニューで選択された項
目を表示します。 第1引数には選択メニューの名前を指定します。第2引数で
はそれぞれの項目の値を指定します。 第3引数(オプション)では、ブール値の
TRUE/FALSE で項目の初期状態を指定できます。

例:


::

	
	<select name="myselect">
	<option value="one" <?php echo  set_select('myselect', 'one', TRUE); ?> >One</option>
	<option value="two" <?php echo  set_select('myselect', 'two'); ?> >Two</option>
	<option value="three" <?php echo  set_select('myselect', 'three'); ?> >Three</option>
	</select>




set_checkbox()
==============

送信された状態のチェックボックスを表示します。第1引数にはチェックボッ
クスの名前を指定し、第2引数では値を指定します。
第3引数(オプション)では、ブール値の TRUE/FALSE
を使って項目の初期状態を指定出来ます。例:


::

	<input type="checkbox" name="mycheck" value="1" <?php echo set_checkbox('mycheck', '1'); ?> />
	<input type="checkbox" name="mycheck" value="2" <?php echo set_checkbox('mycheck', '2'); ?> />




set_radio()
===========

送信された状態のラジオボタンを表示します。それ以外は、この関数は上の
set_checkbox() と同じ挙動です。


::

	<input type="radio" name="myradio" value="1" <?php echo set_radio('myradio', '1', TRUE); ?> />
	<input type="radio" name="myradio" value="2" <?php echo set_radio('myradio', '2'); ?> />


