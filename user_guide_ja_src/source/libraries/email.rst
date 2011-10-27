############
Email クラス
############

CodeIgniter の堅牢な Email クラスは、次のような機能に対応しています:

-  複数プロトコル: メール、Sendmail、および SMTP
-  SMTP の TLS および SSL の暗号化
-  複数の受取人
-  CC と BCC
-  HTML または プレーンテキスト email
-  添付
-  ワードラップ
-  優先度
-  BCC バッチモード。これは、大きなメールリストを小さな BCC
   バッチに分割します。
-  Email デバッグツール

Email の送信
============

メールの送信は単純なだけでなく、送信する直前にも設定ファイルでも、メー
ル送信の設定ができます。

以下は、どうやってメールを送信できるかを示した基本的な例です。 Note:
この例では、 :doc:`コントローラ <../general/controllers>`
でメールを送信すると仮定しています。

::

	$this->load->library('email');
	
	$this->email->from('your@example.com', 'Your Name');
	$this->email->to('someone@example.com'); 
	$this->email->cc('another@another-example.com'); 
	$this->email->bcc('them@their-example.com'); 
	
	$this->email->subject('Email Test');
	$this->email->message('Testing the email class.');	
	
	$this->email->send();
	
	echo $this->email->print_debugger();

Email のオプションを設定する
============================

メールの送信方法をカスタマイズできる17の設定項目が利用可能です。
 以下で述べるように手動で設定することもできますし、
後述するように、設定ファイルに保管された項目から自動設定する
こともできます:

設定項目は、email クラスの initialize メソッドに設定項目の配列を渡すこ
とでセットすることができます。以下は、設定項目をどのようにセットできる
かの例です::

	$config['protocol'] = 'sendmail';
	$config['mailpath'] = '/usr/sbin/sendmail';
	$config['charset'] = 'iso-8859-1';
	$config['wordwrap'] = TRUE;
	
	$this->email->initialize($config);

.. note:: ほとんどの設定項目には、設定しなかった場合に使われる
初期値があります。

設定ファイルでEmailの設定を行う
-------------------------------

設定をするのに、上で述べた方法を使いたくない場合は、代わりに設定ファイ
ルにその設定を書いておくことができます。 email.php
という名前で新しいファイルをつくり、 $config という配列をそのファイルに書くだけです。そして、 config/email.php
にそのファイルを保存すると、自動的にそれが使われます。
設定ファイルで設定した場合は、 $this->email->initialize()
メソッドを使う必要は「ありません」。

Email クラスの設定項目
======================

次のリストは、メールを送信する際にセットできる設定項目の
全リストです。
  
============== ================== ============================ ============================================================
設定項目       初期値             選択肢                       説明                                               
============== ================== ============================ ============================================================
useragent      CodeIgniter        なし                         ユーザエージェント                                 
protocol       mail               mail、sendmail、 または smtp メールを送信するプロトコル                         
mailpath       /usr/sbin/sendmail なし                         Sendmail へのパス                                  
smtp_host      初期値なし         なし                         SMTP サーバのアドレス                              
smtp_user      初期値なし         なし                         SMTP のユーザ名                                    
smtp_pass      初期値なし         なし                         SMTP のパスワード                                  
smtp_port      25                 なし                         SMTP のポート番号                                  
smtp_timeout   5                  なし                         SMTP のタイムアウト (秒単位)                       
smtp_crypto    初期値なし         tls または ssl               SMTP 暗号化
wordwrap       TRUE               TRUE または FALSE (boolean)  ワードラップの有効化設定                           
wrapchars      76                                              何番目の文字で折り返すか                           
mailtype       text               text または html             メールのタイプ。HTML メールを送信すると、メールは完全な Web 
                                                               ページとして送信されます。このとき、相対リンクや画像への相対  
                                                               パスがないか確かめてください。それらは動作しません。 
charset        utf-8                                           文字セット (utf-8、iso-8859-1、など)               
validate       FALSE              TRUE または FALSE (boolean)  メールアドレスを検証するかどうか                   
priority       3                  1, 2, 3, 4, 5                メールの優先度。 1 = 最高 5 = 最低 3 = 通常        
crlf           \n                 "\r\n" or "\n" or "\r"       改行文字 (RFC 822に従う場合は、"\r\n")             
newline        \\n                "\\r\\n" or "\\n" or "\\r"   改行文字 (RFC 822に従う場合は、"\\r\\n")
bcc_batch_mode FALSE              TRUE または FALSE (boolean)  BCC バッチモードを有効にするかどうか               
bcc_batch_size 200                なし                         各 BCC バッチで送るメール件数。                    
============== ================== ============================ ============================================================ 

Email メソッドリファレンス
==========================

$this->email->from()
--------------------

送信メールアドレスと送信者の名前を設定します::

	$this->email->from('you@example.com', 'あなたの名前');

$this->email->reply_to()
------------------------

返信先アドレスをセットします。指定しない場合は、"from"
メソッドで指定されたものが使われます。例::

	$this->email->reply_to('you@example.com', 'あなたの名前');

$this->email->to()
------------------

受取人のメールアドレスをセットします(複数可)。次のように、単一のメール
アドレス、カンマ区切りのリスト、あるいは配列で指定可能です::

	$this->email->to('someone@example.com');

::

	$this->email->to('one@example.com, two@example.com, three@example.com');

::

	$list = array('one@example.com', 'two@example.com', 'three@example.com');
	
	$this->email->to($list);

$this->email->cc()
------------------

CC のメールアドレスをセットします(複数可)。 "to" メソッドのように、単
一のメールアドレス、カンマ区切りのリスト、あるいは配列で指定可能です。

$this->email->bcc()
-------------------

BCC のメールアドレスをセットします(複数可)。"to" メソッドのように、単
一のメールアドレス、カンマ区切りのリスト、あるいは配列で指定可能です。

$this->email->subject()
-----------------------

メールの件名をセットします::

	$this->email->subject('これは件名です');

$this->email->message()
-----------------------

メールの本文をセットします::

	$this->email->message('これはメッセージです');

$this->email->set_alt_message()
---------------------------------

代替のメール本文をセットします::

	$this->email->set_alt_message('これは代替のメッセージです');

これは、HTML フォーマットのメールを送信する際にオプションで指定できる
メッセージです。 HTML フォーマットでない代替メッセージを指定でき、HTML
メールを受け取らない相手に対して表示するようメールのヘッダに追加します
。 メッセージを指定しない場合は、CodeIgniter は HTML
メールからタグを取り除いて抽出したメッセージをセットします。

$this->email->clear()
---------------------

メールの設定を空状態にします。このメソッドは、
ループの各サイクルでデータをリセットしながら
メール送信機能を使う場合を意図しています。

::

	foreach ($list as $name => $address)
	{
	    $this->email->clear();
	
	    $this->email->to($address);
	    $this->email->from('your@example.com');
	    $this->email->subject('あなたの情報： '.$name);
	    $this->email->message('こんにちは '.$name.'さん ご要望の情報です。');
	    $this->email->send();
	}

次のように引数に TRUE をセットした場合は、すべての添付も解除され
ます::

	$this->email->clear(TRUE);

$this->email->send()
--------------------

メール送信メソッド。 条件判断が利用できるよう、送信が成功したか失敗し
たかに基づいてブール値の TRUE か FALSE が返ります::

	if ( ! $this->email->send())
	{
	    // エラーを生成
	}

$this->email->attach()
----------------------

添付ファイルを送信できます。第1引数にファイルのパスとファイル名を指定
してください。 Note: URL でなく、ファイルの物理パスを使ってください。
複数ファイルを添付する場合は、複数回メソッドを呼んでください。たとえば以下のようにします::

	$this->email->attach('/path/to/photo1.jpg');
	$this->email->attach('/path/to/photo2.jpg');
	$this->email->attach('/path/to/photo3.jpg');
	
	$this->email->send();

$this->email->print_debugger()
-------------------------------

すべてのサーバメッセージ、メールヘッダ、メールメッセージを文字列として
返します。デバッグに役立ちます。

ワードラップ設定の上書き
========================

ワードラップが有効になっている (RFC 822 に従うことを推奨します)場合 、
email に非常に長いリンクがあると折り返されてしまい、受信した人がクリッ
クできないようになります。
CodeIgniter では、次のようにして、メッセージの一部で手動でワードラップ設定を
上書きすることができます::

	通常通り折り返された
	メールのテキスト。
	
	{unwrap}http://example.com/a_long_link_that_should_not_be_wrapped.html{/unwrap}
	
	さらに通常通り折り返
	されたテキスト.


折り返したくない項目を {unwrap} {/unwrap} で挟んでください。