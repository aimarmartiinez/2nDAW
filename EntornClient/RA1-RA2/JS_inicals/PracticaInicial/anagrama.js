function isAnagram(p1, p2) {
    if (p1 === p2) {
        return false;
    }
    if (p1.length !== p2.length) {
        return false;
    }

    p1 = p1.toLowerCase();
    p2 = p2.toLowerCase();

    let array1 = p1.split('').sort();
    let array2 = p2.split('').sort();

            
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
        return true;
}
console.log(isAnagram("roma", "amor"));
console.log(isAnagram("hola", "hola")); 
console.log(isAnagram("perro", "gato"));