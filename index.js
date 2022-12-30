const puppeteer = require('puppeteer')

let senderPostcode = '47600'
let receiverPostcode = '81300'
let shippingType = 'Regular'
let weight = '1'
let length = '30'
let width = '30'
let height = '30'
let insurance = true
let itemValue = "20.22"

const parcelRateQuery = 'tr:nth-child(2) td:nth-child(2)'
const parcelInsuranceChargeQuery = 'tr:nth-child(3) td:nth-child(2)'
const parcelTotalQuery = 'tr:nth-child(4) td:nth-child(2)'
const documentRateQuery = 'tr:nth-child(2) td:nth-child(3)'
const documentInsuranceChargeQuery = 'tr:nth-child(3) td:nth-child(3)'
const documentTotalQuery = 'tr:nth-child(4) td:nth-child(3)'

async function start() {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage()
    await page.goto('https://jtexpress.my/shipping-rates')
    const senderPostcodeField = await page.$('#sender_postcode')
    const receiverPostcodeField = await page.$('#receiver_postcode')
    const shippingTypeField = await page.$('#shipping-type')
    const weightField = await page.$('#weight')
    const lengthField = await page.$('#length')
    const widthField = await page.$('#width')
    const heightField = await page.$('#height')
    const insuranceField = await page.$('#insurance')
    const submitButton = await page.$('#btn-form-rates-submit')
    const itemValueField = await page.$('#item_value')

    await senderPostcodeField.type(senderPostcode)
    await receiverPostcodeField.type(receiverPostcode)
    await shippingTypeField.select(shippingType)
    await weightField.type(weight)
    await lengthField.type(length)
    await widthField.type(width)
    await heightField.type(height)
    if (insurance) {
        await insuranceField.click()
        await itemValueField.type(itemValue)
    }

    await page.click("button[type=submit]");

    await page.waitForSelector('tr:nth-child(2) td:nth-child(2)');

    let parcelRate = await page.$eval(parcelRateQuery, el => el.innerHTML)
    parcelRate = parcelRate.replace(/\s+/g, '');
    parcelRate = parcelRate.replace(/(\r\n|\n|\r)/gm, "");
    console.log('Parcel rate: ' + parcelRate)

    let parcelInsuranceCharge = await page.$eval(parcelInsuranceChargeQuery, el => el.innerHTML)
    parcelInsuranceCharge = parcelInsuranceCharge.replace(/\s+/g, '');
    parcelInsuranceCharge = parcelInsuranceCharge.replace(/(\r\n|\n|\r)/gm, "");
    console.log('Parcel rate: ' + parcelInsuranceCharge)

    let parcelTotal = await page.$eval(parcelTotalQuery, el => el.innerHTML)
    parcelTotal = parcelTotal.replace(/\s+/g, '');
    parcelTotal = parcelTotal.replace(/(\r\n|\n|\r)/gm, "");
    console.log('Parcel rate: ' + parcelTotal)

    let documentRate = await page.$eval(documentRateQuery, el => el.innerHTML)
    documentRate = documentRate.replace(/\s+/g, '');
    documentRate = documentRate.replace(/(\r\n|\n|\r)/gm, "");
    console.log('Document rate: ' + documentRate)

    let documentInsuranceCharge = await page.$eval(documentInsuranceChargeQuery, el => el.innerHTML)
    documentInsuranceCharge = documentInsuranceCharge.replace(/\s+/g, '');
    documentInsuranceCharge = documentInsuranceCharge.replace(/(\r\n|\n|\r)/gm, "");
    console.log('Document rate: ' + documentInsuranceCharge)

    let documentTotal = await page.$eval(documentTotalQuery, el => el.innerHTML)
    documentTotal = documentTotal.replace(/\s+/g, '');
    documentTotal = documentTotal.replace(/(\r\n|\n|\r)/gm, "");
    console.log('Document rate: ' + documentTotal)

    await browser.close()
}

start()
