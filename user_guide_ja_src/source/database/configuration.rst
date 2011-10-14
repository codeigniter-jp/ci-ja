################
データベース設定
################

CodeIgniter には、データベース接続用のデータ(ユーザ名、パスワード、デ
ータベース名など)を保存できる設定ファイルがあります。 設定ファイルは
application/config/database.php にあります。また、特定の :doc:`環境
<../libraries/config>` のためのデータベース接続のための設定をするため
に、それぞれの環境の設定フォルダの中に database.php
を置くこともできます。

設定は、次のひな形で、多次元配列で保存されています:


::

	$db['default']['hostname'] = "localhost";
	$db['default']['username'] = "root";
	$db['default']['password'] = "";
	$db['default']['database'] = "database_name";
	$db['default']['dbdriver'] = "mysql";
	$db['default']['dbprefix'] = "";
	$db['default']['pconnect'] = TRUE;
	$db['default']['db_debug'] = FALSE;
	$db['default']['cache_on'] = FALSE;
	$db['default']['cachedir'] =  "";
	$db['default']['char_set'] = "utf8";
	$db['default']['dbcollat'] = "utf8_general_ci";
	$db['default']['swap_pre'] = "";
	$db['default']['autoinit'] = TRUE;
	$db['default']['stricton'] = FALSE;


単純な１次元配列を使わずに、多次元配列を使う理由は、オプションで、接続
用のデータを複数セット利用できるようにするためです。 たとえば、ひとつ
のインストール方法で、複数の環境(開発用、製品用、テスト用など)で実行す
るような場合に、 各環境ごとに接続設定をグループ化しておき、動かす環境
に必要なグループに切り替えるといったことが可能です。 たとえば、"test"
用の環境をセットアップするには次のようにします:


::

	$db['test']['hostname'] = "localhost";
	$db['test']['username'] = "root";
	$db['test']['password'] = "";
	$db['test']['database'] = "database_name";
	$db['test']['dbdriver'] = "mysql";
	$db['test']['dbprefix'] = "";
	$db['test']['pconnect'] = TRUE;
	$db['test']['db_debug'] = FALSE;
	$db['test']['cache_on'] = FALSE;
	$db['test']['cachedir'] =  "";
	$db['test']['char_set'] = "utf8";
	$db['test']['dbcollat'] = "utf8_general_ci";
	$db['test']['swap_pre'] = "";
	$db['test']['autoinit'] = TRUE;
	$db['test']['stricton'] = FALSE;


次に、システムに対して全体でそのグループを使うことを通知するため、設定
ファイルにある下記の変数にグループ名をセットします:


::

	$active_group = "test";


.. note:: 名前の "test"は任意です。好きなように設定できます。初期状態では、"default" を優先(
プライマリ)接続として使っていますが、この名前もプロジェクトにふさわし
い名前にリネームすることができます。



Active Record
~~~~~~~~~~~~~

:doc:`Active Record クラス <active_record>`
はデータベース設定ファイルの $active_record 変数に TRUE/FALSE(ブール値
)をセットすることによりグローバルに有効または無効にできます。active
record クラスを使用しない場合は、FALSEをセットするとデータベースクラス
を初期化したときに、少ないリソースを有効活用できます。


::

	$active_record = TRUE;


.. note:: Sessionなど、いくつかのCodeIgniterのクラスは特定の機能にアクセスするために Active Record を有効にする必要があります。



設定データの説明:
~~~~~~~~~~~~~~~~~


-  hostname - データベースサーバのホスト名。"localhost"
   になることがよくあります。
-  username - データベースに接続するために使用するユーザ名。
-  password - データベースに接続するために使用するパスワード。
-  database - 接続したいデータベース名。
-  dbdriver - データベースの種類。例: mysql、postgres、odbc
   など。小文字で指定しなければなりません。
-  dbprefix - オプションのテーブル名プリフィックス(接頭辞)。これは、
   :doc:`Active Record <active_record>` を使った問い合わせを実行するとき
   に、テーブル名に付加される接頭辞になります。これを指定すると、単一のデ
   ータベースを共有して CodeIgniter
   を複数インストールすることが可能になります。
-  pconnect - TRUE/FALSE (boolean) - 永続的な接続を使うかどうか。
-  db_debug - TRUE/FALSE (boolean) -
   データベースエラーを表示するかどうか。
-  cache_on - TRUE/FALSE (boolean) -
   データベースクエリのキャッシュを有効にするかどうか。
   :doc:`データベースキャッシュクラス <caching>` を参照してください。
-  cachedir -
   データベースクエリのキャッシュディレクトリへの絶対サーバパス。
-  char_set - データベースとの通信に使用される文字セット。
-  dbcollat - データベースとの通信に使用される照合順序。 Note: MySQL
   および MySQLi データベースでは、サーバの PHP のバージョンが 5.2.3
   未満または MySQL のバージョンが 5.0.7 未満の場合 [ 訳注: すなわち
   mysql_set_charset() が使用できない環境 ] のみ、この設定が代替的に使用
   されます。もしこれらのバージョン未満の環境でマルチバイトの文字セットを
   使用している場合、PHP の mysql_real_escape_string()
   関数はあなたのサイトを SQL インジェクション攻撃に対して脆弱にしかねな
   いという不都合があります。データベースの文字セットと照合順序に Latin-1
   または UTF-8 を使用しているサイトは影響を受けません。
-  swap_pre - デフォルトのテーブル接頭辞が dbprefix と置き換えられます
   。これは、配布されたアプリケーションに手動で記述された [ 訳注:
   接頭辞を含む ] クエリが含まれる場合でも、接頭辞をエンドユーザにカスタ
   マイズ可能にする必要がある場合に役に立ちます。
-  autoinit - ライブラリがロードされたときに、データベースに自動的に接
   続するかどうか。もし FALSE
   に設定された場合、最初のクエリの実行の前に接続されます。
-  stricton - TRUE/FALSE (boolean) - "Strict Mode"
   での接続を強制するかどうか、アプリケーションの開発中に SQL
   の厳密性を確保するのに良い方法です。
-  port - データベースのポート番号。この値を利用するには、データベース
   設定の配列に以下のような行を追加する必要があります。

::

	$db['default']['port'] =  5432;




.. note:: 使用しているデータベースプラットフォーム (MySQL、Postgres など) によっては、すべての設定データが必要になるとは限りません。たとえば、SQ
Liteを使うときは、ユーザ名やパスワードは不要で、 データベース名はデー
タベースファイルへのパスになります。上の情報は、MySQLを利用していると
仮定しています。

