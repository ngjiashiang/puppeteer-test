# puppeteer-test
### This project is scraping off https://jtexpress.my/shipping-rates

### after cloning this repo, run the following commands in the directory of this project:
```shell
npm install
```
### then
```shell
node index
```

## change the values of the variables according to your use case
```javascript
let senderPostcode = '47600'
let receiverPostcode = '81300'
let shippingType = 'Regular'
let weight = '1'
let length = '30'
let width = '30'
let height = '30'
let insurance = true
let itemValue = '20.22'
```

```javascript
senderPostcode
```
### and
```javascript
receiverPostcode
```
accepts a 5 digit Malaysian postal code


```javascript
shippingType
```
accepts ```'Regular'``` or ```'Next Day Delivery'```


```javascript
weight
```
is based on kg unit


```javascript
length, width, height
```
is based on cm unit


### If there is any need for insurance for the parcel/document delivery, include this along the other variables.
set ```insurance``` to true, and declare your shipment value in ```itemValue``` variable
```javascript
let insurance = true
let itemValue = '20.22'
```
Else, these variables can be left undefined.
