class Event{
  static onAddUser(name){
    cl("addUser:"+name);
    world.Add(new User(name)); 
  }
}
