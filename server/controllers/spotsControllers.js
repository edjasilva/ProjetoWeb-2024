import spot from "../models/spot.model.js"
import picture from "../models/picture.model.js";
import {translateCategory} from '../utils/norm.js'

 /*
const getAll = async function(req, res){
    res.render('spots', {layout: 'mainLay', title: 'LisbonSpots', }
)};
*/ 

// Spots não comerciais
const getAllNonSpot = async (req, res) => {

    const result = await spot.getAllNonSpot();
    res.send(result);

}

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

const getByCategoryNon = async function (req, res) {
    
        const spots = await spot.getByCategoryNon(req.query.category);

        for (let si of spots){
            si.category = translateCategory(si.category);

            const pics = await picture.getBySpotId(si.id, 3);
            si.pics = pics;
        }

        console.log(JSON.stringify(spots, null, 2));

        res.render('spots-by-category', {
            layout: 'mainLay',
            title: 'Spots Não Comerciais',
            spots: spots
        });
    };


// Spots comerciais
const getAllComSpot = async (req, res) => {

    const result = await spot.getAllComSpot();
    res.send(result);

}

const getByIdCom = async function(req, res){
    const spotInfo = await spot.getByIdCom(req.params.id);
    const pictures = await picture.getBySpotId(req.params.id);
    const mainPics = [pictures.pop(), pictures.pop()];

    res.render('spots', {
        layout: 'mainLay',
        title: 'Spots comerciais',
        info: spotInfo[0],
        mainPics,
        pics: pictures
    });
}


const getByCategoryCom = async function (req, res) {
    
    const spots = await spot.getByCategoryCom(req.query.category);

    for (let si of spots){
        si.category = translateCategory(si.category);

        const pics = await picture.getBySpotId(si.id, 3);
        si.pics = pics;
    }

    console.log(JSON.stringify(spots, null, 2));

    res.render('spots-by-categoryCom', {
        layout: 'mainLay',
        title: 'Spots Comerciais',
        spots: spots
    });
};


export { getAllNonSpot, getByIdNon, getByCategoryNon, getByCategoryCom, getAllComSpot, getByIdCom}