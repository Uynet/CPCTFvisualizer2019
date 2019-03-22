//this may be static
class Camera{
  constructor(){
    this.pos = vec3(0);
    //view
    this.forward = vec3(0,0,-1);
    this.up = vec3(0,1,0);

    this.asp = canvas.width/canvas.height;
    this.FOV = Math.PI*1/2.5;
    this.near = 0.1;
    this.far = 60.0;

    this.viewMat = this.GetViewMatrix();
    this.projMat = this.GetProjMatrix();

    this.r = 8;
    this.phi = Math.PI/2.0;
    this.theta = Math.PI;
  }
  Update(){
    if(K.s() ) this.r += 0.1;
    if(K.w() ) this.r -= 0.1;
    if(K.right() ) this.theta -= 0.03;
    if(K.left()  ) this.theta += 0.03;
    if(K.up() ) this.phi += 0.03;
    if(K.down() ) this.phi -= 0.03;
    this.phi = Math.max(this.phi,0.01);
    this.phi = Math.min(this.phi,Math.PI);

    this.theta += 0.002;

    this.pos.x = this.r * Math.sin(this.phi)*Math.sin(this.theta);
    this.pos.y = this.r * Math.cos(this.phi);
    this.pos.z = this.r * Math.sin(this.phi)*Math.cos(this.theta);


    this.forward.x = this.pos.x;
    this.forward.y = this.pos.y;
    this.forward.z = this.pos.z;
    this.forward = normalize(this.forward);
    this.up = vec3(0,1,0);

  }
  Draw(){/*Nothing to do*/}
  GetViewMatrix(){
    const side = normalize(cross(this.forward,this.up));
    let up = normalize(cross(this.forward, side));
    let forward = normalize(this.forward);
    let eye = this.pos;
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
