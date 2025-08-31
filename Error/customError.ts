
import type { EHttpStatus, TModule } from "../@types/index";

class CustomError extends Error {
    moduleName: TModule;
    statusCode: EHttpStatus;
    
    constructor(message: string, statusCode: EHttpStatus, moduleName: TModule) {
        super(message);
        this.moduleName = moduleName 
        this.statusCode = statusCode  
    }
}
export default CustomError;