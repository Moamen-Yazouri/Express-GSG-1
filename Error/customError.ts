
import type { EHttpStatus, StatusCodes, TModule } from "../@types/index";

class CustomError extends Error {
    moduleName: TModule;

    statusCode: StatusCodes.HttpClientError | StatusCodes.HttpServerError;
    
    constructor(message: string, statusCode: StatusCodes.HttpClientError | StatusCodes.HttpServerError, moduleName: TModule) {

        super(message);

        this.moduleName = moduleName;

        this.statusCode = statusCode;
          
    }
}
export default CustomError;