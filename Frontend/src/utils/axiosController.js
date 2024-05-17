import axios from 'axios';


export const  createAbortSignalWithTimeout = (timeoutMs) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeoutMs);
    return controller.signal;
   }

   export const handleError = (error, actionName)=> {
    if (axios.isCancel(error)) {
      console.log(`Request canceled due to timeout for ${actionName}`, error.message);
      throw new Error(`Request canceled due to timeout for ${actionName}`);
    } else {
      throw error;
    }
  }
    