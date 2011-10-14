#################################
フック - フレームワークコアの拡張
#################################

CodeIgniter のフック機能は、コアのファイルをハックすることなく、フレー
ムワークの内部動作に関連付けて、その動作を変更する手段を提供します。
CodeIgniter は、 :doc:`アプリケーションフローチャート
<../overview/appflow>`
のページで図示したような特定の実行プロセスに従って動きます。 しかし、
この実行プロセスのどこかの段階で、何かの処理を行いたい場合があるかもし
れません。 たとえば、コントローラがロードされる直前あるいは直後に、あ
るスクリプトを実行したい場合、 あるいは、他のどこかの段階でユーザ作成
のスクリプトを起動したい場合などです。



フックの有効化
==============

application/config/config.php ファイルの次の設定項目をセットして、フッ
ク機能をアプリケーション全体で有効/無効に設定できます:


::

	$config['enable_hooks'] = TRUE;




フックの定義
============

フックは application/config/hooks.php
ファイルで定義します。各フックは次の例のような配列として指定されます:


::

	
	$hook['pre_controller'] = array(
	                                'class'    => 'MyClass',
	                                'function' => 'Myfunction',
	                                'filename' => 'Myclass.php',
	                                'filepath' => 'hooks',
	                                'params'   => array('beer', 'wine', 'snacks')
	                                );


Notes:
配列の添字は、利用したいフックポイントの名前になります。上の例では、フ
ックポイントは pre_controller
になります。フックポイントのリストは下の方をご覧ください。
フックを定義する連想配列で、次の項目を定義する必要があります:


-  class 呼び出したいクラスの名前。クラスの代わりに手続き型の関数を使い
   たい場合は、空のままにしておきます。
-  function 呼び出したいメソッド名 (関数名)。
-  filename クラス/メソッド(関数)が含まれるファイル名。
-  filepath スクリプトが含まれるディレクトリ名。Note: スクリプトは、
   application フォルダの中にあるディレクトリに置く必要があり、パスは、
   application フォルダからの相対パスになります。たとえばスクリプトが
   application/hooks にあるとき、単に hooks
   が指定すべきファイルパスになります。スクリプトが
   application/hooks/utilities にあるときは、 hooks/utilities をファイル
   パスとして用います。末尾にスラッシュをつけないようにしてください。
-  params スクリプトに渡したい全パラメータ。この項目はオプションです。




同一フックでの複数呼び出し
==========================

ひとつ以上のスクリプトを同じフックポイントで使いたい場合は、次のように
、単純に、配列の宣言を多次元にします:


::

	
	$hook['pre_controller'][] = array(
	                                'class'    => 'MyClass',
	                                'function' => 'Myfunction',
	                                'filename' => 'Myclass.php',
	                                'filepath' => 'hooks',
	                                'params'   => array('beer', 'wine', 'snacks')
	                                );
	
	$hook['pre_controller'][] = array(
	                                'class'    => 'MyOtherClass',
	                                'function' => 'MyOtherfunction',
	                                'filename' => 'Myotherclass.php',
	                                'filepath' => 'hooks',
	                                'params'   => array('red', 'yellow', 'blue')
	                                );


各配列の後ろにブラケットを忘れないよう留意してください:


::

	$hook['pre_controller'][]


このようにすると、複数スクリプトを同一フックで利用できます。配列を定義
した順が実行の順序になります。



フックポイント
==============

以下は、利用できるフックポイントのリストです。


-  pre_system システムの実行の最初に呼ばれます。この時点では、ベンチマ
   ークとフッククラスだけがロードされます。他の処理へのルーティングはまだ
   発生しません。
-  pre_controller コントローラが呼ばれる直前に呼ばれます。すべて基本ク
   ラスのロード、ルーティング、そしてセキュリティチェックが終わっています
   。
-  post_controller_constructor コントローラがインスタンス化された直後で
   、メソッドの呼び出しが起こる前に呼ばれます。
-  post_controller コントローラが完全に実行された直後に呼ばれます。
-  display_override システムが実行の最後で、処理が終わったページをブラ
   ウザに送信するのに使う _display() メソッドをオーバーライドします。
   これにより、独自の表示方法が利用できます。処理済みのデータは、
   $this->output->get_output()
   を呼べば利用可能ですので、留意しておいてください。
-  cache_override 出力クラスの _display_cache() メソッドの代わりに、独
   自のメソッドを呼び出すことができます。これにより、独自のキャッシュメカ
   ニズムを利用することができます。
-  post_system 最終のレンダリング後のページがブラウザに送信された後、つ
   まり、ブラウザに処理済みデータが送信されたあとで、システムの実行が終わ
   る時に呼ばれます。


