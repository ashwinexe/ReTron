function print_score(){
    const fs = require('fs');
    let data = 'GOAL!';
    fs.WriteFile('Output.txt', data, (err) => {
        if (err) throw err;
    })
}