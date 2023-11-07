export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  avatar: string | ArrayBuffer | null;
}

export interface Users extends Object{
  id: number;
  name: string;
  email: string;
  password: string;
  user_tag: string;
  
}