const ethers = require('ethers')

const provider = new ethers.providers.AlchemyProvider("kovan", process.env.API_KEY);
console.log(provider)
const wallet = new ethers.Wallet(process.PRIVATE_KEY, provider)
console.log(wallet)

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.json({"name": "Cryptopunks"+1,
    "description": "A highly acclaimed collection of punks.", 
    "image": "https://www.larvalabs.com/cryptopunks/cryptopunk"+1+".png",
    "api_key": process.env.API_KEY});
};