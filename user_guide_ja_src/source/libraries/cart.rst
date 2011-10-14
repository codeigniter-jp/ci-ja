########################
ショッピングカートクラス
########################

カートクラスを使うと、ユーザがサイトを閲覧中に有効なセッションに、商品
を追加できます。 これらの商品は、カートから読みだすことができ、ユーザ
が数量を変更したり、カートから商品を削除したりできる、よくある
"ショッピングカート" の体裁に表示させることができます。

カートクラスは、"カート"のコアの機能「だけ」を提供するものであることに
注意してください。出荷、クレジットカードの有効性確認やその他の処理コン
ポーネントは提供しません。



ショッピングカートクラスを初期化する
====================================

重要: カートクラスは、データベースに情報を保存するために CodeIgniter
の :doc:`セッションクラス <sessions>`
を利用しますので、カートクラスを利用する前に、 :doc:`セッションの説明
<sessions>` で示しているように、データベーステーブルをセットアップする
必要があります。 また、データベースを利用するために、
application/config/config.php
ファイルのセッションの設定項目を設定してください。

ショッピングカートクラスをコントローラのコンストラクタで初期化するには
、 $this->load->library メソッドを利用します:


::

	$this->load->library('cart');


ロードされると、カートオブジェクトが利用可能になります: $this->cart

.. note:: カートクラスは、セッションクラスを自動的に読み込んで初期化します。アプリケーションの中で、セッションをまだどこでも使っていなかったとし
ても、セッションクラスをロードする必要はありません。



カートに商品を追加する
======================

ショッピングカートに商品を追加するには、下記のように
$this->cart->insert() メソッドに、商品情報の配列を渡すだけです:


::

	
	$data = array(
	               'id'      => 'sku_123ABC',
	               'qty'     => 1,
	               'price'   => 39.95,
	               'name'    => 'T-Shirt',
	               'options' => array('Size' => 'L', 'Color' => 'Red')
	            );
	
	
	$this->cart->insert($data);
	


重要: 上記の最初の4つのインデックス( id , qty , price , および name )
は 必須 です. ひとつでも省略した場合は、データはカートに保存されません
。5番目のインデックス ( options ) は、任意の項目です。 この項目は、そ
の商品に関連するオプションがある場合に使われるのを想定しています。上で
示されているように、options には、配列を使用してください。

5つの既定のインデックスは次のとおりです:


-  id - 店舗の各商品は、一意識別子を持っている必要があります。一般的に
   は、"sku" や、その他の識別子になります。
-  qty - 購入する数量。
-  price - 商品の価格。
-  name - 商品の名前。
-  options - 商品を識別するために必要なその他のすべての属性。これらは、
   配列として渡す必要があります。


上の5つのインデックスに加え、2つの予約語: rowid と subtotal
があります。これらは、カートクラスの内部で使用されます。 それらの語を
カートにデータを追加する際のインデックス名には使用しないでください。

配列には、追加のデータを含むことができます。配列に追加したどんなデータ
も、セッションに保存されます。とはいえ、 表にしたときに情報を表示しや
すいよう、すべての商品で使われるデータを標準化するのが、一番良い方法で
す。



カートに複数の商品を追加する
============================

下記に示したように、多次元配列を使うことによって、一度のアクションで複
数の商品をカートに追加することができます。
これは、同じページの中で、複数の商品を選ばせたいときなどに有用です。


::

	
	$data = array(
	
	               array(
	                       'id'      => 'sku_123ABC',
	                       'qty'     => 1,
	                       'price'   => 39.95,
	                       'name'    => 'T-Shirt',
	                       'options' => array('Size' => 'L', 'Color' => 'Red')
	                    ),
	
	               array(
	                       'id'      => 'sku_567ZYX',
	                       'qty'     => 1,
	                       'price'   => 9.95,
	                       'name'    => 'Coffee Mug'
	                    ),
	
	               array(
	                       'id'      => 'sku_965QRS',
	                       'qty'     => 1,
	                       'price'   => 29.95,
	                       'name'    => 'Shot Glass'
	                    )
	
	            );
	
	
	$this->cart->insert($data);
	




カートを表示する
================

カートを表示するには、下のようなコードの :doc:`ビューファイル
<../general/views>` を作成します。

この例では、 :doc:`フォームヘルパー <../helpers/form_helper>`
を利用しているのを注意してください。


::

	
	<?php echo form_open('path/to/controller/update/function'); ?>
	
	<table cellpadding="6" cellspacing="1" style="width:100%" border="0">
	
	<tr>
	  <th>数量</th>
	  <th>商品説明</th>
	  <th style="text-align:right">価格</th>
	  <th style="text-align:right">小計</th>
	</tr>
	
	<?php $i = 1; ?>
	
	<?php foreach ($this->cart->contents() as $items): ?>
	
		<?php echo form_hidden($i.'[rowid]', $items['rowid']); ?>
	
		<tr>
		  <td><?php echo form_input(array('name' => $i.'[qty]', 'value' => $items['qty'], 'maxlength' => '3', 'size' => '5')); ?></td>
		  <td>
			<?php echo $items['name']; ?>
	
				<?php if ($this->cart->has_options($items['rowid']) == TRUE): ?>
	
					<p>
						<?php foreach ($this->cart->product_options($items['rowid']) as $option_name => $option_value): ?>
	
							<strong><?php echo $option_name; ?>:</strong> <?php echo $option_value; ?><br />
	
						<?php endforeach; ?>
					</p>
	
				<?php endif; ?>
	
		 </td>
		 <td style="text-align:right"><?php echo $this->cart->format_number($items['price']); ?></td>
		 <td style="text-align:right">$<?php echo $this->cart->format_number($items['subtotal']); ?></td>
		</tr>
	
	<?php $i++; ?>
	
	<?php endforeach; ?>
	
	<tr>
	 <td colspan="2"> </td>
	 <td class="right"><strong>Total</strong></td>
	 <td class="right">$<?php echo $this->cart->format_number($this->cart->total()); ?></td>
	</tr>
	
	</table>
	
	<p><?php echo form_submit('', 'カートを更新する'); ?></p>




カートを更新する
================

カートの情報を更新するには、 Row ID と数量を含む配列を
$this->cart->update() メソッドに渡す必要があります:

.. note:: 数量をゼロにセットした場合、その商品は、カートから削除されます。

::

	
	$data = array(
	               'rowid' => 'b99ccdf16028f015540f341130b6d8ec',
	               'qty'   => 3
	            );
	
	
	$this->cart->update($data);
	
	// または、多次元配列
	$data = array(
	
	               array(
	                       'rowid'   => 'b99ccdf16028f015540f341130b6d8ec',
	                       'qty'     => 3
	                    ),
	
	               array(
	                       'rowid'   => 'xw82g9q3r495893iajdh473990rikw23',
	                       'qty'     => 4
	                    ),
	
	               array(
	                       'rowid'   => 'fh4kdkkkaoe30njgoe92rkdkkobec333',
	                       'qty'     => 2
	                    )
	
	            );
	
	
	$this->cart->update($data);
	
	
	
	


Row ID とは? row ID は、商品がカートに追加される際に、カートのコードで
生成される一意識別子です。 一意識別子が生成される理由は、異なるオプシ
ョンを持つ同一の商品をカートで管理できるようにするためです。

たとえば、ある人が、サイズが異なる以外は同じ、2つのTシャツ(同じ商品 ID
)を購入するとするとします。 商品 ID (およびその他の属性)は、同一のシャ
ツなので、2つのサイズのシャツは同じものです。違うのはサイズだけです。 2
つのサイズのシャツを別々に取り扱うことができるよう、カートは、この違い
を識別する方法を持っていなければなりません。カートは、一意の "row ID"
を商品 ID と関連するオプションを元に生成することで、違いを識別します。

ほとんどの場合、カートが更新されるのは、"カートの中身"
のようなページでユーザが操作する事によってなされますので、
開発者のように、 "row ID" の事をいつも考慮しなければならないというよう
なことは、考えられません。ですので、"カートの中身"
のページにこの情報を隠しフォームフィールドで確実に保管させ、
更新フォームが送信されたときに、それを確実に update メソッドに渡すよう
にしてください。より多くの情報を得るために、上の"カートの中身"
のページの作成を試してみてください。






メソッドリファレンス
####################



$this->cart->insert();
======================

上で概要を述べたように、ショッピングカートに商品を追加します。



$this->cart->update();
======================

上で概要を述べたように、ショッピングカートの商品を更新します。



$this->cart->total();
=====================

カートの合計金額を表示します。



$this->cart->total_items();
===========================

カートの商品の品目数の合計を表示します。



$this->cart->contents();
========================

カート内のすべてを含む配列を返します。



$this->cart->has_options(rowid);
================================

カートの特定の行がオプションを含んでいる場合に TRUE (ブール値)
を返します。このメソッドは、 rowid を渡す必要があるので、
カートを表示する の例で示すように、ループの中で、
$this->cart->contents() と一緒に使われるのを想定しています。



$this->cart->product_options(rowid);
====================================

特定の商品のオプションの配列を返します。このメソッドは、 rowid
を渡す必要があるので、 カートを表示する
の例で示すように、ループの中で、 $this->cart->contents()
と一緒に使われるのを想定しています。



$this->cart->destroy();
=======================

カートを破棄します。このメソッドは、顧客の注文が完了した際などに呼ばれ
ます。

