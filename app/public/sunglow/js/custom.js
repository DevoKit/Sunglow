
function clutchSelected()
{

    document.getElementById("controllsSelectClutch").style.display = 'block';

    document.getElementById("controllT").style.display = 'none';
}
function neoSelected()
{

    document.getElementById("controllsSelectNeo").style.display = 'block';
    document.getElementById("controllT").style.display = 'none';
}
function motorSelected()
{

    document.getElementById("controllsSelectMotor").style.display = 'block';
    document.getElementById("controllT").style.display = 'none';
}
function controllDataClutch() 
{
    var controllsDiv = document.getElementById("controllsSelectClutch");
    var controllsSelectClutch = document.createElement("select");
    controllsSelectClutch.id = "cClutch";
    controllsDiv.appendChild(controllsSelectClutch);
    controllsSelectClutch.className = "icons"

    var title = document.createElement("option");
    title.disabled = true;
    title.selected = true;
    title.textContent = "Select Controll";
    controllsSelectClutch.appendChild(title);

    var label = document.createElement("label");
    label.textContent = "Controlls"

    for (var i = 0; i < controlls.length; i++) {
        
        if(controlls[i].type == 'clutch')
        {
            var option = document.createElement("option");
            option.value = controlls[i].Name
            option.text = controlls[i].Name;
            option.setAttribute('data-icon',controlls[i].imagePath);
            controllsSelectClutch.appendChild(option);

        }
        
    }
    controllsDiv.appendChild(label);
    
}

function controllDataNeo() 
{
    var controllsDiv = document.getElementById("controllsSelectNeo");
    var controllsSelectNeo = document.createElement("select");
    controllsSelectNeo.id = "cNeo";
    controllsDiv.appendChild(controllsSelectNeo);
    controllsSelectNeo.className = "icons"

    var title = document.createElement("option");
    title.disabled = true;
    title.selected = true;
    title.textContent = "Select Controll";
    controllsSelectNeo.appendChild(title);

    var label = document.createElement("label");
    label.textContent = "Controlls"

    for (var i = 0; i < controlls.length; i++) {
        
        if(controlls[i].type == 'neo')
        {
            var option = document.createElement("option");
            option.value = controlls[i].Name
            option.text = controlls[i].Name;
            option.setAttribute('data-icon',controlls[i].imagePath);
            controllsSelectNeo.appendChild(option);

        }
        
    }
    controllsDiv.appendChild(label);
    
}

function controllDataMotor() 
{
    var controllsDiv = document.getElementById("controllsSelectMotor");
    var controllsSelectMotor = document.createElement("select");
    controllsSelectMotor.id = "cMotor";
    controllsDiv.appendChild(controllsSelectMotor);
    controllsSelectMotor.className = "icons"
    var title = document.createElement("option");
    title.disabled = true;
    title.selected = true;
    title.textContent = "Select Controll";
    controllsSelectMotor.appendChild(title);
    var label = document.createElement("label");
    label.textContent = "Controlls"
    for (var i = 0; i < controlls.length; i++) {
        if(controlls[i].type == 'motor')
        {
            var option = document.createElement("option");
            option.value = controlls[i].Name
            option.text = controlls[i].Name;
            option.setAttribute('data-icon',controlls[i].imagePath);
            controllsSelectMotor.appendChild(option);

        }
    }
    controllsDiv.appendChild(label);
}


function deflectionCoeficient(wsph, wspt, wspf, w, l, i)
{
    var T = ((wsph+wspt+wspf*l)*Math.pow(w, 3))/(384000*i);
    return T;
}
function rollupDiameter(r, tk, l)
{
    var RUD = 2*Math.sqrt(Math.pow(r, 2) + ((l +12)*tk)/Math.PI);
    return RUD;
}

function torque(wspf, wsph, w, l, r)
{
    var tor = (wspf*(l+12) + wsph)*r*w;
    return tor;
}
function lVal(dcs, r, t)
{
   var Lval = (((Math.pow(dcs, 2)/2) - Math.pow(r, 2))/t) - 12;
   return Lval;
}
function wMaxT(i, tadm, wsph, wspt, wspf, l, dcs, r, tk)
{
    var lMax = Math.min(lVal(dcs, r, tk),l);
    var WmaxT = Math.cbrt((384000*i*tadm)/(wsph + wspt + wspf*lMax));
    return WmaxT;
}
function lMaxT(i, tadm, wsph, wspt, wspf, w)
{
    var LmaxT = (((384000*i*tadm)/Math.pow(w,3)) + (-wsph - wspt))/wspf
    return LmaxT;
}


function setData()
{

    
    //Set Fabric Data
    var fabricsDiv = document.getElementById("fabricsDiv");
    var fabricsSelect = document.createElement("select");
    fabricsSelect.id = "fabricsSelect";
    fabricsDiv.appendChild(fabricsSelect);
    fabricsSelect.className = "icons"

    var title = document.createElement("option");
    title.disabled = true;
    title.selected = true;
    title.textContent = "Select Fabric";
    fabricsSelect.appendChild(title);

    var label = document.createElement("label");
    label.textContent = "Fabric"

    for (var i = 0; i < fabrics.length; i++) {
        var option = document.createElement("option");
        option.value = fabrics[i].FabricDescription;
        option.text = fabrics[i].FabricDescription;
        option.setAttribute('data-icon',fabrics[i].imagePath);
        fabricsSelect.appendChild(option);
    }
    fabricsDiv.appendChild(label);

    //Set Controll data
    
    controllDataClutch();
    controllDataNeo();
    controllDataMotor();

    //Set Valance Data
    var valanceDiv = document.getElementById("valanceDiv");
    var valanceSelect = document.createElement("select");
    valanceSelect.id = "valanceSelect";
    valanceDiv.appendChild(valanceSelect);
    valanceSelect.className = "icons"

    var title = document.createElement("option");
    title.disabled = true;
    title.selected = true;
    title.textContent = "Select Valance";
    valanceSelect.appendChild(title);

    var label = document.createElement("label");
    label.textContent = "Valance"

    for (var i = 0; i < valances.length; i++) {
        var option = document.createElement("option");
        option.value = valances[i].name;
        option.text = valances[i].name;
        option.setAttribute('data-icon',valances[i].imagePath);
        valanceSelect.appendChild(option);
    }
    valanceDiv.appendChild(label);

 
    //Set Hem Data
    var hemDiv = document.getElementById("hemDiv");
    var hemSelect = document.createElement("Select");
    hemSelect.id = "hemSelect";
    hemDiv.appendChild(hemSelect);
    hemSelect.className = "icons"

    var title = document.createElement("option");
    title.disabled = true;
    title.selected = true;
    title.textContent = "Select Hem/Bottom Bar";
    hemSelect.appendChild(title);

    var label = document.createElement("label");
    label.textContent = "Hem/Bottom Bars"

    for (var i = 0; i < hems.length; i++) {
        var option = document.createElement("option");
        option.value = hems[i].hemType;
        option.text = hems[i].hemType;
        option.setAttribute('data-icon',hems[i].imagePath);
        hemSelect.appendChild(option);
    }
    hemDiv.appendChild(label);

    //set trims Data

    var trimDiv = document.getElementById("trimDiv");
    var trimSelect = document.createElement("Select");
    trimSelect.id = "trimSelect";
    trimDiv.appendChild(trimSelect);
    trimSelect.className = "icons"

    var title = document.createElement("option");
    title.disabled = true;
    title.selected = true;
    title.textContent = "Select Trim Option";
    trimSelect.appendChild(title);

    var label = document.createElement("label");
    label.textContent = "Trims"

    for (var i = 0; i < trims.length; i++) {
        var option = document.createElement("option");
        option.value = `${trims[i].collection}: ${trims[i].name}`;
        option.text =`${trims[i].collection}: ${trims[i].name}`;;
        option.setAttribute('data-icon',trims[i].imagePath);
        trimSelect.appendChild(option);
    }
    trimDiv.appendChild(label);

    //set pulls data
    var pullDiv = document.getElementById("pullDiv");
    var pullSelect = document.createElement("Select");
    pullSelect.id = "pullSelect";
    pullDiv.appendChild(pullSelect);
    pullSelect.className = "icons"

    var title = document.createElement("option");
    title.disabled = true;
    title.selected = true;
    title.textContent = "Select pull Option";
    pullSelect.appendChild(title);

    var label = document.createElement("label");
    label.textContent = "Pulls"

    for (var i = 0; i < pulls.length; i++) {
        var option = document.createElement("option");
        option.value = `${pulls[i].collection}: ${pulls[i].name}`;
        option.text =`${pulls[i].collection}: ${pulls[i].name}`;;
        option.setAttribute('data-icon',trims[i].imagePath);
        pullSelect.appendChild(option);
    }
    pullDiv.appendChild(label);
     

}

function secondCard(V,H,T,P)
{
    // return trim colors

    var trimColor = document.getElementById("trimColor");
    var trimColorSelect = document.createElement("Select");
    trimColorSelect.id = "trimColorSelect";
    trimColor.appendChild(trimColorSelect);
    trimColorSelect.className = "icons"

    var title = document.createElement("option");
    title.disabled = true;
    title.selected = true;
    title.textContent = "Select Trim Color Option";
    trimColorSelect.appendChild(title);

    var label = document.createElement("label");
    label.textContent = "Trim Colors"

    for (var i = 0; i < trims.length; i++) {
        
        if (trims[i].collection+": "+trims[i].name == T)
        {
            for(var j = 0; j < trims[i].colors.length; j++)
            {
                var option = document.createElement("option");
                option.value = trims[i].colors[j];
                option.text = trims[i].colors[j];
                trimColorSelect.appendChild(option);
                
            }
            
        }
        
    }
    trimColor.appendChild(label);

    //return pull color

    var pullColor = document.getElementById("pullColor");
    var pullColorSelect = document.createElement("Select");
    pullColorSelect.id = "pullColorSelect";
    pullColor.appendChild(pullColorSelect);
    pullColorSelect.className = "icons"

    var title = document.createElement("option");
    title.disabled = true;
    title.selected = true;
    title.textContent = "Select Pull Color Option";
    pullColorSelect.appendChild(title);

    var label = document.createElement("label");
    label.textContent = "Pull Colors"

    for (var i = 0; i < pulls.length; i++) {
        
        if (pulls[i].collection+": "+pulls[i].name == P)
        {
            for(var j = 0; j < pulls[i].colors.length; j++)
            {
                var option = document.createElement("option");
                option.value = pulls[i].colors[j];
                option.text =pulls[i].colors[j];
                pullColorSelect.appendChild(option);
                
            }
            
        }
        
    }
    pullColor.appendChild(label);
    console.log(pullColor) 

    //return valance finish

    var valanceFinish = document.getElementById("valanceFinish");
    var valanceFinishSelect = document.createElement("Select");
    valanceFinishSelect.id = "valanceFinishSelect";
    valanceFinish.appendChild(valanceFinishSelect);
    valanceFinishSelect.className = "icons"

    var title = document.createElement("option");
    title.disabled = true;
    title.selected = true;
    title.textContent = "Select Valance Finish";
    valanceFinishSelect.appendChild(title);

    var label = document.createElement("label");
    label.textContent = "Valance Finish"

    for (var i = 0; i < valances.length; i++) {
        
        if (valances[i].name == V)
        {
            for(var j = 0; j < valances[i].finishes.length; j++)
            {
                var option = document.createElement("option");
                option.value = valances[i].finishes[j];
                option.text = valances[i].finishes[j];
                valanceFinishSelect.appendChild(option);
                
            }
            
        }
        
    }
    valanceFinish.appendChild(label);
    console.log(valanceFinish) 

    //return hem finishes
    var hemFinish = document.getElementById("hemFinish");
    var hemFinishSelect = document.createElement("Select");
    hemFinishSelect.id = "hemFinishSelect";
    hemFinish.appendChild(hemFinishSelect);
    hemFinishSelect.className = "icons"

    var title = document.createElement("option");
    title.disabled = true;
    title.selected = true;
    title.textContent = "Select Hem Finish";
    hemFinishSelect.appendChild(title);

    var label = document.createElement("label");
    label.textContent = "Hem Finish"

    for (var i = 0; i < hems.length; i++) {
        
        if (hems[i].hemType == H)
        {
            for(var j = 0; j < hems[i].finishes.length; j++)
            {
                var option = document.createElement("option");
                option.value = hems[i].finishes[j];
                option.text = hems[i].finishes[j];
                hemFinishSelect.appendChild(option);
                
            }
            
        }
        
    }
    hemFinish.appendChild(label);
    console.log(hemFinish) 
    

    $('select').material_select();
}



function results()
{
    var valance = document.getElementById("valanceSelect").value;
    var hem = document.getElementById("hemSelect").value;
    var trim = document.getElementById("trimSelect").value;
    var pull = document.getElementById("pullSelect").value;
    
    //load second card data
    secondCard(valance,hem,trim,pull)
    
    
    var width =  parseFloat(document.getElementById("width").value);
    var length =  parseFloat(document.getElementById("height").value);

    var fabric = document.getElementById("fabricsSelect").value;

    var controll1 = document.getElementById("cClutch").value;
    var controll2 = document.getElementById("cNeo").value;
    var controll3 = document.getElementById("cMotor").value;
    var controll;

    if(controll1 == "Select Controll"&& controll2 == "Select Controll")
    {
        controll = controll3
    }
    else if(controll1 == "Select Controll"&& controll3 == "Select Controll")
    {
        controll = controll2

    }else{controll = controll1}



    
    if(isNaN(width))
    {
        document.getElementById("result0").textContent = "Width not selected. please enter Width.";
        document.getElementById("result0").style.color = 'red';

    }else{
        document.getElementById("result0").textContent = "";

    }

    if(isNaN(length))
    {
        document.getElementById("result1").textContent = "Height not selected. please enter Height.";
        document.getElementById("result1").style.color = 'red';

    }else{
        document.getElementById("result1").textContent = "";

    }

   
    if(fabric != "Select Fabric")
    {
        
        for(var fabricObj in fabrics)
        {
            if(fabrics[fabricObj].FabricDescription == fabric)
            {
                //wspf converted to proper units before beingn used
            var WspF = fabrics[fabricObj].WspF*0.000048225;
            var Tadm = fabrics[fabricObj].Tadm*1000;
            var TK = fabrics[fabricObj].ThicknessTk;
            }
        }
        
        document.getElementById("result2").textContent = " ";
    }else{
        document.getElementById("result2").textContent = "Fabric not selected. please select a Fabric.";
        document.getElementById("result2").style.color = 'red';

    }

    
    if(controll != "Select Controll")
    {
    for(var controllObj in controlls)
    {
       
        if(controlls[controllObj].Name == controll)
        {
            var Tmax = controlls[controllObj].Tmax;
            var minWidth = controlls[controllObj].minWidth;
            var acceptedTubes = controlls[controllObj].acceptedTubes;
            var notAcceptedValances = controlls[controllObj].notAcceptedValances;
        }

        document.getElementById("result3").textContent = "";
    }
    }else{
        
        document.getElementById("result3").textContent = "Controll type not selected. please select Controll.";
        document.getElementById("result3").style.color = 'red';
    }


    

    if( valance != "Select Valance")
    {
        for(var valanceObj in valances)
        {
            if(valances[valanceObj].name == valance)
            {
                var Dcs = valances[valanceObj].Dcs;
                
            }
        }
        document.getElementById("result4").textContent = "";
    }else{
        document.getElementById("result4").textContent = "Valance type not selected. please select Valance.";
        document.getElementById("result4").style.color = 'red';
    }

    if(hem != "Select Hem/Bottom Bar")
    {
        for(var hemObj in hems)
        {
            if(hems[hemObj].hemType == hem)
            {
                var WspH = hems[hemObj].WspH
            }
        }
        document.getElementById("result5").textContent = "";
    }else{
        document.getElementById("result5").textContent = "Hem type not selected. please select Hem.";
        document.getElementById("result5").style.color = 'red';
    }

    
    for(var tubeObj in tubes)
    {
        var TT = tubes[tubeObj].TubeType;
        var Wspt = tubes[tubeObj].WspT
        var I = tubes[tubeObj].MomentofInertia;
        var radius = tubes[tubeObj].TubeRadius;

        //choose right tube  
         if(deflectionCoeficient(WspH, Wspt, WspF, width, length, I) < Tadm)
         {
             if(torque(WspF, WspH, width, length, radius) < Tmax)
             {
                break;
                 

             }
             
         }

 
    }

    if(hem != "Select Hem/Bottom Bar" && valance != "Select Valance" && controll != "Select Controll" && fabric != "Select Fabric" && !isNaN(width) && !isNaN(length))
    {
        if(rollupDiameter(radius,TK, length,) < Dcs)
                 {
                    if(width<240)
                    {
                        if(width>32)
                        {
            
                            document.getElementById('result1').innerText = 
                            `
                            TT: ${TT}
                            Width:${width}
                            Length:${length}
                            WspH:${WspH}
                            Wspt:${Wspt}
                            Moment of Inertia: ${I}
                            radius: ${radius}
                            Dcs: ${Dcs}
                            WspF: ${WspF}
                            Tadm:${Tadm},
                            Fabric Thickness:${TK}
                            Tmax: ${Tmax}
                            Min Width: ${minWidth}
                            Accepted Tubes: ${acceptedTubes}
                            Not Accepted Valance: ${notAcceptedValances}
                            Deflection Coeficient: ${deflectionCoeficient(WspH, Wspt, WspF, width, length, I)}
                            Torque: ${torque(WspF, WspH, width, length, radius)}
                            RUD: ${rollupDiameter(radius,TK, length,)}
                            Lval: ${lVal(Dcs, radius, TK)} 
                            WmaxT: ${wMaxT(I, Tadm, WspH, Wspt, WspF, length, Dcs, radius, TK)}
                            LmaxT: ${lMaxT(I, Tadm, WspH, Wspt, WspF, width,)}
                            `
                            document.getElementById("result1").style.color = 'black'
                            
            
                        }else{document.getElementById('result1').innerText = "Width of shade too small"}
                    }else{document.getElementById('result1').innerText = "Width of shade too large for selected controll"}
                    
                 }else{document.getElementById('result1').innerText = "Shade too big for selected valance. Modify valance or contact customer service for details."}
        
                            
                 document.getElementById('config2').style.display = 'block'                  
    }

    
    setOrder(width,length, fabric, trim, valance, hem, trimColor, valanceFinish, hemFinish);

}
function setOrder(wi,le, fa, co, tr, va, he, trc, vaf, hef)
{
    
    document.getElementById("widthResult").innerText = wi;
    document.getElementById("heightResult").innerText = le;
    document.getElementById("fabricResult").innerText = fa;
    document.getElementById("trimResult").innerText = co;
    document.getElementById("valanceResult").innerText = tr;
    document.getElementById("hemResult").innerText = va;
    document.getElementById("fabricFinish").innerText = "White";
    document.getElementById("trimFinishResult").innerText = "White";
    document.getElementById("valanceFinishResult").innerText = "Delux";
    document.getElementById("hemFinishResult").innerText = "Delux";

    

}

function addToOrder()
{
    var BlinID = document.getElementById("blindID").value;
    var blindQuantity = document.getElementById("blindQuantity").value;

document.getElementById("totalOrderList").innerHTML += `<li class="collection-item"><div>${BlinID}<a href="#!" class="secondary-content">X${blindQuantity}</a></div></li>`

}

setData();