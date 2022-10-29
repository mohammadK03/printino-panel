export function check(decoded,permission){
    if(!decoded){
        return false;
    }

    if(decoded.role==="admin"){
        return true;

    }else{
        if(decoded.permissions&& Array.isArray(decoded.permissions)){
            
            return eqPermissions(decoded.permissions,permission);

        }else{
            return false;
        }
    }

     
}

function eqPermissions(array1,permission){
    for(var a=0;a<array1.length;a++){
        
            if(array1[a].includes(permission)){
                return true;
            }
        
    }
    return false;
}