##################
セキュリティクラス
##################

セキュリティクラスは、入力データの処理によりセキュアなアプリケーション
の開発を手助けします。



XSS フィルタリング
==================

CodeIgniter はクロスサイトスクリプティング攻撃を防ぐために、すべての
POST と COOKIE データをフィルタ処理できるようになりました。
また、個別にフィルタすることもできます。デフォルトではこの機能は 無効
になっています。 若干のオーバーヘッドが発生するのと、あなたがすべての
ページでそれを必要としていないかもしれないからです。

一般的に、XSS フィルタは、JavaScript
などのコードを用いたクッキーの乗っ取りなどの攻撃を見つけます。
もし禁止された文字等を見つけた場合は、データを HTML
エンティティに変換して安全に表示します。

.. note:: この機能は、データの処理のみに使用してください。相当量のオーバーヘッド処理を必要とするため、一般的なランタイム処理に使用されるべきもの
ではありません。

XSS フィルタを通してデータをフィルタにかけるには、この機能を使用してく
ださい:



$this->security->xss_clean()
============================

使用例:


::

	$data = $this->security->xss_clean($data);


常に自動で POST および COOKIE データをフィルタしたい場合は、
application/config/config.php を開いて次のように設定してください。


::

	$config['global_xss_filtering'] = TRUE;


.. note:: form validation クラスにも、同様の XSSフィルタリング機能があります。

オプションの第2引数 is_image は、このメソッドが画像に対して潜在的な
XSS 攻撃がないか検証することを許可します。これはファイルアップロードの
セキュリティのために役立ちます。 この第2引数を TRUE
にすると、処理済の文字列を返す代わりに、画像が安全な場合は TRUE
を、悪意のある情報が含まれる場合は FALSE を返します。


::

	if ($this->security->xss_clean($file, TRUE) === FALSE)
	{
	    // file failed the XSS test
	}




$this->security->sanitize_filename()
====================================

ユーザ入力からファイル名を受け付けるときは、ディレクトリトラバーサル他
のセキュリティ上問題がある部分を削除するのがベストです。そのためには、
セキュリティクラスの sanitize_filename() メソッドを使用します。 例:


::

	$filename = $this->security->sanitize_filename($this->input->post('filename'));


ユーザが相対パス (例: file/in/some/approved/folder.txt )
を入力するのを許可する場合は、オプションの第 2 引数 $relative_path を
TRUE にします。


::

	$filename = $this->security->sanitize_filename($this->input->post('filename'), TRUE);




クロスサイトリクエストフォージェリ (CSRF)
=========================================

CSRF 保護を有効にするには、 application/config/config.php
を開いて次のように設定します:

::

	$config['csrf_protection'] = TRUE;


:doc:`フォームヘルパー <../helpers/form_helper>` の form_open()
関数を使用すると、フォームに対して CSRF 保護用の hidden
フィールドが自動的に挿入されます。

限定された URI を CSRF 保護を除外するホワイトリストに登録することがで
きます（たとえば外部からコンテンツが POST される API
のエンドポイント）。'csrf_exclude_uris' パラメータを編集して URI
を追加することができます。:

::

	$config['csrf_exclude_uris'] = array('api/person/add');


Previous Topic: :doc:`ページネーションクラス <pagination>`
