
const translateCategory = function(category) {
    const result = '';

    switch(category) {
        case 'restaurant':
            result =  'Restaurante';
        break;
        
        case 'hotel':
            result =  'Hotéis';
        break;

        case 'stadium':
            result =  'Estádios';
        break;

        case 'shopping':
            result =  'Centros comerciais';
        break;

        case 'museum':
            result =  'Museus';
        break;

        case 'beach':
            result =  'Praias';
        break;

        case 'park':
            result =  'Parques';
        break;

        case 'river':
            result =  'Rios';
        break;

        case 'waterfall':
            result =  'Cascatas';
        break;

        case 'mountain':
            result =  'Montanhas';
        break;

        case 'church':
            result =  'Igrejas';
        break;

        
    }

    return result;
}

export {translateCategory};