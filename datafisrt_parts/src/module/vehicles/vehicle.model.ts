export interface VehicleModel {
  VEH_ID: string;
  VEH_CODE: string;
  VEH_NAME: string;
  VEH_PART_CATALOG: string;
  VEH_VEMID: string;
  VEH_VSTID: string;
  VEH_NOTE: string;
  FACTORY: string;
  CREATE_DATE: Date;
  CREATE_BY: string;
  UPDATE_DATE: Date;
  UPDATE_BY: string;
  IS_DELETED: boolean;
  DEPARTMENT_ID: string;
  DELETED_DATE: Date;
  DELETED_BY: string;
  VIN: string;
  IS_ACTIVE: boolean;
  PDF_CATALOG: string;
  PDF_INSTRUCTION: string;
  PDF_MAINTENANCE: string;
  PICTURE: string;
  ID_SEGMENT: string | null; // Thêm null vào kiểu
}


export interface Vehicle_Model_Model {
  VEM_ID: String    
  VEM_NAME: String   
  VEM_PARENT: String   
  VEM_VECID:String   
  VEM_VESID: String   
  VEM_NOTE: String   
  FACTORY: String  
  CREATE_DATE: Date 
  CREATE_BY: String  
  UPDATE_DATE: Date 
  UPDATE_BY: String   
  IS_DELETED: Boolean
  DELETED_DATE: Date
  DELETED_BY: String  
  DEPARTMENT_ID:String    
}   

export interface Department_Model {
  ID: String    
  CODE: String
  NAME_VN: String
  NAME_EN: String
  ADDRESS: String
  PHONE_NUMBER: String
  FAX: String
  CREATED_DATE: Date
  CREATED_BY: String
  UPDATED_DATE: Date
  UPDATED_BY: String
  IS_DELETED: Boolean
  DELETED_DATE: Date
  DELETED_BY: String
}  

export interface VehiclePartsModel {
  ID: String    
  PART_CODE: String   
  PART_NAME_VN: String  
  PART_NAME_EN: String  
  VEH_ID: String   
  CREATED_DATE: Date
  CREATED_BY: String   
  UPDATED_DATE: Date 
  UPDATED_BY: String   
  IS_DELETED: Boolean
  DELETED_DATE: Date 
  DELETED_BY: String   
  IMG:   String   
  ORDER:  Number       
} 


export interface VehicleBoomModel {
  VEB_ID: String    
  VEB_VEHID: String  
  VEB_PAGID: String   
  VEB_QUATITY:  String   
  VEB_NOTE: String   
  FACTORY: String   
  CREATE_DATE:  Date
  CREATE_BY: String 
  UPDATE_DATE:  Date 
  UPDATE_BY: String   
  IS_DELETED: Boolean
  DELETED_DATE: Date 
  DELETED_BY: String   
  VEH_PART_ID: String
}

export interface PackagePositionModel {
  PAG_ID:String    
  PAG_CODE: String   
  PAG_PAGID: String   
  PAG_NAME_EN: String   
  PAG_NAME_VN: String  
  PAG_UNIID: String   
  PAG_IMAGE: String   
  PAG_NOTE: String   
  FACTORY: String   
  CREATE_DATE: Date 
  CREATE_BY: String   
  UPDATE_DATE: Date 
  UPDATE_BY: String 
  IS_DELETED: Boolean
  DELETED_DATE: Date 
  DELETED_BY: String   
  PAG_SUPPLIER: String   
  VEH_PART_ID: String   
  PDF: String   
  IS_MAPPED: Boolean   
}

export interface SegmentModel {
  ID_SEGMENT: String
  SEG_CODE: String
  NAME_VN: String 
  NAME_EN: String
  CREATED_DATE: Date
  TRADEMARK:String
}

export interface ComponentModel {
  COM_ID :String    
  COM_CODE :String   
  COM_COMID :String   
  COM_NAME_EN :String 
  COM_NAME_VN :String
  COM_UNIID :String
  COM_NOTE :String
  FACTORY :String
  CREATE_DATE :Date
  CREATE_BY :String
  UPDATE_DATE :Date
  UPDATE_BY :String
  IS_DELETED :Boolean
  DELETED_DATE :Date
  DELETED_BY :String
  COM_SUPPLIER :String
  COMPONENT_MODEL_ID :String
  START_USING :Date
  END_USING  :Date
  DESCRIPTION :String
  VINS :String
  VEHICLES :String
}

export interface VehicleBomsModel {
  VEB_ID: String        
  VEB_VEHID: String       
  VEB_PAGID: String      
  VEB_QUATITY: String       
  VEB_NOTE: String      
  FACTORY: String       
  CREATE_DATE: Date    
  CREATE_BY: String       
  UPDATE_DATE: Date     
  UPDATE_BY: String       
  IS_DELETED: Boolean
  DELETED_DATE: Date     
  DELETED_BY: String       
  VEH_PART_ID: String        
}



