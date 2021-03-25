export interface Room {
  id: string; //MYS-111
  name: string; //SALA A
  owner_id: string; //CHANG
  manager_id: string; //LDAC
  is_active: number;
  description: string; //Descripcion de la sala
  last_used?: Date;
  first_used?: Date;
  path_image?: string;
}
