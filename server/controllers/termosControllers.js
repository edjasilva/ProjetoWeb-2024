const getAll = async function(req ,res){
    res.render('termos', {layout: 'mainLay', title: 'LisbonSpots',})
};

export {getAll}