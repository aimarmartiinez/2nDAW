let div = document.querySelector('#app');
if(div){
    for(let element of div.children){
        for(let child of element.children){
            console.log(child);
        }
    }
}