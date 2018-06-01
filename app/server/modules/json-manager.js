
var fs = require('fs');

function getJSON()  
    {
        
        var file = __dirname+'/data.json'
        var data = fs.readFileSync(file)
        var parsedData = JSON.parse(data);
        return parsedData;
    }   

    // get json elements
    exports.getControlls = function()
    {
        var controlls = getJSON().Controlls; 
        return controlls;
    }

    exports.getHems = function()
    {
        var hems = getJSON().hems;
        return hems;
    }

    exports.getValances = function()
    {
        var valances = getJSON().valances;
        return valances;

    }
    exports.getTubes = function()
    {
        var tubes = getJSON().tubes;
        return tubes;
    }

    exports.getFabrics = function()
    {
        var fabrics = getJSON().fabrics;
        return fabrics;
    }

    exports.getTrims = function()
    {
        var trims = getJSON().trims;
        return trims;
    }

    exports.getPulls = function()
    {
        var pulls = getJSON().pulls;
        return pulls;
    }

    //add new elements
    exports.addNewController = function(newController)
    {
        var file = __dirname+'/data.json'
        var data = fs.readFileSync(file)
        var parsedData = JSON.parse(data);

        parsedData.Controlls.push(newController);
        
        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));
        
    }

    exports.addNewHem = function(newHem)
    {
        var file = __dirname+'/data.json'
        var data = fs.readFileSync(file)
        var parsedData = JSON.parse(data);
        
        parsedData.hems.push(newHem);
        
        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));
        
    }

    exports.addNewValance = function(newValance)
    {
        var file = __dirname+'/data.json'
        var data = fs.readFileSync(file)
        var parsedData = JSON.parse(data);
        
        parsedData.valances.push(newValance);
        
        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));
        
    }

    exports.addNewFabric = function(newFabric)
    {
        var file = __dirname+'/data.json'
        var data = fs.readFileSync(file)
        var parsedData = JSON.parse(data);
        
        parsedData.fabrics.push(newFabric);
        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));
        
    }

    exports.addNewTrim = function(newTrim)
    {
        var file = __dirname+'/data.json'
        var data = fs.readFileSync(file)
        var parsedData = JSON.parse(data);
        
        parsedData.fabrics.push(newTrim);
        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));

    }

    exports.addNewPull = function(newPull)
    {
        var file = __dirname+'/data.json'
        var data = fs.readFileSync(file)
        var parsedData = JSON.parse(data);
        
        parsedData.fabrics.push(newPull);
        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));

    }

    exports.addNewMCT = function(newMCT)
    {
        var file = __dirname+'/data.json'
        var data = fs.readFileSync(file)
        var parsedData = JSON.parse(data);
        
        parsedData.fabrics.push(newMCT);
        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));

    }

    exports.addNewPowerOption = function(newPowerOption)
    {
        var file = __dirname+'/data.json'
        var data = fs.readFileSync(file)
        var parsedData = JSON.parse(data);
        
        parsedData.fabrics.push(newPowerOption);
        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));

    }

    exports.addNewRemoteOption = function(newRemoteOption)
    {
        var file = __dirname+'/data.json'
        var data = fs.readFileSync(file)
        var parsedData = JSON.parse(data);
        
        parsedData.fabrics.push(newRemoteOption);
        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));

    }

    //delete elements

    exports.deleteControll = function(controllIndex)
    {
        var file = __dirname+'/data.json';
        var data = fs.readFileSync(file);
        var parsedData = JSON.parse(data);

        var index = controllIndex.controllDeleteIndex-1;
        
        parsedData.Controlls.splice(index, 1);

        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));

    }

    exports.deleteControll = function(controllIndex)
    {
        var file = __dirname+'/data.json';
        var data = fs.readFileSync(file);
        var parsedData = JSON.parse(data);

        var index = controllIndex.controllDeleteIndex-1;
        
        parsedData.Controlls.splice(index, 1);

        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));

    }

    exports.deleteHem = function(controllIndex)
    {
        var file = __dirname+'/data.json';
        var data = fs.readFileSync(file);
        var parsedData = JSON.parse(data);

        var index = controllIndex.controllDeleteIndex-1;
        
        parsedData.hems.splice(index, 1);

        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));

    }

    exports.deleteValance = function(controllIndex)
    {
        var file = __dirname+'/data.json';
        var data = fs.readFileSync(file);
        var parsedData = JSON.parse(data);

        var index = controllIndex.controllDeleteIndex-1;
        
        parsedData.valances.splice(index, 1);

        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));

    }

    exports.deleteFabric = function(controllIndex)
    {
        var file = __dirname+'/data.json';
        var data = fs.readFileSync(file);
        var parsedData = JSON.parse(data);

        var index = controllIndex.controllDeleteIndex-1;
        
        parsedData.fabrics.splice(index, 1);

        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));

    }

    exports.deleteTrim = function(controllIndex)
    {
        var file = __dirname+'/data.json';
        var data = fs.readFileSync(file);
        var parsedData = JSON.parse(data);

        var index = controllIndex.controllDeleteIndex-1;
        
        parsedData.fabrics.splice(index, 1);

        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));

    }
    exports.deletePull = function(controllIndex)
    {
        var file = __dirname+'/data.json';
        var data = fs.readFileSync(file);
        var parsedData = JSON.parse(data);

        var index = controllIndex.controllDeleteIndex-1;
        
        parsedData.fabrics.splice(index, 1);

        fs.writeFileSync(file, JSON.stringify(parsedData, null, 2));

    }




    exports.blindData = function()
    {

        var file = __dirname+'/data.json'
        var data = fs.readFileSync(file)
        var parsedData = JSON.parse(data);
        return parsedData;

    }

    exports.getOrderData = function()
    {
        var orderFile = __dirname+'/orders.json'
        var orderData = fs.readFileSync(orderFile)
        var parsedOrderData = JSON.parse(orderData)

        return parsedOrderData
    }

    

    
