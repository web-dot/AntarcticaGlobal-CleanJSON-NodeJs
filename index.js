const https = require('https');
https.get('https://coderbyte.com/api/challenges/json/json-cleaning', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    })

    resp.on('end', () => {
        try{
            const parsedData = JSON.parse(data);
            console.log(parsedData);
            const cleanedData = cleanData(parsedData);
            // test(parsedData);
            console.log(cleanedData);
        }catch(error){
            console.log(error.message);
        }
    });


    function test(obj){
        for(const key in obj){
            console.log('isarray ', Array.isArray(obj[key]));
            console.log('isobject ', typeof obj[key] === 'object');
            console.log('length ', obj[key].length);
            console.log('Obj-keys', Object.keys(obj[key]).length === 0);
            console.log();
        }
    }



    function cleanData(obj){
        let itemsRemoved = 0;
        for(const key in obj){
            // check if obj has key as property
            if(obj.hasOwnProperty(key)){
                // check if the value of the key is an array
                if(Array.isArray(obj[key])){
                    const initialLength = obj[key].length;
                    // apply filter to get an array without the unwanted values
                    obj[key] = obj[key].filter(item => item !== 'N/A' && item !== '-' && item !== '');
                    itemsRemoved += initialLength - obj[key].length;
                }else if(typeof obj[key] === 'object'){
                    cleanData(obj[key]);
                    if(Object.keys(obj[key]).length === 0){
                        delete obj[key];
                        itemsRemoved++;
                    }
                }else{
                    if(obj[key] === 'N/A' || obj[key] === '-' || obj[key] === ''){
                        delete obj[key];
                        itemsRemoved++;
                    }
                }
            }
        }
        obj.items_removed = itemsRemoved;
        return obj;
    }
})