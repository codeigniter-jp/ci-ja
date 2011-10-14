#############
Zip圧縮クラス
#############

CodeIgniter
のZip圧縮クラスを使うと、Zipアーカイブが作成できます。アーカイブは、
デスクトップにダウンロードさせたり、ディレクトリに保存したりできます。



クラスの初期化
==============

CodeIgniterの大部分のクラスと同様に、Zip クラスはコントローラの中で
$this->load->library メソッドを使って初期化できます:


::

	$this->load->library('zip');


いったん読み込まれれば、Zipライブラリのオブジェクトは次のようにして利
用できます: $this->zip



使用例
======

以下は、ファイルを圧縮し、サーバ上のフォルダに保存し、デスクトップにダ
ウンロードさせる方法を示した例です。


::

	
	$name = 'mydata1.txt';
	$data = 'A Data String!';
	
	$this->zip->add_data($name, $data);
	
	// Zipファイルをサーバのフォルダに書き込みます。"my_backup.zip" という名前にします。
	$this->zip->archive('/path/to/directory/my_backup.zip');
	
	 // "my_backup.zip" という名前で、デスクトップにファイルをダウンロードします。
	$this->zip->download('my_backup.zip');




メソッドリファレンス
####################



$this->zip->add_data()
======================

Zip アーカイブにデータを追加できます。第1引数は、ファイルに付けたい名
前を指定し、 第2引数には、ファイルのデータを文字列で指定します:


::

	
	$name = 'my_bio.txt';
	$data = 'I was born in an elevator...';
	
	$this->zip->add_data($name, $data);


アーカイブに複数のファイルを追加するために、
複数回呼び出すこともできます。例:


::

	
	$name = 'mydata1.txt';
	$data = 'A Data String!';
	$this->zip->add_data($name, $data);
	
	$name = 'mydata2.txt';
	$data = 'Another Data String!';
	$this->zip->add_data($name, $data);


あるいは、複数ファイルを配列として渡すこともできます:


::

	
	$data = array(
	                'mydata1.txt' => 'A Data String!',
	                'mydata2.txt' => 'Another Data String!'
	            );
	
	$this->zip->add_data($data);
	
	$this->zip->download('my_backup.zip');


圧縮データをサブフォルダの中に配置したい場合は、下記のようにファイル名
の一部にパスを含めてください:


::

	
	$name = 'personal/my_bio.txt';
	$data = 'I was born in an elevator...';
	
	$this->zip->add_data($name, $data);


上の例では、 personal というフォルダの中に my_bio.txt が配置されます。



$this->zip->add_dir()
=====================

ディレクトリを追加できます。 $this->zip->add_data()
を使った時にデータをフォルダに追加できるので、 通常はこのメソッドは必
要ないですが、空のフォルダを作成したい場合は、そうすることもできます。
例:


::

	$this->zip->add_dir('myfolder'); // "myfolder"というフォルダを作成します




$this->zip->read_file()
=======================

サーバ上のどこかに、すでにあるファイルを圧縮できます。 ファイルのパス
を指定するとZipクラスはそれを読み取ってアーカイブに追加します:


::

	
	$path = '/path/to/photo.jpg';
	$this->zip->read_file($path);
	
	 // "my_backup.zip" という名前でデスクトップにダウンロードさせます。
	$this->zip->download('my_backup.zip');


Zip アーカイブで、そのファイルが含まれるディレクトリ構造を維持したい場
合は、 第2引数に TRUE (ブール値) を指定します。例:


::

	
	$path = '/path/to/photo.jpg';
	$this->zip->read_file($path, TRUE);
	
	 // "my_backup.zip" という名前でデスクトップにダウンロードさせます。
	$this->zip->download('my_backup.zip');


上の例では、 photo.jpg が次の2つのフォルダの配下に置かれます: path/to/



$this->zip->read_dir()
======================

サーバ上にすでに存在しているフォルダ (およびその中身) を圧縮できます。
ディレクトリまでのパスを指定すると、Zip
クラスは、再帰的にそのフォルダを読み込み、Zip
ファイルとして再作成します。 指定されたパスに含まれるサブフォルダの配
下にあるものも含めてすべてのファイルが圧縮されます。例:


::

	
	$path = '/path/to/your/directory/';
	$this->zip->read_dir($path);
	
	 // "my_backup.zip"という名前でデスクトップにダウンロードさせます。
	$this->zip->download('my_backup.zip');


デフォルトでは Zip アーカイブには第1引数に指定されたすべてのディレクト
リが含まれます。もし、指定フォルダまでのパスを無視したい場合は、
第2引数に FALSE (ブール値) を指定してください。 例:


::

	
	$path = '/path/to/your/directory/';
	$this->zip->read_dir($path, FALSE);


これは、"directory" フォルダの中身を含んだ ZIP
を作成します。すべてのサブフォルダは正しく保存されますが、
/path/to/your は含まれません。



$this->zip->archive()
=====================

Zip 圧縮ファイルをサーバ上のディレクトリに書き込みます。ファイル名で終
わる正しいサーバのパスを渡します。 ディレクトリが書き込み可能(666か777
であれば通常は大丈夫です)かどうかを確かめてください。例:


::

	$this->zip->archive('/path/to/folder/myarchive.zip'); // myarchive.zip という名前のファイルを作成します。




$this->zip->download()
======================

サーバから Zipファイルをダウンロードさせます。このメソッドは、Zipファ
イルにつけたい名前を指定する必要があります。 例:


::

	$this->zip->download('latest_stuff.zip'); // "latest_stuff.zip" という名前になります。


.. note:: このメソッドを使用するときは、ダウンロードさせ、バイナリとしてデータを取り扱わせるための様々なヘッダを送信する必要があるので、
コントローラでどんなデータも表示させないで下さい。



$this->zip->get_zip()
=====================

Zip 圧縮データを返します。データを使って何か特別な事をしない限りは、通
常はこのメソッドは必要ではありません。 例:


::

	
	$name = 'my_bio.txt';
	$data = 'I was born in an elevator...';
	
	$this->zip->add_data($name, $data);
	
	$zip_file = $this->zip->get_zip();




$this->zip->clear_data()
========================

Zip クラスは、上のメソッドを使うたびにZipアーカイブを再圧縮しなくて済
むように、Zipデータをキャッシュします。 しかし、それぞれ異なるデータの
複数のZipを作成する場合、それらのメソッドを呼び出す間で、キャッシュを
クリアすることができます。例:


::

	
	$name = 'my_bio.txt';
	$data = 'I was born in an elevator...';
	
	$this->zip->add_data($name, $data);
	$zip_file = $this->zip->get_zip();
	
	$this->zip->clear_data();
	
	
	$name = 'photo.jpg';
	$this->zip->read_file("/path/to/photo.jpg"); // ファイルを読み込みます
	
	$this->zip->download('myphotos.zip');


