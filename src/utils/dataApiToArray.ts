const reformatObjectToArrayFireBase = <T extends object>(itemObject: {[key: string]: T}): (T & { id: string })[] => {
    if (itemObject) {
        return Object.keys(itemObject).map(idDish => {
            return {
                ...itemObject[idDish],
                id: idDish,
            };
        });
    } else {
        return [];
    }
};

export default reformatObjectToArrayFireBase;