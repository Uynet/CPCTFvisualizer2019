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
  }
  Update(){
    this.pos.x += 0.1;
  }
  Draw(){
    this.characters.forEach(e=>{
      e.Draw();
    });
  };
}
