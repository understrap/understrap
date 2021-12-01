const del = require('del');

// directory path
const dir = './dist';

// delete directory recursively
(async () => {
    try {
        await del(dir);

        console.log(`${dir} is deleted!`);
    } catch (err) {
        console.error(`Error while deleting ${dir}.`);
    }
})();
