####################
キャッシングドライバ
####################

CodeIgniter は、いくつかのもっとも人気のある形式の高速な動的キャッシン
グへのラッパーを提供します。ファイルベースのキャッシング以外は特定のサ
ーバ要件を必要とし、もし、サーバ要件が満たされない場合は致命的な例外が
投げられます。



目次
====


-  使用例
-  リファレンスガイド




利用可能なドライバ
~~~~~~~~~~~~~~~~~~


-  Alternative PHP Cache (APC) キャッシング
-  File-based キャッシング
-  Memcached キャッシング
-  ダミーキャッシュ




使用例
======

以下の例はキャッシュドライバをロードし、APC
を使用するドライバに指定します。APC がホスト環境で利用できない場合、フ
ァイルベースのキャッシングにフォールバックします。


::

	
	$this->load->driver('cache', array('adapter' => 'apc', 'backup' => 'file'));
	
	if ( ! $foo = $this->cache->get('foo'))
	{
	     echo 'Saving to the cache!<br />';
	     $foo = 'foobarbaz!';
	
	     // Save into the cache for 5 minutes
	     $this->cache->save('foo', $foo, 300);
	}
	
	echo $foo;




リファレンスガイド
##################



is_supported( driver ['string'])
================================

このメソッドは、 $this->cache->get() 経由でドライバにアクセスする際に
、自動的に呼び出されます。しかしながら、もし、個別のドライバを使用する
場合、このメソッドを呼び出し、そのドライバがホスト環境でサポートされて
いるか確かめてください。


::

	
	if ($this->cache->apc->is_supported())
	{
	     if ($data = $this->cache->apc->get('my_cache'))
	     {
	          // do things.
	     }
	}




get( id ['string'])
===================

このメソッドはキャッシュから1つのアイテムを取得することを試みます。も
しそのアイテムが存在しない場合、このメソッドは FALSE を返します。

::

	$foo = $this->cache->get('my_cached_item');




save( id ['string'], data ['mixed'], ttl ['int'])
=================================================

このメソッドはキャッシュに1つのアイテムを保存します。もし、保存に失敗
した場合、このメソッドは FALSE を返します。

オプションの第3引数 (Time To Live) のデフォルトは 60 秒です。

::

	$this->cache->save('cache_item_id', 'data_to_cache');




delete( id ['string'])
======================

このメソッドは特定の1つのアイテムをキャッシュから削除します。もし、削
除に失敗した場合、このメソッドは FALSE を返します。

::

	$this->cache->delete('cache_item_id');




clean()
=======

このメソッドはキャッシュ全体をクリアします。もしキャッシュファイルの削
除に失敗した場合、このメソッドは FALSE を返します。


::

	$this->cache->clean();




cache_info()
============

このメソッドはキャッシュ全体の情報を返します。


::

	var_dump($this->cache->cache_info());




get_metadata( id ['string'])
============================

このメソッドは、キャッシュの中の特定の1つのアイテムに関する詳細な情報
を返します。


::

	var_dump($this->cache->get_metadata('my_cached_item'));




ドライバ
########



Alternative PHP Cache (APC) キャッシング
========================================

上記で記載されたすべてのメソッドは、以下のように特定のアダプタをドライ
バのローダーに渡すことなくアクセスできます:

::

	$this->load->driver('cache');
		$this->cache->apc->save('foo', 'bar', 10);


APC に関するさらなる情報は、 `http://php.net/apc
<http://php.net/apc>`_ を参照してください。



File-based キャッシング
=======================

出力クラスのキャッシングとは異なり、ファイルベースのキャッシングドライ
バは、ビューファイルの一部分をキャッシュできます。アプリケーションをベ
ンチマークしながら、キャッシングによる効果をディスク I/O
が打ち消してしまうポイントに到達しないよう注意して使用してください。

上記で記載されたすべてのメソッドは、以下のように特定のアダプタをドライ
バのローダーに渡すことなくアクセスできます:

::

	$this->load->driver('cache');
		$this->cache->file->save('foo', 'bar', 10);




Memcached キャッシング
======================

複数の Memcached サーバは、 application/config/ ディレクトリに置いた
memcached.php 設定ファイルで指定することができます。
上記で記載されたすべてのメソッドは、以下のように特定のアダプタをドライ
バのローダーに渡すことなくアクセスできます:

::

	$this->load->driver('cache');
		$this->cache->memcached->save('foo', 'bar', 10);


Memcached に関するさらなる情報は、 `http://php.net/memcached
<http://php.net/memcached>`_ を参照してください。



ダミーキャッシュ
================

これは絶えず 'miss' するキャッシングバックエンドです。データをストアし
ませんが、指定したキャッシュをサポートしない環境で、キャッシュを使用す
るコードをそのままにできます。

