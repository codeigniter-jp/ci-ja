################
テキストヘルパー
################

テキストヘルパーのファイルは、テキストを処理するのに役立つ関数で構成さ
れています。



ヘルパーのロード
================

このヘルパーは次のコードを使ってロードします:

::

	$this->load->helper('text');


次の関数が利用できます:



word_limiter()
==============

指定した 単語数 の位置で、文字列を切り取ります [ 訳注: 英語のように単
語の間がスペースで区切られている言語でだけ有効です。日本語では通常、正
常に動作しません ]。例:


::

	
	$string = "Here is a nice text string consisting of eleven words.";
	
	$string = word_limiter($string, 4);
	
	// 戻り値: Here is a nice


第3引数はオプションで、文字列に付加するサフィックスを指定します。デフ
ォルトでは、省略記号(...) が付加されます。



character_limiter()
===================

指定した 文字数 の位置で文字列を切り取ります。 単語の途中で切り取られ
ないようになっていますので、文字数は指定したもより少し増えたり減ったり
します [ 訳注: 英語のように単語の間がスペースで区切られている言語でだ
け有効です。日本語では通常、正常に動作しません ]。例:


::

	
	$string = "Here is a nice text string consisting of eleven words.";
	
	$string = character_limiter($string, 20);
	
	// 戻り値: Here is a nice text string


第3引数はオプションで、文字列に付加するサフィックスを指定します。デフ
ォルトでは、省略記号(...) が付加されます。



ascii_to_entities()
===================

Web ページで使用されると問題を起こす拡張 ASCII 文字コードや MS
ワードの文字を含む、ASCII の値を HTML
の文字列エンティティに変換します。 こうすることで、ブラウザ設定にかか
わらずいつも表示させることができ、あるいは、データベースに確かな状態で
[値を変更して元の情報を失ってしまうことなく] 保存することができます。 
サーバでサポートされる文字セットにいくらか依存しているので、すべてのケ
ースで100%の信頼性はありません。 しかし、多くは、通常の範囲の外にある
文字(たとえばアクセント記号)も正しく認識できます。例:


::

	$string = ascii_to_entities($string);




entities_to_ascii()
===================

この関数は前述の関数と反対になります。つまり、文字列エンティティを
ASCII に戻します。



convert_accented_characters()
=============================

アクセント記号のついた ASCII 文字列を同等の ASCII
文字列に変換します。スタンダードな ASCII
文字列を使用しなければならないところ (例: URL) で役立ちます。


::

	$string = convert_accented_characters($string);


このメソッドは変換の際に、設定ファイル
application/config/foreign_chars.php
で定義されている配列を使用します。



word_censor()
=============

テキストの文字を検閲できます。第1引数は、元の文字列になります。 第2引
数は、許可しない単語の配列を指定します。第3引数(オプション)は、単語を
置き換える文字列を指定します。 指定されない場合は、許可されない文字は
、ナンバーサインで置き換えられます: ####。例:


::

	
	$disallowed = array('darn', 'shucks', 'golly', 'phooey');
	
	$string = word_censor($string, $disallowed, 'Beep!');




highlight_code()
================

コード (PHP、HTML など)の文字列を色分けします。例:


::

	$string = highlight_code($string);


この関数は、PHP の highlight_string() 関数を使いますので、php.ini
ファイルで指定されている色が使用されます。



highlight_phrase()
==================

テキスト中のフレーズをハイライトします。 第1引数は対象の文字列で、第2
引数にハイライトしたいフレーズを指定します。
第3、第4引数は、フレーズを囲みたい開始/終了タグを指定します。例:


::

	
	$string = "Here is a nice text string about nothing in particular.";
	
	$string = highlight_phrase($string, "nice text", '<span style="color:#990000">', '</span>');


上のテキストは下記のように返されます:

Here is a nice text string about nothing in particular.



word_wrap()
===========

指定した 文字数
の位置で、テキストを折り返します。単語の途中で折り返されません [ 訳注:
英語のように単語の間がスペースで区切られている言語でだけ有効です。日本
語では通常、正常に動作しません ]。例:


::

	$string = "Here is a simple string of text that will help us demonstrate this function.";
	
	echo word_wrap($string, 25);
	
	// 次のように生成:
	
	Here is a simple string
	of text that will help
	us demonstrate this
	function




ellipsize()
===========

この関数は文字列からタグを取り除き、指定された最大長に分割して省略記号
を挿入します。

第1引数は省略する文字列、第2引数は省略語の文字列の長さ、第3引数は後半
の文字列の開始位置を指定します。第3引数は、省略記号が現れる位置を0(左
端)から1(右端)までの数値で指定します。 たとえば、1を指定すると省略記号
は文字列の右端、.5なら真ん中、0なら左端になります。

オプションの第4引数では、省略記号を指定できます。デフォルトでは
… が使用されます。


::

	$str = 'this_string_is_entirely_too_long_and_might_break_my_design.jpg';
	
	echo ellipsize($str, 32, .5);

Produces:

::

	this_string_is_eak_my_design.jpg


