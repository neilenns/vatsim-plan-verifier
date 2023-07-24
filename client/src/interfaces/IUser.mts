// Define the interface for the Location document
export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}
