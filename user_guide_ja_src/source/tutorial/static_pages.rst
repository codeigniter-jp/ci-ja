############
静的ページ
############

**注意:** 
このチュートリアルは、あなたが既にCodeIgniterをダウンロードし、開発環境に `フレームワークをインストール <../installation/index.html>`_ 
している事を前提としています。

まず最初に行なうのは静的ページを制御するための **コントローラ** を用意することです。

例えば、``http://example.com/news/latest/10`` がコールされた時、
我々は"news"という名前のコントローラがあるのだと推測します。呼ばれるメソッドは"latest"となります。
newsメソッドの仕事は、10件のニュース記事を取ってきてページ上に描画することかもしれません。
MVCでは非常に頻繁にこのようなURLのパターンが見られます：
``http://example.com/[controller-class]/[controller-method]/[arguments]``
URLスキームが複雑化するにつれてこのパターンは変化するかもしれません。
しかし、一旦はこれを知っていれば十分です。

application/controllers/pages.php　に、下記のコードを記述したファイルを作成してください。

::

    <?php 
    class Pages extends CI_Controller { 

        public function view($page == 'home') 
        {
	
        }
		 
    }

あなたは "pages" という名のクラスを作り、そこに引数$pageを取る viewメソッドを作成しました。
このpageクラスはCI_Controllerクラスを継承しています。すなわち、新しく作られたこのpagesクラスは
CI_Controllerクラス(system/core/Controller.php)に定義されたメソッドや変数をアクセスする事が出来るという事です。

**コントローラはあなたのアプリケーションの全てのリクエストの中心となる部分です。**
CodeIgniterの非常に専門的な議論において、これは *スーパーオブジェクト* と呼ばれる事があります。
一般的なPHPクラスと同じように、コントローラ内では$thisという変数でこれを参照します。
$thisを参照する事によってライブラリやビューをロードしたり、フレームワークの基本的な制御を行ないます。

最初のメソッドを作成したら、次は基本的なページテンプレートを作っていきましょう。
まずは二つの"ビュー"(ページテンプレート)を作り、それらをページのフッターとヘッダーとします。

application/views/templates/header.php にヘッダーを作成し、下記のコードを記述してください。

::

    <html>
        <head>
            <title><?php echo $title ?> - CodeIgniter 2 Tutorial</title>
        </head>
        <body>

            <h1>CodeIgniter 2 Tutorial<h1>

ヘッダーにはメインのビューをロードする前に表示させたい単純なHTMLコードが見出しと共に含まれています。
ここで後々コントローラにて定義する$title変数を出力させる事にもなります。
では次は application/views/templates/footer.php にフッターを作成し、下記のコードを記述してください。

::

            <em>&copy; 2011</em>
        </body>
    <html>

コントローラにロジックを追加
------------------------------

先ほどあなたはview()メソッドを持ったコントローラを準備しました。
このメソッドは、ロードするページの名前になる引数を取ります。
静的なページテンプレートは application/views/pages/ に配置されます。

そのディレクトリ内に home.php と about.php という二つのファイルを作ってください。
それらのファイルの中に、何かしらの文言（あなたがご自由に決めてください）を入力し、保存します。
もし特に思い浮かばなければ、"Hello World!"などを入れてみてください。

これらのページをロードするためには、まずそのページが存在するかどうかをチェックしなければなりません：

::

    <?php 
    public function view($page = 'home')
    {
                
        if ( ! file_exists('application/views/pages/'.$page.'.php'))
        {
            // Whoops, we don't have a page for that!
            show_404();
        }
        
        $data['title'] = ucfirst($page); // Capitalize the first letter
        
        $this->load->view('templates/header', $data);
        $this->load->view('pages/'.$page, $data);
        $this->load->view('templates/footer', $data);

    }

ページが存在する場合、それはヘッダーとフッターと共にロードされユーザーに表示されます。
もしページが存在しなければ、"404 Page not found"エラーが表示されます。

このメソッドの一行目ではまずページが存在するかどうかをチェックしています。
PHPのネイティブなfile\_exists()関数がファイルの存在有無を判別するために使用されています。
show\_404()はCodeIgniterのビルトイン関数で、デフォルトのエラーページを描画してくれます。

ヘッダーテンプレートの中で、$title変数はページの題名をカスタマイズするために使われました。
題名はこのメソッド内で定義されていますが、値を変数に代入するのではなく、$data配列のtitle要素に代入されます。

最後にしなければいけないのは、ビューを表示順にロードしてくことです。
view()メソッドの第に引数はビューに値を引き渡すために使われます。
$data配列のそれぞれの値はキーを変数名とした変数に代入されます。
つまり、コントローラ内の$data['title']は、ビュー内の$titleと同等です。

ルーティング
-------

これであなたのコントローラは稼働しています！ブラウザ上で　[your-site-url]index.php/pages/view　にアクセスしてみてください。
index.php/pages/view/about　にアクセスすれば、ヘッダーとフッターを含んだaboutページが見えるはずです。

独自のルーティング規則を使い、あなたはどんなURIでも好きなコントローラの好きなメソッドにマッピングする事ができ、
下記の平凡な慣習から自由になることができます：
``http://example.com/[controller-class]/[controller-method]/[arguments]``

実際にやってみましょう。application/config/routes.php に配置されているルーティングファイルを開き、
次の二行を追記してください。
そして$route配列に要素を追加している他のすべてのコードを削除してください。

::

    $route['default_controller'] = 'pages/view';
    $route['(:any)'] = 'pages/view/$1';

CodeIgniterはルーティング規則を上から下に解析していき、マッチした最初の規則にリクエストをルーティングします。
それぞれの規則は正規表現（左辺）がスラッシュ区切りのコントローラとメソッド（右辺）にマッピングされた形で記述されています。
リクエストが入ってくるとCodeIgniterは一番最初のマッチを探し、適切なコントローラとメソッドを必要に応じて引数付きで呼び出します。

ルーティングについてはURIルーティングの`ドキュメント  <../general/routing.html>`_ を参照してください。

この例では、$route配列の二番目の規則は**どんな**リクエストでもワイルドカード文字列(:any)を使ってマッチします。
そして、それをpagesクラスのviewメソッドに引数として渡します。

では、 index.php/about にアクセスしてみてください。
正しくpagesコントローラのview()メソッドにルーティングされましたか？
素晴らしい！

