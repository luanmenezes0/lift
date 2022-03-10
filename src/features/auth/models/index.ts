export type UsersPermissionsUserRole = {
  id: string;
  name: string;
  description?: string;
  type?: string;
  permissions?: string[];
  users?: string[];
  created_by?: string;
  updated_by?: string;
};

export interface User {
  id: string;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  role?: UsersPermissionsUserRole;
}
