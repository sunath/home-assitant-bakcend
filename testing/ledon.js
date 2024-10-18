const ip = "http://192.168.8.84.57/"

function led1Off(){
    fetch("http://192.168.84.57/light1off",{method:"GET"}).then((response) => {
        console.log(response)
    }).catch(error => console.log(error))
}

function led1On(){
    fetch("http://192.168.84.57/light1on",{method:"GET"}).then((response) => {
        console.log(response)
    }).catch(error => console.log(error))
}


// led1On();
led1Off()