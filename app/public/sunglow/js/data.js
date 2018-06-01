




    var returnedData 

    $.ajax({
        url: "/blindData",
        success: function(data) {
            returnedData = data
        },
        async:false
     });

    const controlls = returnedData.Controlls
    const hems = returnedData.hems
    const valances = returnedData.valances
    const tubes = returnedData.tubes
    const fabrics = returnedData.fabrics
    const trims = returnedData.trims
    const pulls = returnedData.pulls



