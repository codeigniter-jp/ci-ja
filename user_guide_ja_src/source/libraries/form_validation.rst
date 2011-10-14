############################
フォームバリデーション(検証)
############################

CodeIgniter は、最小限のコードで総合的なフォームバリデーションとデータ
の準備をするクラスを提供します。


-  概要
-  フォームバリデーション(検証)チュートリアル

   -  入力フォーム
   -  成功ページ
   -  コントローラ
   -  検証ルールを設定する
   -  配列を使って検証ルールを設定する
   -  ルールの連結(カスケード)
   -  データの整形
   -  フォームの再表示
   -  コールバック
   -  エラーメッセージを設定する
   -  エラーメッセージを囲む文字の変更
   -  フィールド名の変換
   -  個別にエラーを表示する
   -  検証ルールを設定ファイルに保存
   -  フィールド名の指定に配列を使う

-  ルールリファレンス
-  整形処理のリファレンス
-  関数リファレンス
-  ヘルパー関数リファレンス






概観
####

CodeIgniter のデータ検証アプローチの説明をする前に、想定するシナリオに
ついて述べておきます:


#. フォームが表示されます。
#. 入力して送信します。
#. 間違ったデータが送信された場合、あるいは、必要項目が入力されていな
   い場合、それらの問題についてのエラーメッセージを、
   入力したデータと一緒にフォームで再表示します。
#. 送信データが正しい形式になるまで、上記の処理を繰り返します。


最後にデータを受け取るところで、そのスクリプトでは次のようなことが必要
になります:


#. 必須入力のデータをチェックする。
#. データが正しいデータ型か、また、データが条件に合致するかをチェック
   する。たとえば、ユーザ名が送信された場合、許可した文字だけになっている
   かを検証する必要があります。
   また、最小文字数以上で、最大文字数以下になっているかの検証もします。 
   ユーザ名は、すでに存在しているユーザ名と同じでなく、予約語と同じであっ
   てはならない。など
#. セキュリティのためにデータをサニタイズする。
#. 必要であれば、前もってデータをフォーマットします
   (前後のスペースをとる？ HTML にするか? など)
#. データベースに追加するため、データを準備します。


上で挙げたプロセスには何ら複雑なものはありませんが、たいてい大量のコー
ドが必要になり、 エラーメッセージを表示させるために、フォーム HTML
の中に、さまざまな制御構造が書かれることになります。 フォームの検証は
、難しくなくつくれますが、実装するのはいつも面倒で退屈です。





フォームバリデーション(検証)チュートリアル
##########################################

以下は CodeIgniter
のフォームバリデーションを実装する"ハンズオン"チュートリアルです。

フォームバリデーション(検証)を実装するには、次の3つが必要になります:


#. フォームを設置した :doc:`ビュー <../general/views>`
   ファイルを用意します。
#. 送信が成功したときに、"成功" メッセージを表示する
   ビューファイルを用意します。
#. :doc:`コントローラ <../general/controllers>` 内のメソッドをデータを
   受け取れるようにし、送信されたデータを処理できるようにします。


例としてメンバー登録フォームを使って、これら3つを作成してみましょう。



入力フォーム
============

テキストエディタを使って、 myform.php
という名前のフォームを作ってください。 その中に、次のコードを書いて
applications/views/ フォルダの中に保存します:


::

	<html>
	<head>
	<title>マイフォーム</title>
	</head>
	<body>
	
	<?php echo validation_errors(); ?>
	
	<?php echo form_open('form'); ?>
	
	<h5>ユーザ名</h5>
	<input type="text" name="username" value="" size="50" />
	
	<h5>パスワード</h5>
	<input type="text" name="password" value="" size="50" />
	
	<h5>パスワードの確認</h5>
	<input type="text" name="passconf" value="" size="50" />
	
	<h5>メールアドレス</h5>
	<input type="text" name="email" value="" size="50" />
	
	<div><input type="submit" value="送信" /></div>
	
	</form>
	
	</body>
	</html>




成功ページ
==========

テキストエディタを使って、 formsuccess.php
という名前のフォームを作ってください。 その中に、次のコードを書いて
applications/views/ フォルダの中に保存します。:


::

	
	<html>
	<head>
	<title>マイフォーム</title>
	</head>
	<body>
	
	<h3>フォームは正しく送信されました!</h3>
	
	<p><?php echo anchor('form', 'もう一度!'); ?></p>
	
	</body>
	</html>




コントローラ
============

テキストエディタを使って、 form.php
という名前のコントローラを作ってください。
その中に、次のコードを書いて applications/controllers/
フォルダの中に保存します:


::

	<?php
	
	class Form extends CI_Controller {
		
		function index()
		{
			$this->load->helper(array('form', 'url'));
			
			$this->load->library('form_validation');
					
			if ($this->form_validation->run() == FALSE)
			{
				$this->load->view('myform');
			}
			else
			{
				$this->load->view('formsuccess');
			}
		}
	}
	?>




動かしてみよう!
===============

作ったフォームを動かすため、次のような URL でサイトを訪問してください:


::

	example.com/index.php/form/


フォームに送信すると、単にフォームが更新されるだけに見えます。
これは、まだ検証ルールを1つも設定していないからです。

ここでは、まだフォームバリデーション(検証)クラスになにも検証しないよう
に設定しています。バリデーションクラスは、デフォルトでは、 FALSE
(ブール値の false )を返します。 run()
メソッドは、1つも失敗せずにユーザが指定したルールに適合する場合にのみ
TRUE を返します。



解説
====

上の例のページについていくつか気づいたことがあると思います:

フォーム (myform.php) は、次の2つの例外を除いて、スタンダードな Web
フォームだといえます:


#. form タグを開始するのに フォームヘルパー を使っています。
   技術的には、これは必ずしも必要ではありません。通常の HTML を使って
   form を作成することもできます。しかし、このヘルパーを使うと、 form
   タグの action 属性に指定する URL を設定ファイルの URL
   にもとづいて生成してくれるという利点があります。 これにより、URL
   を変更した時のアプリケーションの移植性と柔軟性が高まります。
#. フォームの先頭に、次のような変数があるのに気がついたと思います:

::

	<?php echo validation_errors(); ?>

   この変数はバリデータが返すエラーメッセージを表示します。メッセージがな
   ければ、何も表示しません。


コントローラ (form.php) には index() というメソッドがあります。 このメ
ソッドは、バリデーションクラスを初期化しビューファイルで使えるように
フォームヘルパー と URL ヘルパー をロードします。 また、検証処理も
実行します 。 検証が成功したかどうかにより、フォームのページか成功ペー
ジかどちらかを表示します。



検証ルールを設定する
====================

CodeIgniter では、指定したフィールドにどれだけ多くのルールを適用しても
かまいません。ルールは順番に続けて適用することができ、同時にデータを整
形したり前処理を行ったりすることもできます。 set_rules()
メソッドを使って検証ルールを設定してみましょう:


::

	$this->form_validation->set_rules();


上記のメソッドには 3つの 入力パラメータを指定します。:


#. フォーム名 - フォームの name 属性に指定した値です
#. このフォームの表示名。これはエラーメッセージに挿入されます。
   たとえば、フォームに「 user
   」という名前を付けた場合、表示名としては「名前」とするでしょう。 Note:
   フィールド名を言語ファイルに設定して使いたい場合はフィールド名の翻訳を
   見てください。
#. このフォームに設定する検証ルール



例を示します。 コントローラ (form.php) の中のバリデーションクラスを初
期化(ロード)したすぐ下のところに、このコードを追加してください:


::

	
	$this->form_validation->set_rules('username', 'ユーザ名', 'required');
	$this->form_validation->set_rules('password', 'パスワード', 'required');
	$this->form_validation->set_rules('passconf', 'パスワードの確認', 'required');
	$this->form_validation->set_rules('email', 'メールアドレス', 'required');


コントローラは次のようになっているはずです:


::

	load->helper(array('form', 'url'));
	
			$this->load->library('form_validation');
	
			$this->form_validation->set_rules('username', 'ユーザ名', 'required');
			$this->form_validation->set_rules('password', 'パスワード', 'required');
			$this->form_validation->set_rules('passconf', 'パスワードの確認', 'required');
			$this->form_validation->set_rules('email', 'メールアドレス', 'required');
	
			if ($this->form_validation->run() == FALSE)
			{
				$this->load->view('myform');
			}
			else
			{
				$this->load->view('formsuccess');
			}
		}
	}
	?>


ここでフォームを空欄にしフォームを送信すると、エラーメッセージが表示さ
れます。
すべてのフィールドを埋めて送信すると、成功ページが表示されます。

.. note:: フォームのフィールドは、エラーの時に入力したデータが復元されません。
あともうちょっと必要です。



配列を使った検証ルールの指定
============================

一回ですべての検証ルールを設定したい場合は、検証ルール設定メソッドを通
る配列の形式で記述しなければいけません。 このアプローチを使う場合、配
列のキーをここに示した通りの名前にしなければいけません。:


::

	
	$config = array(
	               array(
	                     'field'   => 'username', 
	                     'label'   => 'ユーザ名', 
	                     'rules'   => 'required'
	                  ),
	               array(
	                     'field'   => 'password', 
	                     'label'   => 'パスワード', 
	                     'rules'   => 'required'
	                  ),
	               array(
	                     'field'   => 'passconf', 
	                     'label'   => 'パスワードの確認', 
	                     'rules'   => 'required'
	                  ),   
	               array(
	                     'field'   => 'email', 
	                     'label'   => 'メールアドレス', 
	                     'rules'   => 'required'
	                  )
	            );
	
	$this->form_validation->set_rules($config);




ルールの連結(カスケード)
========================

CodeIgniter では、複数のルールを互いにパイプすることができます。ではや
ってみましょう。ルール設定メソッドの第3引数を次のように変更してみてく
ださい。:


::

	
	$this->form_validation->set_rules('username', 'ユーザ名', 'required|min_length[5]|max_length[12]|is_unique[users.username]');
	$this->form_validation->set_rules('password', 'パスワード', 'required|matches[passconf]');
	$this->form_validation->set_rules('passconf', 'パスワードの確認', 'required');
	$this->form_validation->set_rules('email', 'メールアドレス', 'required|valid_email|is_unique[users.email]');


上のコードでは次のことが要求されます:


#. username
   フィールドは、5文字より小さくてはだめで、12文字を超えてはいけません。
#. password フィールドは、パスワード確認フィールドと入力が一致しなけれ
   ばなりません。
#. email
   フィールドは、正しいメールアドレスの形式でなければなりません。


データを入力して、やってみてください!
新しく設定したルールに対応するエラーメッセージを見てみましょう。
ルールリファレンスにあるように、多くの検証ルールがあります。



データの整形
============

バリデーションの機能は、上で使ったようなものに加え、様々な方法で、デー
タの整形をすることもできます。
たとえば、以下のように、ルールをセットすることができます。:


::

	
	$this->form_validation->set_rules('username', 'ユーザ名', 'trim|required|min_length[5]|max_length[12]|xss_clean');
	$this->form_validation->set_rules('password', 'パスワード', 'trim|required|matches[passconf]|md5');
	$this->form_validation->set_rules('passconf', 'パスワードの確認', 'trim|required');
	$this->form_validation->set_rules('email', 'メールアドレス', 'trim|required|valid_email');


上の例では、フィールドを "トリミング" し、パスワードを MD5 に変換し、
悪意のあるデータを取り除く "xss_clean" 機能を通します。

htmlspecialchars 、 trim 、 MD5 などのような引数を1つだけとる PHP
の組み込み関数は どれでもルールとして使用することができます。

.. note:: もしエラーがあった場合、もとのデータをフォームに表示させるため、検証ルールの 後に 整形機能を使いたいのが通常のケースだと思います。



フォームの再表示
================

これまでのところ、エラーに対処してきただけでしたが、送信されたデータを
フォームで再表示する時がやってきました。CodeIgniter
ではこれを補うヘルパー関数が用意されています。
よく使われるものとしては次の様なコードです:


::

	set_value('field name')


ビューファイル myform.php を開き、それぞれのフォームの value に
set_value() 関数を入れてください:

set_value() のパラメータには、それぞれのフォームの name
を入れる事を忘れないでください。


::

	
	<html>
	<head>
	<title>マイフォーム</title>
	</head>
	<body>
	
	<?php echo validation_errors(); ?>
	
	<?php echo form_open('form'); ?>
	
	<h5>ユーザ名</h5>
	<input type="text" name="username" value="<?php echo set_value('username'); ?>" size="50" />
	
	<h5>パスワード</h5>
	<input type="text" name="password" value="<?php echo set_value('password'); ?>" size="50" />
	
	<h5>パスワードの確認</h5>
	<input type="text" name="passconf" value="<?php echo set_value('passconf'); ?>" size="50" />
	
	<h5>メールアドレス</h5>
	<input type="text" name="email" value="<?php echo set_value('email'); ?>" size="50" />
	
	<div><input type="submit" value="送信" /></div>
	
	</form>
	
	</body>
	</html>


ここで、フォームを再読み込みし、エラーになるようなデータを送信します。
フォームには値が再設定されます。

.. note:: 関数リファレンスセクションでは<select>メニュー、ラジオボタン、チェックボックスに値を再設定する関数の記載があります。

重要: フォームの名前に配列を使う場合、パラメータには配列の形で指定しま
す。例:


::

	<input type="text" name="colors[]" value="<?php echo set_value('colors[]'); ?>" size="50" />


詳しくはフィールド名の指定に配列を使うを見てください。



コールバック: ユーザ定義の検証メソッド
======================================

ユーザ定義の検証メソッドへのコールバックがシステムでサポートされていま
す。これを使えば、それぞれのニーズに合わせるため検証クラスを拡張するこ
とができます。 たとえば、選択したユーザが固有の名前かどうかを調べるた
めデータベースクエリを実行する必要があるとき、それを行うコールバックメ
ソッドを作成できます。 次に示す例のように作ってみましょう。

コントローラで、"username" ルールを次のように変更します:


::

	$this->form_validation->set_rules('username', 'ユーザ名', 'callback_username_check');


次に username_check
という名前の新しいメソッドをコントローラに追加します。
コントローラは以下のようになっているはずです:


::

	load->helper(array('form', 'url'));
	
			$this->load->library('form_validation');
	
			$this->form_validation->set_rules('username', 'ユーザ名', 'callback_username_check');
			$this->form_validation->set_rules('password', 'パスワード', 'required');
			$this->form_validation->set_rules('passconf', 'パスワードの確認', 'required');
			$this->form_validation->set_rules('email', 'メールアドレス', 'required');
	
			if ($this->form_validation->run() == FALSE)
			{
				$this->load->view('myform');
			}
			else
			{
				$this->load->view('formsuccess');
			}
		}
	
		public function username_check($str)
		{
			if ($str == 'test')
			{
				$this->form_validation->set_message('username_check', 'フィールド %s に、"test"は使えません');
				return FALSE;
			}
			else
			{
				return TRUE;
			}
		}
	
	}
	?>


フォームを再読み込みして、ユーザ名に "test" と入力して送信します。 フ
ォームフィールドのデータがコールバックメソッドに渡され処理されたのがわ
かります。

コールバックを呼び出すには、あるルールに従ってメソッド名を指定します。
そのルールとは、 callback_
というプリフィックスをメソッド名に付け加えるというものです。 また、コ
ールバックに渡されたフォームデータを処理し、結果を返すことができます。
コールバックが bool 型の TRUE / FALSE 以外の値を返す場合、そのデータは
フォームデータが処理された新しいものである事が想定されます。

.. note:: You can also process the form data that is passed to yourcallback and return it. If your callback returns anything other than a
boolean TRUE/FALSE it is assumed that the data is your newly processed
form data.



エラーメッセージを設定する
==========================

もともとのエラーメッセージは、次の言語ファイルの中にあります:
language/english/form_validation_lang.php

ユーザ定義のメッセージを表示するには、このファイルを編集するか、または
、次のメソッドを利用します:


::

	$this->form_validation->set_message('rule', 'Error Message');


ここでの rule は特定のルール名になり、 Error Message
は表示したいテキストになります。

エラーメッセージに %s を含めると、ルールに指定した項目を使って、表示用
の項目名に置き換えられます。

上記のコールバックの例では、エラーメッセージはメソッド名で指定したルー
ルを通る様に設定されています:


::

	$this->form_validation->set_message('username_check')


また、言語ファイル内のエラーメッセージを上書きすることもできます。たと
えば、"required" ルールのメッセージを変更するには、次のようにします:


::

	$this->form_validation->set_message('required', 'ここにカスタムメッセージ');




フィールド名の変換
==================

言語ファイル内において、 set_rules() メソッドに渡す"表示名"を格納した
ければ、ここに示す様にすれば、フィールド名が変換される様にすることがで
きます:

まず、以下の例の様に表示名にプレフィックスとして lang: を付けます:


::

	
	$this->form_validation->set_rules('first_name', 'lang:first_name', 'required');


次に言語ファイル内に配列を1つ格納します。(添字にはプレフィックスは付け
ません):


::

	$lang['first_name'] = 'First Name';


.. note:: CI によって自動でロードされていない言語ファイル内に、配列を格納しているなら、次の様にコントローラー内でロードする事を忘れないでくださ
い:


::

	$this->lang->load('file_name');


言語ファイルのより詳細な情報は :doc:`言語クラス <language>`
をご覧ください。



エラーメッセージを囲む文字の変更
================================

初期状態では、システムは、段落タグ (<p>)
で表示される各メッセージを囲みます。
この囲み文字は全体的にも変更できるし、部分的にも変更できます。


#. 全体的に囲み文字を変更する エラーメッセージの囲み文字を全体的に変更
   するには、コントローラーのメソッド内でフォームバリデーションクラスの読
   み込み後に、以下の行を追加します:

::

	$this->form_validation->set_error_delimiters('<div class="error">', '</div>');

   この例では、div タグを使うよう切り替えています。
#. 部分的に囲み文字を変更する 以下の2つの例では、エラーを生成するメソ
   ッドは独自の区切り文字が追加されるようにしている。:

::

	<?php echo form_error('field name', '<div class="error">', '</div>'); ?>

   または:

::

	<?php echo validation_errors('<div class="error">', '</div>'); ?>






個別にエラーを表示する
======================

エラーメッセージを一覧として表示するのではなく、各フォームの下に表示し
たい場合は、 form_error() メソッドを使います。

動かしてみよう ! この様にフォームを変更してください:


::

	
	<h5>ユーザ名</h5>
	<?php echo form_error('username'); ?>
	<input type="text" name="username" value="<?php echo set_value('username'); ?>" size="50" />
	
	<h5>パスワード</h5>
	<?php echo form_error('password'); ?>
	<input type="text" name="password" value="<?php echo set_value('password'); ?>" size="50" />
	
	<h5>パスワードの確認</h5>
	<?php echo form_error('passconf'); ?>
	<input type="text" name="passconf" value="<?php echo set_value('passconf'); ?>" size="50" />
	
	<h5>メールアドレス</h5>
	<?php echo form_error('email'); ?>
	<input type="text" name="email" value="<?php echo set_value('email'); ?>" size="50" />


エラーがない場合は、何も表示されません。エラーがある場合に、メッセージ
が表示されます。

重要: フォームの名前に配列を使う場合、パラメータには配列の形で指定しま
す。例:


::

	<?php echo form_error('options[size]'); ?>
	<input type="text" name="options[size]" value="<?php echo set_value("options[size]"); ?>" size="50" />


詳しくはフィールド名の指定に配列を使うを見てください。





検証ルールを設定ファイルに保存
##############################

フォーム検証クラスの素晴らしい特徴は、アプリケーション全体に適用する検
証ルールをすべて設定ファイル内に格納する事が出来る点です。
ルールは"グループ"毎に整理することができます。 この"グループ"は一致す
るコントローラーやメソッドが呼び出された時に自動的にロードさせる事も出
来るし、必要な時に手動で呼び出す事も出来ます。



ルールの保存方法
~~~~~~~~~~~~~~~~

検証ルールを保存するには、単純に、 form_validation.php
というファイルを application/config/ フォルダ内に作成します。
このファイル内では、検証ルールは $config という名前の配列を格納してく
ださい。前述した様に、この検証ルールの配列は以下の様なプロトタイプにな
ります:


::

	
	$config = array(
	               array(
	                     'field'   => 'username', 
	                     'label'   => 'ユーザ名', 
	                     'rules'   => 'required'
	                  ),
	               array(
	                     'field'   => 'password', 
	                     'label'   => 'パスワード', 
	                     'rules'   => 'required'
	                  ),
	               array(
	                     'field'   => 'passconf', 
	                     'label'   => 'パスワードの確認', 
	                     'rules'   => 'required'
	                  ),   
	               array(
	                     'field'   => 'email', 
	                     'label'   => 'メールアドレス', 
	                     'rules'   => 'required'
	                  )
	            );


検証ルールのファイルは自動的に読み込まれ、run()
メソッドが呼び出される時に使用されます。

必ず $config という名前の配列にしてください。



検証ルールのセットを作る
~~~~~~~~~~~~~~~~~~~~~~~~

ルールを"セット"の中に整理するためには、配列の中に配列を配置する必要が
あります。 次の例を考えます。２つのルールセットをお見せしますので、例
として考えてみましょう。2つのルールとして、任意に "signup" と "email"
と呼ぶことにします。付けたい名前を付ける事ができます:


::

	$config = array(
	                 'signup' => array(
	                                    array(
	                                            'field' => 'username',
	                                            'label' => 'ユーザ名',
	                                            'rules' => 'required'
	                                         ),
	                                    array(
	                                            'field' => 'password',
	                                            'label' => 'パスワード',
	                                            'rules' => 'required'
	                                         ),
	                                    array(
	                                            'field' => 'passconf',
	                                            'label' => 'パスワードの確認',
	                                            'rules' => 'required'
	                                         ),
	                                    array(
	                                            'field' => 'email',
	                                            'label' => 'メールアドレス',
	                                            'rules' => 'required'
	                                         )
	                                    ),
	                 'email' => array(
	                                    array(
	                                            'field' => 'emailaddress',
	                                            'label' => 'メールアドレス',
	                                            'rules' => 'required|valid_email'
	                                         ),
	                                    array(
	                                            'field' => 'name',
	                                            'label' => '名前',
	                                            'rules' => 'required|alpha'
	                                         ),
	                                    array(
	                                            'field' => 'title',
	                                            'label' => 'タイトル',
	                                            'rules' => 'required'
	                                         ),
	                                    array(
	                                            'field' => 'message',
	                                            'label' => 'メッセージ本文',
	                                            'rules' => 'required'
	                                         )
	                                    )                          
	               );




特定のルールグループを呼び出す
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

特定のグループを呼び出すには run()
メソッドにその名前を渡します。たとえば、 signup
ルールを呼び出すにはこのようにします:


::

	
	if ($this->form_validation->run('signup') == FALSE)
	{
	   $this->load->view('myform');
	}
	else
	{
	   $this->load->view('formsuccess');
	}




コントローラー内のメソッドにルールグループを関連づける
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ルールグループを呼び出す別の方法(自動的な方法)としては、コントローラー
やメソッドの名称に沿って名前を付けます。 たとえば、コントローラーを
Member という名前に、メソッドを signup
という名前にしてみましょう。クラスは次の様になります:


::

	
	<?php
	class Member extends CI_Controller {
	
	   function signup()
	   {      
	      $this->load->library('form_validation');
	            
	      if ($this->form_validation->run() == FALSE)
	      {
	         $this->load->view('myform');
	      }
	      else
	      {
	         $this->load->view('formsuccess');
	      }
	   }
	}
	?>


検証ルールの設定ファイル内で、ルールグループの名前として member/signup
と名付けます:


::

	$config = array(
	           'member/signup' => array(
	                                    array(
	                                            'field' => 'username',
	                                            'label' => 'ユーザ名',
	                                            'rules' => 'required'
	                                         ),
	                                    array(
	                                            'field' => 'password',
	                                            'label' => 'パスワード',
	                                            'rules' => 'required'
	                                         ),
	                                    array(
	                                            'field' => 'passconf',
	                                            'label' => 'パスワードの確認',
	                                            'rules' => 'required'
	                                         ),
	                                    array(
	                                            'field' => 'email',
	                                            'label' => 'メールアドレス',
	                                            'rules' => 'required'
	                                         )
	                                    )
	               );


ルールグループがコントローラー／メソッドの名前に一致する名前のとき、ru
n() メソッドが呼び出された時に自動的に使用されます。





フィールド名の指定に配列を使う
##############################

フォーム検証クラスはフィールド名として配列の形式を使う事も出来ます。こ
の例をよく見てください:


::

	<input type="text" name="options[]" value="" size="50" />


フィールド名に配列を使う場合、 ヘルパー
の中ではフォームのフィールド名やバリデーションルールのフィールド名には
正確な名前を使う様にしてください。

たとえば、上記のフィールド用のルールを設定するにはこの様にしてください
:


::

	$this->form_validation->set_rules('options[]', 'オプション', 'required');


または、エラーを表示させるにはこのようにしてください:


::

	<?php echo form_error('options[]'); ?>


フォームの再表示の時はこうです:


::

	<input type="text" name="options[]" value="<?php echo set_value('options[]'); ?>" size="50" />


フィールド名として多次元配列を使う事も出来ます:例:


::

	<input type="text" name="options[size]" value="" size="50" />


またはこの様にもできます:


::

	<input type="text" name="sports[nba][basketball]" value="" size="50" />


最初の例と同様に、ヘルパー関数には正確な名前を用いてください:


::

	<?php echo form_error('sports[nba][basketball]'); ?>


複数の選択肢を持つチェックボックス(もしくは他のフォーム)を使う場合は、
それぞれの名前には空白のカッコを付ける事を忘れないでください。
そうしないと POST 時の配列にすべての選択が渡りません:


::

	
	<input type="checkbox" name="options[]" value="red" />
	<input type="checkbox" name="options[]" value="blue" />
	<input type="checkbox" name="options[]" value="green" />


または多次元配列を使う場合はこうなります:


::

	
	<input type="checkbox" name="options[color][]" value="red" />
	<input type="checkbox" name="options[color][]" value="blue" />
	<input type="checkbox" name="options[color][]" value="green" />


ヘルパー関数を使う時は以下の様にカッコを付けてください:


::

	<?php echo form_error('options[color][]'); ?>






ルールリファレンス
##################

次のリストは、使用可能なすべての組み込みのルールです:
  
	ルール
		パラメータ
		説明
		例
	 required
		 なし
		 フォームのデータが空のときに FALSE を返します。
		  
	 matches
		 あり
		 フォームのデータが他のフィールドの入力データと一致しないときに FALSE を返します。
		 matches[form_item]
	 is_unique
		 Yes
		 Returns FALSE if the form element is not unique to the table and field name in the parameter.
		 is_unique[table.field]
	 min_length
		 あり
		 フォームのデータが指定したサイズよりも文字数が短いときに FALSE を返します。
		 min_length[6]
	 max_length
		 あり
		 フォームのデータが指定したサイズよりも文字数が長いときに FALSE を返します。
		 max_length[12]
	 exact_length
		 あり
		 フォームのデータが特定の長さでないときに FALSE を返します。
		 exact_length[8]
	 greater_than
		 あり
		 フォームのデータが指定した値よりも小さいか、数値でないときに FALSE を返します。
		 greater_than[8]
	 less_than
		 あり
		 フォームのデータが指定した値よりも大きいか、数値でないときに FALSE を返します。
		 less_than[8]
	 alpha
		 なし
		 フォームのデータがアルファベットでない文字を含むときに FALSE を返します。
		  
	 alpha_numeric
		 なし
		 フォームのデータが英数字でない文字を含むときに FALSE を返します。
		  
	 alpha_dash
		 なし
		 フォームのデータが英数字、アンダースコア("_")、ダッシュ("-") のいずれでないものを含むときに FALSE を返します。
		  
	 numeric
		 なし
		 フォームのデータが数字でないときに FALSE を返します。
		  
	 integer
		 なし
		 フォームのデータが整数以外の場合 FALSE を返します。
		  
	 decimal
		 あり
		 Returns FALSE if the form element is not exactly the parameter value.
		  
	 is_natural
		 なし
		 フォームのデータが0, 1, 2, 3, 等の自然数以外の場合 FALSE を返します。
		  
	 is_natural_no_zero
		 なし
		 フォームのデータが0を除く1, 2, 3, 等の自然数以外の場合 FALSE を返します。
		  
	 is_unique
		 Yes
		 Returns FALSE if the form element is not unique in a database table.
		 is_unique[table.field]
	 valid_email
		 なし
		 フォームのデータが email アドレスとして正しくないとき FALSE を返します。
		  
	 valid_emails
		 なし
		 コンマで区切られたリストのひとつでもメールアドレスとして正しくないとき FALSE を返します。
		  
	 valid_ip
		 なし
		 渡された IP が正しい形式でないときに FALSE を返します。
		  
	 valid_base64
		 なし
		 渡された文字列が正しい Base64 形式でないとき FALSE を返します。
		  
	


.. note:: また、これらのルールは普通のメソッドとしても呼び出すことができます。
例:


::

	$this->form_validation->required($string);


.. note:: 引数を1つだけとる PHP の組み込み関数も使用できます。




整形処理のリファレンス
######################

次のリストは、使用可能な整形メソッドのリストです:
   
	名前
		パラメータ
		説明
	 xss_clean
		 なし
		 XSS フィルタリングメソッドを通過させます。XSS フィルタリングメソッドについては、 :doc:`入力クラス <input>` のページをご覧ください。
	 prep_for_form
		 なし
		 HTML データをフォームフィールドで崩れずに表示させるよう、HTML 特殊文字を変換します。
	 prep_url
		 なし
		 もし、先頭に "http://" がない場合は、"http://" を URL に追加します。
	 strip_image_tags
		 なし
		 イメージへの URL をそのままにして、イメージタグから HTML を取り除きます。
	 encode_php_tags
		 なし
		 PHP タグを HTML エンティティに変換します。
	


.. note:: また、 trim 、 htmlspecialchars 、 urldecode などの引数を1つだけとる PHP の組み込み関数をどれでも使用することができます。





関数リファレンス
################

以下の関数はコントローラーのメソッド内で使われる事を意図しています。



$this->form_validation->set_rule();
===================================

上記のチュートリアルの説明の様に、検証ルールを設定することができます。


-  検証ルールを設定する
-  設定ファイルに検証ルールのグループを保存する




$this->form_validation->run();
==============================

検証処理を実行する。成功時は TRUE を返し、失敗時は FALSE を返す。
このメソッドには 設定ファイルに検証ルールのグループを保存する
に書いてある様に、検証ルールグループの名前を渡せます。



$this->form_validation->set_message();
======================================

エラーメッセージをカスタマイズして指定できます。エラーメッセージを設定
するをご覧ください。





ヘルパー関数リファレンス
########################

次のヘルパー関数はフォームを含むビューファイルの中で使うことができます
。 これは単独の関数なので、直前に $this->form_validation
をいれる必要は ありません 。



form_error()
============

メソッドに渡すフィールド名に関連づけられた、個々のエラーメッセージを表
示する。例:


::

	<?php echo form_error('username'); ?>


エラー区切り文字は自由に指定できます。前述の
エラーメッセージを囲む文字の変更 セクションをご覧ください。



validation_errors()
===================

文字列としてすべてのエラーメッセージを表示する:例:


::

	<?php echo validation_errors(); ?>


エラー区切り文字は自由に指定できます。前述の
エラーメッセージを囲む文字の変更 セクションをご覧ください。



set_value()
===========

input フォームや textarea の value に値を入れることができます。メソッ
ドの第1引数にフィールド名を指定します。
第2引数(オプション)はフォームのデフォルト値を指定します。例:


::

	<input type="text" name="quantity" value="<?php echo set_value('quantity', '0'); ?>" size="50" />


上記のフォームは最初に読み込まれた時に"0"が入ります。



set_select()
============

<select>
メニューを使うとき、この関数は選択されたメニュー項目を表示できます。
第1引数は SELECT フォームの名前を指定します。
第2引数(オプション)にはデフォルト値(TRUE/FALSE
のブール値)を指定します。

例:


::

	
	<select name="myselect">
	<option value="one" <?php echo  set_select('myselect', 'one', TRUE); ?> >1</option>
	<option value="two" <?php echo  set_select('myselect', 'two'); ?> >2</option>
	<option value="three" <?php echo  set_select('myselect', 'three'); ?> >3</option>
	</select>




set_checkbox()
==============

送信されたチェックボックスの状態を表示できます。 第 1
引数にはチェックボックスの名前を指定します。第2引数には value に設定し
た値を指定します。第3引数(オプション)にはデフォルト値(TRUE/FALSEのブー
ル値)を指定します。例:


::

	<input type="checkbox" name="mycheck[]" value="1" <?php echo set_checkbox('mycheck[]', '1'); ?> />
	<input type="checkbox" name="mycheck[]" value="2" <?php echo set_checkbox('mycheck[]', '2'); ?> />




set_radio()
===========

送信されたラジオボタンの状態を表示できますこの関数は前述の
set_checkbox() 関数と同じです。


::

	<input type="radio" name="myradio" value="1" <?php echo set_radio('myradio', '1', TRUE); ?> />
	<input type="radio" name="myradio" value="2" <?php echo set_radio('myradio', '2'); ?> />


