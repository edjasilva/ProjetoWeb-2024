import db from "../config/db_connector.js"
const map ={
    getSpots: async () =>{
        const result= await db.query(

            `
            select spo.id, spo.name, spo.rating, st_asgeojson(loc.geom) as location , com.category::TEXT AS category, 'commercial-spot' as spot_type
            from tb_commercialspot as com
            inner join tb_spot spo on com.id=spo.id
            inner join tb_location loc on  spo.loc_id= loc.id
        
        union
        
        select spo.id, spo.name,  spo.rating, st_asgeojson(loc.geom) as location , non.category::TEXT AS category, 'non-commercial-spot' as spot_type
            from tb_noncommercialspot as non
            inner join tb_spot spo on non.id=spo.id
            inner join tb_location loc on  spo.loc_id= loc.id
            `
            
        );
        result.rows.forEach(row => {
            row.location = JSON.parse(row.location);
        })
     
        return result.rows;
    }



    

}

export default map;