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

        function clean(obj){
            for(const key in obj){
                if(obj.hasOwnProperty(key)){
                    // if value is array - TEST 1
                    if(Array.isArray(obj[key])){
                        console.log('T1');
                        const initialLength = obj[key].length;
                        obj[key] = obj[key].filter(item => item !== 'N/A' && item !== '-' && item !== '');
                        itemsRemoved += initialLength - obj[key].length;
                        // if value is object - TEST - 2
                    }else if(typeof obj[key] === 'object'){
                        console.log('T2');
                        clean(obj[key]);
                        if(Object.keys(obj[key]).length === 0){
                            console.log('deleted ', key, obj[key]);
                            delete obj[key];
                            itemsRemoved++;
                        }
                    }else{
                        // if value is 'N/A' or '-' or '' - TEST 3
                        if(obj[key] === 'N/A' || obj[key] === '-' || obj[key] === ''){
                            console.log('T3');
                            console.log('deleted ', key, obj[key]);
                            delete obj[key];
                            itemsRemoved++;
                        }
                    }
                }
            }
        }
        clean(obj);
        obj.items_removed = itemsRemoved;
        return obj;
    }
})



