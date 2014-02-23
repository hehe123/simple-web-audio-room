simple-web-audio-room
=====================

接下来会是一个系列的讲解如何搭建一个简单的web 语音聊天环境.<br />
里面会用到诸如 webSocket, audioAPI, mediaCapture 等等与audio有关的技术.<br />
注意: 该解决方案的音频篇, 来自于 <a href="https://github.com/mattdiamond/Recorderjs">mattdiamond  Recorder.js</a>, 采用的wav 的音频解决方案(wav这个解决方案有很多开源而且相当不错的. 而mp3的解决方案我们在实际产品中也使用了, 太过复杂暂且不表)<br />
当前如果是输入, 必须得支持media capture的浏览器才可以. 输出的话, 简单版先提供 audio api. 兼容版则采用 audio tag 与 audio api 通过支持识别的方式提供, 这样, 至少可以做到兼容大部分的现代浏览器了. (audio api 暂时只支持到 FF, Chrome)<br />
<br />
仔细看看, 会有这些需求: <br />
 &nbsp;  &nbsp; webSocket(必须)<br />
 &nbsp;  &nbsp; mediaCapture(getUserMedia, 可选)<br />
 &nbsp;  &nbsp; audioAPI (可选, 因为也可以用audio tag替代, 但是audioAPI的可掌控性要远好于audio tag)<br />
 &nbsp;  &nbsp; webRTC （可选, 他其实是最佳的解决方案, 而且他的效果也会远好过我们最基本的这个audio 解决方案)<br />
 ... <br />
以上这些大家可以在 <a href="http://caniuse.com">can i use</a> 里去看看适应和匹配的浏览器以及其版本<br /> 
 
开篇会有简单的demo来说明:<br />
1. audioSender.html  -- 这个是输入篇, 只管输入, 不管输出.<br />
2. audioReceiver.html --这个是输出篇, 只管输出, 不管输入.<br />

他基于了mattdiamond 的Recorder.js, 最基本的原理就是, 每隔录制一段时间(我这里设置了50ms), 就将得到的完整的wav数据, 通过websocket 发送给server端, 然后server端再分发出去.<br />
而在接收端, 就简单了. 由于收到的都是完整的数据, 所以直接可以通过audioAPI 来完成音频的解析.<br /><br />

注意, 上面确实实现了音频的通信, 而且, 也能够得到一般的效果, 但是, 由于耳朵的灵敏性, 使得我们在收听这些稍微断续(很短, 1ms ~2ms不到的样子) 的声音的时候, 仍然会有些不舒服感. 这是由于我们在调用 audio API时硬件的不断闭合. 这里有个技巧: 我们应该使硬件处于长期打开的状态, 这样可以减少耳朵的不适应感. <br />
当然, 我们仍然有其他的解决方案可以解决上叙的问题. <br />
<br /><br />
<strong>(未完待续...)</strong>