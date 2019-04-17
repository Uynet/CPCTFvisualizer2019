class World{
  constructor(){
    this.entities = [];
    this.entityRemoveSet = new Set();
    this.userList = [];
    this.mainCamera;
    this.fbo;
  };
  async Init(){
    await Material.Init();
    this.mainCamera = new Camera();
    this.Add(this.mainCamera);

    /*
    //FBOのテスト
    this.fbo = new FrameBuffer(512, 512);
    Material.PushTexture("fbo", this.fbo);

    this.Add(new FboTest(vec3(0, -4, 0)));
    */

    //this.Add(new Floor(vec3(0,-6,0)));//floor
    //this.Add(new Floor(vec3(0,3,0)));//ceil
    //this.Add(new Floor(vec3(0,-3,0)));//ceil
    this.Add(new Floor(vec3(0,0,0)));//ceil
    this.Add(new Ico(vec3(0),36));//正二十面体
    this.Add(new Ico(vec3(0),2));//正二十面体
    this.Add(new Ring(vec3(0), 3, 0.4, 64));
    //this.Add(new Ring(vec3(0,4,0), 18, 0.3, 64));
    //this.Add(new Ring(vec3(0,-4,0), 18, 0.3, 64));
    this.Add(new Ring(vec3(0), 36, 0.3, 128));
    //:this.Add(new TextBox("CPCTF",vec3(0,0,0)));


    /*debug
    for(let i=0;i<5;i++){
      const u = {
        name : "Test"+i,
        id : "test"+i,
        score: 5,
        //icon_url:"https://pbs.twimg.com/profile_images/992202907389853698/Fwpldgoq.jpg"
        icon_url:"https://pbs.twimg.com/profile_images/1098287140859871232/5NqQLk1-_400x400.jpg"
      }
      this.Add(new User(u));
    }
    */

  }
  Add(entity){
    this.entities.push(entity);
    switch(entity.type){
      case  "user" : 
        this.userList[entity.id] = entity;
        break;
      default : break;
    }
  };
  Remove(entity) {
    this.entityRemoveSet.add(entity);
  }
  //ランキング表示用
  GetSortedUserList(){
     let userArray = [];
    for (let username in this.userList) {
      //メタプロの弊害 怪奇現象
      if(username == "remove")continue;
      if(username == "minIndex")continue;
      if(username == "maxIndex")continue;
      if(username == "Last")continue;
        let user = this.userList[username] ;
        userArray.push(user);
    }
     userArray.sort((a,b)=> {
       return -(a.score - b.score);//昇順ソート
     });
     let sortedUserNameArray = [];
     userArray.forEach(user=>{
        sortedUserNameArray.push(user.name);
     })
     return sortedUserNameArray;
  }
  Debug() {
    //たまに得点イベントを発生させる(debug)
    for (let username in this.userList) {
      //メタプロの弊害 怪奇現象
      if(username == "remove")continue;
      if(username == "minIndex")continue;
      if(username == "maxIndex")continue;
      if(username == "Last")continue;
      if (Dice(999) == 1){
        let user = this.userList[username] ;
        EventManager.GetScore(this.userList[username], Math.floor(Math.random() * 100));
      }
    }
  }
  Update(){

    //this.fbo.Draw(this);

    //this.Debug();
    this.entities.forEach(e=>{
      e.Update();
      //e.Draw()
    });

    EventManager.ConsumeEvent();

    if(this.entityRemoveSet.size > 0){
      this.entities = this.entities.filter(e=>{
        for(let re of this.entityRemoveSet){
          if(e === re){
            this.entityRemoveSet.delete(re);
            return false;
          }
        }
        return true;
      });
      this.entityRemoveSet.clear();
    }
    this.Draw();
  }
  Draw(){
    gl.clearColor(1,1,1,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.entities.forEach(e=>{
      e.Draw();
    })
    gl.flush();
  }
}
