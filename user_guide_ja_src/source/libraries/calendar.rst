################
カレンダークラス
################

カレンダークラスを使うと動的にカレンダーを生成できます。 カレンダーは
デザインのどんな側面も100%コントロール可能なカレンダーテンプレートをも
とに整形されます。



クラスの初期化
==============

CodeIgniter
の大半のクラスと同様に、カレンダークラスはコントローラの中で、
$this->load->library メソッドを使って初期化します:


::

	$this->load->library('calendar');


一旦呼び出せば、カレンダーオブジェクトは $this->calendar
を使用することで利用できます。



カレンダーの表示
================

カレンダーの表示方法の非常に簡単な例です:


::

	$this->load->library('calendar');
	
	echo $this->calendar->generate();


上のコードは、サーバ時間の年月のカレンダーを生成します。 特定の年月の
カレンダーを表示させるには、カレンダー生成関数に次のように情報を渡しま
す:


::

	$this->load->library('calendar');
	
	echo $this->calendar->generate(2006, 6);


上のコードは、2006年6月を表示するカレンダーを生成します。最初の引数は
年を、2番目の引数は月を指定します。



カレンダーのセルへのデータ引き渡し
==================================

カレンダーのセルにデータを追加するには、埋め込みたい日をキーにし、それ
に対応する値に埋め込むデータを入れた連想配列を作成します。
作成した配列は、カレンダー生成関数の第3引数に渡します。
次のような例が考えられます:


::

	$this->load->library('calendar');
	
	$data = array(
	               3  => 'http://example.com/news/article/2006/03/',
	               7  => 'http://example.com/news/article/2006/07/',
	               13 => 'http://example.com/news/article/2006/13/',
	               26 => 'http://example.com/news/article/2006/26/'
	             );
	
	echo $this->calendar->generate(2006, 6, $data);


上の例を使用すると、3,7,13および26日が渡された URL
を指すリンクになります。

.. note:: 初期状態では、配列にはリンクが含まれるものとされています。 下のカレンダーテンプレートを説明した箇所では、セルに渡されたデータがどのよ
うに扱われるかが示されています。 そこで、違う情報のタイプを指定するこ
とができ、どのようにしてカスタマイズ可能かを知ることができます。



表示設定の変更
==============

7つの設定項目でカレンダーの様々な面をコントロールできます。
設定項目は呼び出し関数の第2引数に配列として渡して設定します。例です:


::

	
	$prefs = array (
	               'start_day'    => 'saturday',
	               'month_type'   => 'long',
	               'day_type'     => 'short'
	             );
	
	$this->load->library('calendar', $prefs);
	
	echo $this->calendar->generate();


上のコードは、土曜日から始まり、「長い」形式の月名と「短い」形式の曜日
名をヘッダに使用します。
設定項目についての詳しい情報は下記のとおりです。
    
設定項目
初期値
オプション
説明
 template なし なし カレンダーテンプレートの文字列。テンプレートのセクションを参照。
 local_time time() なし 現在時刻として関連づける UNIX タイムスタンプ。
 start_day sunday  すべての曜日(sunday, monday, tuesday, など) カレンダーの開始曜日。
 month_type long long, short ヘッダの月名をどの形式にするか。 long = January, short = Jan.
 day_type abr long, short, abr ヘッダのカラムの曜日名の形式にどの形式を用いるか。 long = Sunday, short = Sun, abr = Su.
 show_next_prev FALSE TRUE/FALSE (boolean) 次/ 前 の 月に移動できる URL を表示するかどうか。この機能については下記参照。
 next_prev_url None URL 次の月/ 前の月 のリンクを利用する場合の基準パス。




次の月 / 前の月 リンクの表示
============================

次へ / 前へ のリンクを経由してカレンダーを動的に進める / 戻る
ようにするには、
次の例のようなコードをカレンダーのコードに設定する必要があります:


::

	$prefs = array (
	               'show_next_prev'  => TRUE,
	               'next_prev_url'   => 'http://example.com/index.php/calendar/show/'
	             );
	
	$this->load->library('calendar', $prefs);
	
	echo $this->calendar->generate($this->uri->segment(3), $this->uri->segment(4));


上のサンプルで、何点か気づいた点があるはずです:


-  "show_next_prev" を TRUE にする必要があります。
-  "next_prev_url"
   の設定項目でカレンダーが設置されているコントローラへの URL
   を指定しなければなりません。
-  カレンダー生成関数に指定する「年」と「月」には、URI
   セグメントに出現するものを指定します(Note: カレンダークラスは基準の
   URL に対して年と月を自動的に追加します)




カレンダーテンプレートの作成
============================

カレンダーテンプレートを作成することで、カレンダーのデザインを100%コン
トロールできます。
カレンダーの各部品は次に示す擬似変数のペアの間に配置されます:


::

	
	$prefs['template'] = '
	   {table_open}<table border="0" cellpadding="0" cellspacing="0">{/table_open}
	
	   {heading_row_start}<tr>{/heading_row_start}
	
	   {heading_previous_cell}<th><a href="{previous_url}"><<</a></th>{/heading_previous_cell}
	   {heading_title_cell}<th colspan="{colspan}">{heading}</th>{/heading_title_cell}
	   {heading_next_cell}<th><a href="{next_url}">>></a></th>{/heading_next_cell}
	
	   {heading_row_end}</tr>{/heading_row_end}
	
	   {week_row_start}<tr>{/week_row_start}
	   {week_day_cell}<td>{week_day}</td>{/week_day_cell}
	   {week_row_end}</tr>{/week_row_end}
	
	   {cal_row_start}<tr>{/cal_row_start}
	   {cal_cell_start}<td>{/cal_cell_start}
	
	   {cal_cell_content}<a href="{content}">{day}</a>{/cal_cell_content}
	   {cal_cell_content_today}<div class="highlight"><a href="{content}">{day}</a></div>{/cal_cell_content_today}
	
	   {cal_cell_no_content}{day}{/cal_cell_no_content}
	   {cal_cell_no_content_today}<div class="highlight">{day}</div>{/cal_cell_no_content_today}
	
	   {cal_cell_blank} {/cal_cell_blank}
	
	   {cal_cell_end}</td>{/cal_cell_end}
	   {cal_row_end}</tr>{/cal_row_end}
	
	   {table_close}</table>{/table_close}
	';
	
	$this->load->library('calendar', $prefs);
	
	echo $this->calendar->generate();


