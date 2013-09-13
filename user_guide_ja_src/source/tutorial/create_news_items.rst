#################
ニュース記事作成
#################

あなたはCodeIgniterを使ってデータベースからデータを読み出す方法を学びましたが、
まだデータベースに何も情報を書き込む事をしていません。
この章ではnewsコントローラと以前作ったモデルを拡張し、書き込み機能を追加していきます。

フォーム作成
-------------

データベースにデータを入力するには、情報を入力するためのフォームを作成しなければいけません。
フォームには「題名」と「本文」を入力するための２つのフィールドが必要です。slugは題名を元にモデル内で生成します。
application/views/news/create.php に新しいビューを作成してください。

::

    <h2>Create a news item</h2>

    <?php echo validation_errors(); ?>

    <?php echo form_open('news/create') ?>

        <label for="title">Title</label> 
        <input type="input" name="title" /><br />

        <label for="text">Text</label>
        <textarea name="text"></textarea><br />

        <input type="submit" name="submit" value="Create news item" /> 

    </form>

この中で見慣れないものが２つあると思います： form_open() 関数と validation_errors() 関数です。

最初の関数は `formヘルパー <../helpers/form_helper.html>`_ によって提供されており、form要素を描画すると共に、
 `CSRF保護フィールド <../libraries/security.html>`_ のような追加の機能も利用可能になります。
２つ目の関数はフォームバリデーションに関するエラーを出力するためのものです。

ではnewsコントローラに戻ってください。ここで２つの事を行ないます：フォームが送信されたのかを確認する事と、
送信されたデータがバリデーションのルールを満たすかどうか確認する事です。
これをするには `form validation <../libraries/form_validation.html>`_ ライブラリを使用します。

::

    public function create()
    {
        $this->load->helper('form');
        $this->load->library('form_validation');
        
        $data['title'] = 'Create a news item';
        
        $this->form_validation->set_rules('title', 'Title', 'required');
        $this->form_validation->set_rules('text', 'text', 'required');
        
        if ($this->form_validation->run() === FALSE)
        {
            $this->load->view('templates/header', $data);   
            $this->load->view('news/create');
            $this->load->view('templates/footer');
            
        }
        else
        {
            $this->news_model->set_news();
            $this->load->view('news/success');
        }
    }

上記のコードは様々な処理を追加します。まず最初の数行でformヘルパーとform validationライブラリをロードします。
次に、フォームバリデーションのルールが定義されます。set\_rules()メソッドには３つの引数が渡されます；
入力フィールドの名前、エラーメッセージに使用される名前、そして実際のルール。
この例ではtitleとtextフィールドは必須(required)とします。

CodeIgniterには上記のような強力なフォームバリデーションのライブラリが備わっています。
`このライブラリについてはここで詳細を知ることができます <../libraries/form_validation.html>`_　。

コードの続きを見ていくと、フォームバリデーションが正しく行なわれたかの条件分岐があります。
もし不正だった場合はフォームのページが表示され、送信されて **尚かつ** 全てのルールを通過した場合はモデルが呼ばれます。
この後、成功時メッセージを表示するビューがロードされます。
application/view/news/success.php にビューを作成し、成功時メッセージを書いてください。

モデル
-----

残るはデータベースにデータを書き込むメソッドを実装する事です。
これにはActive Recordsクラスを使用してデータを挿入し、inputライブラリを使用してpostされてきたデータを取得します。
以前作成したモデルを開き、次のコードを追記してください：

::

    public function set_news()
    {
        $this->load->helper('url');
        
        $slug = url_title($this->input->post('title'), 'dash', TRUE);
        
        $data = array(
            'title' => $this->input->post('title'),
            'slug' => $slug,
            'text' => $this->input->post('text')
        );
        
        return $this->db->insert('news', $data);
    }

このメソッドはデータベースにニュース記事を挿入してくれます。3行目にはurl\_title()という新しい関数があります。
 `URLヘルパー <../helpers/url_helper.html>`_ によって提供されるこの関数は、渡した文字列を解析し、
空白スペースを全てハイフン(-)に置換して全文字を小文字にしてくれます。
残るのはURIを生成するのにぴったりの綺麗なslugです。

続けて、$data配列内に実際に挿入されるレコードを準備しましょう。
それぞれの要素は以前作成したデータベースのカラムと対応しています。
ここで post() という  `inputライブラリ <../libraries/input.html>`_ の新しいメソッドに気づくと思います。
このメソッドはあなたのデータが正しくサニタイズされるようにして、悪意のある外部攻撃からあなたを守ってくれます。
inputライブラリはデフォルトで読み込まれるライブラリです。
最後に$data配列をデータベースに挿入しておしまいです。

ルーティング
-------

CodeIgniterアプリケーションにニュース記事を追加し始められる前に、config/routes.php に新しいルールを追加しなければいけません。
あなたのファイルに下記が追加されている事を確認してください。
これによりCodeIgniterがcreateメソッドをニュース記事のslugではなく、独自のメソッドである事を保証します。

::

    $route['news/create'] = 'news/create';
    $route['news/(:any)'] = 'news/view/$1';
    $route['news'] = 'news';
    $route['(:any)'] = 'pages/view/$1';
    $route['default_controller'] = 'pages/view';

ではブラウザ上であなたのCodeIgniterの開発環境を開き、URLに index.php/news/create を追加してみてください。
おめでとうございます、これであなたは初めてのCodeIgniterアプリケーションを完成させました！
いくつかニュースを追加してみて、それぞれのページを確認してみてください。

