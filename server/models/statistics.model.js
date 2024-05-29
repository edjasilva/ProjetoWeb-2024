import db from "../config/db_connector.js";

const Statistics = {
    getCountByCategory: async () => {
        const text = `
            select category, count(*)
            from tb_noncommercialspot
            group by category;
        `;

        return (await db.query(text)).rows;
    },

    getRatingByCategory: async() =>{
        const text = `
        select  category, rating, name
        from tb_commercialspot
        where category='museum'
        order by rating
        ;
        `;
        return (await db.query(text)).rows;
    
    },
    getCountComCategory: async() =>{
        const text= `
        select category, count(*)
        from tb_commercialspot
        group by category;
        `;
        return (await db.query(text)).rows;
    }
}



export default Statistics;