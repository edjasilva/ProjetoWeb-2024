const getAll = async function(req, res){
    res.render('dashboard', {layout: 'dashboardLay', title: 'LisbonSpots', }
)};

export {getAll}