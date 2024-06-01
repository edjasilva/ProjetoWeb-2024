import Statistics from "../../models/statistics.model.js";
import database from "../../config/db_connector.js"

const getAll = async function(req, res){

    try {
        // Consulta para obter a média
        const avgRating = await Statistics.getAvgRating();
    
        const maxRating = await Statistics.getMaxRating();
    
        const minRating = await Statistics.getMinRating();
    
        
        res.render('dashboard', { layout: 'adminLay', avg: avgRating, max: maxRating, min: minRating });
      } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).send('Erro no servidor');
      }
};


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

   

export {getAll, getCountByCategory, getRatingByCategory, getCountComCategory}


