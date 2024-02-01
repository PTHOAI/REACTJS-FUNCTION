export interface AuthModel {
  Id?: String      
  Email : String     
  EmailConfirmed? : Boolean
  Password?: String
  SecurityStamp?: String     
  PhoneNumber?: String      
  PhoneNumberConfirmed?: Boolean
  TwoFactorEnabled?:  Boolean
  LockoutEndDateUtc?: Date
  LockoutEnabled?:  Boolean
  AccessFailedCount?: number
  UserName:  String    
  Address?:  String      
  Note?:  String  
  accessToken?:string; 
  role?:string;   
    // Thêm trường này để đại diện cho danh sách sản phẩm trong menu
}