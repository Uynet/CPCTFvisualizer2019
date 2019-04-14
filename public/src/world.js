class World{
  constructor(){
    this.entities = [];
    this.entityRemoveSet = new Set();
    this.userList = [];
    this.mainCamera;
  };
  async Init(){
    await Material.Init();
    this.mainCamera = new Camera();
    this.Add(this.mainCamera);

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

    /*
    for(let i=0;i<5;i++){
      const u = {
        name : "Test"+i,
        id : i,
        score: 100,
        icon_url:"https://pbs.twimg.com/profile_images/992202907389853698/Fwpldgoq.jpg"
      }
      this.Add(new User(u));
    }
    */

  }
  Add(entity){
    this.entities.push(entity);
    switch(entity.type){
      case  "user" : this.userList.push(entity); break;
      default : break;
    }
  };
  Remove(entity) {
    this.entityRemoveSet.add(entity);
  }
  Debug() {
    //たまに得点イベントを発生させる(debug)
    if (globalTime % 300 == 9) {
      let l = this.userList.length;
      let user = this.userList[Dice(l)];
      EventManager.GetScore(user, Math.floor(Math.random() * 777));
    }
  }
  Update(){
    //gl.clearColor(0.999,0.98,1.00,1.0);
    gl.clearColor(1,1,1,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.Debug();
    this.entities.forEach(e=>{
      e.Update();
      e.Draw()
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
    //this.Draw();
    gl.flush();
  }
  Draw(){
  }
}
