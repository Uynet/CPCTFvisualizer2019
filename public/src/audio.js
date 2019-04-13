//サウンド管理
let source,buffer,gainNode;
class Audio{
  static Init(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.testLowPass = this.context.createBiquadFilter();
    this.testLowPass.type = 'lowpass';
    this.testLowPass.frequency.value = 22050;
    //
    this.testLowPass.type = 'lowpass';
    this.testLowPass.frequency.value = 22050;
    this.BGM = { } 
    this.SE = { }
    this.stack = [];
    this.time = globalTime; 
    this.lastSE;
    this.PlayingBGM = {
      name : null,
      source : null,
    }
  };
  static LoadSE(name){
      return new Promise(resolve => {
          let url = "../resource/SE/" + name + ".wav";
          let req = new XMLHttpRequest();
          // array buffer を指定
          req.responseType = 'arraybuffer';
          req.onreadystatechange = () => {
              if (req.readyState === 4) {
                  if (req.status === 0 || req.status === 200) {
                      // array buffer を audio buffer に変換
                      this.context.decodeAudioData(req.response,
                          (buffer) => {
                          this.SE[name] = buffer
                          });
                          resolve();
                  }
              }
          }
          req.open('GET', url, true);
          req.send('');
      })
  }
  // サウンドを再生
  static LowPassFadeOutBGM(){
    let p = this.testLowPass.frequency.value;
    this.testLowPass.frequency.value= p-(p-440)*0.01;
  }
  static SetPitch(pitch){
    if(this.PlayingBGM.name!==null) this.PlayingBGM.source.playbackRate.value = pitch;
  }
  static StopBGM(){
    if(this.PlayingBGM.name !== null){
      this.PlayingBGM.source.stop();
      this.PlayingBGM = {
        name : null,
        source : null,
      }
    }
  }
  static PlaySE(name,gain,pitch){
    //同じ効果音は同時にならないようにする
    if(globalTime-this.time > 4|| name != this.lastSE){
      this.time = globalTime;
      this.lastSE = name;
      source = this.context.createBufferSource();
      source.buffer = this.SE[name];
      source.connect(this.context.destination);
      source.loop = false; // 再生
      if(!pitch)pitch = 1;
      //pitch *= (1-Math.pow(1-Timer.GetTimeScale(),4));
      source.playbackRate.value = pitch + Rand(0.05);
      gainNode = this.context.createGain();
      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      gainNode.gain.value = 1;
      if(gain) gainNode.gain.value += gain;
      source.start(0);
    }
  };
  static Update(){
    if(this.isFadeout){
      this.LowPassFadeOutBGM();
    }
  };
  static async Load() {
      console.info("★Loading..(>~<。)");
      await this.LoadSE('bomb');
      await this.LoadSE('poyo1');
      await this.LoadSE('poyo2');
      await this.LoadSE('solve');
      console.info("★Complete!(c>▽<つ)");
      return;
  };
};
