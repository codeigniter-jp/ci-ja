################
CAPTCHA ヘルパー
################

CAPTCHA ヘルパーのファイルは、CAPTCHA
画像を作成するのに役立つ関数で構成されています。



ヘルパーのロード
================

このヘルパーは次のコードを使ってロードします:

::

	$this->load->helper('captcha');


次の関数が利用できます:



create_captcha( $data )
=======================

入力として引数に CAPTCHA 生成のための情報を配列で受け取り、指定された
画像を生成し、生成された画像に関するデータの連想配列を返します。


::

	[array]
	(
	  'image' => IMAGE TAG
	  'time'	=> TIMESTAMP (マイクロ秒まで含む)
	  'word'	=> CAPTCHA WORD
	)


"image" は実際の image タグです:

::

	<img src="http://example.com/captcha/12345.jpg" width="140" height="50" />



"time" はマイクロ秒でのタイプスタンプで、拡張子を除いた部分の画像のフ
ァイル名として使われます。 このような数字になります: 1139612155.3422

"word" はキャプチャ画像に表示される単語で、指定されない場合は
ランダムな文字列になります。



CAPTCHA ヘルパーの使用
~~~~~~~~~~~~~~~~~~~~~~

一旦ロードすれば、このようなキャプチャを生成できます:


::

	$vals = array(
	    'word'		 => 'Random word',
	    'img_path'	 => './captcha/',
	    'img_url'	 => 'http://example.com/captcha/',
	    'font_path'	 => './path/to/fonts/texb.ttf',
	    'img_width'	 => '150',
	    'img_height' => 30,
	    'expiration' => 7200
	    );
	
	$cap = create_captcha($vals);
	echo $cap['image'];



-  captcha 関数は GD 画像ライブラリを必要とします。
-  img_path と img_url は必須です。
-  "word" が指定されない場合、ランダムな ASCII 文字列が生成されます。
   自前の辞書を使用しても良いでしょう。
-  TRUE TYPE フォントのパスが指定されない場合、標準の見苦しい GD
   フォントが使用されます。
-  "captcha" ディレクトリは書込可能でなければなりません。
   (666または777)
-  "expiration" (単位: 秒) は有効期限で、 captcha
   ディレクトリから削除されるまでの時間です。 デフォルトでは2時間です。




データベースの追加
~~~~~~~~~~~~~~~~~~

第三者に送信されるのを防ぐために、 create_captcha()
関数が返す情報をデータベースに格納します。
そして、利用者によりフォームからデータが送信されると、
データが存在することと、 期限が切れていないことを検証します。

テーブルの定義:


::

	CREATE TABLE captcha (
	 captcha_id bigint(13) unsigned NOT NULL auto_increment,
	 captcha_time int(10) unsigned NOT NULL,
	 ip_address varchar(16) default '0' NOT NULL,
	 word varchar(20) NOT NULL,
	 PRIMARY KEY `captcha_id` (`captcha_id`),
	 KEY `word` (`word`)
	);


データベースと組み合わせた際の例です。キャプチャを表示するページの例:


::

	$this->load->helper('captcha');
	$vals = array(
	    'img_path'	 => './captcha/',
	    'img_url'	 => 'http://example.com/captcha/'
	    );
	
	$cap = create_captcha($vals);
	
	$data = array(
	    'captcha_time'	=> $cap['time'],
	    'ip_address'	=> $this->input->ip_address(),
	    'word'			=> $cap['word']
	    );
	
	$query = $this->db->insert_string('captcha', $data);
	$this->db->query($query);
	
	echo 'Submit the word you see below:';
	echo $cap['image'];
	echo '<input type="text" name="captcha" value="" />';


送信を受け付けるページの例:


::

	// 期限切れのキャプチャを削除
	$expiration = time()-7200; // 有効期限: 2時間
	$this->db->query("DELETE FROM captcha WHERE captcha_time < ".$expiration);	
	
	// キャプチャが存在するか確認:
	$sql = "SELECT COUNT(*) AS count FROM captcha WHERE word = ? AND ip_address = ? AND captcha_time > ?";
	$binds = array($_POST['captcha'], $this->input->ip_address(), $expiration);
	$query = $this->db->query($sql, $binds);
	$row = $query->row();
	
	if ($row->count == 0)
	{
	    echo "You must submit the word that appears in the image";
	}


