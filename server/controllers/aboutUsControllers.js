const getAll = async function(req, res){
    res.render('aboutUs', {layout: 'aboutUsLay', title: 'LisbonSpots', }
)};

export {getAll}