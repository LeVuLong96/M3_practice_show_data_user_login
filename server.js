const http = require('http');
const fs = require('fs');
const qs = require('qs');
const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./views/register.html', function (err, DataHtmlRegister) {
            if(err) {
                throw new Error;
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(DataHtmlRegister);
                return res.end();
            }
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            console.log(data)
        }) // lấy dữ liệu từ form
        req.on('end', () => {
            const userInfo = qs.parse(data); // dịch data từ string ra object chứa các thông tin nhập vào(qs.parse(data))
            fs.readFile('./views/info.html', 'utf8', function (err, htmlInfo) {
                if (err) {
                    console.log(err);
                }
                htmlInfo = htmlInfo.replace('{name}', userInfo.name);
                htmlInfo = htmlInfo.replace('{email}', userInfo.email);
                htmlInfo = htmlInfo.replace('{password}', userInfo.password);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(htmlInfo);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(8080, function () {
    console.log('server running at http://localhost:8080')
});