//generate a random number
//Parameters: min and max, two integers, the limits of the random generation
var meyer_random = (min, max) => Math.floor(( Math.random() * (max - min + 1)) + min);


//generic ajax request. 
//Parameters: url - the url to the GET/POST route that´ll handle the request | verb: GET or POST | data: object data to be handled by the server | callback and callbackError (optional): some function to be executed after the AJAX response and the msg arrives in both cases, error or success.
//Dependencies: JQuery
/* var meyer_ajax = async ({paramUrl, verb, data, dataType = 'json', callback, callbackError}) => {
    let response;    
    await $.ajax({type: verb,
        url,
        data,
        dataType
    }).done( function( msg ) {
        response = msg;  
        if (callback) {
            callback(msg);
        }      
    }).fail(function(msg){
        response = msg; 
        if (callbackError) {
            callbackError(msg);
        }
    });
    return response;
}; */


var meyer_ajax_msg_callback = (msg, t) => {
    meyer_showMessage({msg}, t)
};


//Smooth scroll to the given element, with an offset option. Container is the container where the scroll will occur. By default it is set to html; Selector is a selector or the element itself to be in the top of the screen after the scroll. Offset is the offset relative to te top of the screen. Callback is a function executed after the scroll finishes. 
//Dependencies: Depends on jquery.
/* let meyer_scrollTo = ({selector, offset, callback, container = 'html'}) => {
    $(container).animate({ scrollTop: $(selector).offset().top + offset}, 'slow', () => {        
        if (callback) {  
            callback(); 
        }
    });
}; */

//function to pause the code execution for pre-determined time, in milisseconds.
//Parameters: ms - time to wait, in miliseconds.
//Dependencies: should be inside an async function
var meyer_sleep = ms => new Promise(resolve => setTimeout(resolve,ms));



//adds fade in/out to show/hide an element
//parameters - action: show or hide. s: selector of an UNIQUE element to show or hide, ft: fade time: the time to hide or show the element, in miliseconds, after the oppacity transition. It´s optional. If omitted, the element will not hide, only became invisible.
//Hidden is a class with the display property equals to none. Transparent is a class with the opacity and pointer events properties equals to 0 and none, respectively.
var meyer_visibility = (action, s, ft) => { 
    let element = document.querySelector(s);
    if (action === "show") {
        element.classList.remove("hidden");        
        setTimeout(function(){
            element.classList.remove("transparent");
        }, 50);        
    } else {
        element.classList.add("transparent");
        if(ft) {
            setTimeout(function(){
                element.classList.add("hidden");
            }, ft); 
        }
    }    
};


// showMessage creates a DIV, children of the body, to show a message for a given time. 
//Parameters - Object: an object with the contents text header, close icon and the message itself | t: exibition time. Leave it 0 for permanent exibition | callback: a function to execute when shows the mesage, like aply blur effect on the background, removes the hidden and transparent classes from the overlay, etc.
//Dependencies: meyer_visibility function. 
//example:
/* meyer_showMessage({
    textHeader:`Attention!`, 
    closeIcon: `<i class="fa fa-times"></i>`, 
    message:`<h2>Test Message</h2>`
}, 3000); */
let meyer_showMessage = (object, t, callback) => {
    if (document.querySelector(`.generic-messages--overlay`)) {
        document.querySelector(`.generic-messages--overlay`).outerHTML = "";
    }
    let textHeader, closeIcon, messageDiv, message;
    textHeader = object.textHeader ? object.textHeader : "";
    object.closeIcon ? closeIcon = `<div class="generic-messages--close-icon">${object.closeIcon}</div>` : closeIcon = "";    
    messageDiv = `
    <div class="generic-messages--overlay hidden transparent">
        <div class="generic-messages--div message-div box-shadow text-color">
            <div class="generic-messages--div--message-header">        
                ${textHeader}
                ${closeIcon}
            </div>
            <div class="generic-messages--div--message-body">
                ${object.message}
            </div> 
        </div>
    </div>
    `;        
    document.getElementsByTagName(`body`)[0].insertAdjacentHTML(`beforeend`, messageDiv);  
    if (callback) {
        callback();        
    }

    meyer_visibility("show", `.generic-messages--overlay`, 50);
    if (t > 0) {
        setTimeout(() => {
            meyer_visibility("hide", `.generic-messages--overlay`, 600);
            setTimeout(() => {
                document.querySelector(`.generic-messages--overlay`).outerHTML = ''; 
            }, 600); 
        }, t);
    }
};

//function to prevent multiple clicks in forms and other elements.
//Dependencies: a global variable to turn true or false. By convention, true is clicked and false is unclicked
/* var meyer_clickingOnce = () => {
    variable = true;
    setTimeout(function(){
        variable = false;       
    }, 30000);
} */
//example:  
/* if (!globalBooleanVariableToControlClick) {                
    meyer_clickingOnce();                
    //something you want to do
}  */

//Validate forms. Input can be any form element whose shoud be filled and value can be set to "" or something else. 
//I.e: let inputs = document.querySelectorAll("input[required], select[required], textarea[required]").
//inputs receive all the elements input,  select and textarea that are required in a given form;
//element to scroll: a reference element to scroll if the form has an empty required field;
//offset - an absolute value, in pixels, to offset the scroll, if desired.
//depends on meyer_scrollTo;
/* var meyer_checkEmptyInputs = (inputs, offset) => {
    let foundEmpty = false;
    //function to scan radiobuttons (ou checkboxes, se necessário!) ()
    let emptyRadio = (name) => {
        let error = true;
        let radios = document.querySelectorAll(`input[name='${name}']`);
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                error =  false;
                break;
            }                
        }
        return error;
    }
    
    for (let i = 0; i < inputs.length; i++) {  
        //show a hint to fill unfilled inputs
        let emptyRequiredHint = () => {
            document.getElementById(`hint-empty`).style = `position: fixed; top: ${inputs[i].getBoundingClientRect().top}px;`;
            meyer_visibility("show", "#hint-empty");
            setTimeout(function(){
                meyer_visibility("hide", "#hint-empty");
            },2500);          
        };  
        if (inputs[i].type === 'radio') {
            foundEmpty = emptyRadio(inputs[i].name);  
            if (foundEmpty) {
                scrollTo({selector: inputs[i].parentElement, offset: -120, callback: emptyRequiredHint});
                break;
            }                           
        }
        if (inputs[i].value === "") {
            if(!foundEmpty){ 
                let input = inputs[i];              
                meyer_scrollTo({selector: input, offset, callback: emptyRequiredHint});
                foundEmpty = true;
                break;
            }
        }        
    }
    return foundEmpty;
};
 */
//validating e-mail via REGEX function. if it returns true, email is valid!
let meyer_validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

 //the function checkClick tests if the main element or one of his descendants was clicked.
//'mainElement't is the DOM element that should be checked
//'target' is the clicked DOM element (normally, the e.target)
//'dataName' (optional) is the value of the data-checklist attribute of an element. if the target has that data attribute with the specified value, clicking that DOM element has the same effect of clicking in 'mainElement'. You may set the data-checkClick="dataName" attribute to the elements that has the same effect of clicking on the main element and his descendants
var meyer_wasClicked = (mainElement, target, dataName) => {      
    if (dataName && target.dataset.checkclick === dataName) { 
        return true;        
    } 
    for (let i = 0; i < mainElement.querySelectorAll("*").length; i++) {             
        if (target === mainElement.querySelectorAll("*")[i] || target === mainElement) {           
            return true;
        }          
    }
    return false;
};



//function to get any string and returns it lowercased ans without diacritics
//parameters: text - any string
let textCamelCase = (text, noDiacritics) => {
    text.trim();
    let textEdited = text.split(" ")[0].toLowerCase();
    for (let i = 1; i < text.split(" ").length; i++) {
        textEdited += text.split(" ")[i].slice(0,1).toUpperCase() + text.split(" ")[i].slice(1, text.split(" ")[i].length).toLowerCase();
    }
    if (noDiacritics) {
        textEdited = textEdited.normalize('NFD').replace(/[\u0300-\u036f]/g, "");  
    }
    return textEdited;
};

//autocomplete
//parameters: inputSelector - the input element
//            divItems - the selector of the container that´ll hold the sugestions
//            item - the class given to each element of our list
//            array - array that contains the items
/* let autocomplete = (inputSelector, divItems, item, itemsArray) => {
    document.querySelector(divItems).addEventListener('click', (evt) => {
        document.querySelector(inputSelector).value = evt.target.innerHTML;
    });
    document.querySelector(inputSelector).addEventListener('blur', (e) => {            
        let inputIsValid = false, atendida = false;
        for (let i = 0; i < itemsArray.length; i++) {
            if(itemsArray[i] === e.target.value) {
                inputIsValid = true;
                document.querySelector(`${divItems}`).innerHTML = '';
                break;
            }
        }        
        if(!inputIsValid) {
            e.target.value = '';
            setTimeout(() => {
                document.querySelector(`${divItems}`).innerHTML = '';                    
            }, 200);
        }
    });
    let validateInput = () => {
        document.querySelector(divItems).innerHTML = '';      
        for (let i = 0; i < itemsArray.length; i++) {                
            if (itemsArray[i].toUpperCase().includes(document.querySelector(inputSelector).value.toUpperCase())) { 
                document.querySelector(divItems).insertAdjacentHTML('beforeend', `<p class='${item}'>${itemsArray[i]}</p><br>`);            
            }                
        }  
    };
    let selectByKeys = (e) => {
        let items = document.querySelectorAll(`.${item}`),
            selectedItem;
        e.preventDefault();
        if(document.querySelector(`.${item}`) && e.keyCode === 13) {
            if(document.querySelector(`.selected`)) {
                selectedItem = document.querySelector(`.selected`);
            } 
            selectedItem ? document.querySelector(`${inputSelector}`).value = selectedItem.innerHTML : document.querySelector(`${inputSelector}`).value = items[0].innerHTML; 
            document.querySelector(`${divItems}`).innerHTML = '';
        } else if (e.keyCode === 40) {    
            let selectedIndex;                  
            selectedItem = document.querySelector('.selected'); 
            if(!selectedItem && document.querySelector(`.${item}`)) {
                items[0].classList.add('selected');
            }           
            selectedIndex = Array.from(items).indexOf(selectedItem);
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove('selected');
            }
            if (selectedIndex + 1 === items.length) {
                document.querySelectorAll(`.${item}`)[0].classList.add('selected');
                selectedItem = document.querySelectorAll(`.${item}`)[0];    
            } else {
                document.querySelectorAll(`.${item}`)[selectedIndex + 1].classList.add('selected');
                selectedItem = document.querySelectorAll(`.${item}`)[selectedIndex + 1];
            }
            $(divItems).animate({ scrollTop: ($(selectedItem).offset().top - $(`${divItems} p`).offset().top) -50}, 'fast', function () {});
        } else if (e.keyCode === 38) {       
            let selectedIndex;     
            selectedItem = document.querySelector('.selected'); 
            if(!selectedItem && document.querySelector(`.${item}`)) {
                items[0].classList.add('selected');
                selectedIndex = 0;
            }           
            selectedIndex = Array.from(items).indexOf(selectedItem);
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove('selected');
            }
            if (selectedIndex <= 0) {
                document.querySelectorAll(`.${item}`)[document.querySelectorAll(`.${item}`).length - 1].classList.add('selected');
                selectedItem = document.querySelectorAll(`.${item}`)[document.querySelectorAll(`.${item}`).length - 1];    
            } else {
                document.querySelectorAll(`.${item}`)[selectedIndex - 1].classList.add('selected');
                selectedItem = document.querySelectorAll(`.${item}`)[selectedIndex - 1];
            }
            $(divItems).animate({ scrollTop: ($(selectedItem).offset().top - $(`${divItems} p`).offset().top) -50}, 'fast', function () {});
        }
    };    
    document.querySelector(inputSelector).addEventListener('input', (e) => {
        if(document.querySelector(inputSelector).value.length >= 2) {
            validateInput();
        } else {
            document.querySelector(divItems).innerHTML = '';
        }        
    }); 
    //pressing a key (keyup, keydown or enter)
    window.addEventListener('keyup', (e) => {
        selectByKeys(e);        
    });
}; */
const lotOfItems = ['Centro Nacional de Biologia Estrutural e Bioimagem (CENABIO)', 'Escola de Educação Física e Desportos (EEFD)', 'Escola de Enfermagem Anna Nery (EEAN)', 'Faculdade de Farmácia (FF)','Faculdade de Medicina (FM)', 'Faculdade de Odontologia (FO)', 'Hospital Universitário Clementino Fraga Filho (HUCFF)', 'Instituto de Atenção Primária de Saúde São Francisco de Assis (HESFA)', 'Instituto de Biofísica Carlos Chagas Filho (IBCCF)', 'Instituto de Biologia (IB)', 'Instituto de Bioquímica Médica (IBqM)', 'Instituto de Ciências Biomédicas (ICB)', 'Instituto de Doenças do Tórax - (IDT)','Instituto de Estudos de Saúde Coletiva (IESC)', 'Instituto de Ginecologia (IG)', 'Instituto de Microbiologia Professor Paulo de Góes (IMPPG)', 'Instituto de Neurologia Deolindo Couto (INDC)', 'Instituto de Nutrição Josué de Castro (INJC)', 'Instituto de Pesquisa de Produtos Naturais (IPPN)', 'Instituto de Psiquiatria (IPUB)', 'Instituto de Puericultura e Pediatria Martagão Gesteira (IPPMG)', 'Instituto do Coração Edson Abdala Saad (ICES)', 'Maternidade Escola (ME)', 'Núcleo de Pesquisas Ecológicas de Macaé (NUPEM)', 'Núcleo de Tecnologia Educacional para a Saúde (NUTES)', 'Decania do CCS'];
//running a test
//autocomplete(`#autocomplete-test`, `#autocomplete-container`, `item`, lotOfItems);

//takes a number and return it in currency format
//parameters: 
//num: the number itself, with or without separators
//symbol: the local currency symbol. US$, R$, etc.
//decimalSeparator: '.': US$2,345,348.73 or ',': R$ 2.345.348,73
let meyer_currency =  (num, symbol, decimalSeparator) => { 
    let formatted, regex, separator, noSeparators;
    if (decimalSeparator === ',') {
        regex = /(?=(?:\d{3})+(?:\,|$))/g;
        separator = '.';
        noSeparators = num.replace(/\./g, '');
    } else {
        regex = /(?=(?:\d{3})+(?:\.|$))/g;
        separator = ',';
        noSeparators = num.replace(/\,/g, '');
    }   
    if (num.split(decimalSeparator)[1] && num.split(decimalSeparator)[1].length === 1) {
        noSeparators += '0';
    }    
    formatted = `${symbol} ${noSeparators.split(regex).join( separator )}`;
    if (formatted.indexOf(decimalSeparator) < 0) {
        formatted += `${decimalSeparator}00`;
    }
    return formatted;
}

const classToggler = (target, classes) => {  
    target.classList.toggle(classes[0]);
    if (classes[1]) {target.classList.toggle(classes[1]);};  
  };

export {meyer_showMessage, meyer_visibility, classToggler}