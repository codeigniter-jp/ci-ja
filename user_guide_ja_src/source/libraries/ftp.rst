##########
FTP クラス
##########

CodeIgniter の FTP クラスを使うと、リモートサーバにファイルを転送でき
ます。リモートにあるファイルは、移動、リネーム、そして削除も可能です。
また、FTP クラスには、FTP
経由でローカルディレクトリをすべてリモートに再作成する "ミラーリング"
機能もあります。

.. note:: SFTP と SSL FTP プロトコルはサポートされていません。通常の FTPのみサポートされます。



クラスの初期化
==============

CodeIgniter の大部分のクラスと同様、FTP クラスは、コントローラの中で
$this->load->library メソッドを使って初期化します:


::

	$this->load->library('ftp');


一度読み込まれると、FTP オブジェクトは、次のようにして利用できます:
$this->ftp



使用例
======

以下の例では、FTP
サーバに対してコネクションが開かれ、ローカルファイルが ASCII
モードで読み取られてアップロードされます。
ファイルのパーミッションは755に設定します。Note:
パーミッションを設定するには PHP 5が必要です。


::

	
	$this->load->library('ftp');
	
	$config['hostname'] = 'ftp.example.com';
	$config['username'] = 'your-username';
	$config['password'] = 'your-password';
	$config['debug']	= TRUE;
	
	$this->ftp->connect($config);
	
	$this->ftp->upload('/local/path/to/myfile.html', '/public_html/myfile.html', 'ascii', 0775);
	
	$this->ftp->close();
	


以下の例では、サーバからファイルのリストが取得されます。


::

	
	$this->load->library('ftp');
	
	$config['hostname'] = 'ftp.example.com';
	$config['username'] = 'your-username';
	$config['password'] = 'your-password';
	$config['debug'] 	= TRUE;
	
	$this->ftp->connect($config);
	
	$list = $this->ftp->list_files('/public_html/');
	
	print_r($list);
	
	$this->ftp->close();


以下の例では、ローカルディレクトリがサーバにミラーされます。


::

	
	$this->load->library('ftp');
	
	$config['hostname'] = 'ftp.example.com';
	$config['username'] = 'your-username';
	$config['password'] = 'your-password';
	$config['debug']	= TRUE;
	
	$this->ftp->connect($config);
	
	$this->ftp->mirror('/path/to/myfolder/', '/public_html/myfolder/');
	
	$this->ftp->close();




メソッドリファレンス
####################



$this->ftp->connect()
=====================

FTP サーバに接続してログインします。
接続の設定は、配列で渡すか設定ファイルに保管しておくことができます。

以下は、手動で設定をセットする方法を示した例です:


::

	
	$this->load->library('ftp');
	
	$config['hostname'] = 'ftp.example.com';
	$config['username'] = 'your-username';
	$config['password'] = 'your-password';
	$config['port']     = 21;
	$config['passive']  = FALSE;
	$config['debug']    = TRUE;
	
	$this->ftp->connect($config);




設定ファイルでの FTP の設定
~~~~~~~~~~~~~~~~~~~~~~~~~~~

必要であれば、FTP の設定を設定ファイルに保管することもできます。
単純に、 ftp.php という名前で新しいファイルを作成し、そのファイルに
$config という名前の設定用配列を追加します。 config/ftp.php
ファイルに保存すると、自動的にそれが使われます。



利用できる接続オプション:
~~~~~~~~~~~~~~~~~~~~~~~~~


-  hostname - FTP ホスト名。通常は次のようになります: ftp.example.com
-  username - FTP ユーザ名
-  password - FTP パスワード
-  port - ポート番号。初期値は 21 に設定されています。
-  debug - TRUE/FALSE (ブール値)。
   デバッグ用にエラーメッセージを表示するかどうか。
-  passive - TRUE/FALSE (ブール値)。 PASSIVE
   モードを使用するかどうか。PASSIVE
   モードは、デフォルトでは自動設定されます。




$this->ftp->upload()
====================

サーバにファイルをアップロードします。ローカルのパスとリモートのパス、
オプションで、転送モードとパーミッションを設定します。 例:


::

	$this->ftp->upload('/local/path/to/myfile.html', '/public_html/myfile.html', 'ascii', 0775);


転送モードのオプション: ascii、 binary、 および auto (初期値)。 auto 
が使用されているときは、転送するファイルの拡張子によって転送モードが決
められます。

パーミッションは PHP 5で実行しているときに指定可能で、第4引数に 8進数
の値を渡します。



$this->ftp->download()
======================

サーバからファイルをダウンロードします。リモートとローカルのパスを指定
する必要があります。オプションでモードを指定できます。 例:


::

	$this->ftp->download('/public_html/myfile.html', '/local/path/to/myfile.html', 'ascii');


モードオプション: ascii , binary および auto (デフォルト)。 auto
を指定した場合はソースのファイル名から判別されます。

ダウンロードに成功しなかった場合は FALSE を返します。
(ローカルファイルに対するパーミッションがなかった場合も含む)



$this->ftp->rename()
====================

ファイルをリネームします。変更するファイルの名前/パスと、新しいファイ
ルの名前/パスを指定します。


::

	
	// green.html を blue.html にリネームします。 
	$this->ftp->rename('/public_html/foo/green.html', '/public_html/foo/blue.html');




$this->ftp->move()
==================

ファイルを移動できます。移動元と移動先のパスを指定します:


::

	
	// blog.html を "joe" から "fred" に移動します。 
	$this->ftp->move('/public_html/joe/blog.html', '/public_html/fred/blog.html');


.. note:: 移動先のファイル名が元と違う場合はリネームされます。


$this->ftp->delete_file()
=========================

ファイルを削除できます。削除するファイルのパスとファイル名を指定します
。


::

	
	$this->ftp->delete_file('/public_html/joe/blog.html');




$this->ftp->delete_dir()
========================

ディレクトリとそのディレクトリに含まれるものをすべて削除します。削除す
るディレクトリへのパスを末尾にスラッシュをつけて指定します。

重要 このメソッドを使うときは、「厳重に」注意してください。
渡されたパス以下のサブフォルダと全ファイルの **すべてのもの**を再帰的
に削除します。パスが完全に正しいかを確認するようにしてください。
list_files()
メソッドをまず使って、パスが正しいかを検証するようにしてください。


::

	
	$this->ftp->delete_dir('/public_html/path/to/folder/');




$this->ftp->list_files()
========================

サーバにあるファイルのリストを取得して 配列 として返します。
取得したいディレクトリへのパスを指定する必要があります。


::

	
	$list = $this->ftp->list_files('/public_html/');
	
	print_r($list);




$this->ftp->mirror()
====================

ローカルフォルダ内のすべて(サブフォルダ含む)を再帰的に読み取って、FTP
経由で読み取ったもののミラーを作成します。
元のファイルパスのディレクトリ構造がサーバに再作成されます。
作成元のパスと作成先のパスを指定する必要があります:


::

	
	$this->ftp->mirror('/path/to/myfolder/', '/public_html/myfolder/');




$this->ftp->mkdir()
===================

サーバにディレクトリを作成できます。作成したいフォルダ名を末尾にスラッ
シュをつけて指定します。 パーミッションは、 8進数
の値で第2引数に指定できます(PHP 5で実行している場合)。


::

	
	// "bar"という名前のフォルダを作成します。
	$this->ftp->mkdir('/public_html/foo/bar/', DIR_WRITE_MODE);




$this->ftp->chmod()
===================

ファイルのパーミッションをセットできます。パーミッションを設定したいフ
ァイルまたはフォルダのパスを指定します:


::

	
	// "bar" に777のパーミッションを設定します。 
	$this->ftp->chmod('/public_html/foo/bar/', DIR_WRITE_MODE);




$this->ftp->close();
====================

サーバとのコネクションを切断します。アップロードが終わったら、このメソ
ッドを使うのをおすすめします。

