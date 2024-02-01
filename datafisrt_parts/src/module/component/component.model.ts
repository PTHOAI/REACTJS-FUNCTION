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

  export interface SegmentModel {
    ID_SEGMENT: String
    SEG_CODE: String
    NAME_VN: String 
    NAME_EN: String
    CREATED_DATE: Date
    TRADEMARK:String
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

  export interface PackageBomModel {
    PAB_ID: String    
    PAB_PAGID: String  
    PAB_COMID: String  
    PAG_QUATITY: String   
    PAB_NOTE: String  
    FACTORY: String   
    CREATE_DATE: Date 
    CREATE_BY: String   
    UPDATE_DATE: Date 
    UPDATE_BY: String   
    IS_DELETED: Boolean
    DELETED_DATE: Date 
    DELETED_BY: String   
    SVG_ELEMENT_ID: String   
  }