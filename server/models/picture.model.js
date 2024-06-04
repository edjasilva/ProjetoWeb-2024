import db from "../config/db_connector.js";
import { getByCategoryCom } from "../controllers/spotsControllers.js";

const picture = {
    getBySpotId: async (spotId) => {
        const text = `
        select url
        from tb_picture
        where spo_id =$1;
        `;
        const values = [spotId]

        return (await db.query(text, values)).rows;
    },
    getBySpotId: async (spotId, limit) => {
        const text = `
        select url
        from tb_picture
        where spo_id =$1
        limit $2;
        `;
        const values = [spotId, limit]

        return (await db.query(text, values)).rows;
    },

    getByNonCategorySpot: async(category)=>{
        const text =`
        select url
        from tb_picture as pic
        inner join tb_spot on tb_spot.id=pic.spo_id
        inner join tb_noncommercialspot on tb_noncommercialspot.id=tb_spot.id
        where category=$1
        `;
        const values = [category]
        return (await db.query(text, values)).rows;
    },

    getByNonCategorySpot: async(category)=>{
        const text =`
        select url
        from tb_picture as pic
        inner join tb_spot on tb_spot.id=pic.spo_id
        inner join tb_noncommercialspot on tb_noncommercialspot.id=tb_spot.id
        where category=$1
        `;
        const values = [category]
        return (await db.query(text, values)).rows;
    }


}

export default picture;