##########################
ファイルアップロードクラス
##########################

CodeIgniter のファイルアップロードクラスを使うとファイルのアップロード
が可能になります。 ファイルの形式、サイズを規定するために、各種の設定
項目をセットできます。



手順
====

ファイルをアップロードするには、一般的には次のような手順になります:


-  アップロードフォームが表示されます。アップロードフォームでは、ユーザ
   がアップロードするファイルを選べます。
-  フォームが送信されたとき、指定した場所にファイルがアップロードされま
   す。
-  アップロードの過程で、ファイルは指定した設定情報に従って、アップロー
   ド可能かどうかが検証されます。
-  アップロードされたあと、ユーザに成功メッセージが表示されます。


この手順を説明するため、以下で短いチュートリアルを用意しました。チュー
トリアルの後に、リファレンス情報を掲載しています。



アップロードフォームの作成
==========================

テキストエディタを使って、 upload_form.php
という名前のファイルを作ります。その中に、下記のコードを記述し
applications/views/ フォルダに保存します:


::

	
	<html>
	<head>
	<title>アップロードフォーム</title>
	</head>
	<body>
	
	<?php echo $error;?>
	
	<?php echo form_open_multipart('upload/do_upload');?>
	
	<input type="file" name="userfile" size="20" />
	
	<br /><br />
	
	<input type="submit" value="upload" />
	
	</form>
	
	</body>
	</html>


form タグを開始するのにフォームヘルパー関数を利用しているのがわかると
思います。 ファイルアップロードではマルチパートフォームが必要になり、
ヘルパーはその正しい構文を生成してくれます。 また、$error 変数があるの
がわかると思います。これは、ユーザが誤操作した場合にエラーメッセージを
表示するのに使います。



成功ページ
==========

テキストエディタを使って、 upload_success.php
という名前のフォームファイルを作ります。
その中に下記のコードを記述して applications/views/
フォルダに保存してください:


::

	<html>
	<head>
	<title>アップロードフォーム</title>
	</head>
	<body>
	
	<h3>ファイルのアップロードに成功しました!</h3>
	
	<ul>
	<?php foreach ($upload_data as $item => $value):?>
	<li><?php echo $item;?>: <?php echo $value;?></li>
	<?php endforeach; ?>
	</ul>
	
	<p><?php echo anchor('upload', 'Upload Another File!'); ?></p>
	
	</body>
	</html>




コントローラ
============

テキストエディタを使って upload.php
という名前のコントローラを作ります。その中に、下記のコードを記述して、
applications/controllers/ フォルダに保存してください:


::

	<?php
	
	class Upload extends CI_Controller {
	
		function __construct()
		{
			parent::__construct();
			$this->load->helper(array('form', 'url'));
		}
	
		function index()
		{
			$this->load->view('upload_form', array('error' => ' ' ));
		}
	
		function do_upload()
		{
			$config['upload_path'] = './uploads/';
			$config['allowed_types'] = 'gif|jpg|png';
			$config['max_size']	= '100';
			$config['max_width']  = '1024';
			$config['max_height']  = '768';
	
			$this->load->library('upload', $config);
	
			if ( ! $this->upload->do_upload())
			{
				$error = array('error' => $this->upload->display_errors());
	
				$this->load->view('upload_form', $error);
			}
			else
			{
				$data = array('upload_data' => $this->upload->data());
	
				$this->load->view('upload_success', $data);
			}
		}
	}
	?>




アップロードフォルダ
====================

アップロードする画像用のアップロード先フォルダが必要です。 CodeIgniter
をインストールした場所のルートに uploads
という名前のフォルダを作り、パーミッションを777にセットしてください。



動かして試してみよう！
======================

フォームを動かすには、下記のURLを使ってサイトに移動します:


::

	exmaple.com/index.php/upload/


アップロードフォームが表示されるはずです。イメージファイル
(jpg、gif、または png のいずれか)をアップロードしてみてください。 動作
させるには、コントローラに書いてあるパスが正しくなければなりません。





リファレンスガイド
##################



アップロードクラスの初期化
==========================

CodeIgniter
のほとんどのクラスと同じく、アップロードクラスは、コントローラの中で
$this->load->library メソッドを使って初期化します:


::

	$this->load->library('upload');


アップロードクラスがロードされると、オブジェクトは次のように利用可能で
す: $this->upload



オプションの設定
================

他のライブラリ同様、設定項目に基づいて、どんなファイルがアップロード可
能かをコントロールできます。
上で作成したコントローラでは、次のような設定をセットしました:


::

	$config['upload_path'] = './uploads/';
	$config['allowed_types'] = 'gif|jpg|png';
	$config['max_size']	= '100';
	$config['max_width'] = '1024';
	$config['max_height'] = '768';
	
	$this->load->library('upload', $config);
	
	//  initialize メソッドを呼んで設定することもできます。このクラスを自動読み込みするときに使えます:
	$this->upload->initialize($config);


上のような設定項目を使って、アップロードされるファイルについて完全に定
義する必要があります。下記は、全設定項目を説明した表です。



設定項目
========

次の設定項目を指定可能です。初期値のところは、設定項目を指定しなかった
時に使われる値になります。
設定項目 初期値 選択肢 説明 upload_path なし なし アップロードされたフ
ァイルが置かれるフォルダへのパス。フォルダは書き込み可能でなければなり
ません。また、絶対パス あるいは 相対パスで指定できます。 allowed_types
なし なし アップロードできるファイルの MIME タイプ。通常は、MIME
タイプを示すのに拡張子で指定することができます。"|"
で区切って複数指定します。 file_name なし 目的のファイル名
設定すると、CodeIgniterはアップロードされたファイルをこのファイル名に
リネームします。ファイル名の拡張子は許可されたファイルタイプのものでな
ければなりません。


 overwrite
 FALSE
 TRUE/FALSE (ブール値)
 TRUE に設定すると、アップロードしたものと同じ名前のファイルがすでに存在する場合に上書きされます。FALSE にセットすると、同名のファイルがすでに存在する場合に、ファイル名に番号が追加されます。
 max_size
 0
 なし
 アップロードできるファイルの最大サイズ (KB) 。無制限にする場合には0を設定します。Note:  php.ini ファイルで、各 PHP 実行環境そのものの制限が指定されています。デフォルトの2 MB (または2048 KB) がたいていの場合セットされています。
 max_width
 0
 なし
 ファイル [ 訳注: ファイルが画像の場合の ] の幅の最大値 (ピクセル) 。無制限にするには、0を指定します。
 max_height
 0
 なし
 ファイル [ 訳注: ファイルが画像の場合の ] の高さの最大値 (ピクセル) 。無制限にするには、0を指定します。
 max_filename
 0
 なし
 ファイル名の最大文字数。無制限にするには、0を指定します。
 max_filename_increment
 100
 なし
 overwrite が FALSE に設定された場合, CodeIgniter がファイル名に付加する番号の最大値を指定します。
 encrypt_name
 FALSE
 TRUE/FALSE (ブール値)
 TRUE を設定すると、ファイル名がランダムな暗号文字列に変換されます。アップロードした人が指定した名前と違う名前で保存したい場合に役立ちます。
 remove_spaces
 TRUE
 TRUE/FALSE (ブール値)
 TURE に設定した場合、ファイルネーム中のスペースがアンダースコア ”_" に変換されます。TRUE に設定することをおすすめします。




設定ファイルに設定を記述する
============================

上記の方法でオプションを設定したくない場合、代わりに設定ファイルに記述
することもできます。 upload.php という名前のファイルをつくり $config
という名前で設定項目の配列をそのファイルを書きます。 次に
config/upload.php に保存すると、自動的にそれが使われるようになります。
設定項目を設定ファイルに記述した場合は、 $this->upload->initialize
メソッドを呼ぶ必要はありません。



メソッドリファレンス
====================

次のメソッドが利用可能です。



$this->upload->do_upload()
==========================

セットした設定項目に従って、ファイルのアップロードが実行されます。
.. note:: デフォルトでは、フォームで userfile という名前のフォームフィールドにファイルのデータが設定されるものとしてアップロード処理が実行されま
す。また、フォームは multipart タイプである必要があります:


::

	<form method="post" action="some_action" enctype="multipart/form-data" />


アップロードされるファイルのフィールド名を設定したい場合は、 do_upload
メソッドにその値を渡してください:


::

	
	$field_name = "some_field_name";
	$this->upload->do_upload($field_name)




$this->upload->display_errors()
===============================

do_upload() メソッドが FALSE
を返したときのすべてのエラーを取得します。 このメソッドは、自動では出
力(echo)しません。変数に代入することができるように、このメソッドはデー
タを返します。



エラーメッセージを整形する
~~~~~~~~~~~~~~~~~~~~~~~~~~

デフォルトでは、このメソッドは、各エラーを<p>タグで囲みます。次のよう
に、エラーを囲むのに使う文字列を自分でセットすることもできます:


::

	$this->upload->display_errors('<p>', '</p>');




$this->upload->data()
=====================

アップロードしたファイルについての情報を配列で返すメソッドです。
下記は、配列の例です:


::

	Array
	(
	    [file_name]    => mypic.jpg
	    [file_type]    => image/jpeg
	    [file_path]    => /path/to/your/upload/
	    [full_path]    => /path/to/your/upload/jpg.jpg
	    [raw_name]     => mypic
	    [orig_name]    => mypic.jpg
	    [client_name]  => mypic.jpg
	    [file_ext]     => .jpg
	    [file_size]    => 22.2
	    [is_image]     => 1
	    [image_width]  => 800
	    [image_height] => 600
	    [image_type]   => jpeg
	    [image_size_str] => width="800" height="200"
	)




配列の項目の意味について
~~~~~~~~~~~~~~~~~~~~~~~~

下記は、上の配列の項目の説明です。
 
項目説明 file_name
 アップロードされたファイルの拡張子を含むファイル名。 file_type
 ファイルの MIME タイプ file_path
 サーバ上のファイルへの絶対パス full_path
 ファイル名を含むサーバ上のファイルへの絶対パス raw_name
 拡張子を除くファイル名 orig_name
 オリジナルのファイル名。この項目は暗号化された名前を使うとき [ 訳注: 設定項目の encrypt_name をTRUEにした場合 ] だけ意味があります。 client_name
 インクリメント処理やファイル名を調整する前の、クライアントユーザエージェントから与えられたファイル名。 file_ext
 ピリオドを含むファイル拡張子 file_size
 ファイルサイズ (KB) is_image
 ファイルが画像であるかどうか。  1 = 画像。 0 = 画像以外。 image_width
 画像の幅。 image_height
 画像の高さ。 image_type
 画像の種類。典型的には、拡張子からピリオドをとったものになります。 image_size_str
  width と height を含む文字列。img タグに指定するのに使います。


