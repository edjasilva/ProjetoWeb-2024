import Statistics from "../../models/statistics.model.js";

const getAll = async function(req, res){
    res.render('dashboard', {layout: 'adminLay', title: 'LisbonSpots', }
)};


const getCountByCategory = async (req, res) => {
    const result = await Statistics.getCountByCategory();

    res.send(result);
}

const getRatingByCategory= async(req, res) => {
    const result = await Statistics.getRatingByCategory();
    res.send(result);
   }

const getCountComCategory = async (req, res) =>{
    const result = await Statistics.getCountComCategory();
    res.send(result);
}

const getAvgValue= async(req, res)=>{
    const result = await Statistics.getAvgValue();
    res.send(result);
}
       

export {getAll, getCountByCategory, getRatingByCategory, getCountComCategory, getAvgValue}


