import db from "../config/db_connector.js";

const Spot = {
    getAll: async () => {
        const result =  await db.query(`
            select * from tb_spot order by id;
        `)
        return result.rows;
    },

    getByIdNon: async (id) => {
        const text = `
        select s1.name, s1.description, add.street as address
        from tb_noncommercialspot as s1
        join tb_address as add on s1.add_id = add.id
        where s1.id = $1
        `;
        const values = [id]

        return (await db.query(text, values)).rows;
    },

    getByCategoryNon: async (category) => {
        const text = `
        select *
        from tb_noncommercialspot
        where category = $1
        `;
        const values = [category];

        return (await db.query(text, values)).rows;
    },

    getNonSpot: async() =>{
        const result= await db.query(`
        select tb_noncommercialspot.name as name,  tb_noncommercialspot.description as description, tb_address.street as address, tb_picture.url as url
            from tb_noncommercialspot
            inner join  tb_address on tb_noncommercialspot.add_id = tb_address.id
            inner join tb_spot on tb_address.id=tb_spot.id
            inner join tb_picture on tb_spot.id=tb_picture.spo_id;
        `)
        return result.rows;
    }
    
 

}

export default Spot;