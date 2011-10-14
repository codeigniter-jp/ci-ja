############
日付ヘルパー
############

日付ヘルパーのファイルは、日付を処理するのに役立つ関数で構成されていま
す。



ヘルパーのロード
================

このヘルパーは次のコードを使ってロードします:

::

	$this->load->helper('date');


次の関数が利用できます:



now()
=====

現在時刻をUNIXタイムスタンプで返します。 設定ファイルの "time
reference" の設定により、サーバのローカル時間またはグリニッジ標準時間
を指す時刻になります。マスターの時間を GMT に設定しないつもりなら、 (
各ユーザが各々のタイムゾーンを設定することができるサイトであれば通常そ
うすると思います) PHP の time()
関数を使わずに、この関数を利用する利点はありません。



mdate()
=======

この関数は、各コードの前に % がついている MySQL
スタイルの日付コードを利用可能なこと以外は、 PHP の `date()
<http://www.php.net/date>`_ 関数と同じです。

日付をこの方法で扱う利点は、date()
関数を使った時には通常しなければならない、 日付コードでない文字列のエ
スケープ処理について考慮する必要がないという点です。例:


::

	$datestring = "Year: %Y Month: %m Day: %d - %h:%i %a";
	$time = time();
	
	echo mdate($datestring, $time);


第2引数にタイムスタンプを指定しない場合は、現在時刻が使われます。



standard_date()
===============

複数の標準フォーマットのうち、ひとつの形式の日付文字列を生成できます。
例:


::

	
	$format = 'DATE_RFC822';
	$time = time();
	
	echo standard_date($format, $time);


第1引数には、フォーマットを指定しなければならず、第2引数には、UNIX
タイムスタンプを指定しなければなりません。

対応しているフォーマットです:
 
	定数
		対応フォーマット
		サンプル
	 DATE_ATOM
		 Atom
		 2005-08-15T16:13:03+0000
	 DATE_COOKIE
		 HTTP Cookies
		 Sun, 14 Aug 2005 16:13:03 UTC
	 DATE_ISO8601
		 ISO-8601
		 2005-08-14T16:13:03+00:00
	 DATE_RFC822
		 RFC 822
		 Sun, 14 Aug 05 16:13:03 UTC
	 DATE_RFC850
		 RFC 850
		 Sunday, 14-Aug-05 16:13:03 UTC
	 DATE_RFC1036
		 RFC 1036
		 Sunday, 14-Aug-05 16:13:03 UTC
	 DATE_RFC1123
		 RFC 1123
		 Sun, 14 Aug 2005 16:13:03 UTC
	 DATE_RFC2822
		 RFC 2822
		 Sun, 14 Aug 2005 16:13:03 +0000
	 DATE_RSS
		 RSS
		 Sun, 14 Aug 2005 16:13:03 UTC
	 DATE_W3C
		 World Wide Web Consortium
		 2005-08-14T16:13:03+0000
	




local_to_gmt()
==============

UNIX タイムスタンプを入力として、その時刻を
GMT(グリニッジ標準時)として返します。例:


::

	$now = time();
	
	$gmt = local_to_gmt($now);




gmt_to_local()
==============

UNIX タイムスタンプ (グリニッジ標準時を指します) を入力として、 渡され
たタイムゾーンとサマータイム適用区分にもとづいて、その地域の時刻に変換
します。例:


::

	
	$timestamp = '1140153693';
	$timezone = 'UM8';
	$daylight_saving = TRUE;
	
	echo gmt_to_local($timestamp, $timezone, $daylight_saving);


.. note:: タイムゾーンのリストは、このページの一番下のリファレンスをご覧ください。



mysql_to_unix()
===============

MySQL タイムスタンプを入力として、その時刻をUNIXタイムスタンプとして返
します。例:


::

	$mysql = '20061124092345';
	
	$unix = mysql_to_unix($mysql);




unix_to_human()
===============

UNIXタイムスタンプを入力として、次の例のように、人間が読める形式で返し
ます:


::

	YYYY-MM-DD HH:MM:SS AM/PM


これは、フォームの送信のために、フォームフィールドに表示したい場合に役
立ちます。

時間は、秒の部分をつける形式とつけない形式にフォーマットでき、ヨーロッ
パ形式またはアメリカ形式にセットできます。 タイムスタンプだけが渡され
た時は、秒の部分がない形式で、アメリカ形式にフォーマットされます。例:


::

	$now = time();
	
	echo unix_to_human($now); // 秒なしのアメリカ形式
	
	echo unix_to_human($now, TRUE, 'us'); // 秒ありのアメリカ形式
	
	echo unix_to_human($now, TRUE, 'eu'); // 秒ありのヨーロッパ形式




human_to_unix()
===============

上の関数の反対です。"人" の時間を入力として、UNIX
タイムスタンプを返します。これは、 フォームから "人"
が読める形式にフォーマットされた日付を受け取る時に役立ちます。
渡された文字列が、上で示したようなフォーマットでない場合、FALSE
(ブール値)を返します。例:


::

	$now = time();
	
	$human = unix_to_human($now);
	
	$unix = human_to_unix($human);




nice_date()
===========

この関数は不完全な日付フォーマットの数字を引数に取り、有用な形式に変換
します。正しい日付フォーマットを引数に取ることもできます。

デフォルトでは UNIX タイムスタンプを返します。オプションとして、第2引
数にフォーマット文字列( PHP の date
関数が引き受けるものと同じ)を渡すことができます。例:


::

	$bad_time = 199605
	
	// 次の日付を生成: 1996-05-01
	$better_time = nice_date($bad_time,'Y-m-d');
	
	$bad_time = 9-11-2001
	// 次の日付を生成: 2001-09-11
	$better_time = nice_date($human,'Y-m-d');




timespan()
==========

UNIX タイムスタンプを次の例で示したようにフォーマットします:


::

	1 Year, 10 Months, 2 Weeks, 5 Days, 10 Hours, 16 Minutes


第1引数には、UNIX
タイムスタンプを指定する必要があります。第2引数には、
第1引数で渡したタイムスタンプよりも大きい(後の時間の)UNIX
タイムスタンプを指定する必要があります。 もし第2引数が空だった場合は現
在時刻が使用されます。この関数の主要な目的は、過去のある時点から現在ま
での経過時間を表示するというものです。例:


::

	$post_date = '1079621429';
	$now = time();
	
	echo timespan($post_date, $now);


.. note:: この関数が生成するテキストは、次の言語ファイルの中にあります:language/<あなたの言語>/date_lang.php



days_in_month()
===============

指定された年月の日数を返します。うるう年が考慮されます。例:

::

	echo days_in_month(06, 2005);


第2引数が空の時、現在の年が使われます。


timezones()
===========

タイムゾーンリファレンス(有効なタイムゾーンのリストは、下の
"タイムゾーンリファレンス" を参照してください)を引数にとり、UTC
からの時差を数字で返します。


::

	echo timezones('UM5');



このメソッドは、timezone_menu() とともに使うと役立ちます。


timezone_menu()
===============

次のようなタイムゾーンのプルダウンメニューを生成します:
(UTC - 12:00) Enitwetok, Kwajalien (UTC - 11:00) Nome, Midway Island,
Samoa (UTC - 10:00) Hawaii (UTC - 9:00) Alaska (UTC - 8:00) Pacific
Time (UTC - 7:00) Mountain Time (UTC - 6:00) Central Time, Mexico City
(UTC - 5:00) Eastern Time, Bogota, Lima, Quito (UTC - 4:00) Atlantic
Time, Caracas, La Paz (UTC - 3:30) Newfoundland (UTC - 3:00) Brazil,
Buenos Aires, Georgetown, Falkland Is. (UTC - 2:00) Mid-Atlantic,
Ascention Is., St Helena (UTC - 1:00) Azores, Cape Verde Islands (UTC)
Casablanca, Dublin, Edinburgh, London, Lisbon, Monrovia (UTC + 1:00)
Berlin, Brussels, Copenhagen, Madrid, Paris, Rome (UTC + 2:00)
Kaliningrad, South Africa, Warsaw (UTC + 3:00) Baghdad, Riyadh,
Moscow, Nairobi (UTC + 3:30) Tehran (UTC + 4:00) Adu Dhabi, Baku,
Muscat, Tbilisi (UTC + 4:30) Kabul (UTC + 5:00) Islamabad, Karachi,
Tashkent (UTC + 5:30) Bombay, Calcutta, Madras, New Delhi (UTC + 6:00)
Almaty, Colomba, Dhaka (UTC + 7:00) Bangkok, Hanoi, Jakarta (UTC +
8:00) Beijing, Hong Kong, Perth, Singapore, Taipei (UTC + 9:00) Osaka,
Sapporo, Seoul, Tokyo, Yakutsk (UTC + 9:30) Adelaide, Darwin (UTC +
10:00) Melbourne, Papua New Guinea, Sydney, Vladivostok (UTC + 11:00)
Magadan, New Caledonia, Solomon Islands (UTC + 12:00) Auckland,
Wellington, Fiji, Marshall Island
このメニューは、ユーザごとのローカル時間ををセットできる会員制サイトの
場合に使えます。

第1引数で、メニューの "選択(selected)" 状態 を指定します。たとえば、太
平洋標準時をデフォルト値にセットしたい場合は、次のようにします:


::

	echo timezone_menu('UM8');


メニューに指定する値を調べるには、下記のタイムゾーンリファレンスをご覧
ください。

第2引数では、メニューの CSS クラスの名前を指定できます。

.. note:: このメニューに含まれるテキストは、次の言語ファイルの中にあります:
language/<あなたの言語>/date_lang.php



タイムゾーンリファレンス
========================

次の表は、地域ごとの各タイムゾーンを示したものです。
 
タイムゾーン
地域
 UM12 (UTC - 12:00) エニウェトク、クェゼリン環礁
 UM11 (UTC - 11:00) ノーム、 ミッドウェイ島、サモア
 UM10 (UTC - 10:00) ハワイ
 UM9 (UTC - 9:00) アラスカ
 UM8 (UTC - 8:00) 太平洋標準時
 UM7 (UTC - 7:00) 山地標準時
 UM6 (UTC - 6:00) 中部標準時、メキシコシティー
 UM5 (UTC - 5:00) 東部標準時、ボゴタ、リマ、キト
 UM4 (UTC - 4:00) 大西洋標準時、カラカス、ラパス
 UM25 (UTC - 3:30) ニューファンドランド
 UM3 (UTC - 3:00) ブラジル、ブエノスアイレス、ジョージタウン、フォークランド諸島
 UM2 (UTC - 2:00) 中央大西洋、 アセンション島、 セントヘレナ
 UM1 (UTC - 1:00) アゾレス諸島、カーボベルデ諸島
 UTC (UTC) カサブランカ、 ダブリン, エディンバラ、 ロンドン、 リスボン、モンロビア
 UP1 (UTC + 1:00) ベルリン、ブリュッセル、コペンハーゲン、マドリッド、パリ、ローマ
 UP2 (UTC + 2:00) カリーニングラード、 南アフリカ、ワルシャワ
 UP3 (UTC + 3:00) バグダッド、リヤド、モスクワ、ナイロビ
 UP25 (UTC + 3:30) テヘラン
 UP4 (UTC + 4:00) アブダビ、バク、マスカット、トビリシ
 UP35 (UTC + 4:30) カブール
 UP5 (UTC + 5:00) イスラマバード、カラチ、 タシケント
 UP45 (UTC + 5:30) ボンベイ、カルカッタ、マドラス、ニューデリー
 UP6 (UTC + 6:00) アルマティ、コロンビア、 ダッカ
 UP7 (UTC + 7:00) バンコク、ハノイ、ジャカルタ
 UP8 (UTC + 8:00) 北京、香港、パース、シンガポール、台北
 UP9 (UTC + 9:00) 大阪、札幌、ソウル、東京、ヤクーツク
 UP85 (UTC + 9:30) アデレード、ダーウィン
 UP10 (UTC + 10:00) メルボルン、パプアニューギニア、シドニー、ウラジオストック
 UP11 (UTC + 11:00) マガダン、 ニューカレドニア、ソロモン諸島
 UP12 (UTC + 12:00) オークランド、ウエリントン、フィジー、マーシャル諸島


