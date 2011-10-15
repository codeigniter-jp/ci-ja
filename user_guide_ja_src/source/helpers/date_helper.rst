############
日付ヘルパー
############

日付ヘルパーのファイルは、日付を処理するのに役立つ関数で構成されています。

.. contents:: Page Contents

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

.. php:method:: now()

mdate()
=======

この関数は、%Y %m %d のように各コードの前に % がついている MySQL
スタイルの日付コードを利用可能なこと以外は、 PHP の `date()
<http://www.php.net/date>`_ 関数と同じです。

日付をこの方法で扱う利点は、date()
関数を使った時には通常しなければならない、 日付コードでない文字列のエ
スケープ処理について考慮する必要がないという点です。例:

.. php:method:: mdate($datestr = '', $time = '')

	:param string 	$datestr: Date String
	:param integer 	$time: time
	:returns: integer


::

	$datestring = "Year: %Y Month: %m Day: %d - %h:%i %a";
	$time = time();
	echo mdate($datestring, $time);

第2引数にタイムスタンプを指定しない場合は、
現在時刻が使われます。

standard_date()
===============

複数の標準フォーマットのうち、ひとつの形式の日付文字列を生成できます。
例:

.. php:method:: standard_date($fmt = 'DATE_RFC822', $time = '')

	:param string 	$fmt: the chosen format
	:param string 	$time: Unix timestamp
	:returns: string

::
	
	$format = 'DATE_RFC822';
	$time = time();
	echo standard_date($format, $time);

第1引数には、フォーマットを指定しなければならず、第2引数には、UNIX
タイムスタンプを指定しなければなりません。

対応しているフォーマットです:

+----------------+------------------------+-----------------------------------+
| 定数           | 対応フォーマット       | サンプル                          |
+================+========================+===================================+
| DATE_ATOM      | Atom                   | 2005-08-15T16:13:03+0000          |
+----------------+------------------------+-----------------------------------+
| DATE_COOKIE    | HTTP Cookies           | Sun, 14 Aug 2005 16:13:03 UTC     |
+----------------+------------------------+-----------------------------------+
| DATE_ISO8601   | ISO-8601               | 2005-08-14T16:13:03+00:00         |
+----------------+------------------------+-----------------------------------+
| DATE_RFC822    | RFC 822                | Sun, 14 Aug 05 16:13:03 UTC       |
+----------------+------------------------+-----------------------------------+
| DATE_RFC850    | RFC 850                | Sunday, 14-Aug-05 16:13:03 UTC    |
+----------------+------------------------+-----------------------------------+
| DATE_RFC1036   | RFC 1036               | Sunday, 14-Aug-05 16:13:03 UTC    |
+----------------+------------------------+-----------------------------------+
| DATE_RFC1123   | RFC 1123               | Sun, 14 Aug 2005 16:13:03 UTC     |
+----------------+------------------------+-----------------------------------+
| DATE_RFC2822   | RFC 2822               | Sun, 14 Aug 2005 16:13:03 +0000   |
+----------------+------------------------+-----------------------------------+
| DATE_RSS       | RSS                    | Sun, 14 Aug 2005 16:13:03 UTC     |
+----------------+------------------------+-----------------------------------+
| DATE_W3C       | W3C                    | 2005-08-14T16:13:03+0000          |
+----------------+------------------------+-----------------------------------+

	
local_to_gmt()
==============

UNIX タイムスタンプを入力として、その時刻をGMT(グリニッジ標準時)として返します。

.. php:method:: local_to_gmt($time = '')

	:param integer 	$time: Unix timestamp
	:returns: string

例:

::

	$now = time();	
	$gmt = local_to_gmt($now);

gmt_to_local()
==============

UNIX タイムスタンプ (グリニッジ標準時を指します) を入力として、 渡され
たタイムゾーンとサマータイム適用区分にもとづいて、その地域の時刻に変換
します。

.. php:method:: gmt_to_local($time = '', $timezone = 'UTC', $dst = FALSE)

	:param integer 	$time: Unix timestamp
	:param string 	$timezone: timezone
	:param boolean 	$dst: whether DST is active
	:returns: integer

例:

::
	
	$timestamp = '1140153693';
	$timezone = 'UM8';
	$daylight_saving = TRUE;
	echo gmt_to_local($timestamp, $timezone, $daylight_saving);


.. note:: タイムゾーンのリストは、このページの一番下のリファレンスをご覧ください。


mysql_to_unix()
===============

MySQL タイムスタンプを入力として、その時刻をUNIXタイムスタンプとして返します。

.. php:method:: mysql_to_unix($time = '')

	:param integer 	$time: Unix timestamp
	:returns: integer

例:

::

	$mysql = '20061124092345';
	$unix = mysql_to_unix($mysql);

unix_to_human()
===============

UNIXタイムスタンプを入力として、次の例のように、人間が読める形式で返し
ます:

.. php:method:: unix_to_human($time = '', $seconds = FALSE, $fmt = 'us')

	:param integer 	$time: Unix timestamp
	:param boolean 	$seconds: whether to show seconds
	:param string 	$fmt: format: us or euro
	:returns: integer

例

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

上の関数の反対です。"人" の時間を入力として、UNIXタイムスタンプを返します。
これは、 フォームから "人"が読める形式にフォーマットされた日付を受け取る時に役立ちます。
渡された文字列が、上で示したようなフォーマットでない場合、FALSE (ブール値)を返します。


.. php:method:: human_to_unix($datestr = '')

	:param integer 	$datestr: Date String
	:returns: integer

例:

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
関数が引き受けるものと同じ)を渡すことができます。

.. php:method:: nice_date($bad_date = '', $format = FALSE) 

	:param integer 	$bad_date: The terribly formatted date-like string
	:param string 	$format: Date format to return (same as php date function)
	:returns: string

例:

::

	$bad_time = 199605  // 次の日付を生成: 1996-05-01
	$better_time = nice_date($bad_time,'Y-m-d');
	$bad_time = 9-11-2001  // 次の日付を生成: 2001-09-11
	$better_time = nice_date($human,'Y-m-d');

timespan()
==========

UNIX タイムスタンプを次の例で示したようにフォーマットします:

::

	1 Year, 10 Months, 2 Weeks, 5 Days, 10 Hours, 16 Minutes

第1引数には、UNIXタイムスタンプを指定する必要があります。
第2引数には、第1引数で渡したタイムスタンプよりも大きい(後の時間の)UNIX
タイムスタンプを指定する必要があります。 もし第2引数が空だった場合は現
在時刻が使用されます。この関数の主要な目的は、過去のある時点から現在ま
での経過時間を表示するというものです。

.. php:method:: timespan($seconds = 1, $time = '')

	:param integer 	$seconds: a number of seconds
	:param string 	$time: Unix timestamp
	:returns: string

例:

::

	$post_date = '1079621429';
	$now = time();
	echo timespan($post_date, $now);

.. note:: この関数が生成するテキストは、次の言語ファイルの中にあります
	file: language/<あなたの言語>/date_lang.php

days_in_month()
===============

指定された年月の日数を返します。
うるう年が考慮されます。

.. php:method:: days_in_month($month = 0, $year = '')

	:param integer 	$month: a numeric month
	:param integer 	$year: a numeric year
	:returns: integer

例:

::

	echo days_in_month(06, 2005);

第2引数が空の時、現在の年が使われます。

timezones()
===========

タイムゾーンリファレンス(有効なタイムゾーンのリストは、下の
"タイムゾーンリファレンス" を参照してください)を引数にとり、UTC
からの時差を数字で返します。

.. php:method:: timezones($tz = '')

	:param string 	$tz: a numeric timezone
	:returns: string

例

::

	echo timezones('UM5');


このメソッドは、timezone_menu() とともに使うと役立ちます。

timezone_menu()
===============

次のようなタイムゾーンのプルダウンメニューを生成します:


.. raw:: html

	<form action="#">
		<select name="timezones">
			<option value='UM12'>(UTC - 12:00) Enitwetok, Kwajalien</option>
			<option value='UM11'>(UTC - 11:00) Nome, Midway Island, Samoa</option>
			<option value='UM10'>(UTC - 10:00) Hawaii</option>
			<option value='UM9'>(UTC - 9:00) Alaska</option>
			<option value='UM8'>(UTC - 8:00) Pacific Time</option>
			<option value='UM7'>(UTC - 7:00) Mountain Time</option>
			<option value='UM6'>(UTC - 6:00) Central Time, Mexico City</option>
			<option value='UM5'>(UTC - 5:00) Eastern Time, Bogota, Lima, Quito</option>
			<option value='UM4'>(UTC - 4:00) Atlantic Time, Caracas, La Paz</option>
			<option value='UM25'>(UTC - 3:30) Newfoundland</option>
			<option value='UM3'>(UTC - 3:00) Brazil, Buenos Aires, Georgetown, Falkland Is.</option>
			<option value='UM2'>(UTC - 2:00) Mid-Atlantic, Ascention Is., St Helena</option>
			<option value='UM1'>(UTC - 1:00) Azores, Cape Verde Islands</option>
			<option value='UTC' selected='selected'>(UTC) Casablanca, Dublin, Edinburgh, London, Lisbon, Monrovia</option>
			<option value='UP1'>(UTC + 1:00) Berlin, Brussels, Copenhagen, Madrid, Paris, Rome</option>
			<option value='UP2'>(UTC + 2:00) Kaliningrad, South Africa, Warsaw</option>
			<option value='UP3'>(UTC + 3:00) Baghdad, Riyadh, Moscow, Nairobi</option>
			<option value='UP25'>(UTC + 3:30) Tehran</option>
			<option value='UP4'>(UTC + 4:00) Adu Dhabi, Baku, Muscat, Tbilisi</option>
			<option value='UP35'>(UTC + 4:30) Kabul</option>
			<option value='UP5'>(UTC + 5:00) Islamabad, Karachi, Tashkent</option>
			<option value='UP45'>(UTC + 5:30) Bombay, Calcutta, Madras, New Delhi</option>
			<option value='UP6'>(UTC + 6:00) Almaty, Colomba, Dhaka</option>
			<option value='UP7'>(UTC + 7:00) Bangkok, Hanoi, Jakarta</option>
			<option value='UP8'>(UTC + 8:00) Beijing, Hong Kong, Perth, Singapore, Taipei</option>
			<option value='UP9'>(UTC + 9:00) Osaka, Sapporo, Seoul, Tokyo, Yakutsk</option>
			<option value='UP85'>(UTC + 9:30) Adelaide, Darwin</option>
			<option value='UP10'>(UTC + 10:00) Melbourne, Papua New Guinea, Sydney, Vladivostok</option>
			<option value='UP11'>(UTC + 11:00) Magadan, New Caledonia, Solomon Islands</option>
			<option value='UP12'>(UTC + 12:00) Auckland, Wellington, Fiji, Marshall Island</option>
		</select>
	</form>


このメニューは、ユーザごとのローカル時間ををセットできる会員制サイトの
場合に使えます。

第1引数で、メニューの "選択(selected)" 状態 を指定します。たとえば、太
平洋標準時をデフォルト値にセットしたい場合は、次のようにします:

.. php:method:: timezone_menu($default = 'UTC', $class = "", $name = 'timezones')

	:param string 	$default: timezone
	:param string	$class: classname
	:param string	$name: menu name
	:returns: string

例:

::

	echo timezone_menu('UM8');

メニューに指定する値を調べるには、下記のタイムゾーンリファレンスをご覧ください。

第2引数では、メニューの CSS クラスの名前を指定できます。

.. note:: このメニューに含まれるテキストは、次の言語ファイルの中にあります:
language/<あなたの言語>/date_lang.php


タイムゾーンリファレンス
========================

次の表は、地域ごとの各タイムゾーンを示したものです。
 
+------------+----------------------------------------------------------------+
|タイムゾーン| 地域                                                           |
+============+================================================================+
| UM12       | (UTC - 12:00) Enitwetok, Kwajalien                             |
+------------+----------------------------------------------------------------+
| UM11       | (UTC - 11:00) Nome, Midway Island, Samoa                       |
+------------+----------------------------------------------------------------+
| UM10       | (UTC - 10:00) Hawaii                                           |
+------------+----------------------------------------------------------------+
| UM9        | (UTC - 9:00) Alaska                                            |
+------------+----------------------------------------------------------------+
| UM8        | (UTC - 8:00) Pacific Time                                      |
+------------+----------------------------------------------------------------+
| UM7        | (UTC - 7:00) Mountain Time                                     |
+------------+----------------------------------------------------------------+
| UM6        | (UTC - 6:00) Central Time, Mexico City                         |
+------------+----------------------------------------------------------------+
| UM5        | (UTC - 5:00) Eastern Time, Bogota, Lima, Quito                 |
+------------+----------------------------------------------------------------+
| UM4        | (UTC - 4:00) Atlantic Time, Caracas, La Paz                    |
+------------+----------------------------------------------------------------+
| UM25       | (UTC - 3:30) Newfoundland                                      |
+------------+----------------------------------------------------------------+
| UM3        | (UTC - 3:00) Brazil, Buenos Aires, Georgetown, Falkland Is.    |
+------------+----------------------------------------------------------------+
| UM2        | (UTC - 2:00) Mid-Atlantic, Ascention Is., St Helena            |
+------------+----------------------------------------------------------------+
| UM1        | (UTC - 1:00) Azores, Cape Verde Islands                        |
+------------+----------------------------------------------------------------+
| UTC        | (UTC) Casablanca, Dublin, Edinburgh, London, Lisbon, Monrovia  |
+------------+----------------------------------------------------------------+
| UP1        | (UTC + 1:00) Berlin, Brussels, Copenhagen, Madrid, Paris, Rome |
+------------+----------------------------------------------------------------+
| UP2        | (UTC + 2:00) Kaliningrad, South Africa, Warsaw                 |
+------------+----------------------------------------------------------------+
| UP3        | (UTC + 3:00) Baghdad, Riyadh, Moscow, Nairobi                  |
+------------+----------------------------------------------------------------+
| UP25       | (UTC + 3:30) Tehran                                            |
+------------+----------------------------------------------------------------+
| UP4        | (UTC + 4:00) Adu Dhabi, Baku, Muscat, Tbilisi                  |
+------------+----------------------------------------------------------------+
| UP35       | (UTC + 4:30) Kabul                                             |
+------------+----------------------------------------------------------------+
| UP5        | (UTC + 5:00) Islamabad, Karachi, Tashkent                      |
+------------+----------------------------------------------------------------+
| UP45       | (UTC + 5:30) Bombay, Calcutta, Madras, New Delhi               |
+------------+----------------------------------------------------------------+
| UP6        | (UTC + 6:00) Almaty, Colomba, Dhaka                            |
+------------+----------------------------------------------------------------+
| UP7        | (UTC + 7:00) Bangkok, Hanoi, Jakarta                           |
+------------+----------------------------------------------------------------+
| UP8        | (UTC + 8:00) Beijing, Hong Kong, Perth, Singapore, Taipei      |
+------------+----------------------------------------------------------------+
| UP9        | (UTC + 9:00) Osaka, Sapporo, Seoul, Tokyo, Yakutsk             |
+------------+----------------------------------------------------------------+
| UP85       | (UTC + 9:30) Adelaide, Darwin                                  |
+------------+----------------------------------------------------------------+
| UP10       | (UTC + 10:00) Melbourne, Papua New Guinea, Sydney, Vladivostok |
+------------+----------------------------------------------------------------+
| UP11       | (UTC + 11:00) Magadan, New Caledonia, Solomon Islands          |
+------------+----------------------------------------------------------------+
| UP12       | (UTC + 12:00) Auckland, Wellington, Fiji, Marshall Island      |
+------------+----------------------------------------------------------------+