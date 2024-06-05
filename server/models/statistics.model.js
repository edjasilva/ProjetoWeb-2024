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
            SELECT
            category,
            COUNT(*) AS count,
            ROUND((COUNT(*) * 100.0) / (SELECT COUNT(*) FROM tb_commercialspot), 2) AS percentage
            FROM
            tb_commercialspot
            GROUP BY
            category;
        `;
        return (await db.query(text)).rows;
    },

    getAvgRating: async() =>{
        const avgResult = await db.query(`
          SELECT round(AVG(CAST(CAST(rating AS text) AS integer)), 3) AS avg_rating
          FROM tb_commercialspot
          WHERE category = 'museum';
        `);
        const avgRating = avgResult.rows[0].avg_rating;

        return avgRating;
    },

    getMaxRating : async () => {
        const maxResult = await db.query(`
          SELECT MAX(CAST(CAST(rating AS text) AS integer)) AS max_rating
          FROM tb_commercialspot
          WHERE category = 'museum';
        `);
        const maxRating = maxResult.rows[0].max_rating;
        return maxRating;
    },

    getMinRating : async () =>{

        const minResult = await db.query(`
          SELECT MIN(CAST(CAST(rating AS text) AS integer)) AS min_rating
          FROM tb_commercialspot
          WHERE category = 'museum';
        `);
        const minRating = minResult.rows[0].min_rating;
        return minRating;

    }


 
}






export default Statistics;