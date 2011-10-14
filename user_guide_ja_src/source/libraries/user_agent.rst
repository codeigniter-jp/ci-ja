########################
ユーザエージェントクラス
########################

ユーザエージェントクラスには、サイトを訪問したブラウザや携帯機器あるい
は検索エンジンのロボットに関する情報を識別するのに役立つメソッドが備わ
っています。 さらに、言語やサポートされる文字セットに関する情報も取得
することができます。



クラスの初期化
==============

CodeIgniterの大部分のクラスと同様に、ユーザエージェントクラスは、コン
トローラで $this->load->library メソッドを使って初期化します:


::

	$this->load->library('user_agent');


一度初期化されると、そのオブジェクトは次のようにして利用できます:
$this->agent



User Agent の定義
=================

ユーザエージェントの名前の定義は、次の設定ファイルにあります:
application/config/user_agents.php 。
必要であれば、様々なユーザエージェントの配列を項目に追加できます。



例
==

ユーザエージェントクラスが初期化されるとき、サイトを閲覧しているブラウ
ザや携帯機器あるいは検索エンジンのロボットの特定が行われます。
また、取得可能であれば、プラットフォームの情報も収集します。


::

	
	$this->load->library('user_agent');
	
	if ($this->agent->is_browser())
	{
	    $agent = $this->agent->browser().' '.$this->agent->version();
	}
	elseif ($this->agent->is_robot())
	{
	    $agent = $this->agent->robot();
	}
	elseif ($this->agent->is_mobile())
	{
	    $agent = $this->agent->mobile();
	}
	else
	{
	    $agent = 'Unidentified User Agent';
	}
	
	echo $agent;
	
	echo $this->agent->platform(); // プラットフォーム情報 (Windows、Linux、Mac、など)




メソッドリファレンス
####################



$this->agent->is_browser()
==========================

ユーザエージェントのブラウザが既知のものかどうかに応じてTRUE/FALSE
(ブール値) を返します。


::

	 if ($this->agent->is_browser('Safari'))
	{
	    echo 'You are using Safari.';
	}
	else if ($this->agent->is_browser())
	{
	    echo 'You are using a browser.';
	}


.. note:: この例での "Safari"という文字列は、ブラウザを定義するリストのキー値です。 このリストは
application/config/user_agents.php で定義されており、新しいブラウザを
追加したり文字列を変更することができます。



$this->agent->is_mobile()
=========================

ユーザエージェントの携帯機器が既知のものかどうかに応じてTRUE/FALSE
(ブール値) を返します。


::

	 if ($this->agent->is_mobile('iphone'))
	{
	    $this->load->view('iphone/home');
	}
	else if ($this->agent->is_mobile())
	{
	    $this->load->view('mobile/home');
	}
	else
	{
	    $this->load->view('web/home');
	}




$this->agent->is_robot()
========================

ユーザエージェントのロボット(クローラ)が既知のものかどうかに応じてTRUE
/FALSE (ブール値) を返します。

.. note:: ユーザエージェントライブラリにはもっとも一般的なロボットしか定義されていません。 完全なロボットのリストではありません。何百ものロボッ
トがあるので、それぞれを調べるのは効率がよくありません。
リストにないロボットがいつもサイトを訪問するのがわかった場合は、
application/config/user_agents.php
ファイルにそれを追加することができます。



$this->agent->is_referral()
===========================

ユーザエージェントが、他のサイトから参照してきたかどうかを TRUE/FALSE
(ブール値) で返します。



$this->agent->browser()
=======================

サイトを閲覧しているブラウザの名前をあらわす文字列を返します。



$this->agent->version()
=======================

サイトを閲覧しているブラウザのバージョン番号をあらわす文字列を返します
。



$this->agent->mobile()
======================

サイトを閲覧している携帯機器をあらわす文字列を返します。



$this->agent->robot()
=====================

サイトを閲覧している検索エンジンのロボット(クローラ)の名前をあらわす文
字列を返します。



$this->agent->platform()
========================

サイトを閲覧しているプラットフォーム (Linux、Windows、OS X など)
をあらわす文字列を返します。



$this->agent->referrer()
========================

ユーザエージェントが他のサイトから参照していた場合の参照元。通常は、次
のようにテストします:


::

	 if ($this->agent->is_referral())
	{
	    echo $this->agent->referrer();
	}




$this->agent->agent_string()
============================

ユーザエージェントの完全な文字列を返します。
通常は以下のようになります:


::

	Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-US; rv:1.8.0.4) Gecko/20060613 Camino/1.0.2




$this->agent->accept_lang()
===========================

ユーザエージェントで特定の言語が使えるかを判断します。例:


::

	if ($this->agent->accept_lang('en'))
	{
	    echo 'You accept English!';
	}


.. note:: 平均的には、ブラウザは言語の情報を提供していますが、 そうしないブラウザがいくつかあるので、このメソッドは、普通はそれほど信頼性があり
ません。常に正確であるとは限りません。



$this->agent->accept_charset()
==============================

ユーザエージェントで特定の文字セットが使えるかを判断します。例:


::

	if ($this->agent->accept_charset('utf-8'))
	{
	    echo 'お使いのブラウザは、UTF-8 に対応しています!';
	}


.. note:: 平均的には、ブラウザは文字セットの情報を提供していますが、 そうしないブラウザがいくつかあるので、このメソッドは、普通はそれほど信頼性
がありません。常に正確であるとは限りません。

