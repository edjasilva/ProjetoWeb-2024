import map from "../models/map.model.js"

const getAll= async function(req, res){

    try{
        const result = await map.getSpots();
        console.log(result);
    
        res.render('mapa', {layout: 'mapaLay', title: 'LisbonSpots', data: result});

    } catch (error) {
        throw new Error(error);
    }	
   

};



const getSpots = async (req, res) => {

    const result = await map.getSpots();
    res.send(result);
}


export {getAll, getSpots}



