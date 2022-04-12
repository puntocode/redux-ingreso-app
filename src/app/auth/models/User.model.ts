export class User {

  public nombre: string;
  public email: string;
  public uid: string;

  constructor( user: DataObj ) {
      this.nombre = user.nombre;
      this.uid    = user.uid;
      this.email  = user.email;
  }

}


interface DataObj{
  uid:string;
  email:string;
  nombre:string;
}



