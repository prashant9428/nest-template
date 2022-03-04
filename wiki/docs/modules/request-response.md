# Request Response 
  Boilerplate has a custom guard enabled for handling response and request for every api. The integration of request response guard is enabled by default with response structure

## Overview

!['Request Response Life Cycle'](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/images/nestjs-request-life-cycle.png?raw=true)

## Available function for response.

### **success**

!['success response'](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/images/success-response.png?raw=true)

 The success function expected two parameters
 1) data: Json response data.
 2) Status code: API response status code, we have used [http-status-codes](https://www.npmjs.com/package/http-status-codes) enums for different type of response code.

### **error**

!['error response'](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/images/error-response.png?raw=true)

 The error function expected two parameters
 1) error: Json response data.
 2) Status code: API response status code, we have used [http-status-codes](https://www.npmjs.com/package/http-status-codes) enums for different type of response code.

### **noContent**

!['noContent response'](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/images/no-content-response.png?raw=true)

 The noContent function expected no parameters


### **withMeta**

!['meta response'](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/images/meta-response.png?raw=true)

 The withMeta function expected two parameters. This function extract additional data passed to response object into new response key as meta.
 1) data: Json response data.
 2) Status code: API response status code, we have used [http-status-codes](https://www.npmjs.com/package/http-status-codes) enums for different type of response code.

## Usability:  

We need to import the Request and Response interface from the core modules

```import { Request, Response } from '@libs/core';```
```
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private appLogger: AppLogger) {}

  @Get()
  getHello(@Req() req: Request, @Res() res: Response): Promise<Response> {
    this.appLogger.log('API called');
    return res.success(this.appService.getHello());
  }
}
```
