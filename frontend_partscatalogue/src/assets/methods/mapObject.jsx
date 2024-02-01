function mapObject(object , callback) {
    for (var i in object){
        callback(i, object[i])
    }
} 
// const ABC = "123"
// export {ABC}
export {mapObject} 