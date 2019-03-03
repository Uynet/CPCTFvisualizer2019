class Floor{
  constructor(){}
  async Init(){
    const vertices =
      [
        -0.5 , 0.5 , 0.0 ,//左上
         0.5 , 0.5 , 0.0 ,//右上
        -0.5 ,-0.5 , 0.0 ,//左下
         0.5 ,-0.5 , 0.0 ,//右下
      ];
    const uv =
      [
        0.0 , 1.0 ,
        1.0 , 1.0 ,
        0.0 , 0.0 ,
        1.0 , 0.0 ,
      ];
    this.VBO = new Buffer(vertices);
    this.UVAttr = new Buffer(uv);

    this.program = new Program("main.vert","main.frag");
    await this.program.Init(this.VBO);

    this.VBO.SetAttr(this.program,"position",3);
    this.UVAttr.SetAttr(this.program,"uv",2);

  };
  Draw(){
    this.VBO.Bind();
    //gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);
    this.program.Use();
    gl.drawArrays(gl.TRIANGLES,0,3);
    gl.drawArrays(gl.TRIANGLES,1,3);
    //gl.bindBuffer(gl.ARRAY_BUFFER,null);
    this.VBO.UnBind();
  }
}
