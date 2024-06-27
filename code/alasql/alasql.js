const alasql = require('alasql');

alasql.parse('SELECT * FROM `table` WHERE name  = @name').compile();
