var express = require('express');

var bodyParser = require('body-parser');

var server = express();

server.use(express.static('public')); // доступ к файлам которые розположены в public
server.use(bodyParser.urlencoded({extended:true})); /*подключили body-parser*/
server.use(bodyParser.json());

server.post('/valid-form',require('./controllers/valid-form.js'));


/*сервер слушает запросы переданы методом POST в котором указан url
формы и функция котороя импортирует модуль с ответом на запрос*/


server.listen(8050);