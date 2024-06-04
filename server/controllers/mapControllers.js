import map from "../models/map.model.js"
import picture from "../models/picture.model.js";

const getAll= async function(req, res){

    try{
        const spots = await map.getSpots();
        
        for (let si of spots){
            const pic = await picture.getBySpotId(si.id, 1);
            si.pic = pic[0];
        }
        console.log(spots);
        
        res.render('mapa', {
            layout: 'mapaLay', 
            title: 'LisbonSpots', 
            data: spots
        });

    } catch (error) {
        throw new Error(error);
    }	
   

};


export {getAll}



