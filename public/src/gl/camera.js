//this may be static
class Camera{
  constructor(pos){
    this.pos = pos;
    //view
    this.forward= vec3(0,0,-1);
    this.up= vec3(0,1,0);

    this.asp = 1;
    this.FOV = Math.PI/2;
    this.near = 0.1;
    this.far = 45.0;

    this.viewMat = this.GetViewMatrix();
    this.projMat = this.GetProjMatrix();
  }
  Update(){
    let a = globalTime * 0.002
    this.pos.z = Math.cos(a)*14;
    this.pos.x = Math.sin(a)*14;
    this.pos.y = 0;
    this.pos.y = -8;

    this.pos.x *= 0.5;
    this.pos.y *= 0.5;
    this.pos.z *= 0.5;

    this.forward.z = Math.cos(a);
    this.forward.x = Math.sin(a);
    this.forward.y = -1.2;
  }
  Draw(){/*Nothing to do*/}
  GetViewMatrix(){
    const side = normalize(cross(this.forward,this.up));
    let up = normalize(cross(this.forward, side));
    let forward = this.forward;
    let eye = this.pos;
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
      0,0,2*near*far/(near-far),0.001
    ];
  }
}
