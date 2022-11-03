import { launch } from 'puppeteer';
import cheerio from 'cheerio';

import * as dotenv from 'dotenv';
dotenv.config();

const profileURLs = [
        "https://www.linkedin.com/in/darian-bhathena/",
        "https://www.linkedin.com/in/danilolucari/",
        "https://www.linkedin.com/in/ngellner/",
        "https://www.linkedin.com/in/sixped/",
        "https://www.linkedin.com/in/davidezequielgranados/",
        "https://www.linkedin.com/in/andrejvajagic/",
        "https://www.linkedin.com/in/sahilbhatiya/",
        "https://www.linkedin.com/in/stenrs/",
        "https://www.linkedin.com/in/alexghattas/",
        "https://www.linkedin.com/in/rajiaabdelaziz",
    ]
const profiles = [];
async function login() {
    try {
        // Login to Linkedin
        const URL = 'https://www.linkedin.com/login'
        const browser = await launch({headless: false})
        const page = await browser.newPage()
        await page.goto(URL)
        await page.type('#username', `${process.env.EMAIL}`)
        await page.type('#password', `${process.env.PASSWORD}`)
        await Promise.all([
           page.click('#organic-div > form > div.login__form_action_container > button'),
            page.waitForNavigation(),
        ]);

            // Scraping data from the profiles
            for (let link of profileURLs) {
    
                await page.goto(`${link}`, { waitUntil: 'domcontentloaded' })

                // const [response] = await Promise.all([
                //     page.waitForNavigation(),
                //     page.click('#ember1395'),
                //   ]);
                // console.log([response], 'hello')
                const content = await page.content();
                const $ = cheerio.load(content)
                const name = $('h1').text();
                const profilePic = $('button').find('img').attr('src');
                const profileJSON = {
                    username: name,
                    photo:profilePic
                }

                profiles.push(profileJSON);
           }
           await browser.close()
           return profiles
    } catch (error) {
        console.error(error)
    }
}

export default login;