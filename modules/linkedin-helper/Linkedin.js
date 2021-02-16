module.exports = class Linkedin {
    caller(){
        const { net } = require('electron');
        const request = net.request('https://thawing-bastion-45853.herokuapp.com/api/v1/authorization')
        request.on('response', (response) => {
            // console.log(`STATUS: ${response.statusCode}`)
            // console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
            response.on('data', (chunk) => {
            var data = JSON.parse(chunk);
            console.log(data);
            })
            response.on('end', () => {
            
            })
        })
        request.end()
    }
}