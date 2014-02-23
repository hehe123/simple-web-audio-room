simple-web-audio-room
=====================

接下来会是一个系列的讲解如何搭建一个简单的web 语音聊天环境.
里面会用到诸如 webSocket, audioAPI, mediaCapture 等等与audio有关的技术.
注意: 该解决方案的音频篇, 来自于 <a href="https://github.com/mattdiamond/Recorderjs">mattdiamond  Recorder.js (相当牛逼的一个家伙)</a>, 采用的类似的wmv 的音频解决方案(这个是开源了的, 相当不错. 而mp3的解决方案我们在实际产品中也看了, 太过复杂暂且不表)
当前如果是输入, 必须得支持media capture的浏览器才可以. 输出的话, 简单版先提供 audio api. 兼容版则采用 audio tag 与 audio api 通过支持识别的方式提供, 这样, 至少可以做到兼容大部分的现代浏览器了. (audio api 暂时只支持到 FF, Chrome)

开篇会有简单的demo来说明:
1. audioSender.html  -- 这个是输入篇, 只管输入, 不管输出.
2. audioReceiver.html --这个是输出篇, 只管输出, 不管输入.
