import spot from "../models/spot.model.js"
import picture from "../models/picture.model.js";

const getAll = async function(req, res){
    res.render('spots', {layout: 'mainLay', title: 'LisbonSpots', }
)};

const getByIdNon = async function(req, res){
    const spotInfo = await spot.getByIdNon(req.params.id);
    const pictures = await picture.getBySpotId(req.params.id);
    const mainPics = [pictures.pop(), pictures.pop()];

    res.render('spots', {
        layout: 'mainLay',
        title: 'Spots não comerciais',
        info: spotInfo[0],
        mainPics,
        pics: pictures
    });
}

const getByCategoryNon = async function (req, res){
    const result  = await spot.getByCategoryNon(req.query.category);

    console.log(result);

    res.end();
}


const getNonSpot = async (req, res) => {

    const result = await spot.getNonSpot();
    console.log(result); 
    res.send(result);

}

export {getAll, getNonSpot, getByIdNon, getByCategoryNon}