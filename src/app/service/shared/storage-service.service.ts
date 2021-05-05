import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(private nativeStorage: NativeStorage) { }
  
  public  async getItem(key: string) {
    // const record = await this.nativeStorage.getItem(key);
     const record =   localStorage.getItem(key);
    return record;
  }

  public async setItem(key: string, value: string) {
    // const record = await this.nativeStorage.setItem(key, value);
    const record =  localStorage.setItem(key, value);
    return record
  }

  public async clear() {
    this.nativeStorage.clear();
  }
}
