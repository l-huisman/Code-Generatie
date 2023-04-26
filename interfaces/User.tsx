export interface User {
  id?: number;
  user_name?: string;
  first_name: string;
  last_name: string;
  email: string;
  is_admin?: boolean;
  is_fom_ops?: boolean;
}
