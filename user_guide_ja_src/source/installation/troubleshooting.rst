######################
トラブルシューティング
######################

トップページの読み込みだけは問題なく他のページがうまく表示されない場合
は、検索エンジンに最適な URL を生成するのに必要な PATH_INFO 環境変数が
サーバでサポートされていない可能性があります。 まず
application/config/config.php ファイルを開き、 URI Protocol の情報が書
いてある部分を探します。他の設定を試してみるのをおすすめします。
それでもまだ動かない場合は application/config/config.php
ファイルを開き以下のように変更し、 CodeIgniter のシステムで URL
にクエスチョンマークを強制的に付加させる必要があります。


::

	$config['index_page'] = "index.php";


上記の部分を次のように変更します:


::

	$config['index_page'] = "index.php?";


