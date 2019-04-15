//this may be static
class Camera{
  constructor(){
    this.pos = vec3(0);
    this.quakeOffset = vec3(0);
    //view
    this.forward = vec3(0,0,-1);
    this.up = vec3(0,1,0);

    this.asp = canvas.width/canvas.height;
    this.FOV = Math.PI*1/2.5;
    this.near = 0.1;
    this.far = 60.0;

    this.viewMat = this.GetViewMatrix();
    this.projMat = this.GetProjMatrix();

    this.r = 16;
    this.phi = Math.PI/2.0+0.4;
    this.theta = Math.PI;

    this.focusedUser;
  }
  //あるuserを追跡
  SetFocus(user){
    this.focusedUser = user;
  }
  FocusOn(){
    let p = copy(this.focusedUser.pos);
    let v = normalize(copy(this.pos));
    let s = this.focusedUser.cube.size;
    s *= 6.0+Math.sin(globalTime*0.01)*0.5;

    p.x += v.x*s;
    p.y += v.y*s;
    p.z += v.z*s;
    this.SetPos(p);
  }
  SetPos(pos){
    this.distPos = copy(pos);
  }
  Shake(){
    cl("po")
  }
  Input(){
    if(K.s() ) this.r *= 1.05;
    if(K.w() ) this.r *= 0.95;
    if(K.right() ) this.theta -= 0.03;
    if(K.left()  ) this.theta += 0.03;
    if(K.up() ) this.phi += 0.03;
    if(K.down() ) this.phi -= 0.03;
  }
  Update(){
    this.Input();
    if(this.focusedUser!==undefined)this.FocusOn();
    else {
      this.phi = Math.max(this.phi, 0.0001);
      this.phi = Math.min(this.phi, Math.PI);
      this.theta += 0.002;
      let p = SphericalCoordToPosition(this.r, this.theta, this.phi);
      this.SetPos(p);
    }

    let a = 0.15;
    this.pos.x += a*(this.distPos.x - this.pos.x);  
    this.pos.y += a*(this.distPos.y - this.pos.y);  
    this.pos.z += a*(this.distPos.z - this.pos.z);  


    this.forward = copy(this.pos);
    this.forward = normalize(this.forward);
    this.up = vec3(0,1,0);
  }
  Draw(){/*Nothing to do*/}
  GetViewMatrix(){
    const side = normalize(cross(this.forward,this.up));
    let up = normalize(cross(this.forward, side));
    let forward = normalize(this.forward);
    let eye = add(this.pos,this.quakeOffset);
    //return GetTransformMatrix(this.pos);  
    return [
      side.x, up.x, forward.x, 0,
      side.y, up.y, forward.y, 0,
      side.z, up.z, forward.z, 0,
      -dot(eye, side), -dot(eye, up), -dot(eye, forward), 1
    ];
  }
  //射影変換行列
  GetProjMatrix(){
    const t = Math.tan(this.FOV/2);
    const asp = this.asp;
    const near = this.near;
    const far = this.far;

    return [
      1 / (asp * t),0,0,0,
      0,1/t,0,0,
      0,0,(near+far) / (near-far), -1,
      0,0,2*near*far/(near-far),0
    ];
  }
}
