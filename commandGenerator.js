const commands = []


const command1 = { name:"turn on the light one",index:1,words: [ {'turn':true,switch:true} , {on:true} , {the:true} , {light:true,bulb:true,lights:true} ,{on:true,one:true,ones:true}]}
const command2 = { name:"turn on the light one",index:2,
    words: [ {'turn':true,switch:true} , {on:true} , {the:true}, {dinning:true} , {light:true,bulb:true,lights:true}]}

const command4 = { name:"turn on the light one",index:2,
        words: [ {'turn':true,switch:true} , {on:true} , {dinning:true} , {light:true,bulb:true,lights:true}]}    
const command3 = { name:"turn off the light one",index:3,words: [ {'turn':true,switch:true} , {off:true} , {the:true}, {dinning:true} , {light:true,bulb:true,lights:true}]}

commands.push(command1,command2,command3,command4)


function findCommand(phrase){
    const words = phrase.split(" ")
    let filteredCommands = commands.map(e => e)
   
    for(let i = 0 ;  i< words.length;i++){
        const word = words[i];
        let tempCommands = []
        for(let  j = 0 ; j < filteredCommands.length;j++){
                const command = filteredCommands[j]
                if(command.words.length >=  i && command.words[i][word]){
                    tempCommands.push(command)
                }
        }
        // console.log(tempCommands)
        filteredCommands = tempCommands.map(e => e);
    }


   if(filteredCommands.length >0){
    return filteredCommands[0].name
   }

   return ""
}
