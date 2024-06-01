import { text } from "express";
import db from "../config/db_connector.js";

const Spot = {
    getAll: async () => {
        const result =  await db.query(`
            select * from tb_spot order by id;
        `)
        return result.rows;
    },

    getById: async (id) => {
        const text = 'select * from tb_spot where id = $1';
        const values = [id]

        return (await db.query(text, values)).rows;
    },
    
 

}

export default Spot;