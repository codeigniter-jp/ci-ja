############
ニュースセクション
############

前回我々はフレームワークの基本的な部分を静的ページをロードするクラスを書きながら学んでいきました。
独自のルーティング規則を追加する事によりURIを綺麗にすることもしました。
次は動的コンテンツについて学び、データベースを使ってみましょう。

モデルの準備
---------------------

データベース操作をコントローラに直接各書くより、クエリは後で使い回しがしやすくなるように
モデル内に記述されるべきです。
モデルとは、データベースや他のデータ格納場所からデータを抽出したり、追加したり、更新する場所です。
モデルはデータを象徴するものです。

application/models ディレクトリを開き、新しく news_model.php というファイルを作成して
次のコードを記述してください。同時に`データベース設定 <../database/configuration.html>`_ が正しくされていることも確認してください。

::

    <?php
    class News_model extends CI_Model {

        public function __construct()
        {
            $this->load->database();
        }
    }

このコードは以前使ったコントローラのコードに似ています。ここではCI\_Modelを継承する事により新しいモデルを作成しており、
databaseライブラリをロードしています。これにより、databaseクラスが$this->dbオブジェクトを通して利用可能になります。

データベースにクエリを投げる前に、データベースのスキーマを作らなければいけません。
自分のデータベースに接続し、下記のSQLコマンドを実行してください。それに加えてレコードもいくつか挿入してみてください。

::

    CREATE TABLE news (
        id int(11) NOT NULL AUTO_INCREMENT,
        title varchar(128) NOT NULL,
        slug varchar(128) NOT NULL,
        text text NOT NULL,
        PRIMARY KEY (id),
        KEY slug (slug)
    );

データベースとモデルの準備ができたら、次に必要なのはデータベースから全ての記事を取得するためのメソッドです。
これをするには、CodeIgniterに含まれている `Active Record <../database/active_record.html>`_ という
データベースの抽象化レイヤーが用いられます。これにより、
`クエリを一度書くだけでサポート済みの全データベースシステム上で動かす事が出来ます <../general/requirements.html>`_ 。
次のコードをモデルに追加してください。

::

    public function get_news($slug = FALSE)
    {
        if ($slug === FALSE)
        {
            $query = $this->db->get('news');
            return $query->result_array();
        }
        
        $query = $this->db->get_where('news', array('slug' => $slug));
        return $query->row_array();
    }

このコードにより二種類のクエリを実行する事が出来ます。全てのnewsレコードを取得するか、
`slug <#>`_ を使って特定のnewsの行を取得する事が出来ます。$slug変数がサニタイズされてない事を
気づいたかもしれませんが、Active Recordがこれを代わりに行なってくれています。

ニュースの表示
----------------

クエリを書き終えたので、今度はニュース記事を表示するビューとモデルとを紐づけてユーザーに表示しなければいけません。
これを行なうには以前作成したコントローラを使う事も出来ますが、わかりやすくするために新たに"news"コントローラを定義しましょう。
application/controllers/news.php　で新しいコントローラを作成してください。

::

    <?php
    class News extends CI_Controller {

        public function __construct()
        {
            parent::__construct();
            $this->load->model('news_model');
        }

        public function index()
        {
            $data['news'] = $this->news_model->get_news();
        }

        public function view($slug)
        {
            $data['news'] = $this->news_model->get_news($slug);
        }
    }

コードを見てみると、以前作られたファイルといくつか共通点があるのに気づくかもしれません。
まず、"\_\_construct"メソッド：これは親クラス（CI\_Controller）のコンストラクタを呼んだ後に
モデルをロードし、このコントローラ内の全てのメソッドで利用できるようにします。

次に、２つのメソッドがあります。一つは全ニュースを閲覧するためで、一つは特定のニュース記事のためです。
二番目のメソッドでは$slug変数がモデルに渡されているのが見えます。
モデルはこのslugを使い、どのニュース記事を返すかを見つけます。

これでコントローラはモデル経由でデータを取得する事が出来ましたが、まだ何も表示されていません。
次にするべきは、このデータをviewに渡す事です。

::

    public function index()
    {
        $data['news'] = $this->news_model->get_news();
        $data['title'] = 'News archive';

        $this->load->view('templates/header', $data);
        $this->load->view('news/index', $data);
        $this->load->view('templates/footer');
    }

上記のコードは全ニュースレコードを取得し、変数に代入しています。
題名の値も$data['title']に代入されており、全てのデータはビューに渡されています。
今度はニュース記事を描画するためのビューを作成する必要があります。
 application/views/news/index.php を作成し、次のコードを追加してください。

::

    <?php foreach ($news as $news_item): ?>

        <h2><?php echo $news_item['title'] ?></h2>
        <div id="main">
            <?php echo $news_item['text'] ?>
        </div>
        <p><a href="news/<?php echo $news_item['slug'] ?>">View article</a></p>

    <?php endforeach ?>

ここでは、一つ一つのニュース記事がループされながらユーザに表示されています。
このテンプレート内ではPHPがHTMLに混ざって表示されているのが確認できます。
もしテンプレート言語を使いたい場合、CodeIgniterの`テンプレートパーサ <../libraries/parser.html>`_
クラスを使うか、サードパーティのパーサを使う事が出来ます。

全ニュース表示ページはこれで完成しましたが、特定のニュース記事を表示するページはまだ存在しません。
先ほど作られたモデルはこの処理を簡単に行なえるように作られています。
あなたがやらなければいけないのはコントローラに多少のコードを追記するのと、新規のビューを作成する事だけです。
newsコントローラに戻り、次の行を追記してください。

::

    public function view($slug)
    {
        $data['news_item'] = $this->news_model->get_news($slug);

        if (empty($data['news_item']))
        {
            show_404();
        }

        $data['title'] = $data['news_item']['title'];

        $this->load->view('templates/header', $data);
        $this->load->view('news/view', $data);
        $this->load->view('templates/footer');
    }

get\_news()メソッドをパラメータ無しで呼び出す代わりに、$slug変数が渡され、
特定のニュース記事が返ってくるようになります。あとは、これに対応したビューを application/views/news/view.php に作成するだけです。
次のコードをこのファイルに記述してください。

::

    <?php
    echo '<h2>'.$news_item['title'].'</h2>';
    echo $news_item['text'];

ルーティング
-------

以前作ったワイルドカードルーティング規則のために、新たなルートをコントローラに作る必要があります。
ルーティングファイル (application/config/routes.php) を下記のように修正してください。
これによりリクエストがpagesコントローラにいくかわりに正しくnewsコントローラに到達する事が保証されます。
最初の行はslug付きのURIをnewsコントローラのviewメソッドにルーティングしてくれます。

::

    $route['news/(:any)'] = 'news/view/$1';
    $route['news'] = 'news';
    $route['(:any)'] = 'pages/view/$1';
    $route['default_controller'] = 'pages/view';

ブラウザであなたのドキュメントルートに行き、そのあとに index.php/news にアクセスしてニュースページを見てみてください。


