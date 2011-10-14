######################
アプリケーションの管理
######################

デフォルトでは、 application/
ディレクトリに構築された一つだけのアプリケーションを管理するために
CodeIgniter を利用するのを前提としています。しかし、単一の CodeIgniter
を複数セットのアプリケーションで共用することもできますし、 application
フォルダをリネームしたり再配置したりもできます。



Application フォルダのリネーム
==============================

もし application フォルダをリネームしたいのであれば、メインの
index.php ファイルを開き、 $application_folder
変数に変更後の名前をセットしさえすれば、リネームすることができます:


::

	$application_folder = "application";




Application フォルダの再配置
============================

application フォルダを system
フォルダ以外のサーバの場所に移動させることもできます。 メインの
index.php を開き、 $application_folder
変数にサーバのフルパスをセットすれば、移動することができます。


::

	$application_folder = "/Path/to/your/application";




単一の CodeIgniter で複数のアプリケーションを実行する
=====================================================

共通の CodeIgniter
を複数の異なるアプリケーションを管理するために共有したい場合は、
単純に、 application フォルダ以下にあるすべてのディレクトリを、
サブフォルダを作ってその中に配置すれば可能になります。

たとえば、"foo" と "bar" という2つのアプリケーションを作成したい場合、
application フォルダを次のような構成にします:


::

	applications/foo/
	applications/foo/config/
	applications/foo/controllers/
	applications/foo/errors/
	applications/foo/libraries/
	applications/foo/models/
	applications/foo/views/
	applications/bar/
	applications/bar/config/
	applications/bar/controllers/
	applications/bar/errors/
	applications/bar/libraries/
	applications/bar/models/
	applications/bar/views/


利用する特定のアプリケーションを選ぶには、メインの index.php
ファイルを開き、 $application_folder
変数を設定する必要があります。たとえば、"foo"
アプリケーションを利用するよう選ぶには、次のようにします:


::

	$application_folder = "applications/foo";


.. note:: 各アプリケーションには、それぞれの index.phpファイルが必要になります。 それぞれの index.php
ファイルが呼び出すべきアプリケーションを呼び出します。index.php
ファイルは、好きな名前を付けることもできます。

