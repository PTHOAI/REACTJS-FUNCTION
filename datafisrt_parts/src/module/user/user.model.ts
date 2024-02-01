export interface UserModel {
  Id : String      
  Email : String     
  EmailConfirmed : Boolean
  Password?: String
  SecurityStamp: String     
  PhoneNumber: String      
  PhoneNumberConfirmed: Boolean
  TwoFactorEnabled:  Boolean
  LockoutEndDateUtc: Date
  LockoutEnabled:  Boolean
  AccessFailedCount: number
  UserName:  String    
  Address:  String      
  Note:  String      
  }
  export type UserCreateInput = {
    email: string;
    username: string;
    fullname: string;
    status: number;
    deleted: boolean;
    avatar: string;
    age: number;
  };
  
  export type EmailRequireDto = {
    email: string;
  };
  