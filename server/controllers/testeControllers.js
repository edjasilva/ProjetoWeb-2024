import database from '../config/db_connector.js';

const getAll= async function(req, res){
    const result= await database.query('select * from tb_spot order by id;')
    res.send(result.rows);
    
}

export {getAll};


