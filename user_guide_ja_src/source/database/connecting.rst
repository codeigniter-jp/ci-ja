####################
データベースへの接続
####################

データベースへの接続方法は2つあります:



自動接続
========

"自動接続" 機能は、ページが読み込まれるたびにデータベースクラスをロー
ドし、インスタンス化するというものです。 "自動接続"を有効にするには、
次のファイルの中にあるライブラリ配列の中に、 database
と指定してください [ 訳注: $autoload['libraries' ] =
array(’database’); などとします ]:

application/config/autoload.php



手動接続
========

ページの中で数ページだけがデータベース接続を必要とする場合は、手動でデ
ータベースに接続することができます。 手動でデータベースに接続するには
、必要とするメソッド内で随時下記のコードを追加するか、 そのクラスでグ
ローバルに使用したい場合はコンストラクタに下記のコードを追加します。


::

	$this->load->database();


上のメソッドの第1引数に 何も指定しない
場合は、設定ファイルで指定されているグループ [ 訳注:
デフォルトのグループ ] に接続します。
多くの人にとっては、この方法が使いやすいと思います。



使用可能なパラメータ
~~~~~~~~~~~~~~~~~~~~


#. 配列またはDSN文字列によるデータベース接続値
#. TRUE/FALSE (ブール値)。
   接続IDを返すかどうか(以下の複数のデータベースへの接続をご覧ください)。
#. TRUE/FALSE (ブール値)。Active Record
   クラスを利用するかどうか。初期値は TRUE がセットされます。




データベースへの手動接続
~~~~~~~~~~~~~~~~~~~~~~~~

メソッドの第1引数は、 オプションで 設定ファイルに定義した特定のデータ
ベース接続グループを指定するのに使用します。 また、設定ファイルで指定
されていない接続用のデータを渡すこともできます。 例としては:

設定ファイルで定義したグループを選択するには次のようにします:


::

	$this->load->database('group_name');


ここでの group_name
が設定ファイルで定義した接続グループの名前になります。

手動で任意のデータベースに接続するには、次のように配列でデータを渡しま
す:


::

	$config['hostname'] = "localhost";
	$config['username'] = "myusername";
	$config['password'] = "mypassword";
	$config['database'] = "mydatabase";
	$config['dbdriver'] = "mysql";
	$config['dbprefix'] = "";
	$config['pconnect'] = FALSE;
	$config['db_debug'] = TRUE;
	$config['cache_on'] = FALSE;
	$config['cachedir'] = "";
	$config['char_set'] = "utf8";
	$config['dbcollat'] = "utf8_general_ci";
	
	$this->load->database($config);


接続用の各データについての情報は、 :doc:`設定について <configuration>`
をご覧ください。

.. note:: PDO ドライバの場合、 $config['hostname'] は次のように指定します:'mysql:host=localhost'

あるいは、データベースの接続データをデータソースネーム(DSN)を使って渡
すこともできます。DSN は次のような形になっている必要があります:


::

	$dsn = 'dbdriver://username:password@hostname/database';
	
	$this->load->database($dsn);


データソースネーム(DSN)で設定ファイルのデフォルト値を上書きする場合に
は、接続データをクエリで追加します。


::

	$dsn = 'dbdriver://username:password@hostname/database?char_set=utf8&dbcollat=utf8_general_ci&cache_on=true&cachedir=/path/to/cache';
	
	$this->load->database($dsn);




複数のデータベースへの接続
==========================

同時に 2つ以上のデータベースに接続する必要がある場合は次のようにするこ
とで可能になります:


::

	$DB1 = $this->load->database('group_one', TRUE);
	$DB2 = $this->load->database('group_two', TRUE);


.. note:: "group_one" と "group_two"の部分は接続したいグループ名に変えてください
(あるいは、上で説明したように接続用データを渡してください)。

メソッドの第2引数に TRUE (ブール値)
を指定すると、データベースオブジェクトを返すようになります。

このガイドで一貫して使われている構文を使わずに、上記のような方法で接続
すると、オブジェクト名を使ってコマンドを発行できます。つまり、以下のよ
うな方法でコマンドを発行するのではなく:

$this->db->query();
$this->db->result();
など...

かわりに次のような方法を利用できます:

$DB1->query();
$DB1->result();
など...



再接続 / 接続状態の維持
=======================

何らかの重いPHPの処理 (たとえば画像の処理など)を行っている間に、データ
ベースサーバのアイドルタイムアウトを過ぎてしまった場合、追加のクエリを
送信する前に reconnect() メソッドを使ってサーバーの応答確認(pinging)す
るのを検討すべきです。このメソッドは、適切に接続状態を維持したり、再接
続したりできます。


::

	$this->db->reconnect();




手動切断
========

CodeIgniter がデータベースの切断を待っている間に、明確に接続を閉じるこ
ともできます。


::

	$this->db->close();


