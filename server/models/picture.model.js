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
    }


}

export default picture;