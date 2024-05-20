const getAll = async function(req ,res){
    res.render('termos', {layout: 'termosLay', title: 'LisbonSpots',})
};

export {getAll}