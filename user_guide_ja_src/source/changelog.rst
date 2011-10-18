########
変更履歴
########

Version 2.1.0 (planned)
=======================

リリース日付: 未リリース

-  全体的な変更

   -  Android 端末をユーザエージェントリストに追加しました。
   -  Windows 7 をプラットフォームリストに追加されました。
   -  コールバックの検証ルールが他の検証ルールと同じように引数を受け取れる
      ようにしました。
   -  しきい値以下のすべてのエラータイプではなく、特定のエラータイプを記録する能力を追加しました。
   -  :doc:`共通関数 <general/common_functions>` に XSS を防ぐために
      HTML をエスケープする html_escape() を
      追加しました。
   -  mimes.php に pem、p10、p12、p7a、p7c、p7m、p7r、p7s、crt、crl、der、kdb、rsa、cer、sst、csr 証明書のサポートを追加しました。   -  mimes.php に pgp、gpg を追加しました。
   -  mimes.php に pgp、gpg のサポートを追加しました。
   -  mimes.php に 3gp、3g2、mp4、wmv、f4v、vlc ビデオファイルのサポートを追加しました。
   -  mimes.php に m4a、aac、m4u、xspf、au、ac3、flac、ogg オーディオファイルのサポートを追加しました。

-  ヘルパー

   -  :doc:`文字列ヘルパー <helpers/string_helper>` に "foo" を "foo-1"
      または "foo-1" を "foo-2" に変化させる increment_string()
      関数を追加しました。
   -  フォームヘルパーのうち form_open_multipart 関数の引数 action
      をオプションに変更しました。 Fixes (#65)
   -  url_title() 関数は最初と最後の余分なダッシュ記号を取り除きます。
   -  :doc:`文字列ヘルパー <helpers/string_helper>` の random_string() 関数の速度を改善しました。
   -  :doc:`HTMLヘルパー <helpers/html_helper>` に XHTML Basic 1.1 のドキュメントタイプを追加しました。

-  データベース

   -  :doc:`データベースドライバ <database/index>` に `CUBRID
      <http://www.cubrid.org/>`_ ドライバを追加しました。このパッチを
      提供してくれた CUBID チームに感謝します。
   -  :doc:`データベースドライバ <database/index>` に PDOドライバを追加しました。
   -  :doc:`データベースドライバ <database/index>` が
      可能なインジェクションを回避するために limit 値と offset 値を
      整数型に型キャストするようにしました。
   -  :doc:`データベースドライバ <database/index>` の 
      $this->db->like() がオプションである第3引数に 'none' オプション
      を追加しました。
   -  $this->db->insert_batch() は OCI8 (Oracle) ドライバをサポートします。

-  ライブラリ

   -  :doc:`カートライブラリ <libraries/cart>` の $this->cart->insert()
      を1つの商品が正常に追加された場合に挿入した ID
      番号を返すように変更しました。
   -  :doc:`フォームバリデーション(検証)ライブラリ
      <libraries/form_validation>` を使用する場合に、コールバックの検証ルー
      ルにオプションの引数を1つ設定できるように変更しました。
   -  :doc:`マイグレーションライブラリ <libraries/migration>`
      はデータベーススキーマの差分更新の適用を支援します。
   -  子ドライバはいずれのパッケージパスにも配置することができます。
   -  アップロードライブラリに max_filename_increment の設定を追加しました。
   -  CI_Loader::_ci_autoloader() を protected メソッドにしました。
   -  :doc:`フォームバリデーション(検証)ライブラリ
      <libraries/form_validation>` に is_unique を追加しました。
   -  :doc:`フォームバリデーション(検証) <libraries/form_validation>` ライブラリの valid_ip() が PHP の filter_var() 関数を使うように変更しました。(>= PHP 5.2)
   -  :doc:`ページネーションライブラリ <libraries/pagination>` に URI の実際のページ番号を使用できるように $config['use_page_numbers'] を追加しました。
   -  SMTP の TLS とSSL 暗号化を追加しました。

-  コア

   -  CI_URI の private メソッドを MY_URI でオーバーライドできるように
      protected に変更しました。
   -  CodeIgniter.php の 真偽値 CI_CORE 定数を削除しました。(もはや Reactor や Core のバージョンはないため)

2.1.0の不具合修正
-----------------

-  Unlink raised an error if cache file did not exist when you try to delete it.
-  Fixed #378 Robots identified as regular browsers by the User Agent
   class.
-  If a config class was loaded first then a library with the same name
   is loaded, the config would be ignored.
-  Fixed a bug (Reactor #19) where 1) the 404_override route was being
   ignored in some cases, and 2) auto-loaded libraries were not
   available to the 404_override controller when a controller existed
   but the requested method did not.
-  Fixed a bug (Reactor #89) where MySQL export would fail if the table
   had hyphens or other non alphanumeric/underscore characters.
-  Fixed a bug (#200) where MySQL queries would be malformed after
   calling count_all() then db->get()
-  Fixed bug #105 that stopped query errors from being logged unless database debugging was enabled
-  Fixed a bug (#181) where a mis-spelling was in the form validation
   language file.
-  Fixed a bug (#160) - Removed unneeded array copy in the file cache
   driver.
-  Fixed a bug (#150) - field_data() now correctly returns column
   length.
-  Fixed a bug (#8) - load_class() now looks for core classes in
   APPPATH first, allowing them to be replaced.
-  Fixed a bug (#24) - ODBC database driver called incorrect parent in
   __construct().
-  Fixed a bug (#85) - OCI8 (Oracle) database escape_str() function did
   not escape correct.
-  Fixed a bug (#344) - Using schema found in <a href="libraries/sessions.html">Saving Session Data to a Database</a>, system would throw error "user_data does not have a default value" when deleting then creating a session.
-  Fixed a bug (#112) - OCI8 (Oracle) driver didn't pass the configured database character set when connecting.
-  Fixed a bug (#182) - OCI8 (Oracle) driver used to re-execute the statement whenever num_rows() is called.
-  Fixed a bug (#82) - WHERE clause field names in the DB <samp>update_string()</samp> method were not escaped, resulting in failed queries in some cases.
-  Fixed a bug (#89) - Fix a variable type mismatch in DB <samp>display_error()</samp> where an array is expected, but a string could be set instead.
-  Fixed a bug (#467) - Suppress warnings generated from get_magic_quotes_gpc() (deprecated in PHP 5.4)
-  Fixed a bug (#484) - First time _csrf_set_hash() is called, hash is never set to the cookie (in Security.php).
-  Fixed a bug (#60) - Added _file_mime_type() method to the `File Uploading Library <libraries/file_uploading>` in order to fix a possible MIME-type injection.
-  Fixed a bug (#537) - Support for all wav type in browser.

Version 2.0.3
=============

リリース日付: 2011年8月20日

-  セキュリティ

   -  データベースクライアント接続において、マルチバイトの文字セットを使用
      したサイトで、潜在的な SQL
      インジェクションの経路が開かれたままになるのを防ぐよう MySQL と MySQLi
      ドライバの改善を行いました。 *mysql_set_charset()* と非互換な PHP
      5.2.3未満と MySQL 5.0.7未満の組み合わせでは、マルチバイトの文字セット
      を使用した環境では、SQL インジェクションの攻撃経路を無防備な状態にさら
      すことになりかねません。Latin-1、UTF-8、その他の "low ASCII"
      文字セットの場合は、すべての環境において影響を受けません。

      もし、マルチバイトの文字セットでのデータベース接続を実行し、
      または、実行しようと考えているのなら、
      脆弱性の影響を受けないよう、
      サーバ環境に細心の注意を払ってください。

-  全体的な変更

   -  index.php
      ファイルのコードのコメント内にあるスペルミスを修正しました。
   -  出力プロファイラに、セッションクラスのユーザデータを追加しました。さ
      らに HTTP ヘッダ、セッションデータと設定変数に show/hide
      トグルを追加しました。
   -  EXT 定数の内部的使用を削除しました。
   -  welcome_message ビューファイルと、デフォルトのエラーテンプレートの見
      た目を更新しました。 `danijelb <https://bitbucket.org/danijelb>`_
      さんの pull リクエストに感謝します。
   -  PostgreSQL データベースのドライバに insert_batch()
      関数を追加しました。epallerols さんのパッチに感謝します。
   -  mimes.php に "application/x-csv" を追加しました。
   -  CSRF 保護機能に URI ホワイトリストを追加しました。
   -  :doc:`Email ライブラリ <libraries/email>` において、"."
      が名前に含まれる添付ファイルが無効な MIME
      タイプを使用してしまうバグを修正しました。

-  ヘルパー

   -  レンダリングされた見出しタグに HTML 属性を追加できるように、
      heading() に第3引数(オプション)を追加しました。
   -  form_open() 関数はフォームの action が内部 URL で method が post
      の場合のみ hidden (クロスサイトリファレンスフォージェリ)
      保護フィールドを追加します。(Reactor #165)
   -  :doc:`語形変換ヘルパー <helpers/inflector_helper>` の plural()
      関数と singular()
      関数がより多くの単語をサポートするように変更されました。

-  ライブラリ

   -  セッションで、ユーザエージェント文字列の照合で照合する文字数を増やし
      ました。データベースセッションを使用している場合は、アップグレードの注
      意事項 [ 訳注: :doc:`2.0.2から2.0.3へのアップグレード
      <installation/upgrade_203>` ] を確認してください。
   -  :doc:`データベースドライバ <database/queries>` に
      $this->db->set_dbprefix() を追加しました。
   -  :doc:`カートライブラリ <libraries/cart>` の $this->cart->insert()
      を、1つのアイテムの追加が成功した場合、行 ID
      を返すように変更しました。
   -  :doc:`ローダライブラリ <libraries/loader>` に、 $this->load->view()
      と $this->load->vars() でセットされるグローバル変数を取得するための
      $this->load->get_var() を追加しました。
   -  $this->db->having() で、クォートの挿入に escape() ではなく
      escape_str() を使うように変更しました。

2.0.3の不具合修正
-----------------

-  ENVIRONMENT を予約済み定数に追加しました。(Reactor #196)
-  SCRIPT_NAME が確実に定義されているか、サーバでチェックするよう変更し
   ました。(Reactor #57)
-  パッケージが存在しない場合、または開発者が他のパッケージをデフォルト
   で読み込まない場合に、不必要なファイル統計を取得しないように、パッケー
   ジオートローダから APPPATH.'third_party' を削除しました。
-  セッションライブラリのデータベーステーブルの SQL
   の例で、last_activity にインデックスが含まれていない不具合(Reactor
   #231)を修正しました。 :doc:`アップグレードの注意事項
   <installation/upgrade_203>` を確認してください。
-  セッションライブラリのドキュメント内の SQL に不正な SQL
   が含まれている不具合(Reactor #229)を修正しました。
-  $this->db->select() に第2引数を渡す際に、続くクエリの中でカラム名が
   正しくエスケープされない不具合(Core #340)を修正しました。
-  issue #199 の修正 -
   文字列として渡される属性が、それと開始タグとの間にスペースを含まない。
-  :doc:`カートライブラリ <libraries/cart>` の
   $this->cart->total_items() メソッドが、アイテムの数ではなく、すべての
   アイテムの数量の合計を返すようにバグを修正しました。
-  db_forge でフィールドを追加する際に、mysql と mysqli
   ドライバがドキュメントで示している NOT NULL ではなく、NULL
   をデフォルトにしてしまうバグを修正しました。
-  $this->db->select_max() 、 $this->db->select_min() などが Notice
   エラーを発生させる可能性があったバグを修正しました。w43l
   さんからのパッチのおかげです。
-  STDIN でのチェックを、全体的に見るとより安全な php_sapi_name() ==
   'cli' に置き換えました。crontab
   からの動作でうまくパラメータを取得できるでしょう。

Version 2.0.2
=============

リリース日付: 2011年4月7日
Hg Tag: v2.0.2

-  全体的な変更

   -  :doc:`セキュリティクラス <./libraries/security>` は core ディレクト
      リに移動し自動的に呼び出されるようになりました。手動で呼び出している場
      合にはそれを削除してください。
   -  CI_SHA クラスは非推奨になりました。PHP のすべてのバージョンで sha1()
      関数が提供されています。
   -  constants.php は、環境設定毎のフォルダにファイルが存在すれば呼び出さ
      れるようになりました。
   -  言語ファイルの key エラーをログに記録するようになりました。
   -  複数環境サポートはオプションになりました。使用しない場合、環境設定を
      コメントアウトまたは削除してください。
   -  フックが複数環境サポートに対応しました。
   -  :doc:`キャッシングドライバ <libraries/caching>` に CI_
      プリフィックスが追加されました。
   -  :doc:`CLIの使い方 <./general/cli>` がドキュメントに追加されました。

-  ヘルパー

   -  以前から非推奨となっていた dohash() が :doc:`セキュリティヘルパー
      <./helpers/security_helper>` から削除されました。代わりに do_hash()
      を使用してください。
   -  渡した文字列のキャピタライゼーションを損なわないように plural
      関数が変更されました。すべて大文字の場合も考慮されています。

-  データベース

   -  $this->db->count_all_results()
      が文字列の代わりに数値を返すようになりました。

2.0.2の不具合修正
-----------------

-  出力クラスの parse_exec_vars が protected に修正されました。(Reactor
   #145)
-  Windows またはセーフモードが有効な状態で、 is_really_writable
   が空ファイルを作る不具合 (Reactor #80) が修正されました。
-  ユーザガイドのさまざまな不具合が修正されました。
-  is_cli_request() メソッドが :doc:`入力クラス <libraries/input>`
   のドキュメントに追加されました。
-  form_validation クラスのルールに decimal 、 less_than と
   greater_than が追加されました。
-  `issue #153 <https://bitbucket.org/ellislab/codeigniter-
   reactor/issue/153/escape-str-bug-in-mssql-driver>`_ MSSQL
   ドライバの文字列エスケープの不具合が修正されました。
-  `issue #172 <https://bitbucket.org/ellislab/codeigniter-
   reactor/issue/172/bug-in-chrome-and-form_open-in-201>`_ Google Chrome
   11で URL にアクションを指定しない場合、誤ったアクションに移動する不具
   合が修正されました。

Version 2.0.1
=============

リリース日付: 2011年3月15日
Hg Tag: v2.0.1

-  全体的な変更

   -  セキュア (HTTPS) クッキーをセットするたの $config['cookie_secure']
      が設定ファイルに追加されました。
   -  Core と Reactor を区別するための定数 CI_CORE が追加されました。Core:
      TRUE、Reactor: FALSE。
   -  index.php に定数 ENVIRONMENT が追加され、PHP のエラー報告や、
      オプションでロードされる設定ファイルに影響します(以下を参照)。
      :doc:`環境の取扱い <general/environments>` のページをご覧ください。
   -  :doc:`環境固有 <libraries/config.html#environments>`
      の設定ファイルのサポートが追加されました。

-  ライブラリ

   -  decimal , less_than and greater_than ルールが
      :doc:`フォームバリデーション(検証)クラス <libraries/form_validation>`
      に追加されました。
   -  :doc:`入力クラス <libraries/input>` の post() と get()
      メソッドは第1引数が指定されない場合、配列全体を返すようになりました。
   -  セキュアクッキーが set_cookie() ヘルパーと :doc:`入力クラス
      <libraries/input>` のメソッドで指定出きるようになりました。
   -  :doc:`出力クラス <libraries/output>` に set_content_type()
      が追加され、 Content-Type HTTP ヘッダを MIME タイプまたは
      config/mimes.php の配列のキーに基づき出力します。
   -  :doc:`出力クラス <libraries/output>`
      がメソッドチェーンをサポートするようになりました。

-  ヘルパー

   -  :doc:`フォームヘルパー <helpers/form_helper>` の form_open()
      はロジックが変更され、値が渡されない場合、現在の URL
      に投稿するようになりました。

2.0.1の不具合修正
-----------------

-  CLI リクエストは、index.php のあるフォルダに移動した後でなく、どのフ
   ォルダからでも実行できるようになりました。
-  issue #41 の修正: mp3 の MIME タイプとして audio/mp3
   が追加されました。
-  ファイルキャッシングドライバが誤ったキャッシュディレクトリを参照して
   いた不具合 (Core #329) を修正しました。
-  SHA1 ライブラリの名前が誤っていた不具合 (Reactor #69)
   を修正しました。

Version 2.0.0
=============

リリース日付: 2011年1月28日
Hg Tag: v2.0.0

-  全体的な変更

   -  PHP 4への対応は打ち切られました。動作には PHP 5.1.6以上が必要です。
   -  以前から非推奨であった Scaffolding 機能は削除されました。
   -  プラグイン機能は削除されました。代わりにヘルパーを使用してください。
      CAPTCHA プラグインはヘルパーに変更されました( :doc:`ドキュメント
      <./helpers/captcha_helper>` )。JavaScript
      カレンダープラグインは、jQuery
      等に有用なものがあるため、削除されました。
   -  :doc:`ドライバ <./general/drivers>` 機能が追加されました。
   -  完全な QUERY STRING
      に対応しました。詳細は設定ファイルを参照してください。
   -  application フォルダを system の外に移動しました。
   -  system/cache ディレクトリと system/logs ディレクトリを application
      ディレクトリの中に移動しました。
   -  index.php 内でルーティングをオーバーライドできるようになりました。
      "index" ファイル毎にルーティングの上書きが可能です。
   -  index.php 内のデータセットから、設定値を直接設定 (または上書き) でき
      るようになりました。これにより、それぞれ独自の設定値を持つ複数のコント
      ローラからひとつのアプリケーションを使用できます。
   -  設定ファイルに $config['directory_trigger'] を追加しました。URI
      セグメントの代わりに $_GET 文字列で動かしているときでも、コントローラ
      のサブディレクトリを指定できます。
   -  パッケージのパスを指定できるようになりました。ローダーと設定クラスは
      要求があると、指定されたパスを最初に探しにいこうとします。これにより、
      サブアプリケーションの配布において、ひとつのパッケージディレクトリで独
      自のライブラリやモデル、設定ファイルを使用することができます。詳細は
      :doc:`ローダ (読み込み処理) クラス <libraries/loader>`
      のドキュメントを参照してください。
   -  開発中のコードは現在 `BitBucket <http://bitbucket.org/ellislab
      /codeigniter-reactor/>`_ でホスティングされています。
   -  非推奨となっていた Validation クラスは削除されました [ 訳注:
      代わりに Form_validation クラスを使用してください ]。
   -  すべてのコアクラスに CI_ というプレフィックスを追加しました。
   -  パッケージのパスは application/config/autoload.php で設定できます。
   -  :doc:`アップロードクラス <libraries/file_uploading>` で拡張子なしの
      ファイル名を指定できるようになりました。拡張子は、ファイル名の代わりに
      アップロードされたファイルから与えられます。
   -  :doc:`データベースフォージクラス <database/forge>` において、テーブ
      ル名を変更していない場合は名前を省略できるようになりました。
   -  $config['base_url']
      はデフォルトで空になり、自動的に推測されるようになりました。
   -  config['uri_protocol'] = 'CLI' とすることで、コマンドラインインター
      フェイス互換が利用できるようになりました。

-  ライブラリ

   -  :doc:`キャッシュドライバ <libraries/caching>`
      を追加しました。APC、memcached およびファイルベースをサポートします。
   -  :doc:`ページネーションクラス <./libraries/pagination>` で $prefix 、
      $suffix および $first_url を指定できるようになりました。
   -  :doc:`ページネーションクラス <./libraries/pagination>` で
      first、previous、next、last および各ページへのリンクを FALSE
      とすることで、それぞれ非表示にできるようになりました。
   -  :doc:`セキュリティクラス <./libraries/security>`
      を追加しました。現在のところ、 xss_clean メソッド、 filename_security
      メソッド他のセキュリティに関する機能が使用できます。
   -  :doc:`セキュリティクラス <./libraries/security>` に CSRF
      (クロスサイトリクエストフォージェリ) 保護を追加しました。
   -  出力クラスに $parse_exec_vars プロパティを追加しました。
   -  :doc:`プロファイラクラス <general/profiling>` において、個々のプロフ
      ァイラセクションの有効化/無効化を指定できるようになりました。
   -  :doc:`ファイルアップロードクラス <./libraries/file_uploading>`
      にワイルドカードオプション $config['allowed_types'] = '*'
      を追加しました。
   -  XML-RPC クラスに設定値 'object'
      を追加しました。これにより、要求されたメソッドを探すために、$CI
      スーパーオブジェクトにある assuming
      の代わりにオブジェクトを指定できます。
   -  ユニットテストクラスで使用できるリストに "is_object"
      を追加しました。
   -  HTML テーブルクラスは空もしくは NULL でもセルを出力します。
   -  HTML
      テーブルクラスで個々のセルのタグの属性を指定できるようになりました。
   -  :doc:`テンプレートパーサクラス <libraries/parser>` に parse_string()
      メソッドを追加しました。
   -  :doc:`プロファイラクラス <general/profiling>` の出力に HTTP
      ヘッダおよび設定情報を追加しました。
   -  :doc:`ユーザエージェントクラス <libraries/user_agent>` の browser()
      メソッドで判別できるリストに Chrome と Flock を追加しました。
   -  :doc:`ユニットテストクラス <libraries/unit_testing>`
      において、オプションで "notes"
      フィールドが使えるようになりました。また、
      $this->unit->set_test_items()
      を使用して、テスト結果を個別に表示できるようになりました。
   -  XML-RPC クラスのクラス変数 $xss_clean により、セキュリティクラスの
      xss_clean() メソッドを使用できるようになりました。
   -  :doc:`FTP メソッド <libraries/ftp>` に download()
      メソッドを追加しました。
   -  do_xss_clean() メソッドでアップロードファイルの XSS
      チェックに失敗したときは FALSE を返すように変更しました。
   -  アップロードクラスにおいて、$_FILES の type の値を stripslashes() と
      trim() で処理するように変更しました。
   -  $this->zip->read_dir('/path/to/directory', FALSE) メソッドに第2引数
      (boolean) を追加しました。ZIP アーカイブを作成するときに、指定フォルダ
      までのパスで、空のフォルダを含まないようにできます。
   -  画像操作クラスにおいて、GD ライブラリで PNG
      の透過画像のリサイズが行なえるようになりました。
   -  セッションクラスを使用する際は、設定ファイル内で暗号化キー
      (encryption_key) の指定が必須になりました。
   -  セッションクラスに新たな設定項目 sess_expire_on_close を追加しました
      。ブラウザが閉じられると自動で期限切れにすることができます。
   -  Mcrypt が利用可能なサーバにおいて、暗号化クラスのパフォーマンスが向
      上しました。
   -  暗号化クラスにおいて、標準の暗号化方式を CBC に変更しました。
   -  encode_from_legacy() メソッドを追加しました。CodeIgniter 1.x
      で暗号化されたデータを CodeIgniter 2.x に移行するのに使用します。
      詳細は「 :doc:`以前のバージョンからのアップグレード
      <./installation/upgrade_200>` 」をご覧ください。
   -  Form_Validation クラスの set_rules() , set_message() および
      set_error_delimiters() メソッドにおいて、"メソッドの連結"
      ができるようになりました。
   -  Email クラスで "メソッドの連結" ができるようになりました。
   -  入力クラスに request_headers() , get_request_header() および
      is_ajax_request() メソッドを追加しました。
   -  :doc:`ユーザエージェントクラス <libraries/user_agent>` の
      is_browser() , is_mobile() および is_robot() メソッドで、特定のブラウ
      ザおよび携帯デバイスをチェックできるようになりました。
   -  :doc:`入力クラス <libraries/input>` の post() と get() が、引数を与
      えなかった場合にPOSTとGETそれぞれの値をすべて返すようになりました。

-  データベース

   -  :doc:`データベース設定 <./database/configuration>` 。
   -  :doc:`データベース設定 <./database/configuration>` に設定値 autoinit
      を追加しました。
   -  :doc:`データベース設定 <./database/configuration>` に設定値 stricton
      を追加しました。
   -  :doc:`データベースユーティリティクラス <database/utilities>` に
      database_exists() メソッドを追加しました。
   -  db->version() メソッドにおいて、それ用の SQL クエリの代わりに、例外
      的に関数でバージョンを取得するデータベースのリストを変更しました。現在
      、このリストは Oracle と SQLite のみです。
   -  field_data() メソッドにおいて、ドライバの特定のテーブル識別子保護機
      能が不正なクエリを発行することがある不具合を修正しました。
   -  データベースドライバにおいて、未定義のクラス変数が参照されていた不具
      合を修正しました。
   -  問題があるクエリのデータベースエラーでファイル名と行数を表示するよう
      に変更しました。
   -  廃止予定であった次のメソッドを削除しました: orwhere, orlike,
      groupby, orhaving, orderby, getwhere
   -  非推奨であった drop_database() と create_database()
      メソッドをデータベースユーティリティドライバから削除しました。
   -  データベースフォージクラスにおいて、Postgres のドライバの
      create_table() メソッドを改良しました。

-  ヘルパー

   -  :doc:`テキストヘルパー <./helpers/text_helper>` に
      convert_accented_characters() メソッドを追加しました。
   -  :doc:`フォームヘルパー <helpers/form_helper>` の form_open()
      関数で挿入される属性のリストに accept-charset を追加しました。
   -  命名規則により、 dohash() 関数は推奨されないので do_hash()
      を使用してください。
   -  :doc:`ファイルヘルパー <helpers/file_helper>` の get_dir_file_info()
      メソッドにおいて、以前のバージョンと互換性のない変更がありました。もう
      責任ある利用の観点により デフォルトでは再帰処理を行ないません (気を付
      けないとこの関数はサーバのパフォーマンスの問題を引き起こし得ます) 。
   -  :doc:`ディレクトリヘルパー <helpers/directory_helper>` の
      directory_map() メソッドにおいて、再帰的に探索する深さを第2引数で指定
      できるようになりました。
   -  :doc:`ファイルヘルパー <helpers/file_helper>` の delete_files()
      メソッドでにおいて、失敗したときは FALSE を返すように変更しました。
   -  :doc:`数字ヘルパー <helpers/number_helper>` の byte_format()
      メソッドの第2引数で精度を指定できるようになりました。
   -  :doc:`文字列ヘルパー <helpers/string_helper>` の random_string()
      関数に文字列のタイプとして alpha と sha1 を追加しました。
   -  prep_url() 関数で、すでにスキーマ [ 訳注: "http://" など ]
      がついた文字列が与えられた場合、先頭に http://
      を追加しないように変更しました。
   -  ファイルヘルパーの get_file_info() 関数で、更新時刻の取得に
      filectime() から filemtime() を使うように変更しました。
   -  smiley_js() 関数で、script タグを含まない JavaScript
      を返すオプションの第3引数を追加しました。
   -  :doc:`HTML ヘルパー <./helpers/html_helper>` の img()
      メソッドは、alt 属性が指定されない場合、空の alt
      属性を出力するようになりました。
   -  アプリケーションの設定ファイルで CSRF が有効になっている場合、
      form_open() は自動的に hidden フィールドを挿入します。
   -  :doc:`セキュリティヘルパー <./helpers/security_helper>` に
      sanitize_filename() 関数を追加しました。
   -  :doc:`テキストヘルパー <./helpers/text_helper>` に ellipsize()
      メソッドを追加しました。
   -  :doc:`配列ヘルパー <./helpers/array_helper>` に elements()
      メソッドを追加しました。

-  その他の変更

   -  show_404() にログの記録を無効にするための第2引数 (オプション)
      を追加しました。
   -  ローダにおいて、クラスをロードする際にオプションとしてサブクラスのプ
      レフィックスを自動的に与えられるようになりました。クラス名のプレフィッ
      クスには、標準の "CI_" かサブクラスのプレフィックスと同じもの、または
      プレフィックス無しが可能です。
   -  is_really_writable() において、同時に数百から数千のリクエストがあっ
      た際に衝突を避けるため、乱数を大きくしました。
   -  ディレクトリではなくファイルが操作されているところでは、いくつかの定
      数を DIR_WRITE_MODE から FILE_WRITE_MODE に変更しました。
   -  get_mime_by_extension() は大文字と小文字を区別しません。
   -  :doc:`予約語一覧 <general/reserved_names>` に "default"
      を追加しました。
   -  config/mimes.php に 'application/x-msdownload' (.exe) と
      ''application/x-gzip-compressed' (.tgz) を追加しました。
   -  zlib.output_compression
      が有効でサーバが動作している場合、出力クラスはもう出力の圧縮や
      content-length ヘッダの送信を行ないません。
   -  出力のキャッシングにおいて、必要でないときは is_really_writable()
      をコールしないようにしました。
   -  :doc:`出力クラス <libraries/output>` に append_output()
      のドキュメントを作成しました。
   -  :doc:`暗号化クラス <libraries/encryption>` に decode()
      メソッドの第2引数のドキュメントを作成しました。
   -  db->close() のドキュメントを作成しました。
   -  デフォルトルートで複数のセグメントを使用できるように router
      を変更しました。
   -  remove_invisible_characters() 関数を :doc:`セキュリティクラス
      <libraries/security>` から :doc:`共通関数 <general/common_functions>`
      に移動しました。
   -  有効な MIME タイプとして MP3 の audio/mpeg3 を追加しました。

2.0.0の不具合修正
-----------------

-  メール送信時に User-Agent を変更できない不具合を修正しました。
-  出力クラスにおいて、 _output()
   メソッドでコントローラに誤ったキャッシュを送る不具合を修正しました。
-  プロファイラにおいて、失敗したクエリがクエリ実行時間を持たない不具合
   を修正しました。
-  複数の同じヘルパーやプラグインがロードされたときにログが記録される不
   具合を修正しました。
-  ユーザガイドの様々な誤記を修正しました (#10693, #8951, #7825, #8660,
   #7883, #6771, #10656)。
-  プロファイラの言語ファイルのキーを "profiler_no_memory_usage" から
   "profiler_no_memory" に修正しました。
-  Zip 圧縮クラスにおいて、PHP
   4のサーバでダウンロードできない不具合を修正しました。
-  フォームバリデーション(検証)クラスで、ルールパラメータとして渡された
   フィールドが翻訳されない不具合を修正しました (#9132)。
-  語形変換ヘルパーにおいて、'ch' および 'sh'
   で終わる単語を適切に複数形にできるように修正しました。
-  xss_clean() が送信された URL
   のクエリ文字列中のハイフンを許さない不具合を修正しました。
-  ファイルヘルパーの get_dir_file_info() と get_file_info()
   で、再帰および Windows
   上でのファイルパスに関する不具合を修正しました。
-  データベースの設定ファイルで有効化されている場合に、Active Record
   のオーバーライドパラメータで Active Record
   無効化できない不具合を修正しました。
-  文字列ヘルパーの reduce_double_slashes()
   で、先頭の複数のスラッシュもきちんと取り除くように修正しました
   (#7585)。
-  XML-RPC クラスの values_parsing() で、NULL 値が '文字列型'
   として適切に処理されない不具合を修正しました。
-  form_open_multipart()
   が属性を指定する引数を受け付けない不具合を修正しました (#10930)。
-  get_mime_by_extension() が大文字小文字を区別する不具合を修正しました
   (#10470)。
-  SQLite と Oracle のドライバでいくつかのエラーメッセージが表示されな
   い不具合を修正しました。
-  Zip 圧縮クラスで生成されたファイルの作成年が1980となる不具合を修正し
   ました。
-  セッションクラスでオブジェクトを保存しようとすると PHP
   のエラーが発生する不具合を修正しました。
-  Controller クラスを継承しようとすると PHP の fatal
   エラーが発生する不具合を修正しました。
-  index.php ファイル中での PHP の Strict Standards
   エラーを修正しました。
-  is_allowed_type() 中で getimagesize()
   が画像ファイル以外も不必要にチェックしていた不具合を修正しました。
-  暗号化クラスでキーが空の場合にエラーにならない不具合を修正しました。
-  Email クラスで clear() メソッドを使用した際に CC と BCC
   がリセットされない不具合を修正しました (#109)。
-  PHP のバージョンが5.1.2未満の場合、URL ヘルパーの prep_url() で PHP
   のエラーが発生する不具合を修正しました。
-  キャッシュディレクトリの設定値が見つからない場合、core/output
   のログメッセージを出力するように修正しました。
-  load->library()
   に配列を渡しても複数のライブラリがロードできない不具合を修正しました。
-  HTML ヘルパーにおいて、img() 関数で src と alt
   の間に必要以上のスペースが入る不具合を修正しました。
-  profilers _compile_queries() メソッドの不具合を修正しました。
-  日付ヘルパーで、DATE_ISO8601
   定数が不正な書式の日付を返す不具合を修正しました。

Version 1.7.2
=============

リリース日付: 2009年9月11日
Hg Tag: v1.7.2

-  ライブラリ

   -  :doc:`カートクラス <libraries/cart>` を新しく追加しました。
   -  :doc:`ファイルアップロードクラス <libraries/file_uploading>` に
      $config['file_name']
      を渡し、アップロードしたファイルをリネームできるようにしました。
   -  リストアップされたユーザエージェントの順序を変更しました。Safari で
      アクセスした際に、より正確にユーザエージェント報告するようになります。
      (#6844)

-  データベース

   -  将来の PHP バージョンが出力を変えるかもしれないので、escape()
      内で、gettype() を使用するのをやめ、 is_*
      メソッドを使用するようにしました。
   -  escape_str()
      で配列を扱うよう、全データベースドライバを更新しました。
   -  LIKE 条件で文字列をエスケープするための escape_like_str()
      メソッドを追加しました。
   -  Active Record で、LIKE
      の新しいエスケープ方法を利用するよう変更しました。
   -  接続の維持や長時間のアイドル状態の後の接続の再確立を試行できるよう
      reconnect() メソッドをデータベースドライバに追加しました。
   -  MSSQL ドライバで、エラーメッセージに、mssql_get_last_message()
      を使うよう変更しました。

-  ヘルパー

   -  :doc:`フォームヘルパー <helpers/form_helper>` に form_multiselect()
      を追加しました。
   -  :doc:`フォームヘルパー <helpers/form_helper>` の form_hidden()
      を多次元配列を受け入れるように修正しました。
   -  :doc:`フォームヘルパー <helpers/form_helper>` の form_prep()
      を処理済みのフィールドを追跡するように修正しました。
      これは、フォームバリデーション(検証)や Form フィールドを出力するために
      フォームヘルパー関数を使った際に起こりうる、連続した form_prep()
      の呼び出しによる多重の処理や変換を避けるためです。
   -  :doc:`ディレクトリヘルパー <helpers/directory_helper>` の
      directory_map() を、隠しファイルを含められるようにし、ディレクトリの読
      み取りに失敗した際に FALSE を返すように修正しました。
   -  :doc:`スマイリーヘルパー <helpers/smiley_helper>` を複数のフィールド
      で動作するようにし、最後のカーソルの場所に、スマイリーを挿入するように
      しました。

-  一般

   -  PHP 5.3.0に対応しました。
   -  :doc:`show_error() <general/errors>` を HTTP
      サーバレスポンスコードを送信するよう変更しました。
   -  :doc:`show_404() <general/errors>`
      を404ステータスコードを送信するように変更し、CGI と互換性のない
      header() を含む文を error_404.php テンプレートから取り除きました。
   -  出力クラスが利用できない場合に使えるよう、 :doc:`共通関数
      <general/common_functions>` に、set_status_header() を追加しました。
   -  PHPバージョンの簡単な比較ができるよう、 :doc:`共通関数
    <general/common_functions>` に、is_php() を追加しました。
   -  2つの CodeIgniter "チートシート" (DesignFellow.com
      からの寄贈に感謝します) を追加しました。

1.7.2の不具合修正
-----------------

-  様々なユーザガイドの誤字やサンプルコードを修正しました。 (#6743,
   #7214, #7516, #7287, #7852, #8224, #8324, #8349)
-  フォームバリデーション(検証)ライブラリで、複数のコールバックが動作し
   ない不具合を修正しました。(#6110)
-  doctype ヘルパー関数のデフォルト値で、"1"が設定されていなかったのを
   修正しました。
-  言語クラスで、ファイルが見つからない場合にエラーを出力する際の不具合
   を修正しました。
-  カレンダーライブラリで、5月に対応する短縮名を出力する際の不具合を修
   正しました。
-  ORIG_PATH_INFO を利用する際に、スラッシュひとつだけの URI
   を許可していた不具合を修正しました。
-  Oracle と ODBC ドライバの致命的なエラーを修正しました。(#6752)
-  xml_from_result()
   が、存在しないメソッドをチェックしていた不具合を修正しました。
-  データベースフォージの add_column と modify_column で、複数のフィー
   ルドが送られた際に、ループ処理していなかった不具合を修正しました。
-  ファイルヘルパーで、DIRECTORY_SEPARATOR
   定数の代わりに、'/'が使用されていた不具合を修正しました。
-  PHPのpopen()関数が手動で無効にされたサーバ上の sendmail
   を利用しようとする際に起こる PHP エラーを回避するよう修正しました。
-  特定の XML-RPC 型 がPHPのデータ型と一致しない場合に起こる XML-RPC
   データの PHP エラーに起因する不具合を修正しました。
-  XML-RPC クラスが dateTime.iso8601
   データ型を解析する際の不具合を修正しました。
-  xss_clean() のケースセンシティブな(大文字小文字を区別する)文字列の置
   換を修正しました。
-  form_textarea()
   で、フォームデータが正常に処理されない不具合を修正しました。
-  form_prep() を使用すると、フォーム要素に値が呼び戻されるときに、ユー
   ザのオリジナルの入力によるHTMLエンティティが保存されない不具合を修正し
   ました。
-  _protect_identifiers() メソッドで、置き換えられたデータベースプリフ
   ィクス($swap_pre)をチェックしていなかった不具合を修正しました。
-  'disallowed URI characters [許可されない URI 文字]'
   のエラーの際に送信される400ステータスヘッダが、CGI
   環境と互換性がない不具合を修正しました。
-  タイポグラフィクラスで、auto_typography() を使用すると、見出しタグの
   中に段落タグが挿入されてしまうことがある不具合を修正しました。

Version 1.7.1
=============

リリース日付: 2009年2月10日
Hg Tag: 1.7.1

-  ライブラリ

   -  フォームバリデーション(検証)ライブラリで、任意のスクリプトが実行され
      るセキュリティ上の欠陥(#6068)を修正しました。 (hkk さんに感謝します)
   -  ページネーションライブラリの、現在のページの既定のインディケータで、
      <b>の代わりに<strong>を使用するようにしました。
   -  不正な文字列が検出された場合に、 "HTTP/1.1 400 Bad Request"
      ヘッダを送信するようにしました。
   -  <big>, <small>, <q> および <tt>
      をタイポグラフィパーサのインライン要素に追加しました。
   -  sendmail を使用した際に、Email
      ライブラリで、より正確なエラー報告をするようにしました。
   -  :doc:`画像操作クラス <libraries/image_lib>` の rotate()
      メソッドで厳密な型チェックをしないようにしました。
   -  GD ライブラリを使用した際、画像ライブラリでファイルを保存するときの
      エラー報告を改善しました。
   -  多くの MUA との互換性を高めるため、マルチパート Email ヘッダと MIME
      メッセージテキストの間に新しい行を追加するようにしました。
   -  画像ライブラリの explode_name() で、効率と正確性を少し改善しました。

-  データベース

   -  delete() が受け取ることができる引数のリストに、where_in
      を追加しました。

-  ヘルパー

   -  :doc:`フォーム ヘルパー <helpers/form_helper>` の form_dropdown() で
      optgroup タグを含めることができるようにしました。
   -  :doc:`HTML ヘルパー <helpers/html_helper>` に doctype()
      関数を追加しました。
   -  :doc:`URL ヘルパー <helpers/url_helper>` の url_title()
      で、強制的に小文字に変換することができるようになりました。
   -  :doc:`フォームヘルパー <helpers/form_helper>` の form_button()
      の既定の "type" 属性の値を "submit" から "button" に変更しました。
   -  URL ヘルパーの redirect() を CI のサイトの外部の URL
      へリダイレクトできるように変更しました。
   -  要求されたクッキーの名前が存在しない場合、グローバルのクッキープリフ
      ィックスを使って、クッキーを読み取るよう、get_cookie()を変更しました。

-  その他の変更

   -  Internet Explorer を対象とした攻撃を回避するのに利用できるよう、
      xss_clean() のセキュリティを改善しました。
   -  .xls ファイル用に config/mimes.php に 'application/msexcel'
      を追加しました。
   -  訪問者のIPアドレスを決定するために、 HTTP_X_FORWARDED_FOR
      ヘッダを信頼して良いリバースプロキシサーバのホワイトリストを設定できる
      'proxy_ips' 設定項目を追加しました。
   -  Upload::is_allowed_filetype() で、画像を対象に正確性を改善しました。
      (#6715)

1.7.1の不具合修正
-----------------

-  データベース

   -  order_by() で、'random' を指定した際の不具合(#5706)を修正しました。
   -  データベースフォージを使って主キーを追加しようとすると失敗する事があ
      る不具合(#5731)を修正しました。
   -  複数のデータベースを利用して、データベースキャッシュを使った時に起こ
      る不具合 (#5737)を修正しました。
   -  TRUNCATE が"書き込み"
      クエリとして処理されない不具合(#6619)を修正しました。
   -  csv_from_result()
      で、存在しないメソッドをチェックしていた不具合を修正しました。
   -  _protect_identifiers() で、項目から不適切にパイプシンボルをすべて除
      去していた不具合を修正しました。

-  様々なユーザガイドの誤字やサンプルコードを修正しました。(#5998,
   #6093, #6259, #6339, #6432, #6521)
-  MySQLi
   ドライバで、ポートが指定されていない場合の不具合を修正しました。
-  あるフィールドがもう一方と "一致" する場合に、フィールドのラベルを適
   切に読み取れない不具合(#5702)を修正しました。
-  予約文字が使用されていた場合に、識別子が適切にエスケープされない不具
   合を修正しました。
-  auto typography
   で、送信された段落タグを保護するための正規表現の不具合を修正しました。
-  タグの属性に含まれるダブルスラッシュが、em ダッシュ[長いダッシュ]
   HTML エンティティに変換される不具合を修正しました。
-  タグの属性に含まれる2重スペースが、ノンブレークスペース HTML
   エンティティに変換される不具合を修正しました。
-  Typography::format_characters()
   のカーリークォート[""]の正確性の問題を修正しました。
-  いくつかの docblock
   コメントを実際の戻り値に対応させるよう変更しました。
-  件名やメールヘッダに含まれる上位ビットの ascii
   文字についての不具合を修正しました。
-  xss_clean() で、検証済みの文字エンティティに続くホワイトスペースが保
   持されない不具合を修正しました。
-  Typography::auto_typography() において、HTML コメントおよび<pre>
   タグが、変換されてしまう不具合を修正しました。
-  Typography::auto_typography()
   の、ノンブレークスペースのクリア処理の不具合を修正しました。
-  データベースプリフィックスがある場合に複合文(ie:SUM())で、データベー
   スのエスケープ処理が正しく処理されない不具合を修正しました。
-  段落タグに続いて引用の開始があり、そのすぐ後に別のタグがあるときの不
   具合を修正しました。
-  テキストヘルパーで、アクセント付き文字で開始または終了する単語に対し
   word_censor()
   が動作しないという、いくつかのロケールに影響する不具合を修正しました。
-  テキストヘルパーの character_limiter で、文字列の最後の単語が、指定
   された制限文字数にかかる場合の不具合を修正しました。
-  語形変換ヘルパーの plural() で、"y"
   で終わる単語を扱う際の不具合(#6342)を修正しました。
-  URI::rsegment() メソッドによって返される、ルーティングされた後のURI
   セグメントが、デフォルトコントローラに関するURIの場合に間違っている不
   具合(#6517)を修正しました。
-  セキュリティヘルパーの xss_clean()
   で、古い形式の第2引数を使用していた不具合(#6706)を修正しました。
-  URLヘルパーの url_title() 関数で、ピリオドをURLの最後に付加すること
   ができる不具合を修正しました。
-  Emailクラスで、"mail"プロトコルを利用する際に、 ヘッダに CRLF
   が改行文字として使用されるときの不具合(#6669)を修正しました。
-  URI::A_filter_uri() で、show_error() を使う代わりに、exit()
   で終了していた不具合(#6500)を修正しました。
-  ファイルヘルパーの
   get_dir_file_info()で、再帰処理が適切に行われない不具合
   (#6592)を修正しました。
-  Typography::auto_typography() を特定の状況下について調整しました。

Version 1.7
===========

リリース日付: 2008年10月23日
Hg Tag: 1.7.0

-  ライブラリ

   -  新しく :doc:`フォームバリデーション(検証)クラス
      <libraries/form_validation>` を追加しました。これにより、ルールやフィ
      ールド名の設定が簡単になり、配列によるフィールド名の設定がサポートされ
      、設定ファイルに保存できる検証ルールのグループを取り扱うことが可能にな
      り、ビューファイルで利用できるヘルパー関数も追加されました。 古いバリ
      デーション(検証)クラスは、非推奨となったので、注意してください。 古い
      クラスは、既存のアプリケーションが停止しないように、いくらかの間は、ラ
      イブラリフォルダの中に残しますが、新しいバージョンに移行することを推奨
      します。
   -  セッションクッキーにではなく(セッションデータを保存するのにデータベ
      ースを使用しているとした場合)、データベースに、どんなユーザデータも保
      存できるよう、 :doc:`セッションクラス <libraries/sessions>`
      を更新しました。より多くのデータを保存することができます。
   -  メインの "libraries" または、ローカルアプリケーションの "libraries" 
      フォルダの中にサブディレクトリを作ってライブラリを設置できるようにしま
      した。詳しくは、 :doc:`ローダー(読込み処理)クラス <libraries/loader>`
      をご覧ください。
   -  $this->load->library() を使う際に、ユーザが指定した名前でライブラリ
      オブジェクトを割り当てることができるようになりました。詳しくは
      :doc:`ローダー(読込み処理)クラス <libraries/loader>` をご覧ください。
   -  :doc:`プロファイラクラス <general/profiling>` にコントローラのクラス
      /メソッド情報を追加し、複数のデータベース接続にも対応しました。
   -  "auto typography" 機能を改善し、ヘルパーから
      :doc:`タイポグラフィクラス <libraries/typography>`
      にそれらの機能を移しました。
   -  画像/ファイル検査での見逃しを減らすなど、 xss_clean()
      のパフォーマンスと正確性を改善しました。
   -  :doc:`パーサクラス <./libraries/parser>` で parse() メソッドを複数回
      呼び出せるよう改善しました。各出力は最終出力に追加されます。
   -  :doc:`ファイルアップロードクラス <libraries/file_uploading>`
      に、ファイル名の最大長をセットできる max_filename
      オプションを追加しました。
   -  set_status_header() メソッドを :doc:`出力クラス <libraries/output>`
      に追加しました。
   -  :doc:`ページネーション <libraries/pagination>`
      クラスで、1ページ目へのリンクが表示されないときにだけ、"最初のページ"
      のリンクを表示するようにしました。
   -  :doc:`フォームバリデーション <libraries/form_validation>` クラスで、
      マルチバイトの言語での文字列の長さを正確に計算できるよう、mb_strlen
      をサポートするようにしました。

-  データベース

   -  Active Record クラスで、フルパスの列およびテーブル名:
      ホスト名.データベース.テーブル.列
      の取り扱いを改善しました。また、別名の取り扱いも改善しました。
   -  テーブルおよび列名のエスケープおよびプリフィックス付加の方法を改善し
      ました。プリフィックスを付加した場合やエスケープした場合でも、フルパス
      の名前が使えます。
   -  update および delete メソッドにActive Record
      キャッシュ機能を追加しました。
   -  DBドライバの escape_str() にネイティブ PHP のエスケープ処理 (mssql,
      oci8, odbc)にはない、非プリント文字、制御文字の除去を追加しました。こ
      れは、潜在的な SQL エラーや潜在的な SQL
      インジェクションの起点になるのを回避するためです。
   -  MySQL, MySQLi, および MS SQL
      データベースドライバにポート番号のサポートを追加しました。
   -  バグレポート #4436 に基づいて、各 DB
      ドライバにドライバ名の変数を追加しました。

-  ヘルパー

   -  :doc:`フォームヘルパー <helpers/form_helper>` に POST データを読み取
      って、フォームにセットすることができる、いくつかの"セット"関数を追加し
      ました。これらは、独立で、または、新たな
      :doc:`フォームバリデーション(検証)クラス <libraries/form_validation>`
      と一緒に使うのを想定しています。
   -  :doc:`URL ヘルパー <helpers/url_helper>` に current_url() と
      uri_segments() を追加しました。
   -  "+"を含む Email アドレスがリンクになるように、 :doc:`URL ヘルパー
      <helpers/url_helper>` の auto_link() を置き換えました。
   -  :doc:`HTML ヘルパー <helpers/html_helper>` に meta()
      関数を追加しました。
   -  :doc:`数字ヘルパー <helpers/number_helper>`
      における計算の精度を改善しました。
   -  FormおよびHTMLヘルパー関数の大部分から、付加された改行("\n")を取り除
      きました。
   -  :doc:`日付ヘルパー <helpers/date_helper>` の human_to_unix()
      関数での検証を厳密にし、POSIX 正規表現を削除しました。
   -  :doc:`日付ヘルパー <helpers/date_helper>`
      を現在のタイムゾーンと時差に適合するよう変更しました。
   -  文字エンティティの一部の文字や数字を取り除き、セパレータ($separator)
      であるかないかにかかわらず、 ダッシュ、アンダースコア、ピリオドを許可
      し、大文字の文字を許可するよう、 :doc:`URLヘルパー
      <helpers/url_helper>` の url_title() を変更しました。
   -  :doc:`URL ヘルパー <helpers/url_helper>` の anchor_popup()
      で任意の属性をサポートするようにしました。

-  その他の変更

   -  :doc:`PHP スタイルガイド <./general/styleguide>`
      をドキュメントに追加しました。
   -  Internet Explorer
      でのユーザ入力で乱用されうる非奨励タグのサニタイズ処理を xss_clean()
      に追加しました。
   -  いくらかの openxml
      ドキュメントのMIMEタイプおよび、モバイルエージェントを mimes.php と
      user_agents.php にそれぞれ追加しました。
   -  キャッシュ処理中で、ファイルに書き込む前に、ファイルのロック状態をチ
      ェックするようにしました。
   -  CI の実行が停止しないように、特定の環境下で明らかになった問題を起こ
      しそうなキー名を無効にするよう、Cookieのキークリーニング処理を変更しま
      した。
   -  プロファイラの出力をclear属性を使用せず style
      属性を使用するようにし、div コンテナに、"codeigniter_profiler" という
      id 属性を追加しました。

1.7.0の不具合修正
-----------------

-  xss_clean() で、タグの必須属性を削除してしまう不具合を修正しました。
-  様々なユーザガイドの誤字やサンプルコードを修正しました。(#4807,
   #4812, #4840, #4862, #4864, #4899, #4930, #5006, #5071, #5158, #5229,
   #5254, #5351)
-  1.6.3からの変更で、user_agents.php の中の、$robots
   配列が消えていたのを修正しました。
-  :doc:`Email ライブラリ <libraries/email>` で quoted-printable エンコ
   ーディングを使用するときに、スペースとタブが不適切にエンコードされてし
   まう不具合を修正しました。
-  XSS サニタイズ[無害化] において、M&M's, B&Bなどの、&[1文字]
   の後にセミコロンを付加しないようにしました。
-  XSS サニタイズ[無害化]において、XHTML
   の画像タグの終了スラッシュを除去しないようにしました。
-  セッションクラスで、データベースセッションを利用しているとき、セッシ
   ョン更新時にすべてのユーザデータが誤ってセッションクッキーに書かれる不
   具合を修正しました。
-  MySQL ドライバでのバックアップで、いくつかの古いコードが原因で、特定
   の文字が二重にエスケープされていた不具合(#4536)を修正しました。
-  デフォルトのルートがサブフォルダの場合に起こるルーティングの不具合
   (#4661)を修正しました。
-  :doc:`日付ヘルパー <helpers/date_helper>` の timezone_menu() 関数の
   "Dhaka" のスペルを修正しました。
-  config/smileys.php の "raspberry" のスペルを修正しました。
-  form_open() 関数で、 不正な丸括弧が出力される不具合 (#5135)
   を修正しました。
-  コントローラのメソッドを比較する際に、大文字小文字の区別が無視される
   不具合(#4560)を修正しました。
-  initialize メソッドを使用した際に、SMTP
   の認証設定が有効にならない不具合 (#4615)を修正しました。
-  :doc:`テキストヘルパー <helpers/text_helper>` の highlight_code()
   で、特定のケースで、対応するタグがない </span>
   が取り残される不具合を修正しました。
-  1度のアクションで、複数のクエリを発行できないOracle の不具合
   (#3306)を修正しました。
-  コンストラクタを使用すると接続パラメータが無視されるODBCの不具合を修
   正しました。
-  Oracle ドライバで num_rows()
   を使用した際にエラーが起こる不具合を修正しました。
-  MS SQL の不具合 (#4915)を修正しました。MS SQL ドライバで、名前に予約
   語が含まれている場合にデータベースを選択する際、追加のカッコがデータベ
   ース名に付加されていました。
-  URIセグメントがない場合にパスが不正になる、DB
   キャッシングの不具合(4718)を修正しました。
-  Image_lib クラスの不具合 #4562 を修正しました。 NetPBM
   向けにパスが定義されませんでした。
-  Image_lib クラスの不具合 #4532 を修正しました。 出力に同一の高さと幅
   が設定されているときにトリミングした際に、コピーが作成されます。
-  データベースエラーが正しくログ出力されない DB_driver
   の不具合(4900)を修正しました。
-  フィールド名がエスケープされないデータベースバックアップの不具合を修
   正しました。
-  データベース Active Record キャッシングで、キャッシュされたデータを
   複数回呼ぶと、データを受け取れない不具合を修正しました。
-  セッションクラスで、シリアル化した配列でスラッシュを使用できない不具
   合を修正しました。
-  フォームバリデーションで、"isset" のエラーメッセージが "required"
   ルールにより呼び出される不具合を修正しました。
-  ローダーのエラーメッセージのスペルミスを修正しました。
-  空のセグメントの場合の IP の検証に関する不具合(5050)を修正しました。
-  複数の同一のタグの組が現れた際に、パーサーで、最長マッチが行われてし
   まう不具合を修正しました。

Version 1.6.3
=============

リリース日付: 2008年6月26日
Hg Tag: v1.6.3

バージョン1.6.3は、セキュリティおよびメンテナンスリリースで、すべての
ユーザに推奨されます。

-  データベース

   -  キーに明示的な名前を付けるよう MySQL/MySQLi
      フォージクラスを変更しました。
   -  :doc:`フォージクラス <database/forge>`
      を複数の列からなる主キーでないキーをセットできるようにしました。
   -  :doc:`DSN コネクション <database/connecting>` で、クエリ文字列を経由
      して、追加のデータベース設定ができるようになりました。

-  ライブラリ

   -  :doc:`アップロードクラス <libraries/file_uploading>`
      のMIMEタイプチェックで、グローバル変数"mimes"
      を参照するようにしました。
   -  自動検出または、明示的な宣言による :doc:`ページネーションクラス
      <libraries/pagination>` でのクエリ文字列のサポートを追加しました。
   -  :doc:`入力クラス <libraries/input>` に get_post() を追加しました。
   -  :doc:`入力クラス <libraries/input>` の get()
      についての記述をドキュメントに追加しました。
   -  :doc:`言語クラス <libraries/language>`
      で、自動で言語項目をフォームラベルとして出力できるようになりました。

-  ヘルパー

   -  :doc:`言語ヘルパー <helpers/language_helper>` を追加しました。
   -  :doc:`数字ヘルパー <helpers/number_helper>` を追加しました。
   -  form_open() および form_fieldset()
      で、配列または文字列の引数を受け取ることができるように
      :doc:`フォームヘルパー <helpers/form_helper>`
      をリファクタリングしました。

-  その他の変更

   -  xss_clean() のセキュリティを改善しました。
   -  _display_cache() での未使用のルータへの参照を削除しました。
   -  XSS に関して、アップロードのセキュリティ有用な、 :doc:`use
      xss_clean() で画像をテストする <libraries/input>` 機能を追加しました。
   -  config/user_agents.php のモバイル
      ユーザエージェントのリストを大幅に拡張しました。
   -  国際化の目的(#4614)のため、ユーザガイドの文字セット情報を title
      の上に移動しました。
   -  :doc:`ユーザガイドの XMLRPC のページ <libraries/xmlrpc>`
      に、"リクエストパラメータに連想配列を使用する"の例を追加しました。
   -  :doc:`フォームヘルパー <helpers/form_helper>` のform_input()
      で自動的に maxlength と size 属性が追加されないようにしました。
   -  :doc:`数字ヘルパー <helpers/number_helper>` の byte_format()
      の言語ファイルの使用についてドキュメントに記述しました。

1.6.3の不具合修正
-----------------

-  validation_lang.php に、valid_emails 検証ルールのための language key
   を追加しました。
-  DSN データベース接続をパースする際のバグ(#3419)を修正しました。
-  _has_operators() メソッドを DB_active_rec から DB_driver
   に移動しました。(#4535)
-  upload_lang.php の文法エラーを修正しました。
-  画像ライブラリの中の正規表現に関する不具合(#4542)を修正しました。
-  orhaving() が適切に値を渡していなかった不具合(#4561)を修正しました。
-  いくつかの未使用の変数を削除しました。 (#4563)
-  having() で、文に=が追加されない不具合 (#4568) を修正しました。
-  様々なユーザガイドの誤字やサンプルコードを修正しました。(#4574,
   #4706)
-  マルチパートが無効化されているときに、Email クラスで quoted-
   printable ヘッダを追加するようにしました。
-  各システムディレクトリのindexページの 開始 <p>
   タグが2重になっていたのを修正しました。

Version 1.6.2
=============

リリース日付: 2008年5月13日
Hg Tag: 1.6.2

-  Active Record

   -  having() 句で、エスケープを回避できるようにしました。
   -  :doc:`DB フォージ <./database/forge>` に rename_table()
      を追加しました。
   -  クエリの値が NULL であった場合に、無効化され、エスケープ処理ができな
      かった不具合を修正しました。
   -  DBフォージがすべてのモデルに割り当てられるようになりました。モデルの
      ロード後に使えます。(#3457)

-  データベース

   -  データベーストランザクションに :doc:`厳密な(Strict)モード
      <./database/transactions>` を追加しました。
   -  where() 句でのエスケープ方法が変わりました。"FALSE"
      を引数で指定した場合、値はエスケープ(ie:クォート処理)されません。

-  設定

   -  MIMEタイプのリストに、'application/vnd.ms-powerpoint'
      を追加しました。
   -  MIMEタイプのリストに、'audio/mpg' を追加しました。
   -  ファイルモードおよび fopen
      定数を含むユーザで変更可能なファイル、constants.php
      を新たに追加しました。
   -  :doc:`Email <libraries/email>` クラスの設定項目で、CRLF
      をセットできる機能を追加しました。

-  ライブラリ

   -  アップロードライブラリで、ファイル名の取り扱いに関するセキュリティを
      強化しました。
   -  クライアントサイドでのデータ改ざんに対するセッションのセキュリティを
      強化しました。
   -  MySQLi フォージクラスが、MySQL
      フォージと協調して動作するようになりました。
   -  :doc:`Email <libraries/email>` クラスの設定項目で、CRLF
      をセットできる機能を追加しました。
   -  :doc:`ユニットテスト <libraries/unit_testing>` の結果で、コードが色
      づけされ、これらの変更を結果表示のデフォルトのテンプレートとしました。
   -  バリデーション (検証) クラスに、valid_emails ルールを追加しました。
   -  :doc:`Zip 圧縮クラス <libraries/zip>` で download()
      が利用できるようになりました。
   -  :doc:`Zip 圧縮クラス <libraries/zip>`
      は、速度とコードの明瞭さのために、大きく書きなおされました。
      (stanleyxu のバグレポート #3425
      についての大変な作業とソースコードの提供に感謝します!)

-  ヘルパー

   -  PHP 4のサーバで実行される可能性があるアプリケーションでいくつかの
      PHP 5のネイティブ関数が安全に利用できるよう :doc:`互換性ヘルパー
      <helpers/compatibility_helper>` を追加しました。(Seppo
      の大変な作業とコードの提供に感謝します)
   -  :doc:`フォームヘルパー <helpers/form_helper>` に form_button()
      を追加しました。
   -  radio() と checkbox()
      関数で、デフォルトでチェック状態にしないように変更しました。
   -  :doc:`URL ヘルパー <helpers/url_helper>` の redirect()
      関数で、追加の HTTP
      レスポンスコードを含めることができる機能を追加しました。
   -  :doc:`HTML ヘルパー <helpers/html_helper>` の img()
      で、不要なスペースを削除しました。(#4208)
   -  :doc:`URLヘルパー <helpers/url_helper>` の anchor()
      を、デフォルトのタイトル属性を付加しないよう変更しました。(#4209)
   -  :doc:`ダウンロードヘルパー <helpers/download_helper>` に
      force_download() が追加されました。
   -  get_dir_file_info() , get_file_info() , および
      get_mime_by_extension() を :doc:`ファイルヘルパー
      <helpers/file_helper>` に追加しました。
   -  symbolic_permissions() と octal_permissions() を
      :doc:`ファイルヘルパー <helpers/file_helper>` に追加しました。

-  プラグイン

   -  最初に imagecreatetruecolor
      関数をチェックし、それが利用できない場合に、imagecreate
      に機能を落として captcha 生成を行うよう変更しました。(#4226)

-  その他の 変更

   -  :doc:`xss_clean() <libraries/input>`
      で配列を受け取れるようになりました。
   -  不慮の出力がされてしまい、'cannot modify headers'
      エラーが起こらないよう、すべての PHP ファイルから PHP
      の終了タグを取り除きました。
   -  オートロード(自動読み込み)の検索パスから "scripts" を削除しました。
      Scripts は、Version 1.4.1 (2006年9月21日)から廃止予定とされていました
      。古い形式が必要な理由があってまだ使用している場合は、各コントローラで
      手動で読み込む必要があります。
   -  :doc:`予約語一覧 <general/reserved_names>` のページをユーザガイドに
      追加し、コントローラの予約名をこの中に移動しました。
   -  グローバルに利用可能な関数の説明のため、 :doc:`共通関数
      <general/common_functions>` のページをユーザガイドに追加しました。
   -  xss_clean() のセキュリティおよびパフォーマンスを改善しました。

1.6.2の不具合修正
-----------------
-  SET クエリが、"書き込み"
   クエリとして取り扱われない不具合を修正しました。
-  ORIG_PATH_INFO の URI
   をパースするときの不具合(#3191)を修正しました。
-  id フィールドを挿入するときの DB
   フォージの不具合(#3456)を修正しました。
-  HTML テーブルライブラリで、同様の内容で作成された行が抜けてしまう不
   具合(#3459)を修正しました。
-  DBドライバ および MySQLi のクエリ結果で、オブジェクトの代わりにリソ
   ースをチェックしていた不具合(#3461)を修正しました。
-  テーブルの別名を追跡していなかった AR_caching
   エラー(#3463)を修正しました。
-  引数を伴う select 文が、不正にエスケープされてしまう、Active Record
   のコンパイルの不具合(#3478)を修正しました。
-  ドキュメントでの $this->load->language
   についての誤った記述(#3520)を修正しました。
-  get_filenames() での再帰処理での不具合、および、 $include_path
   が使用されているときの、Windows での問題(#3523, #4350)を修正しました。
-  XML-RPC クラスで、dateTime.iso8601
   が使用できない不具合(#4153)を修正しました。
-  Active Record で、or_where_not_in() を使ったときの不具合
   (#4171)を修正しました。
-  :doc:`xss_clean() <libraries/input>` GET の URI
   文字列にセミコロンが付加されてしまう不具合を修正しました。
-  ディレクトリリソースが閉じられない、ディレクトリヘルパーでの不具合(#
   4206)を修正し、小規模な改善を行いました。
-  delete_dir() が再帰的に動作しない、FTP
   ライブラリの不具合(#4215)を修正しました。
-  set_rules() で配列でないフィールド名およびルールが使用された時のバリ
   デーション(検証)の不具合(#4220)を修正しました。
-  戻り値で取得した DB オブジェクトや複数の DB コネクションにおいて、DB
   キャッシングが動作しない不具合(#4223)を修正しました。
-  アップロードライブラリで、同一のエラーを2回出力する事がある不具合(#4
   390)を修正しました。
-  テーブル別名とテーブルプリフィクスを使って結合(Join)する際の
   ActiveRecord の不具合(#4400)を修正しました。
-  DB クラスで $params 引数をチェックする処理の不具合を修正しました。
-  HTML テーブルライブラリで、セルのデータが0のときに、空白のセルとして
   表示される不具合を修正しました。
-  :doc:`URL ヘルパー <helpers/url_helper>`
   の値の代わりにキーが渡されてしまう link_tag() の不具合を修正しました。
-  DB_result::row() で、MySQL の NULL
   値の個々のフィールドを返すことができない不具合を修正しました。
-  SMTP で送信しようとする email で、ドットから始まっている行については
   、ドットの整形処理が動作しない不具合を修正しました。
-  DB ドライバの display_error() で、エラー処理に使用されない言語および
   例外オブジェクトが生成されていた不具合を修正しました。
-  スラッシュのみからなるURI、たとえば
   'http://example.com/index.php?//' が PHP
   エラーを引き起こす不具合(#4413)を修正しました。
-  バリデーション(検証)ライブラリの配列から文字列への変換のエラー
   (#4425) を修正しました。
-  デバッグモードが有効な場合に、失敗したトランザクションがロールバック
   されない不具合 (#4451, #4299, #4339) を修正しました。
-  画像ライブラリの overlay_watermark() で、アルファチャンネルを含む
   PNG-24 形式がサポートされていなかった不具合(#4506)を修正しました。
-  ユーザガイドの様々な誤字(#3453, #4364, #4379, #4399, #4408, #4412,
   #4448, #4488)を修正しました。

Version 1.6.1
=============

リリース日付: 2008年2月12日
Hg Tag: 1.6.1

-  Active Record

   -  :doc:`Active Record キャッシング
      <./database/active_record.html#caching>` を追加しました。
   -  Active Record
      で完全にデータベースプリフィクスを考慮するようにしました。

-  データベースドライバ

   -  MySQLi を使用するときに、クライアントの文字セットおよび照合順序をセ
      ットできるようになりました。

-  コアの変更

   -  xss_clean() で、URL エンコードされた文字列の処理をよりインテリジェン
      トに行うようにしました。
   -  $_SERVER, $_FILES, $_ENV, および $_SESSION
      をグローバル変数のサニタイズに加えました。
   -  :doc:`パスヘルパー <./helpers/path_helper>` を追加しました。
   -  URI クラスの _reindex_segments() の処理を単純化しました。
   -  'permitted_uri_chars' 設定項目で、開発者が既定の設定の末尾に文字を追
      加しようとしただけで、エラーになってしまうのを避けるため、既定の設定項
      目中の '-' をエスケープしました。
   -  private または protected メソッドが URL 経由でアクセスされた際に、コ
      ントローラで、404を表示するよう、メソッドの呼び出し処理を変更しました
      。
   -  404エラーで、不正なリクエストで指定されているコントローラおよびメソ
      ッド名をログ出力するよう、フレームワークを変更しました。

-  ヘルパー

   -  $source_dir が読み取れない場合に、FALSE
      を返すよう、ファイルヘルパーの get_filenames() を変更しました。

1.6.1の不具合修正
-----------------

-  検証ルールにおいて、is_numeric を非推奨としました。numeric と
   integer の使用が推奨されます。
-  DB フォージで、SQLite
   のテーブル作成における不具合(#3379)を修正しました。
-  Active Record
   で完全にデータベースプリフィクスを考慮するようにしました。(#3384)
-  DB フォージで、Postgres の FROM
   句でテーブル名を角括弧で囲んでしまう不正な SQL
   を出力していた不具合を修正しました。
-  WHERE 句を追加指定できるよう、Active Record の update()
   の振る舞いを変更しました。(#3395)
-  特定の POST 変数が PHP
   の警告を引き起こす不具合(#3396)を修正しました。
-  クエリの構築における不具合(#3402)を修正しました。
-  プロファイラの $highlight
   配列でのSQLキーワードの順序を変更したので、OR が ORDER BY
   の前でハイライトされなくなりました。
-  MySQLi ドライバで、$this->conn_id がオブジェクトでなく、リソースであ
   るかどうかをチェックしていた不具合(#3404)を修正しました。
-  DSN
   文字列で、データベースに接続する際の不具合(#3419)を修正しました。
-  デフォルトコントローラが使用される場合に、ルート済みのセグメントの配
   列が、1を起点として再インデックスされない不具合(#3445)を修正しました。
-  ユーザガイドの様々な誤字を修正しました。

Version 1.6.0
=============

リリース日付: 2008年1月30日

-  DBフォージ

   -  データベースツールに、 :doc:`DB フォージ <./database/forge>`
      を追加しました。
   -  create_database() と drop_database() を :doc:`DB フォージ
      <./database/forge>` に移動しました。
   -  add_field() , add_key() , create_table() , drop_table() ,
      add_column() , drop_column() , modify_column() を :doc:`DB フォージ
      <./database/forge>` に追加しました。

-  Active Record

   -  protect_identifiers() を :doc:`Active Record
      <./database/active_record>` に追加しました。
   -  利用中のデータベースに適合する場合、すべての Active Recode
      のクエリは、バッククォート(バックチック)が付加されるようになりました。
   -  where_in() , or_where_in() , where_not_in() , or_where_not_in() ,
      not_like() および or_not_like() を :doc:`Active Record
      <./database/active_record>` に追加しました。
   -  :doc:`Active Record <./database/active_record>` の update() および
      delete() 文で、 limit() のサポートを追加しました。
   -  empty_table() と truncate_table() を :doc:`Active Record
      <./database/active_record>` に追加しました。
   -  :doc:`Active Record <./database/active_record>` の delete()
      文で、テーブルの配列を渡せる機能を追加しました。
   -  count_all_results() メソッドを :doc:`Active Record
      <./database/active_record>` に追加しました。
   -  select_max() , select_min() , select_avg() および select_sum() を
      :doc:`Active Record <./database/active_record>` に追加しました。
   -  :doc:`Active Record <./database/active_record>`
      のテーブル結合で、別名(エイリアス)を使用できるようにしました。
   -  Active Record の like() 句に、ワイルドカードの扱いをコントロールする
      ための第3引数を追加しました。
   -  :doc:`Active Record <./database/active_record>` の set()
      に、データをエスケープしないようにするための第3引数を追加しました。
   -  where() 句に渡された値が何もない時、"IS
      NULL"が自動でセットされるよう、振る舞いを変更しました。

-  その他のデータベース関連

   -  MySQL ドライバの動作条件が、MySQL 4.1以上になりました。
   -  DB ドライバに、クエリを保存するかどうかを指定できるよう、$this->DB->
      save_queries
      フィールドを追加しました。以前は、常に保存されていました。
      -
      データベースプリフィクスを手動で追加するための、$this->db->dbprefix()
      を追加しました。
   -  order_by() のオプションとして'random'
      を追加し、MySQL専用のリスト出力オプションであった、"rand()"
      を削除しました。
   -  MySQL データベースバックアップユーティリティで、NULLのフィールドをチ
      ェックするようにしました。
   -  db->list_table() メソッドのパラメータに "constrain_by_prefix" を追加
      しました。TRUEをセットした場合、現在のプリフィクスが付加されているテー
      ブル名のみが結果に含まれるようになります。
   -  Active Record で、次のものが廃止予定になりました： getwhere() が
      get_where() の旧形式とされました; groupby() が group_by()
      の旧形式とされました; havingor() が having_or() の旧形式とされました;
      orderby() が order_by の旧形式とされました; orwhere() が or_where()
      の旧形式とされました; そして orlike() が or_like()
      の旧形式とされました。
   -  csv_from_result() を、いままでよりも、RFC 4180の基本ルールにそって
      CSV データを出力するように変更しました。
   -  データベースの設定として、 'char_set' および 'dbcollat' を追加しまし
      た。これにより、明示的にクライアントのコミュニケーションが適切に設定で
      きます。
   -  設定から 'active_r' を削除し、グローバル変数の $active_record
      設定と置き換えました。 この設定項目の使われ方が本質的にはグローバルで
      あるというところに、より適合する形になりました。(#1834)

-  コアの変更

   -  複数のビューをロードできるようになりました。ビューの内容は、ロードし
      た順に出力に追加されます。
   -  :doc:`モデル <./general/models>` の :doc:`自動読み込み(オートロード)
      <./general/autoloader>` 機能が追加されました。
   -  よりわかりやすくするため、URI およびルータクラスが再編成されました。
   -  特定の エクステンション / ライブラリがない古い PHP のバージョンや
      PHP の環境のため、関数をオーバーライドする事が可能な、Compat.phpを追加
      しました。
   -  プロファイラの出力に、メモリ使用量、GET、URI
      ストリングデータ、個々のクエリの実行時間を加えました。
   -  スカッフォールディングを、非推奨としました。
   -  クラスプラットフォームで、信頼性がある
      ファイル/フォルダの書き込みテスト手段を提供するため、Common.php
      に、is_really_writable() を追加しました。

-  ライブラリ

   -  拡張が可能なように、モデルのロード手順を変更しました。
   -  MCRYPT_MODE_CBC モードを使用する際に、中間者攻撃(man-in-the-middle
      attack)に対しての防衛ができるよう、暗号化ライブラリを強化しました。
   -  フラッシュデータ変数、 session_id
      の再生成および、設定可能なセッションのアップデート時間を
      :doc:`セッションクラス <./libraries/sessions>` に追加しました。
   -  セッションクラスから、'last_visit' を削除しました。
   -  valid_ip の検証エラーに対応した言語エントリを追加しました。
   -  バリデーション (検証) クラスの prep_for_form()
      を、配列を受け取れるようにし、POST 配列の検証
      (コールバック経由のみ)をサポートするように変更しました。
   -  バリデーション (検証) ライブラリに "integer" ルールを追加しました。
   -  バリデーション (検証) ライブラリに valid_base64() を追加しました。
   -  :doc:`画像操作 <../libraries/image_lib>` ライブラリの clear()
      の記述をドキュメントに追加しました。
   -  "required" ルールによって、ユーザ定義のコールバックが呼び出されない
      ように、振る舞いを変更しました。
   -  アップロードクラスの $_FILES
      のエラーメッセージをより正確にするよう変更しました。
   -  Email ライブラリのセーフモードおよび認証チェックをコンストラクタに移
      動しました。
   -  ビューの変数名との衝突を避けるため、ローダクラスの _ci_load()
      メソッドの変数名を変更しました。
   -  CSV の MIME タイプの、さらにいくつかのバリエーションを追加しました。
   -  XML-RPC サーバライブラリで、いまのところまだ利用できない
      'system.multicall' 以外の、'system' メソッドを利用可能にしました。

-  ヘルパーとプラグイン

   -  :doc:`HTML ヘルパー <./helpers/html_helper>` に link_tag()
      を追加しました。
   -  :doc:`HTML ヘルパー <./helpers/html_helper>` に img()
      を追加しました。
   -  :doc:`"拡張した" ヘルパー <./general/helpers>`
      を使えるようになりました。
   -  :doc:`email ヘルパー <./helpers/email_helper>`
      をコアヘルパーに追加しました。
   -  :doc:`文字列ヘルパー <./helpers/string_helper>` に、 strip_quotes()
      関数を追加しました。
   -  :doc:`文字列ヘルパー <./helpers/string_helper>` に
      reduce_multiples() 関数を追加しました。
   -  :doc:`文字列ヘルパー <./helpers/string_helper>` に、
      quotes_to_entities() 関数を追加しました。
   -  form_fieldset() , form_fieldset_close() , form_label() , および
      form_reset() 関数を :doc:`フォームヘルパー <./helpers/form_helper>`
      に追加しました。
   -  form_open() で外部の URL をサポートするようにしました。
   -  互換性のない関数のため、MySQLi の db_backup
      のサポートを取りやめました。
   -  Javascript カレンダープラグインで、ハードコードされた値を使う代わり
      に、月と日をカレンダー言語ファイルのものを使うようにし、国際対応にしま
      した。

-  ドキュメントの変更

   -  コミュニティで独自のドキュメントを書くのに使用できるよう、
      :doc:`ドキュメントを書く <./doc_style/index>`
      のセクションを追加しました。
   -  すべてのユーザマニュアルのページにタイトルを追加しました。
   -  正当なHTMLのため、ユーザガイドの <html> に属性を追加しました。
   -  `Zip 圧縮クラス
      <http://codeigniter.com/user_guide/libraries/zip.html>`_
      をユーザガイドの目次に追加しました。
   -  ユーザガイドのメニューの javascript
      の部分を外部ファイルに移動しました。
   -  :doc:`Active Record <./database/active_record>` の distinct()
      の記述をドキュメントに追加しました。
   -  :doc:`日付ヘルパー <./helpers/date_helper>` の timezones()
      関数についての記述をドキュメントに追加しました。
   -  :doc:`セッションクラス <./libraries/sessions>` の unset_userdata
      に関する記述をドキュメントに追加しました。
   -  :doc:`データベース設定 <./database/configuration>`
      ページに、2つの設定項目についての記述を追加しました。

1.6.0の不具合修正
-----------------

-  返されたデータベースオブジェクトがある場合に、同一アプリケーションで
   、$CI->db が利用できない不具合(#1813) を修正しました。
-  明示的なメソッドが指定されないコントローラにルーティングされた場合、
   $this->uri->rsegments の配列に、'index'
   が含まれていない不具合(#1842)を修正しました。
-  word_limiter()
   でホワイトスペースが保持されない不具合(#1872)を修正しました。
-  csv_from_result() で、内容に区切り文字を含む場合にファイルが壊れる不
   具合(#1890)を修正しました。
-  Email クラスの clean_email() メソッドの不具合(#2542)を、数値以外の /
   連続しない 配列のキーを指定できるように修正しました。
-  'global_xss_filtering' が有効な場合の _html_entity_decode_callback()
   の不具合(#2545)を修正しました。
-  :doc:`パーサクラス <./libraries/parser>`
   で、数値データが無視される不具合(#2668)を修正しました。
-  "前のページへ" のページネーションリンクが、最初のページで表示されて
   しまう不具合(#2679)を修正しました。
-  _object_to_array で、inserts および updates
   のいくつかの型が壊れてしまう不具合(#2702)を修正しました。
-  PHP 4環境の SQLite ドライバの不具合(#2732)を修正しました。
-  ページネーションの不具合(#2754)について、正の数でない数値リンクをス
   キャンするように修正しました。
-  :doc:`セッションライブラリ <./libraries/sessions>` でスペースで終わ
   るユーザエージェントで、ユーザエージェントのマッチ処理が失敗する不具合
   (#2762)を修正しました。
-  postgre および sqlite ドライバで、$field_names[] を $Ffield_names[]
   としていた不具合(#2784)を修正しました。
-  タイポグラフィヘルパーで、文字列がタグを含む場合に、余分な段落タグを
   生成してしまう不具合(#2810)を修正しました。
-  サブフォルダのコントローラ、メソッドに引数が渡されるとき、不正確にシ
   フトされてしまい、第3引数の値が欠落してしまう不具合(#2849)
   を修正しました。
-  画像クラスで、誤った変数を参照していた不具合(#2858)を修正しました。
-  _pi でなく _plugin
   としてプラグインファイルをロードする不具合(#2875)を修正しました。
-  :doc:`ファイルヘルパー <./helpers/file_helper>` の get_filenames() 
   で、各呼び出しの度に配列がクリアされないの不具合(#2912)を修正しました
   。
-  スラッシュを伴う場合に、 highlight_phrase()
   でエラーが起こる不具合(#2974)を修正しました。
-  暗号化ライブラリの不具合(#3003)を、MCRYPT_MODE_ECB
   以外のモードをサポートするよう修正しました。
-  :doc:`ユーザエージェントライブラリ <./libraries/user_agent>` の
   languages()
   で、2つ以上の言語が報告されない不具合(#3015)を修正しました。
-  :doc:`Email <./libraries/email>` ライブラリで、いくつかのタイムゾー
   ンが誤って計算される不具合(#3017)を修正しました。
-  画像ライブラリの clear() で、master_dim
   がリセットされない不具合(#3024)を修正しました。
-  テキストヘルパーの highlight_code() で、PHP
   タグが正しく取り扱われない不具合(#3156)を修正しました。
-  num_rows が Oracle で動作しない不具合(#3166)を修正しました。
-  PHP 4環境で、特定のライブラリのオートロードが正しく機能しない不具合(
   #3175)を修正しました。
-  タイポグラフィヘルパーで、順序なしリストが、"un"として [ 訳注: HTML
   タグの ul でなく、誤ったタグで ]
   リストアップされていた不具合(#3267)を修正しました。
-  ルータでパスに '/' を残す場合がある不具合(#3268)を修正しました。
-  Email クラスで、いくつかの文字セットについて、誤った Content-
   Transfer-Encoding が送出されてしまう不具合(#3279)を修正しました。
-  リクエストされた URI が、ルーティング済みの URI
   よりも多くのセグメントを含む場合に、rsegment
   配列が正しくセットされない不具合(#3284)を修正しました。
-  出力クラスの _display_cache()
   で、$CFGが余分にロードされていた個所を削除しました。(#3285)
-  モデルのロードが余分に呼び出される個所を削除しました。(#3286)
-  CI のグローバル変数の値を無効化する可能性がある、入力クラスのグロー
   バル変数のサニタイズに関する不具合(#3310)を修正しました。
-  ファイルヘルパーの delete_files()
   で、トップレベルのパスが削除されてしまう不具合(#3314)を修正しました。
-  スマイリーヘルパーで、未定義の変数が返される不具合(#3328)を修正しま
   した。
-  FTP クラスで、比較が行われない不具合(#3330)を修正しました。
-  プロファイラで、使用されていないパラメータを削除しました。(#3332)
-  データベースドライバで、num_rows
   プロパティが更新されない不具合を修正しました。
-  :doc:`アップロードライブラリ <./libraries/file_uploading>`
   で、allowed_files が定義されていなかった不具合を修正しました。
-  テキストヘルパーの word_wrap()
   で、誤ってオブジェクトを参照してた不具合を修正しました。
-  バリデーション (検証) で、 valid_ip()
   が適切に呼び出されない不具合を修正しました。
-  バリデーション (検証) で、チェックボックスに対応する個別のエラーメッ
   セージがサポートされていなかった不具合を修正しました。
-  captcha で、不正なPHP関数を呼び出していた不具合を修正しました。
-  クッキーヘルパーの "set_cookie"
   関数の設定を受け取っていなかった不具合を修正しました。
-  バリデーションで、コールバックを必要であると設定していなくても、コー
   ルバックが要求される不具合を修正しました。
-  XML-RPC ライブラリの不具合を修正しました。これにより、型が指定された
   場合、デフォルトの型に関して、よりインテリジェントな決定がされるように
   なります。
-  Email ライブラリのドキュメントで、カンマ区切りの email
   についてのサンプルコードを修正しました。
-  カレンダライブラリの、前の月/次の月
   のリンクを表示するサンプルコードを修正しました。
-  データベースライブラリの言語ファイルの誤字を修正しました。
-  画像ライブラリの言語ファイルの誤字 "suppor" を "support"
   に修正しました。
-  XML RPC のサンプルコードを修正しました。
-  :doc:`ユーザエージェントライブラリ <./libraries/user_agent>` の
   accept_charset() のサンプルコードを修正しました。
-  docblock コメントで、CodeIgniter が
   CodeIgnitorとなっていた誤字を修正しました。
-  :doc:`文字列ヘルパー <./helpers/string_helper>`
   の誤字を修正しました(uniquid を uniqid に変更)。
-  email クラスの言語ファイルの誤字(email_attachment_unredable,
   email_filed_smtp_login), および FTP
   クラスの言語ファイルの誤字(ftp_unable_to_remame)を修正しました。
-  アップロードライブラリに stripslashes() を追加しました。
-  言語ファイルの一連の文法エラーとスペルミスを修正しました。
-  様々なユーザガイドの誤字を修正しました。

Version 1.5.4
=============

リリース日付: 2007年7月12日

-  :doc:`ユーザ定義言語ファイル <./libraries/language>` に
   :doc:`自動読み込み <./general/autoloader>` オプションを追加しました。
-  :doc:`入力クラス <./libraries/input>` のstripslashes() に、magic
   quotes が ON のときに、フレームワークで、データが常にスラッシュ除去さ
   れるよう、_clean_input_data() を追加しました。
-  :doc:`プロファイラ <general/profiling>`
   で、配列を文字列に展開して表示するようにしました。
-  application/config/mimes.php に、さらにいくつかの MIME
   タイプを追加しました。
-  :doc:`入力ライブラリ <./libraries/input>` に、filename_security()
   メソッドを追加しました。
-  :doc:`語形変換ヘルパー <./helpers/inflector_helper>` の singular() 
   に、"s"で終わる単語についての処理を補うよう、さらにいくつかの引数を追
   加しました。また pluralize()
   に、強制処理させるための引数を追加しました。
-  設定ファイルに、$config['charset'] を追加しました。規定値は、'UTF-8'
   で、いくつかの文字列を取り扱う関数で使用されます。
-  MSSQL の insert_id() を修正しました。
-  DBのtrans_status()
   メソッドの、論理の誤りを修正しました。誤って、失敗した場合に TRUE
   を返し、成功した場合に FALSE を返していました。
-  拡張されたクラスの複数の読み込みを許可していた不具合を修正しました。
-  ユーザが明示的に設定していた場合でも、誤ってサーバのフルパスを識別し
   ようとしていた、ブートストラップファイルの不具合を修正しました。
-  MySQL ドライバの、escape_str() メソッドの不具合を修正しました。
-  :doc:`カレンダライブラリ <./libraries/calendar>`
   の誤字を修正しました。
-  rpcs.php ライブラリの誤字を修正しました。
-  :doc:`Zip ライブラリ <./libraries/zip>` の不具合を修正しました。PC
   Zip ファイルで、Mac OS X との互換性が提供されます。
-  最適化のために、スカッフォールディング向けのルートをルータで無視して
   いた不具合を修正しました。
-  IP の検証の不具合を修正しました。
-  :doc:`プロファイラ <./general/profiling>` の出力で、POST
   キーを表示するときの不具合を修正しました。
-  :doc:`プロファイラ <./general/profiling>` の出力で、HTML として解釈
   できる文字をともなうクエリを表示するときの不具合を修正しました。
-  Email クラスの print debugger で、デバッグ出力において、HTML
   として解釈できる文字が含まれる場合の不具合を修正しました。
-  quoted-printable MIME タイプの HTML メールの Content-Transfer-
   Encoding の不具合を修正しました。
-  GET または POST データ経由で PHP
   のスーパーグローバルをセットする事により、そのひとつが、ある PHP のス
   ーパーグローバルの値を無効化してしまう可能性がある不具合を修正しました
   。
-  PostgreSQL ドライバの insert_id()
   メソッドの、関数の未定義エラーを修正しました。
-  様々なドキュメントの誤字を修正しました。
-  ユーザガイドで記述がなかった、 :doc:`文字列ヘルパー
   <./helpers/string_helper>` の2つの関数: trim_slashes() と
   reduce_double_slashes() についての記述をドキュメントに追加しました。
-  ドキュメントは、XHTML 1 transitional の妥当な文書になりました。
-  IE の expression() でできることについて考慮するようXSS フィルタリン
   グをアップデートし、潜在的な脆弱性を回避するための、ある削除処理を改善
   しました。
-  ルータで、クエリ文字列を有効にできるようにし、コントローラトリガおよ
   びメソッドトリガの値は、ファイル名の包含に関するセキュリティについてサ
   ニタイズするようにしました。
-  アップロードライブラリの is_image() メソッドで、Windows IE 6/7の
   MIME を取り扱う際の一般的でない挙動を考慮するようにしました。
-  XSS クリーニング処理のパフォーマンスを改善し、PHP 5.2の新しい PCRE
   のバックトラックと再帰処理制限に対応するようにしました。
-  :doc:`URL ヘルパー <./helpers/url_helper>`
   で、数値が渡された場合に、$title
   を文字列にキャストするようにしました。
-  Modified フォームヘルパーの form_dropdown()
   で、選択肢の配列のキーと値を文字列にキャストするようにし、'selected'
   を適切にセットするために、数値を受け入れることができるようにしました。
-  各所で使われていた is_numeric()
   は、ピリオドが通ってしまうため、使わないようにしました。 ctype_digit()
   は、互換性の問題があり、いくつかの環境で信頼性が得られなかったため、次
   の正規表現を代わりに使用します: preg_match("/[^0-9]/", $n)
-  非推奨: APPVER は、非推奨となり、明確さのため、CI_VERSION
   に置き換えられました。

Version 1.5.3
=============

リリース日付: 2007年4月15日

-  プロファイラで配列を文字列として展開して表示するようにしました。
-  Code Igniter への参照を CodeIgniter に変更しました。
-  pMachine への参照を EllisLab に変更しました。
-  :doc:`文字列ヘルパー <./helpers/string_helper>` のrepeater
   関数の不具合を修正しました。
-  ODBC ドライバの不具合を修正しました。
-  result_array()
   の、結果が生成されないときに空の配列を返す不具合を修正しました。
-  :doc:`URL ヘルパー <./helpers/url_helper>` の redirect
   関数の不具合を修正しました。
-  ローダの未定義の変数を修正しました。
-  Postgreドライバのバージョンバグを修正しました。
-  フォームヘルパーの textarea
   関数で、文字列を使用する際の不具合を修正しました。
-  ドキュメントの誤字を修正しました。

Version 1.5.2
=============

リリース日付: 2007年2月13日

-  :doc:`ダウンロード <./installation/downloads>` ページに
   :doc:`subversion の情報 <./installation/downloads.html#svn>`
   を追加しました。
-  :doc:`HTML テーブルライブラリ <./libraries/table>`
   で、キャプションをサポートするようにしました。
-  Internet Explorer でダウンロードではなく、読み込みが行われてしまう
   :doc:`download_helper <./helpers/download_helper>`
   の不具合を修正しました。
-  Active Record の Join
   メソッドで、テーブルプリフィクスが考慮されない不具合を修正しました。
-  入力およびルータクラスのエラーメッセージからエスケープされていない変
   数を削除しました。
-  ローダで、ライブラリが2回ロードされたときに、エラーになっていた不具
   合を修正しました。デバッグメッセージは、表示されずに、ログ出力されるよ
   うになりました。
-  :doc:`フォームヘルパー <./helpers/form_helper>` で、textarea に
   value 属性をセットしていた不具合を修正しました。
-  :doc:`画像ライブラリ <./libraries/image_lib.php>`
   で、同一サイズの画像のリサイズが無視されていた不具合を修正しました。
-  ドキュメントのいくつかの誤字を修正しました。

Version 1.5.1
=============

リリース日付: 2006年11月23日

-  $this->load->library
   メソッドで、ライブラリの配列を指定できるようにしました。
-  小文字または大文字のファイルで、ユーザ定義ライブラリ名をつけられるよ
   うにしました。
-  出力バッファリングに関する不具合を修正しました。
-  active record クラスで、クエリをコンパイルした後にクエリデータをリセ
   ットしていなかった不具合を修正しました。
-  コントローラで、エラーを差し止めていた不具合を修正しました。
-  設定ファイルが存在しない場合にループが起こってしまう問題を
   修正しました。
-  第3引数を TRUE
   に設定して複数のモデルをロードした際に起こる不具合を修正しました。
-  入力のサニタイズメソッドで、グローバル変数が適切にクリアされていなか
   った見落としを修正しました。
-  Oracle DB ドライバのいくつかの不具合を修正しました。
-  MySQLi result ドライバの誤って名付けられた変数を修正しました。
-  ドキュメントのいくつかの誤字を修正しました。

Version 1.5.0.1
===============

リリース日付: 2006年10月31日

-  重複したヘルパーおよびクラスの読み込みが停止されない問題を
   修正しました。
-  word_wrap() ヘルパー関数の不具合を修正しました。
-  プロファイラクラスの正しくない16進カラーコードを修正しました。
-  ユーザガイドの壊れた画像を修正しました。

Version 1.5.0
=============

リリース日付: 2006年10月30日

-  :doc:`データベースユーティリティクラス <./database/utilities>`
   を追加しました。データベースのバックアップ、データベース結果からの CSV
   または XML の生成、その他の様々な機能があります。
-  :doc:`データベースキャシュクラス <./database/caching>`
   を追加しました。
-  :doc:`トランザクションのサポート <./database/transactions>`
   をデータベースクラスに加えました。
-  :doc:`プロファイラクラス <./general/profiling>`
   を追加しました。実行時間のベンチマーク、クエリ、POST
   データのレポートをページの一番下で表示します。
-  :doc:`ユーザエージェントライブラリ <./libraries/user_agent>` を追加
   しました。これにより、ブラウザ、ロボット、モバイル機器の識別ができます
   。
-  :doc:`HTML テーブルクラス <./libraries/table>` を追加しました。デー
   タベースの結果の配列から、テーブルを生成することができます。
-  :doc:`Zip 圧縮ライブラリ <./libraries/zip>` を追加しました。
-  :doc:`FTP ライブラリ <./libraries/ftp>` を追加しました。
-  :doc:`ライブラリの拡張 <./general/creating_libraries>` および
   :doc:`コアクラスの拡張 <./general/core_classes>`
   が可能になり、加えて、それらの置き換えも可能になりました。
-  :doc:`モデルをサブフォルダの中に <./general/models>`
   設置することが出来るようになりました。
-  :doc:`ダウンロードヘルパー <./helpers/download_helper>`
   を追加しました。
-  :doc:`simple_query() <./database/queries>`
   メソッドをデータベースクラスに追加しました。
-  :doc:`standard_date() <./helpers/date_helper>`
   関数を日付ヘルパーに追加しました。
-  :doc:`$query->free_result() <./database/results>`
   メソッドをデータベースクラスに追加しました。
-  :doc:`$query->list_fields() <./database/fields>`
   メソッドをデータベースクラスに追加しました。
-  :doc:`$this->db->platform() <./database/helpers>`
   メソッドを追加しました。
-  新しい :doc:`ファイルヘルパー <./helpers/file_helper>`
   ：get_filenames() を追加しました。
-  新しいヘルパー: :doc:`スマイリー(顔文字)ヘルパー
   <./helpers/smiley_helper>` を追加しました。
-  <ul> および <ol> リストのサポートを :doc:`HTML ヘルパー
   <./helpers/html_helper>` に加えました。
-  :doc:`ショートタグ <./general/alternative_php>` をオンザフライで書き
   換えられるようにしました。ショートタグをサポートしないサーバでは、ショ
   ートタグは通常の PHP ステートメントに変換されます。これにより、サーバ
   でショートタグがサポートされているかを考慮することなく、クリーンな構文
   が利用できます。
-  :doc:`"application" フォルダのリネームまたは再配置
   <./general/managing_apps>` ができるようになりました。
-  アップロードクラスでより完全に初期化がおこなわれるようにしたので、す
   べてのフィールドがリセットされるようになりました。
-  PHP ネイティブの is_numeric 関数を使用した "is_numeric"
   ルールがバリデーションに追加されました。
-  設定項目 $config['uri_protocol'] が AUTO
   にセットされていた場合に、URI
   の取り扱いをより信頼性のあるよう改善しました。
-  コントローラクラスの大部分のメソッドをローダクラスに移動し、PHP 5で
   動作させる場合に、コントローラの定義済みメソッド名がより少なくなるよう
   にしました。
-  $query->result() が結果を生成しない場合に、空の配列を返すよう、DB
   Result クラスを変更しました。
-  :doc:`入力クラス <./libraries/input>` の input->cookie() および
   input->post() メソッドを、XSS フィルタで使用される配列に、cookie
   を含むことができるように変更しました。
-  ユーザガイドに記述されていなかったバリデーション (検証)
   クラスの3つのメソッド: set_select(), set_radio(), および
   set_checkbox() に関する記述をドキュメントに追加しました。
-  SMTP の Helo データに関する Email クラスの不具合を修正しました。
-  ワードラップヘルパーおよび Email クラスの不具合を修正しました。
-  バリデーション(検証)クラスの不具合を修正しました。
-  タイポグラフィーヘルパーで、不正にブロックレベル要素を段落タグで囲ん
   でいた不具合を修正しました。
-  form_prep()
   関数で、二重にエンティティをエンコードしていた問題を修正しました。
-  いくつかのバージョンの PHP
   に影響する、出力バッファがネストされたときの不具合を修正しました。
-  PHP のマジックメソッド __get() または __set()
   をモデルまたはコントローラで使用すると、CI
   の動作が停止する不具合を修正しました。
-  URL に負の数が設定されるページネーションの不具合を修正しました。
-  ローダクラスが拡張できない見落としを修正しました。
-  メソッドがプライベートではないため、 _get_config() を get_config()
   に変更しました。
-  "init" フォルダを非推奨としました。
   初期化は自動的に行われるようになりました。
   :doc:`ドキュメントをご覧ください <./general/creating_libraries>` 。
-  $this->db->field_names() は 非推奨になりました
   。$this->db->list_fields() を使用してください。
-  config.php ファイルの設定項目 $config['log_errors'] は
   非推奨になりました 。オフにするためには、代わりに、
   $config['log_threshold'] に"0"をセットできます。

Version 1.4.1
=============

リリース日付: 2006年9月21日

-  URIセグメントを直接ユーザが作成したメソッド呼び出しのパラメータとし
   て渡せる新しい機能を追加しました。詳しくは、 :doc:`コントローラ
   <controllers>` のページをご覧ください。
-  作成したコントローラで、出力クラスが生成した最終の出力を受け取ること
   ができる _output() という名前のメソッドを追加しました。詳しくは、
   :doc:`コントローラ <controllers>` のページをご覧ください。
-  :doc:`URI クラス <./libraries/uri>` に、 :doc:`URI ルーティング
   <routing>` 機能を使って再ルーティングされたURIセグメントを、取得して操
   作するための、いくつかの新しいメソッドを追加しました。これまでは、URI
   クラスでは、再ルーティングされた URI セグメントにアクセスすることがで
   きませんでしたが、これからは、可能になります。
-  サーバヘッダをセットすることができる
   :doc:`$this->output->set_header() <./libraries/output>`
   メソッドを追加しました。
-  application フォルダに、独自のプラグイン、ヘルパー、および言語フォル
   ダを配置できるように、プラグイン、ヘルパー、言語クラスを変更しました。
   これまでは、インストール全体で、常にグローバルに取り扱う必要がありまし
   た。アプリケーションフォルダに、何らかのそれらのリソースが設置された場
   合、グローバルのそれに *代わって*使用されます。
-  :doc:`語形変換ヘルパー <./helpers/inflector_helper>`
   を追加しました。
-  :doc:`配列ヘルパー <./helpers/array_helper>` に、 element()
   関数を追加しました。
-  active record の orderby() メソッドに、 RAND() を追加しました。
-  入力クラスにも、クッキーを読み取るメソッドがありますが、
   delete_cookie() と get_cookie() を :doc:`クッキーヘルパー
   <./helpers/cookie_helper>` に追加しました。
-  Oracle データベースドライバを追加しました。(テスト中のため、いくつか
   の不具合がある可能性があります）
-  テンプレートパーサクラスを、擬似変数と PHP
   変数を混合して使用する事ができるようにしました。
-  設定ファイルに、出力圧縮の項目を追加しました。
-  db->escape() メソッドから is_numeric によるチェックを削除しました。
-  MySQLi で、適切なエラーデータを含まずエラーメッセージが表示される不
   具合を修正しました。
-  明示的に指定した代替ヘッダが無視される、Email
   クラスの不具合を修正しました。
-  get_config() 関数で、例外クラスが呼ばれる時に、問題が発生して PHP
   エラーが起こっていた不具合を修正しました。
-  クッキーヘルパーで、設定ファイルのクッキー設定が使用されていなかった
   見落としを修正しました。
-  アップロードクラスの見落としを修正しました。1.4の変更履歴で述べられ
   ていた項目がありませんでした。
-  Email のバッチ送信の時に、メールの添付をリセットできるよう、いくつか
   のコードを追加しました。
-  application/scripts フォルダは非推奨になりました。レガシーユーザのた
   めに、今後も動作しますが、 :doc:`ライブラリ <./general/libraries>`
   または :doc:`モデル <./general/models>` を代わりに作成するのを推奨しま
   す。もともとは、ユーザライブラリやモデルがCIにない時に追加されたもので
   すが、もう必要ではなくなりました。
-  autoload.php ファイルの項目 $autoload['core']
   は非推奨になりました。今後は、代わりに $autoload['libraries']
   を使用してください。
-  次のデータベースメソッドが非推奨になりました:
   $this->db->smart_escape_str() および $this->db->fields().

Version 1.4.0
=============

リリース日付: 2006年9月17日

-  コアのファイルをハックすることなく、フレームワークの内部動作に踏み込
   んで変更することができる :doc:`フック <hooks>` 機能を追加しました。
-  :doc:`サブフォルダの中に <controllers>`
   コントローラファイルを構成できるようにしました。Marco
   のこの機能(および次の2つの機能)についての `提案
   <http://codeigniter.com/forums/viewthread/627/>`_ を称えます。
-  :doc:`ルーティングルール <routing>`
   で、正規表現をサポートするようにしました。
-  作成したコントローラの中で、
   :doc:`メソッド呼び出しを再マッピングする <controllers>`
   ことができるようになりました。
-  ユーザ作成のクラスで、 :doc:`コアシステムクラスを置き換える
   <core_classes>` ことができるようになりました。
-  % 文字をURLで使用できるようになりました。
-  :doc:`anchor() <./helpers/url_helper>` ヘルパー関数を使って、完全な
   URL を出力できるようにしました。
-  :doc:`file_write() <./helpers/file_helper>`
   ヘルパーにモードを指定するパラメータを追加しました。
-  :doc:`Postgre ドライバ <./database/configuration>`
   で、ポート番号を変更できるようにしました。
-  "許可された URI 文字(allowed URI
   characters)"のリストをルータクラスから、設定ファイルに移動しました。
-  MIMEタイプの配列をアップロードクラスから、applications/config/
   フォルダの中の、専用のファイルに移動しました。
-  :doc:`do_upload() <./libraries/file_uploading>` を呼び出す時に、アッ
   プロードするファイル名を指定するよう、アップロードクラスを変更しました
   。
-  :doc:`設定ライブラリ <./libraries/config>` を、自動的に設定ファイル
   をロードできるように変更し、(複数の設定を使用する時に衝突を避けるため)
   別々のインデックスを付けて、設定ファイルを割り当てられるようにしました
   。
-  異なる環境で、URL がより高い信頼性のもとで動作するよう、URI
   プロトコルのコードに、さらに選択肢を追加しました。
-  form_open() ヘルパーで GET メソッドを利用できるようにしました。
-  MySQLiの execute() メソッドに、コネクション切断エラーを避けるためい
   くつかのコードを追加して変更しました。
-  SQLite ドライバで、結果をオブジェクトとして返す前に、オブジェクトを
   チェックするように変更しました。サポートされてない場合は、配列を返しま
   す。
-  同一のモデルを複数ロードできるよう、モデル読み込みメソッドを変更しま
   した。
-  MSSQL
   ドライバを変更し、シングルクォートがエスケープされるようになりました。
-  Postgre および ODBC ドライバの互換性の改善のための変更を行いました。
-  URLセグメントを小文字に変換する strtolower()
   の呼び出しを削除しました。
-  PHP 4.4.1で干渉していたいくつかの参照を互換性のために削除しました。
-  Postgre では必要でなかったため、バックチックを Postgre
   クラスから削除しました。
-  出力クラスの display()
   をプライベートメソッドであるを明確にするため、 _display()
   に名称を変更しました。
-  同名のネイティブ PHP 関数と名前衝突するため、hash()
   を非推奨としました。代わりに dohash() を使用してください。
-  入力クラスで、GET 変数をクリアしていなかった不具合を修正しました。
-  セグメントのマッチの終わりが、長い範囲になってしまうルータの不具合を
   修正しました。
-  複数の別々のデータベース呼び出しができない不具合を修正しました。
-  言語ファイルをロードする際に、メッセージ
   "ファイルにデータがありません(file contains no data)"
   を生成する不具合を修正しました。
-  XSSフィルタリング機能が、不意に特定の語を変更してしまうことによるセ
   ッションの不具合を修正しました。
-  データベースプリフィクス機能を使用している時の、プリフィクスの欠落を
   修正しました。
-  カレンダークラスの誤字 (cal_november) を修正しました。
-  form_checkbox() ヘルパーの不具合を修正しました。
-  2番目の URI セグメントがクラス名と同じであることが許可されていた不具
   合を修正しました。
-  データベース初期化メソッドの評価関連の不具合を修正しました。
-  言語クラスのエラーメッセージの一つの小さな不具合を修正しました。
-  日付ヘルパーの timespan 関数の不具合を修正しました。
-  DB ドライバクラスの未定義の変数を修正しました。
-  DB クラスで、バインディングで置換される値として使用するドル記号が正
   規表現の後方参照として取り扱われる不具合を修正しました。
-  set_hash() 関数で、MD5 が使用されない不具合を修正しました。
-  ユニットテストクラスの1対の不具合を修正しました。
-  バリデーション(検証)クラスの間違った名前の変数を修正しました。
-  URI クラスの間違った名前の変数を修正しました。
-  設定クラスで、ベース URL
   が適切に呼び出されていなかった不具合を修正しました。
-  バリデーション(検証)クラスで、フィールドが空の場合に、コールバックが
   起こらなかった不具合を修正しました。
-  MySQLi
   で、スカッフォールディングが適切に動作しない問題を修正しました。
-  MS SQL のいくつかの不具合を修正しました。
-  ドキュメントのいくつかの誤字を修正しました。

Version 1.3.3
=============

リリース日付: 2006年6月1日

-  このバージョンで、モデルは自動的にデータベースに接続**しなく**なりました。
   :doc:`詳しくはこちら <./general/models>` 。
-  セッション関連のクエリを実行する際に、セッションクラスで、AcitveRecord
   を使用するようにしました。これまでは、クエリは、MySQL
   の構文になっていました。
-  alternator() 関数を引数なしで呼び出し場合、再初期化するようにし、
   複数回呼び出せるようにしました。
-  active record の "having" メソッドの不具合を修正しました。
-  バリデーション(検証)クラスで、required
   の場合に、チェックボックスが無視される問題を修正しました。
-  word_limiter() ヘルパー関数の不具合を修正しました。最初の単語が
   切り取られていました。
-  xss_clean 関数で、いくつかのバージョンに影響する html_entity_decode
   の PHP の不具合を修正しました。
-  一つのコントローラで、ルールを2回セットできないバリデーションの
   不具合を修正しました。
-  動的に読み込んだ言語を使用しないカレンダーの不具合を修正しました。
-  LIKE を使った WHERE 句を使用する時の active record
   クラスの不具合を修正しました。
-  セキュリティヘルパーの hash() の不具合を修正しました。
-  いくつかの誤字を修正しました。

Version 1.3.2
=============

リリース日付: 2006年4月17日

-  "required" がフィールドに明示的にセット「されていなかった」場合、そ
   の他のテストが無視されるという、バリデーションの振る舞いを変更しました
   。
-  コントローラクラスで、メインシステムフォルダでなく、ローカルの"init"
   フォルダを見ていた不具合を修正しました。
-  init_pagination ファイルの不具合を修正しました。$config
   設定項目が正常にセットされませんでした。
-  オートタイポグラフィヘルパーで、一貫しない振る舞いを引き起こしていた
   不具合を修正しました。
-  モデルクラスの一対の不具合を修正しました。
-  ドキュメントのいくつかの誤字や誤りを修正しました。

Version 1.3.1
=============

リリース日付: 2006年4月11日

-  :doc:`ユニットテストライブラリ <./libraries/unit_testing>`
   を追加しました。
-  データベースメソッドの insert() および update()
   にオブジェクトを渡せるようにしました。 この機能により、(特に)作成した
   :doc:`モデルクラス <./general/models>` の変数を使ってクエリを実行でき
   るようになります。詳しくはモデルのページをご覧ください。
-  :doc:`ビュー読み込みメソッド <./general/views>` :
   $this->load->view('my_view', $object );
   でオブジェクトを渡せるようになりました。
-  getwhere メソッドを :doc:`Active Record クラス
   <./database/active_record>` に追加しました。
-  count_all メソッドを :doc:`Active Record クラス
   <./database/active_record>` に追加しました。
-  スカッフォールディング用の言語ファイルを追加し、指定したテーブルに行
   がない場合に起こる不具合を修正しました。
-  最後に実行したクエリを閲覧できるよう、 :doc:`$this->db->last_query()
   <./database/queries>` を追加しました。
-  互換性向上のため、アップロードクラスに新しい MIME
   タイプを追加しました。
-  PHPでショートタグとして解釈される XML
   タグが含まれるキャッシュファイルについての PHP
   エラーを回避するため、キャッシュファイルの読み取り方法を変更しました。
-  2つのactive record メソッド(where および
   orderby)の不具合を修正しました。
-  realpath() が false を返す時の画像ライブラリの不具合を修正しました。
-  モデルで、ライブラリを使用できない不具合を修正しました。
-  バリデーション(検証)クラスの "exact_length"
   メソッドの不具合を修正しました。
-  ユーザガイドのいくつかの誤字を修正しました。

Version 1.3
===========

リリース日付: 2006年4月3日

-  :doc:`モデル <models>` をサポートするようになりました。
-  追加の RDBMS (Postgre, MySQLi,
   etc.)をサポートするよう、データベースライブラリを再設計しました。
-  簡単な構文で多くの種類の問合せができるよう、また、JOIN
   などのようなより進んだ機能を有効にするため、 :doc:`Active Record
   クラス <./database/active_record>` を再設計しました。
-  データベースクラスで、 :doc:`PHP ネイティブ関数の呼び出し
   <./database/call_function>` ができるようになりました。
-  コントローラで、 :doc:`プライベートメソッド <controllers>` をサポー
   トするようにしました。アンダースコア始まる名前のコントローラのメソッド
   はすべて、URI リクエストでは、呼び出されません。
-  $this->load->library()を使う時に、 :doc:`ユーザ定義のコアライブラリ
   <creating_libraries>`
   に、独自の初期化パラメータを渡せるようにしました。
-  通常の :doc:`クエリ文字列 URL <urls>` でも動作するようにしました。こ
   れらは、設定ファイルでオプションで有効にできます。
-  URL に付加できる :doc:`"サフィックス(suffix)"を指定 <urls>`
   出来るようにしました。たとえば、.html を URL に付加することができ、静
   的ファイルのように見せることができます。この機能は、設定ファイルで有効
   にします。
-  ネイティブの PHP
   エラーに使用する新しいエラーテンプレートを追加しました。
-  :doc:`文字列ヘルパー <./helpers/string_helper>` に、"alternator"
   関数を追加しました。
-  入力クラスからスラッシュ付加処理を削除しました。良く議論した結果、こ
   の機能をなくしました。
-  IDE や phpDocumenter のようなツールがコメントを収集できるよう、スク
   リプトのコメントスタイルを PEAR 標準に変更しました。
-  ユーザ開発のクラスとの衝突を避けるため、クラスと関数のネームスペース
   を改善しました。衝突回避のため、CodeIgniter の全クラスは CI_
   というプリフィクスが付き、 すべてのコントローラのメソッドは、 _ci
   というプリフィクスが付きます。定義済みのメソッド名については、
   :doc:`こちらにあります <controllers>` 。
-  PHP 5では、より少ないリソースでオブジェクトを管理できる素晴らしい方
   法が利用できるため、"CI" スーパーオブジェクトの参照方法を PHP
   4か5のどちらが実行されているかによって変えるように、再設計しました。
-  非推奨: $this->db->use_table()
   は、非推奨になりました。これについては、 :doc:`Active Record
   <./database/active_record>` のページでご覧ください。
-  非推奨: $this->db->smart_escape_str() は、非推奨になりました。
   $this->db->escape() を代わりに使用してください。
-  例外ハンドラで、いくつかのPHPエラーが表示されない不具合を修正しまし
   た。
-  URIクラスの誤字を修正しました。$this->total_segment()
   は複数形にすべきです: $this->total_segments()
-  既定のカレンダーテンプレートのいくつかの誤字を修正しました。
-  ユーザガイドのいくつかの誤字を修正しました。

Version 1.2
===========

リリース日付: 2006年3月21日

-  ベータテストで明らかになったスコープの問題を解決するため、フレームワ
   ーク内部の一部を再設計しました。この問題は、コンストラクタで、クラスを
   インスタンス化する際に、とくに、それらのクラスが順次コンストラクタで処
   理を行う際に、もっともよく明らかになります。
-  ユーザ定義クラスの中で、メインの Codeigniter
   オブジェクトにアクセスできるよう、 :doc:`get_instance()
   <ancillary_classes>` というグローバル関数を追加しました。
-  新しい :doc:`ファイルヘルパー <./helpers/file_helper>`
   を追加しました: delete_files()
-  新しい :doc:`URL ヘルパー <./helpers/url_helper>` を追加しました:
   base_url(), index_page()
-  ユーザ定義の :doc:`コアライブラリ <creating_libraries>`
   を作成し、ローカルの application
   ディレクトリに保管できるようにしました。
   -
   与えられたファイル名のファイルに追加するのではなく、上書きできるよう、
   overwrite(上書き) オプションを :doc:`アップロードクラス
   <./libraries/file_uploading>` に追加しました。
-  Javascript のカレンダープラグインを追加しました。
-  ユーザガイドに検索機能を追加しました。注意: これは Google を利用して
   実行されますが、これを書いている時点では、ドキュメントのページはまだ登
   録されていません。
-  あるタグのペアの中に別のタグを入れ子にできるよう、パーサクラスをアッ
   プデートしました。
-  データベースクラスの "where" メソッドの不具合を修正しました。
-  ユーザ作成の設定ファイルを自動読み込みできない不具合を修正しました。
-  置き換えデータの中のクエスチョンマークが有効にならない、mysql
   クラスのバインド機能の不具合を修正しました。
-  xss_clean 関数の不具合を修正しました。

Version Beta 1.1
================

リリース日付: 2006年3月10日

-  :doc:`カレンダークラス <./libraries/calendar>` を追加しました。
-  単一の共有の CodeIgniter のバックエンドでの
   :doc:`複数アプリケーション <managing_apps>` の実行をサポートしました。
-  "uri protocol" 変数を index.php ファイルから config.php
   ファイルに移動しました。
-  コンストラクタの処理中に関数のコールが失敗する問題を修正しました。
-  コンストラクタの処理中に $this->load->library
   メソッドが動作しない問題を修正しました。
-  自動読み込み処理でセッションクラスが詠みこまれるときに発生するバグを
   修正しました。
-  E_STRICT 定数をサポートしない PHP
   のバージョンで発生するバグを修正しました。
-  form_radio 関数 (フォームヘルパー)
   のデータ型に関するエラーを修正しました。
-  バリデーション(検証)クラスから xss_clean
   メソッドの呼び出しに失敗するバグを修正しました。
-  $config ではなく、誤って $conf となっていた cookie
   関連の設定項目名を修正しました。
-  スカッフォールディングでのページネーションの問題を修正しました。
-  mysql クラスの "where" メソッドのバグを修正しました。
-  重複するスラッシュを取り除く、いつかのコードでの正規表現の問題を修正
   しました。
-  HTML ヘルパーの br() 関数のバグを修正しました。
-  フォームヘルパーの form_dropdown 関数の文法ミスを修正しました。
-  フォームヘルパーから "style" 属性を取り除きました。
-  ドキュメントを更新しました。"次へ/前へ"
   のリンクを各ページに追加し、多くの誤字を修正しました。

Version Beta 1.0
================

リリース日付: 2006年2月28日

最初のパブリックリリースバージョン。
