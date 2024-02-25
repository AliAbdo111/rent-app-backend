// debrecated code
//#region
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'Your cloud name',
      api_key: 'Your api key',
      api_secret: 'Your api secret',
    });
  },
};
//#endregion
