import picture from "../models/picture.model.js";
import spot from "../models/spot.model.js"

const getAll= async function(req, res){
    res.render('nonComSpots' , {layout: 'mainLay' , title: 'LisbonSpots',}

)};

const getByCategoryNon = async function (req, res){
    const result  = await spot.getByCategoryNon(req.query.category);
   
    console.log(result);
    res.render('nonComSpots' , {layout: 'mainLay' , title: 'LisbonSpots', info: result })
    res.end();
}



const getByIdNon = async function(req, res){
    const spotInfo = await spot.getByIdNon(req.params.id);
    const pictures = await picture.getBySpotId(req.params.id);
    const mainPics = [pictures.pop(), pictures.pop()];

    res.render('nonComSpots', {
        layout: 'mainLay',
        title: 'Spots ',
        info: spotInfo[0],
        mainPics,
        pics: pictures
    });
}

export {getAll, getByCategoryNon }