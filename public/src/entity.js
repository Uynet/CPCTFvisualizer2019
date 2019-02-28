class Entity{
  constructor(pos,vel){
    this.pos = pos;
    this.vel = vel;
  } 
  Update(dt){
    this.pos = add(this.pos,this.vel);
  }
}
