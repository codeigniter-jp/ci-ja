##############
Email ヘルパー
##############

Email ヘルパーは Email 処理を支援する関数を提供します。より堅牢な
Email の処理方法については CodeIgniter の :doc:`Email クラス
<../libraries/email>` を参照してください。



ヘルパーのロード
================

このヘルパーは次のコードを使ってロードします:


::

	$this->load->helper('email');



次の関数が利用できます:



valid_email(' email ')
======================

email が正しい形式のアドレスかどうかチェックします。 このとき、実際に
そのアドレスにメールが届くかどうかではなく、単にアドレスが正しい形式か
どうかを検証するのみであることに注意してください。

戻り値は TRUE/FALSE です。

::

	 $this->load->helper('email');
	
	if (valid_email('email@somesite.com'))
	{
	    echo 'email is valid';
	}
	else
	{
	    echo 'email is not valid';
	}



send_email(' recipient ', ' subject ', ' message ')
===================================================

PHP の `mail() <http://www.php.net/function.mail>`_
関数を使ってメールを送信します。
より堅牢なメールの処理方法については、CodeIgniter の :doc:`Email
クラス <../libraries/email>` を参照してください。

