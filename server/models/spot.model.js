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
        select tb.id as id, tb.name as name, tb.rating as rating, tb.category as category, tb_address.street as street, tb_address.zipcode as zipcode
        from tb_noncommercialspot as tb
        inner join tb_address on tb.add_id = tb_address.id
        where category = $1
        `;
        const values = [category];

        return (await db.query(text, values)).rows;
    },

    getAllNonSpot: async() =>{
        const result= await db.query(`
        select tb_noncommercialspot.name as name,  tb_noncommercialspot.description as description, tb_address.street as address, tb_picture.url as url
            from tb_noncommercialspot
            inner join  tb_address on tb_noncommercialspot.add_id = tb_address.id
            inner join tb_spot on tb_address.id=tb_spot.id
            inner join tb_picture on tb_spot.id=tb_picture.spo_id;
        `)
        return result.rows;
    },

    getByIdCom: async (id) => {
        const text = `
        select s1.name, s1.description, add.street as address
        from tb_commercialspot as s1
        join tb_address as add on s1.add_id = add.id
        where s1.id = $1
        `;
        const values = [id]

        return (await db.query(text, values)).rows;
    },

    getByCategoryCom: async (category) => {
        const text = `
       select tb.id as id, tb.name as name, tb.rating as rating, tb.category as category, tb_address.street as street, tb_address.zipcode as zipcode
        from tb_commercialspot as tb
        inner join tb_address on tb.add_id = tb_address.id
        where category = $1
        `;
        const values = [category];

        return (await db.query(text, values)).rows;
    },

    getAllComSpot: async() =>{
        const result= await db.query(`
        select tb_commercialspot.name as name,  tb_commercialspot.description as description, tb_address.street as address, tb_picture.url as url
            from tb_commercialspot
            inner join  tb_address on tb_commercialspot.add_id = tb_address.id
            inner join tb_spot on tb_address.id=tb_spot.id
            inner join tb_picture on tb_spot.id=tb_picture.spo_id;
            
        `)
        return result.rows;
    }, 
    
 

}

export default Spot;