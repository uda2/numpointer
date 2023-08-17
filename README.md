丸数字ポインター
=========

スクショに矢印（数字付き）や矩形（長方形）を描くライブラリです。
imgタグの画像をcanvasに読み込みJSONで指示された内容に加工してからimgに戻していますので問題は起きづらいかと思います。

![使用例](/numpointer_ytools.jpg)

JSONファイル
---------------------------------
丸文字は

    { "id": "《中の英数字》", "x": 《左からの矢印中央のピクセル数》, "y": 《上から矢印中央のピクセル数》, "v": 《矢印の向き》 }

矩形は

    { "x": 《画像左からの矩形左辺のピクセル数》, "y": 《画像上から矩形上辺のピクセル数》, "w": 《矩形の幅》, "h": 《矩形の高さ》 }

丸文字矢印の向きは3時方向を基準に時計回りの角度を数値で入力下さい。矢印が必要無い場合は-1としてください。

[サンプル](https://tools.uda2.com/numpointer/ "サンプル")

手入力でJSONを編集するのはしんどいと思いますのでJSON作成をツール“[丸数字ポインターエディター](https://tools.uda2.com/numpointer.html "丸数字ポインターエディター")”を用意しました。

使い方
---------------------------------
numpointer.js をダウンロードして、HTMLファイルから読み込んで下さい。

    <script src="numpointer.js"></script>

あとは通常通りimgタグで画像を貼り付け、矢印を付けたい画像タグを選んでJSONを指定するだけです。

	new numPointer("《画像のセレクター》",《JSON》,《オプション》);

例えば下記のような感じです。

    <img src="./screenshot.png" id="sample"></div>
    <script>
    new numPointer("#sample",[
    { "id": "A", "x": 216, "y": 220, "v": 135 },
    { "x": 66, "y": 274, "w": 547, "h": 58 }
    ],{"fcolor": "#CC0000"});
    </script>

オプション
---------------------------------
<table>
  <tr>
    <th>オプション</th><th>説明</th>
  </tr>
  <tr>
    <td>fcolor</td><td>文字や線の色（デフォルト：#FC8600）</td>
  </tr>
  <tr>
    <td>bcolor</td><td>フチの色（デフォルト：#FFFFFF）</td>
  </tr>
  <tr>
    <td>lineWidth</td><td>線の幅（デフォルト：4） </td>
  </tr>
  <tr>
    <td>witeWidth</td><td>フチの幅（デフォルト：3） </td>
  </tr>
  <tr>
    <td>font</td><td>文字サイズやフォント（デフォルト：22px 'Arial Black'） </td>
  </tr>
  <tr>
    <td>radius</td><td>丸の半径（デフォルト：15） </td>
  </tr>
  <tr>
    <td>pointerBase</td><td>矢印の底辺（デフォルト：8） </td>
  </tr>
  <tr>
    <td>pointerLength</td><td>矢印の長さ（デフォルト：8） </td>
  </tr>
</table>
