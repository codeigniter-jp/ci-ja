##############
CLI からの実行
##############

ブラウザに URL を入力してアプリケーションを呼び出すように、コマンドラ
インインターフェイス (CLI) から :doc:`コントローラ <./controllers>`
を呼び出ことができます。


-  CLI とは？
-  なぜコマンドラインから実行するのか？
-  やってみましょう: Hello World!




CLI とは？
==========

CLI は、コンピュータをテキストベースの対話形式で操作する方法です。
詳細は、 `Wikipedia の記事 <http://en.wikipedia.org/wiki/Command-
line_interface>`_ を参照してください。



なぜコマンドラインから実行するのか？
====================================

コマンドラインから CodeIgniter
を実行する理由はいくつもありますが、必ずしも明確な理由ではありません。


-  wget や curl を使用しなくても cron ジョブを実行することができます。
-  $this->input->is_cli_request() をチェックすることで cron ジョブに
   URL からアクセスできないようにできます。
-  パーミッションの設定、キャッシュフォルダのファイル削除、バックアップ
   の作成などの "タスク" が対話形式に実行できます。
-  他の言語によるアプリケーションと統合します。 例えば C++ のスクリプト
   をランダムに1つのコマンドとして呼び出したり、モデル内でそのコードを実
   行することができます！




やってみましょう: Hello World!
==============================

実際の動作を確認するために簡単なコントローラーを作成しましょう。
テキストエディタで、 tools.php
を作成し、以下のコードを入力してください。:


::

	
	<?php
	class Tools extends CI_Controller {
	
		public function message($to = 'World')
		{
			echo "Hello {$to}!".PHP_EOL;
		}
	}
	?>


次に、このファイルを application/controllers/ フォルダに保存します。

通常は次の URL にアクセスすることでサイトを閲覧することができます。:


::

	example.com/index.php/tools/message/to


CodeIgniter プロジェクトを操作するために Mac/Linux
ではターミナルを開き、Windows では "cmd" を実行します。
$ cd /path/to/project;
$ php index.php tools message
正しく操作すれば Hello World! と表示されるはずです。
$ php index.php tools message "John Smith"
URL の引数と同じように引数を渡すことができます。"John Smith"
を引数として渡すことで、次のように表示されます。: Hello John Smith! .



これだけです！
==============

コマンドラインでコントローラを使う方法をとても簡単に説明しました。ルー
ティングと _remap は正常に動作し、通常のコントローラと同じように扱える
ことを覚えておいてください。

