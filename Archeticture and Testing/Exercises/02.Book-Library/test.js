const {chromium} = require('playwright-chromium');
const {expect} = require('chai');

describe('Tests', async function()  {
    this.timeout(5000);

    let page, browser;

    before(async () => {
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('works',async () => {
        expect(1).to.equal(1);
    })
})