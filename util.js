function getRandomValue(array){
    const randomElement = array[Math.floor(Math.random() * array.length)];
    return randomElement;
}

function doSomeHeavyTask() {
    const ms = getRandomValue([1000, 2000, 3000, 4000, 5000]);
    const shouldThrowError = getRandomValue([1,2,3,4,5,6,7,8]) === 8;
    if (shouldThrowError) {
        const randomError = getRandomValue([
            "DB Sync Failure",
            "DB Server is Down",
            "Access Denied",
            "Not Found Error",
        ]);
        throw new Error(randomError);
    }
    return new Promise((resolve, reject) => setTimeout(() => resolve(ms), ms) );
}

module.exports = doSomeHeavyTask;