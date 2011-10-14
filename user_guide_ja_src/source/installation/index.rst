################
インストール方法
################

CodeIgniter は次の4つのステップでインストールできます:

#. ZIP パッケージを展開します。
#. サーバに CodeIgniter のフォルダとファイルをアップロードします。
   通常は、index.php ファイルがルートになります。
#. application/config/config.php ファイルをテキストエディタで開き、
   ベース URL を記入します。暗号化、もしくはセッションを利用する際には
   暗号鍵を記入します。
#. データベースを使用する際には、application/config/database.php 
   ファイルをテキストエディタで開き、データベースの設定を
   記入します。

CodeIgniter のファイルの設置場所を隠すことでセキュリティを高めたい場合
は、 system および application フォルダを別の名前に変更することが
できます。これらのフォルダ名を変更した場合は、index.php を開き 
$system_path 変数と $application_folder 変数の値を新しいフォルダ名に
書き換えてください。

セキュリティ的にベストなのは、 system および application フォルダをブ
ラウザから直接アクセスできない位置に移すことです。デフォルトでは、ぞれ
ぞれのフォルダに置かれた .htaccess ファイルにより、直接アクセスするこ
とができないようになっています。しかし、Web サーバの設定変更や
.htaccess に対応しない場合に備えて、これらは公開ディレクトリには置かな
いのがベストです。

もし、views を公開したままにしたい場合は、 views フォルダを
application フォルダの外側に移動することもできます。

各フォルダを移動した場合は、index.php を開き $system_path 、
$application_folder および $view_folder 変数の値をフルパスで指定する
のが好ましいでしょう。例) '/www/MyUser/system'.

本番環境での追加の対策としては、PHP のエラー報告と
他の開発専用の機能を無効にすることです。CodeIgniter では、
ENVIRONMENT 定数で設定することができます。 詳細は 
:doc:`セキュリティクラス <../general/security>` を
確認してください。

これで終わりです！

初めて CodeIgniter を使うのでしたら、ユーザガイドの :doc:`はじめよう
<../overview/getting_started>` から読んでみてください。動的な PHP 
アプリケーションの構築方法を学習できますよ！

.. toctree::
	:glob:
	:hidden:
	:titlesonly:
	
	*