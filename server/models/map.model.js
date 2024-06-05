import db from "../config/db_connector.js"
const map ={
    getSpots: async () =>{
        const result= await db.query(
        `
        select com.id as id, com.name as name, com.rating as rating, st_asgeojson(loc.geom) as location , com.category::TEXT AS category, 'commercial-spot' as spot_type, address.street as street, address.zipcode as zipcode
        from tb_commercialspot as com
        inner join tb_location loc on  com.loc_id= loc.id
        inner join tb_address as address on com.add_id = address.id

        union

        select non.id as id, non.name as name,  non.rating as rating, st_asgeojson(loc.geom) as location , non.category::TEXT AS category, 'non-commercial-spot' as spot_type,  address.street as street, address.zipcode as zipcode
        from tb_noncommercialspot as non
        inner join tb_location loc on  non.loc_id= loc.id
        inner join tb_address as address on non.add_id = address.id
        `
        );

        result.rows.forEach(row => {
            row.location = JSON.parse(row.location);
        })
     
        return result.rows;
    }



    

}

export default map;