# icancode-shopify-setting-storage

## How to use

```javascript
import {FileSettingStorage} from '@icancode/shopify-setting-storage';

// use default configuration
let settingStorage = new FileSettingStorage();

// specify location to store setting's data
// let settingStorage = new FileSettingStorage({location: '.settings'});

await settingStorage.getSettings('my-shop', 'my-app');
```