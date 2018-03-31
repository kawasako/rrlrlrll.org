var p = navigator.mediaDevices.getUserMedia({ audio: true, video: true });

var video = document.createElement('video');

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var screenCanvas = document.querySelector('canvas');
var screenCtx = screenCanvas.getContext('2d');

p.then(function(stream) {
  video.src = window.URL.createObjectURL(stream);
  video.onloadedmetadata = function(e) {
    video.play();
    render();
  };
  var str = "悪夢最近さまざまなパターンで取り返しのつかないことになる悪夢をみる。どうも心配性らしく、余計なことを考えているせいかもしれない。書き物公開はしていないけど、最近、ゲームシナリオの創作をするようになった。趣味っぽさある。視力最近、老眼のような症状が出てきた。アクションゲームは頑張って1時間が限界になってしまった。スプラトゥーン2を買ったんだけど、あまり出来ていない。手作りホームページ屋さん個人的にお仕事をもらってやっていた。おかげで多少古い知識が更新された。でもやっぱりCSS書きはあまり向いていないかもしれない。SWとか色々試そうと思ったんだけど、ドメインがSSL対応していなかったので挫折。リリースは少し先。自炊この頃は少しやりはじめた。炊飯器を導入してから半年かかってやっとこさ米5kgを消化するくらいのペース。割と失敗もする。一番最近は、炊き込みご飯に挑戦して失敗した。改善の余地があることはわりと楽しい。酒ビールの次に日本酒が好きになった。辛くないやつがよい。新政をよく飲む。最近は、春鹿の封印酒というやつがとてもよかった。(大吟醸とかなんとかとか よくわかってないけど)イベントッシャ、オラァという気持ちでやっている。これをどう思われるかとか考えはじめると辛いので、その辺は思考停止してやっている。エンジニアと話すのは楽しい。ポッドキャストッシャ、オラァという気持ちで以下略。";
  str = str.split('');
  function render() {
    var scale = 12;
    var videoScale = 0.2;
    var videoWidth = Math.round(video.videoWidth * videoScale);
    var videoHeight = Math.round(video.videoHeight * videoScale);
    canvas.width = videoHeight;
    canvas.height = videoHeight;
    screenCanvas.width = canvas.width * scale;
    screenCanvas.height = canvas.height * scale;
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    var originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var l = canvas.width * canvas.height;
    for (var i = 0; i < l; i++) {
      var r = originalImageData.data[i * 4 + 0];
      var g = originalImageData.data[i * 4 + 1];
      var b = originalImageData.data[i * 4 + 2];
      var a = originalImageData.data[i * 4 + 3];
      var th = 125;
      if (r + g + b < th * 3) {
        var x = i % (canvas.width) * scale;
        var y = Math.ceil(i / canvas.width) * scale;
        // var fontSize = scale * 0.5 + ~~((th * 3 - r - g - b) / (th * 3) * scale * 2);
        var fontSize = ~~((th * 3 - r - g - b) / (th * 3) * scale * 2);
        // var fontSize = scale;
        screenCtx.font = fontSize + 'px serif';
        screenCtx.fillText(str[i % str.length], x, y);
      }
    };
    requestAnimationFrame(render);
  }
});

p.catch(function(e) { console.log(e.name); }); // always check for errors at the end.

