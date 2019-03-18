let currentID = 0;
class TextBox{
  constructor(text,pos){
    this.pos = pos;
    this.characters = [];
    let len = text.length;
    for(let i = 0;i<len;i++){
      const pos_offset = add(pos,vec3(0.2*i,0,0));//文字を右にずらす
      let c = new Character(text[i],pos_offset);
      this.characters.push(c);
    }
    //this.AddDOM();
  }
  AddDOM(){
    //domにテキストを追加
    this.content = document.createTextNode(text); 
    this.div = document.createElement("div");
    this.div.className = "main";
    const currentDiv = document.getElementById("unko");
    this.div.style.left = canvas.width/2;
    this.div.style.top = canvas.height/2;
    this.div.id = "main" + currentID;
    currentID ++ ;
   this.div.appendChild(this.content);
    //currentDiv.appendChild(this.div);
    document.body.insertBefore(this.div, currentDiv); 
  }
  SetPosToViewSpace(pos){
    /*
    const ret = vec4(pos.x,pos.y,pos.z,1);
    ret = mulMat4(GetTransformMatrix(this.pos),ret);
    ret = mulMat4(world.mainCamera.GetViewMatrix(),ret);
    ret = mulMat4(world.mainCamera.GetProjMatrix(),ret);
    retrun ret;
    */
  }
  Update(){
    this.pos.x += 3.5;
    //this.div.style.left = this.pos.x;
    //this.div.style.top = this.pos.y;
  }
  Draw(){
    this.characters.forEach(e=>{
      e.Draw();
    });
     
  };
}
