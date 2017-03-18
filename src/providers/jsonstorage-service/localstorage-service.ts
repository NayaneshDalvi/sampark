import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
// import {  SqlStorage ,LocalStorage} from "ionic-angular";
@Injectable()
 export class LocalStorageService {
        // TODO: Need to handle QUOTA_EXCEEDED_ERR
        private storage: Storage;
    private isInstantiated: boolean;

        constructor() {
        if(!this.isInstantiated) {
            this.storage = new Storage();
            this.isInstantiated = true;
        }

        }

public getInstance() {
        return this.storage;
    }

        read(key: string): any {
            // if not in local storage, the string "undefined" is returned (why???)
            this.getInstance().get(key).then((data) => {
                console.log(data+"dsfdsfkdsjfkdsfkdsfkdsj  dskfsdfkdsj")
                  console.log(JSON.parse(data))
if (data === null || typeof data === "undefined" || data === "undefined") {
                return null;
            }
            else {
                console.log("return data")
                return JSON.parse(data);
            }    
});
    
        }

        readObject<T>(key): T {
            var text: any = this.read(key);
            
            console.log(text)
console.log("data"+ "read onject ")

            return text;
        }

        write(key: string, text: string): void {
           this.getInstance().set(key,text).then((d)=>{
      console.log('storage save',d);
    
    },(e)=>{
      console.log('unable to save',e);
    })
        }

        writeObject(key: string, data: any): void {
            var text: string = JSON.stringify(data);
            this.write(key, text);
        }

        remove(key: string): void {
           this.storage.remove(key).then((d)=>{
      console.log('Successfully remove from native storage',d);
    },(e)=>{
      console.log('error while remove data from native storage',e);
    });
        }

        clear(): void {
           this.storage.clear().then((d)=>{
      console.log('successfuly remove from native stoge all',d);
    },(e)=>{
      console.log('error while removing from clear',e);
    })    
  }
    
    }


