
import database from '../config/db_connector.js';

const getAll = async (req, res) => {
    try {
        const query = 'SELECT * FROM tb_post';
        const result = await database.query(query);
        res.render('blog', { 
            layout: 'mainLay', 
            title: 'LisbonSpots', 
            posts: result.rows 
        });
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ success: false, message: 'Error retrieving posts.' });
    }
};

export { getAll };
