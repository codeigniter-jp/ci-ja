日本語言語パック All in One パッケージ (CodeIgniter 2.0.3)

2011/09/05 日本 CodeIgniter ユーザ会 <http://codeigniter.jp/>


日本語言語パック All in One パッケージは、CodeIgniter と日本語言語パックを
まとめたパッケージです。

日本語言語パックは CodeIgniter を日本語化するものですが、日本 CodeIgniter 
ユーザ会が独自に作成した非公式なパッケージです。CodeIgniter の開発元の 
EllisLab とは無関係です。


■日本語言語パックでの変更点
* 言語ファイル
** japanese を追加し、デフォルトの言語設定を日本語に

* config/user_agents.php
** 日本の携帯端末の定義を追加 (Kuniharu Tsujioka contributed)

* Email クラス
** message メソッドで、iso-2022-jp の場合は stripslashes しないように変更

* Cart クラス
** 商品名の正規表現で日本語が使えるように変更  

* HTML
* Welcome ページを日本語に
** meta タグでの charset の指定を追加 (titleタグの前に)


■ライセンス
オリジナルの CodeIgniter は、CodeIgniter ライセンスです。
日本語言語パックは、修正 BSD ライセンスです。
詳細は、copyright.txt をご覧ください。


■謝辞
CodeIgniter がなければ、この日本語言語パックは誕生しませんでした。
Rick Ellis と EllisLab の開発チーム、Reactor エンジニアに感謝します。
