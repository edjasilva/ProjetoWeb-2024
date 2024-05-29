const getAll = async function(req, res){
    res.render('spots', {layout: 'mainLay', title: 'LisbonSpots', }
)};

export {getAll}