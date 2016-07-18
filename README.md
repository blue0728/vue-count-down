## Install
```
npm install vue-count-down --save

```

## Usage

```js
'use strict'
import countDown from 'vue-count-down'

Vue.use(countDown);

```

```html
<p v-count-down="'2016-07-02 15:08:00'"></p>
<p v-count-down="'2016/07/02 15:08:00'"></p>
```