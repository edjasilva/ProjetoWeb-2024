const getAll= async function(req, res){
    res.render('home', {layout: 'homeLay', title: 'LisbonSpots',}

)};

export {getAll}