function create_menu(basepath)
{
	var base = (basepath == 'null') ? '' : basepath;

	document.write(
		'<table cellpadding="0" cellspaceing="0" border="0" style="width:98%"><tr>' +
		'<td class="td" valign="top">' +

		'<ul>' +
		'<li><a href="'+base+'index.html">ユーザガイド Home</a></li>' +
		'<li><a href="'+base+'toc.html">目次</a></li>' +
		'</ul>' +

		'<h3>基本情報</h3>' +
		'<ul>' +
			'<li><a href="'+base+'general/requirements.html">サーバ必要条件</a></li>' +
			'<li><a href="'+base+'license.html">ライセンス契約書 (原文・参考訳)</a></li>' +
			'<li><a href="'+base+'changelog.html">変更履歴</a></li>' +
			'<li><a href="'+base+'general/credits.html">クレジット表示</a></li>' +
		'</ul>' +
		
		'<h3>インストール</h3>' +
		'<ul>' +
			'<li><a href="'+base+'installation/downloads.html">CodeIgniter のダウンロード</a></li>' +
			'<li><a href="'+base+'installation/index.html">インストール方法</a></li>' +
			'<li><a href="'+base+'installation/upgrading.html">以前のバージョンからのアップグレード</a></li>' +
			'<li><a href="'+base+'installation/troubleshooting.html">トラブルシューティング</a></li>' +
		'</ul>' +

		'<h3>イントロダクション</h3>' +
		'<ul>' +
			'<li><a href="'+base+'overview/getting_started.html">はじめよう</a></li>' +
			'<li><a href="'+base+'overview/at_a_glance.html">CodeIgniter の簡単な紹介</a></li>' +
			'<li><a href="'+base+'overview/cheatsheets.html">CodeIgniter チートシート</a></li>' +
			'<li><a href="'+base+'overview/features.html">サポートしている機能</a></li>' +
			'<li><a href="'+base+'overview/appflow.html">アプリケーションフローチャート</a></li>' +
			'<li><a href="'+base+'overview/mvc.html">Model-View-Controller</a></li>' +
			'<li><a href="'+base+'overview/goals.html">アーキテクチャのゴール</a></li>' +
		'</ul>' +

		'</td><td class="td_sep" valign="top">' +

		'<h3>一般的なトピック</h3>' +
		'<ul>' +
			'<li><a href="'+base+'general/urls.html">CodeIgniter の URL</a></li>' +
			'<li><a href="'+base+'general/controllers.html">コントローラ</a></li>' +
			'<li><a href="'+base+'general/reserved_names.html">予約語一覧</a></li>' +
			'<li><a href="'+base+'general/views.html">ビュー</a></li>' +
			'<li><a href="'+base+'general/models.html">モデル</a></li>' +
			'<li><a href="'+base+'general/helpers.html">ヘルパ関数</a></li>' +
			'<li><a href="'+base+'general/libraries.html">CodeIgniter ライブラリの使用</a></li>' +
			'<li><a href="'+base+'general/creating_libraries.html">ユーザライブラリの作成</a></li>' +
			'<li><a href="'+base+'general/core_classes.html">コアクラスの作成</a></li>' +
			'<li><a href="'+base+'general/hooks.html">フック - コアの拡張</a></li>' +
			'<li><a href="'+base+'general/autoloader.html">リソースの自動読み込み</a></li>' +
			'<li><a href="'+base+'general/common_functions.html">共通関数</a></li>' +
			'<li><a href="'+base+'general/routing.html">URI ルーティング</a></li>' +
			'<li><a href="'+base+'general/errors.html">エラー処理</a></li>' +
			'<li><a href="'+base+'general/caching.html">キャッシュ</a></li>' +
			'<li><a href="'+base+'general/profiling.html">アプリケーションのプロファイリング</a></li>' +
			'<li><a href="'+base+'general/managing_apps.html">アプリケーションの管理</a></li>' +
			'<li><a href="'+base+'general/environments.html">複数環境のハンドリング</a></li>' +
			'<li><a href="'+base+'general/alternative_php.html">代替の PHP 構文</a></li>' +
			'<li><a href="'+base+'general/security.html">セキュリティ</a></li>' +
			'<li><a href="'+base+'general/styleguide.html">PHP スタイルガイド</a></li>' +
			'<li><a href="'+base+'doc_style/index.html">ドキュメントを書く</a></li>' +
		'</ul>' +

		'<h3>その他の情報源</h3>' +
		'<ul>' +
		'<li><a href="http://codeigniter.jp/mailinglist">メーリングリスト (日本語)</a></li>' +
		'<li><a href="http://codeigniter.com/forums/">コミュニティフォーラム (英語)</a></li>' +
		'<li><a href="http://codeigniter.com/wiki/">コミュニティ Wiki (英語)</a></li>' +
		'</ul>' +

		'</td><td class="td_sep" valign="top">' +

		'<h3>クラスリファレンス</h3>' +
		'<ul>' +
		'<li><a href="'+base+'libraries/benchmark.html">ベンチマーククラス</a></li>' +
		'<li><a href="'+base+'libraries/calendar.html">カレンダークラス</a></li>' +
		'<li><a href="'+base+'libraries/cart.html">カートクラス</a></li>' +
		'<li><a href="'+base+'libraries/config.html">設定クラス</a></li>' +
		'<li><a href="'+base+'libraries/email.html">Email クラス</a></li>' +
		'<li><a href="'+base+'libraries/encryption.html">暗号化クラス</a></li>' +
		'<li><a href="'+base+'libraries/file_uploading.html">ファイルアップロードクラス</a></li>' +
		'<li><a href="'+base+'libraries/form_validation.html">Form バリデーション (検証) クラス</a></li>' +
		'<li><a href="'+base+'libraries/ftp.html">FTP クラス</a></li>' +
		'<li><a href="'+base+'libraries/table.html">HTML テーブルクラス</a></li>' +
		'<li><a href="'+base+'libraries/image_lib.html">画像操作クラス</a></li>' +		
		'<li><a href="'+base+'libraries/input.html">入力クラス</a></li>' +
		'<li><a href="'+base+'libraries/javascript.html">JavaScript クラス</a></li>' +
		'<li><a href="'+base+'libraries/loader.html">ローダー (読込み処理) クラス</a></li>' +
		'<li><a href="'+base+'libraries/language.html">言語クラス</a></li>' +
		'<li><a href="'+base+'libraries/output.html">出力クラス</a></li>' +
		'<li><a href="'+base+'libraries/pagination.html">ページネーションクラス</a></li>' +
		'<li><a href="'+base+'libraries/security.html">セキュリティクラス</a></li>' +
		'<li><a href="'+base+'libraries/sessions.html">セッションクラス</a></li>' +
		'<li><a href="'+base+'libraries/trackback.html">トラックバッククラス</a></li>' +
		'<li><a href="'+base+'libraries/parser.html">テンプレートパーサクラス</a></li>' +
		'<li><a href="'+base+'libraries/typography.html">タイポグラフィークラス</a></li>' +
		'<li><a href="'+base+'libraries/unit_testing.html">ユニットテストクラス</a></li>' +
		'<li><a href="'+base+'libraries/uri.html">URI クラス</a></li>' +
		'<li><a href="'+base+'libraries/user_agent.html">ユーザエージェントクラス</a></li>' +
		'<li><a href="'+base+'libraries/xmlrpc.html">XML-RPC クラス</a></li>' +
		'<li><a href="'+base+'libraries/zip.html">Zip 圧縮クラス</a></li>' +
		'</ul>' +

		'</td><td class="td_sep" valign="top">' +

		'<h3>ドライバリファレンス</h3>' +
		'<ul>' +
		'<li><a href="'+base+'libraries/caching.html">キャッシングクラス</a></li>' +
		'<li><a href="'+base+'database/index.html">データベースクラス</a></li>' +
		'<li><a href="'+base+'libraries/javascript.html">JavaScript クラス</a></li>' +
		'</ul>' +

		'<h3>ヘルパ関数リファレンス</h3>' +
		'<ul>' +
		'<li><a href="'+base+'helpers/array_helper.html">配列ヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/captcha_helper.html">CAPTCHA ヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/cookie_helper.html">Cookie ヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/date_helper.html">日付ヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/directory_helper.html">ディレクトリヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/download_helper.html">ダウンロードヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/email_helper.html">Email ヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/file_helper.html">ファイルヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/form_helper.html">Form ヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/html_helper.html">HTML ヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/inflector_helper.html">語形変換ヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/language_helper.html">言語ヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/number_helper.html">数字ヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/path_helper.html">パスヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/security_helper.html">セキュリティヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/smiley_helper.html">スマイリーヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/string_helper.html">文字列ヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/text_helper.html">テキストヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/typography_helper.html">タイポグラフィーヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/url_helper.html">URL ヘルパ</a></li>' +
		'<li><a href="'+base+'helpers/xml_helper.html">XML ヘルパ</a></li>' +
		'</ul>' +

		'</td></tr></table>');
}
