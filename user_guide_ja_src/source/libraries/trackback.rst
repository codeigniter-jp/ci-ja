####################
トラックバッククラス
####################

トラックバッククラスでは、トラックバックを送受信するのを可能にするメソ
ッドが提供されています。

トラックバックについてあまりご存じでない場合は、詳しい情報を `こちら <
http://ja.wikipedia.org/wiki/%E3%83%88%E3%83%A9%E3%83%83%E3%82%AF%E3%8
3%90%E3%83%83%E3%82%AF>`_ でご覧いただけます。



クラスの初期化
==============

CodeIgniterの他の多くのクラスと同様、トラックバッククラスは、コントロ
ーラの中で、 $this->load->library メソッドを使って初期化されます:


::

	$this->load->library('trackback');


初期化されたら、トラックバックライブラリのオブジェクトは次のコードで利
用できます: $this->trackback



トラックバックの送信
====================

次のサンプルのようなコードを使えば、コントローラのメソッド内であればど
こからでもトラックバックを送信することができます:


::

	$this->load->library('trackback');
	
	$tb_data = array(
	                'ping_url'  => 'http://example.com/trackback/456',
	                'url'       => 'http://www.my-example.com/blog/entry/123',
	                'title'     => '記事のタイトル',
	                'excerpt'   => '記事内容',
	                'blog_name' => 'ブログの名前',
	                'charset'   => 'utf-8'
	                );
	
	if ( ! $this->trackback->send($tb_data))
	{
	     echo $this->trackback->display_errors();
	}
	else
	{
	     echo 'トラックバックが送信されました!';
	}


配列データについての説明です:


-  ping_url - トラックバックを送信する相手のURL。各URLをカンマ ( "," )
   で区切れば、複数のURLに対してトラックバックを送信できます。
-  url - ブログのエントリ(記事)がある送信元サイトのURL。
-  title - ブログのエントリのタイトル。
-  excerpt - ブログの記事内容。Note: トラックバッククラスは、記事のはじ
   めから500字を自動で送信します。また、記事のHTMLは取り除かれます。
-  blog_name - ブログの名前。
-  charset - ブログが書かれている文字コード。省略された場合は、UTF-8
   が使用されます。


トラックバック送信メソッドは、成功したか失敗したかにより、TRUE/FALSE
(ブール値) を返します。失敗したときは、次のようにしてエラーメッセージ
を取得できます:


::

	$this->trackback->display_errors();




トラックバックの受信
====================

トラックバックを受信する前には、まずブログを作成する必要があります。も
しブログをまだ作成していないのであれば、続けて読んでも意味がありません
。

トラックバックの受信は、保存するデータベーステーブルが必要になり、受信
したトラックバックデータを検証する必要があるので、送信するよりもやや複
雑になります。 スパムや重複投稿を防止できるよう検証処理を実装すること
をおすすめします。 また、スパム防止のため、一定時間内の同一IPアドレス
からの投稿数を制限したいかもしれません。
トラックバックを受信する処理は非常に単純です。
検証処理こそが最大の努力を払うところになります。



トラックバックPing URL
======================

トラックバックを受信するには、各ブログの記事の下に、トラックバック URL
を表示しなければなりません。
これは、他の人がトラックバックを送信するURLになります(これは
"トラックバック Ping URL" として参照されます)。

トラックバック Ping URL は、コントローラの中のトラックバックを受信させ
るコードがあるメソッドを指していなければならず、
また、URLには個別の記事のID番号が含まれていなければなりません。 そうす
ることで、トラックバックを個別の記事に関連づけて受信することができます
。

たとえば、コントローラクラスが Trackback という名前で、受信メソッドが
receive という名前のとき、 トラックバック Ping URL
は、次のようになります:


::

	http://example.com/index.php/trackback/receive/entry_id


ここでの entry_id は、個別の記事の固有のID番号をあらわします。



トラックバック用のテーブルの作成
================================

トラックバックを受信する前に、トラックバックを保存するテーブルを作成す
る必要があります。以下は、テーブルの基本的な例です:


::

	
	CREATE TABLE trackbacks (
	 tb_id int(10) unsigned NOT NULL auto_increment,
	 entry_id int(10) unsigned NOT NULL default 0,
	 url varchar(200) NOT NULL,
	 title varchar(100) NOT NULL,
	 excerpt text NOT NULL,
	 blog_name varchar(100) NOT NULL,
	 tb_date int(10) NOT NULL,
	 ip_address varchar(16) NOT NULL,
	 PRIMARY KEY `tb_id` (`tb_id`),
	 KEY `entry_id` (`entry_id`)
	);


トラックバックの仕様では、トラックバックを送信するには4つの情報
(url、title、excerpt、blog_name) だけが必要になりますが、 データをより
役立つものにするために、もう少し多くのフィールドをテーブルのスキーマに
追加します (date、IP address、など)。



トラックバックの処理
====================

以下は、トラックバックを受信し処理する方法を示した例です。 次のコード
は、コントローラの中のトラックバックを受信するメソッド内で使うことを意
図しています。


::

	$this->load->library('trackback');
	$this->load->database();
	
	if ($this->uri->segment(3) == FALSE)
	{
	    $this->trackback->send_error("記事IDを特定できません");
	}
	
	if ( ! $this->trackback->receive())
	{
	    $this->trackback->send_error("トラックバックデータに不正なデータが含まれます");
	}
	
	$data = array(
	                'tb_id'      => '',
	                'entry_id'   => $this->uri->segment(3),
	                'url'        => $this->trackback->data('url'),
	                'title'      => $this->trackback->data('title'),
	                'excerpt'    => $this->trackback->data('excerpt'),
	                'blog_name'  => $this->trackback->data('blog_name'),
	                'tb_date'    => time(),
	                'ip_address' => $this->input->ip_address()
	                );
	
	$sql = $this->db->insert_string('trackbacks', $data);
	$this->db->query($sql);
	
	$this->trackback->send_success();




Notes:
``````

記事ID番号は、URLの第3セグメントにあると想定しています。上で挙げたサン
プルのURLにもとづいています:


::

	http://example.com/index.php/trackback/receive/entry_id


第3 URI セグメントにある entry_id
は、次のようにして取得可能ですので覚えておいてください:


::

	$this->uri->segment(3);


上のトラックバックを受信するコードでは、もし第3セグメントがない場合、
エラーを発行しています。 [ 訳注:
トラックバック送信元に対し、Pingのエラー応答メッセージを返します。 ]
正しい記事IDがない場合、続行する理由はありません。

$this->trackback->receive() メソッドは単に、受信したデータを検証し、
受信したデータに必要な4つのデータ (url、title、excerpt、blog_name)
が含まれるかを確かめるメソッドです。 検証に成功した場合は TRUE
を失敗した場合は FALSE
を返します。失敗した場合にエラーメッセージを発行しています。

受信したトラックバックデータは、次のメソッドで取得可能です:


::

	$this->trackback->data('item')


ここでの item は、次のようなトラックバック情報の項目を表します:
url、title、excerpt、あるいはblog_name

トラックバックが正常に受信されたら、次のようにして成功メッセージを発行
します [ 訳注:
トラックバック送信元に対し、Pingの応答メッセージを返します。 ]:


::

	$this->trackback->send_success();


.. note:: 上のコードには、データの検証がありません。データの検証を追加することをおすすめします。

