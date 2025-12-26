function storageManager(data, state){
    const myKey = 'myData'
    if(state === 'select'){
        const info = localStorage.getItem(myKey)
        return JSON.parse(info) || []
    }
    else if(state === 'insert'){
        const currentData = JSON.parse(localStorage.getItem(myKey)) || []
        if(data){
            currentData.push(data)
            localStorage.setItem(myKey, JSON.stringify(currentData))
            return true
        }else{
            return false
        }
    }
    
    return false
}


export default storageManager