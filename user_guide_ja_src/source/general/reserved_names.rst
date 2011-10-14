##########
予約語一覧
##########

CodeIgniter では実行の際に様々な関数、定数、クラス名を使用します。その
ためすでに定義済みの名称は使用することができません。


コントローラ名
~~~~~~~~~~~~~~

コントローラはメインアプリケーションコントローラを継承するため、 メイ
ンコントローラが扱うメソッド名と同じメソッド名を使うことはできません。
同じ名称にした場合、ローカルクラスで定義されたメソッドの内容で上書きさ
れてしまいます。 以下は予約語の一覧です。コントローラ内では、以下の名
称を使わないようにしましょう。

-  Controller
-  CI_Base
-  _ci_initialize
-  Default
-  index



関数名
~~~~~~


-  is_really_writable()
-  load_class()
-  get_config()
-  config_item()
-  show_error()
-  show_404()
-  log_message()
-  _exception_handler()
-  get_instance()



変数名
~~~~~~


-  $config
-  $mimes
-  $lang



定数名
~~~~~~


-  ENVIRONMENT
-  EXT
-  FCPATH
-  SELF
-  BASEPATH
-  APPPATH
-  CI_VERSION
-  FILE_READ_MODE
-  FILE_WRITE_MODE
-  DIR_READ_MODE
-  DIR_WRITE_MODE
-  FOPEN_READ
-  FOPEN_READ_WRITE
-  FOPEN_WRITE_CREATE_DESTRUCTIVE
-  FOPEN_READ_WRITE_CREATE_DESTRUCTIVE
-  FOPEN_WRITE_CREATE
-  FOPEN_READ_WRITE_CREATE
-  FOPEN_WRITE_CREATE_STRICT
-  FOPEN_READ_WRITE_CREATE_STRICT


