
function seterror(id,error){
    var messages=`{${id}:{"error":${error}}}`;
    window.parent.postMessage(messages, '*');
}

function validateForm(){
    var returnval=true;

    var name=document.forms['myform']["fname"].value;

    if(name.length<4 || name.length>10){
        seterror("name","Length should be in between 4-10 characters!");
        returnval=false;
    }else{
        var phone=document.forms['myform']["fphone"].value;
            if(phone.length!=10){
            seterror("phone","Contact number should be of 10 digits!");
            returnval=false;
            }
        }
    if(returnval==true){
        var messages="{\"Success\":\"All Fields are Valid.\"}";
        window.parent.postMessage(messages, '*');
    }
    return returnval;
}



axios.get('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json')
    .then(response => {
        var countries = response.data;
        var countrySelect = document.getElementById("country-select");
        var stateSelect = document.getElementById("state-select");
        for(let i = 0; i < countries.length; i++) {
            var option = document.createElement("option");
            option.text = countries[i].name;
            option.value = countries[i].code;
            countrySelect.appendChild(option);
        }
        countrySelect.addEventListener('change', function(){

            var countryCode = document.getElementById("country-select");
            var selectedCountry = countryCode.options[countryCode.selectedIndex].text;
            //var selectedCountry = this.text;
            console.log(selectedCountry);
            var states = countries.find(el => el.name === selectedCountry).states;
            console.log(states);
            //stateSelect.innerHTML = "";
            if(states){
                for(let i = 0; i < states.length; i++) {
                    var option = document.createElement("option");
                    option.text = states[i].name;
                    option.value = states[i].code;
                    stateSelect.appendChild(option);
                }
            }
        });
    })
    .catch(error => {
        console.log(error);
    });


