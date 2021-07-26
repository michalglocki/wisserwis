$(document).ready(function () {
	
    let details;
    let listOfMultiFields;
    let listOfAllPictures;
    let changedDetails;
    let changedListOfMultiFields;
    let changedListOfAllPictures;
    let listOfRecuperationFields = [];
    let listOfKonstructionFields = [];
    let listOfPicturesToDisplay = [];
    let listOfMultiFieldsToDelete = [];
    let listOfPicturesToDelete = [];
    let listOfPicturesToSendtoServer = [];
    let listOfDetailsToDelete = [];
    let hasDetailsBeenChanged = false;
    let hasPicturesBeenChanged = false;
    let hasListedElementsBeenChanged = false;
    let id;
    let containerWidth;
    let currentPictureLoaded;
    let maxIdValue;
    let maxIdPictures;
    let selectedDetailsElement;
    let selectedListedElement;
    let selectedPicture;
    const myForm = document.getElementById("myForm");
    const loadedPicturesList = [];
    const newPicture = document.getElementById("newPicture");
	
    const loadData = () => new Promise((resolve, reject) => {
    	$("body").css("cursor", "progress");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://" + window.location.host + "/what");
        xhr.addEventListener('load', () => resolve(xhr.responseText));
        xhr.send();
    });
    
    const getMaxId = () => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://" + window.location.host + "/max");
        xhr.addEventListener('load', () => resolve(xhr.responseText));
        xhr.send();
    });
    
    getMaxId().then(result => {
    	maxIdValue = Number(result);
    });
    
    const getMaxPictures = () => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://" + window.location.host + "/pictures_max");
        xhr.addEventListener('load', () => resolve(xhr.responseText));
        xhr.send();
    });
    
    getMaxPictures().then(result => {
    	maxIdPictures = Number(result);
    });

    loadData().then(result => {
        details = JSON.parse(result);
        changedDetails = details.slice();
        
        setOnClickEventToMainPictures();
        setMouseOverrAndOutEventsToMainPictures();
        $("body").css("cursor", "default");
    	
    	for (let i = 0; i < changedDetails.length; i++){
    		
    		if (changedDetails[i].menuid == 1){
    			listOfRecuperationFields.push(changedDetails[i]);
    		} else if (changedDetails[i].menuid == 2) {
    			listOfKonstructionFields.push(changedDetails[i]);
    		}    		
    	}
    });
    
    function createMenuButtons(detailsToDisplay){
    	
    	for (let i = 0; i < detailsToDisplay.length + 2; i++){
    			
			let newElement;
			
			if (i < detailsToDisplay.length){
				newElement = document.createElement("textarea");
				newElement.classList.add("menuItem");
				newElement.value = detailsToDisplay[i].button;
				newElement.setAttribute("id", detailsToDisplay[i].id);
				newElement.setAttribute("name", detailsToDisplay[i].id);
				newElement.setAttribute("placeholder", "Edytuj tekst przycisku");
				newElement.setAttribute("title", "Edytuj tekst przycisku");
				
				if (detailsToDisplay[i].menuid == 1){
					newElement.classList.add("menuRekuperacjiItem");
					$("#menuRekuperacji").append(newElement);
				} else if (detailsToDisplay[i].menuid == 2) {
					newElement.classList.add("menuKonstrukcjiItem");
					$("#menuKonstrukcji").append(newElement);
				}
			}else{
				newElement = document.createElement("div");
				newElement.classList.add("addMenuItem");
				newElement.innerHTML = "+";
				
				newElement.setAttribute("value", changedDetails.length);
				
				if (i == detailsToDisplay.length){
					newElement.setAttribute("id", "addRekuperacji");
					newElement.classList.add("menuRekuperacjiItem");
					$("#menuRekuperacji").append(newElement);
				}else{
					newElement.setAttribute("id", "addKonstrukcji");
					newElement.classList.add("menuKonstrukcjiItem");
					$("#menuKonstrukcji").append(newElement);
				}
			}
    	}
    	setOnChangeEventToInputItem("class", "menuItem");
    }
    
    const loadMultiFieldsList = () => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://" + window.location.host + "/list");
        xhr.addEventListener('load', () => resolve(xhr.responseText));
        xhr.send();
    });
    
    loadMultiFieldsList().then(result =>{
    	listOfMultiFields = JSON.parse(result);
    	changedListOfMultiFields = listOfMultiFields.slice();
    });
    
    const loadAllPictures = () => new Promise((resolve, reject) => {
    	const xhr = new XMLHttpRequest();
    	xhr.open("GET", "http://" + window.location.host + "/pictures");
    	xhr.addEventListener('load', () => resolve(xhr.responseText));
    	xhr.send();
    });
    
    loadAllPictures().then(result => {
    	listOfAllPictures = JSON.parse(result);
    	changedListOfAllPictures = listOfAllPictures.slice();
    });
    
    $(".title").eq(0).slideDown(500, function(){
    	$("#rekuperacja img").show(1000, function(){
    		$(".title").eq(1).slideDown(500, function(){
    			$("#konstrukcje img").show(1000);
    		});
    	});
    });
	
    function setOnClickEventToMainPictures(){
	    $("#obrazRekuperacji").click(function () {
	    	
	        createMenuButtons(listOfRecuperationFields);
	    	setOnClickEventsToCreatedElements();
	        setOnClickEventToAddMenuItem();
	        
	        $("#konstrukcje").slideUp(200);
	
	        for (let i = 0; i < $(".menuRekuperacjiItem").length; i++) {
	            let time = 300;
	            setTimeout(function () {
	                $(".menuRekuperacjiItem").eq(i).slideDown(time);
	            }, i * time);
	        }
	
	        $("#rekuperacja img").unbind('mousover').unbind('mouseout');
	        
	    	if ($(window).width() < 1000){
	            $("#rekuperacja").animate({
	                "top": "10%",
	            }, 1000);
	    	}else{
	            $("#obrazRekuperacji").animate({
	                "left": "60%",
	            }, 1000);
			}
	        $(this).unbind("click");
	    });
	    
	    $("#konstrukcje").click(function () {
	        createMenuButtons(listOfKonstructionFields);
	    	setOnClickEventsToCreatedElements();
	        setOnClickEventToAddMenuItem();
	    	
	        $("#rekuperacja").slideUp(200);

	        for (let i = 0; i < $(".menuKonstrukcjiItem").length; i++) {
	            let time = 300;
	            setTimeout(function () {
	                $(".menuKonstrukcjiItem").eq(i).slideDown(time);
	            }, i * time);
	        }

	        $("#konstrukcje img").unbind('mousover').unbind('mouseout');

	    	if ($(window).width() < 1000){
	            $("#konstrukcje").animate({
	                "top": "10%",
	            }, 1000);
	    	}else{
	            $("#obrazKonstrukcji").animate({
	                "right": "70%",
	            }, 1000);
			}

	        $(this).unbind("click");
	    });
    }
    
    $("#logo").click(function(){
    	location.reload();
    })
    
    function setMouseOverrAndOutEventsToMainPictures(){
	    $("#rekuperacja img").mouseover(function () {
	        $("#konstrukcje img").css({
	            "filter": "grayscale(100%)"
	        })
	        $(this).css({
	            "cursor": "pointer",
	            "transform": "scale(1.2)"
	        }, 1000);
	    });
	
	    $("#rekuperacja img").mouseout(function () {
	        $(this).css({
	            "transform": "scale(1)"
	        }, 1000);
	
	        $("#konstrukcje img").css({
	            "filter": "grayscale(0%)"
	        })
	    });
	
	    $("#konstrukcje img").mouseover(function () {
	        $("#rekuperacja img").css({
	            "filter": "grayscale(100%)"
	        })
	        $(this).css({
	            "cursor": "pointer",
	            "transform": "scale(1.2)"
	        }, 1000);
	    });
	
	    $("#konstrukcje img").mouseout(function () {
	        $(this).css({
	            "transform": "scale(1)"
	        }, 1000);
	
	        $("#rekuperacja img").css({
	            "filter": "grayscale(0%)"
	        })
	    });
    }

    function setOnClickEventsToCreatedElements(){
    	
    	let container;
    	
    	if ($(window).width() < 1000){
    		container = $(".horizontalMenuItem");
    	}else{
			container = $(".menuItem");
			container.unbind("click");
		}
    		
        for (let i = 0; i < container.length; i++){
        	
    		container.eq(i).click(function(){
        		
        		for (let j=0; j < changedDetails.length; j++){
    	        	
	        		if (this.id == changedDetails[j].id){
	        			id = j;
	        		}
        		}
        		
            	if (document.getElementById("details").style.display != 'none'){
            		$("#details").slideUp(200, showHiddenWindow);
            	}else{
            		showHiddenWindow();
            	}
            	
            	selectedDetailsElement = this.getAttribute("name");
            	selectedListedElement = null;
			    selectedPicture = null;
        	});
        }
    }
    
    function setOnClickEventToAddMenuItem(){

    	for (let i = 0; i < $(".addMenuItem").length; i++){
	    	$(".addMenuItem").eq(i).click(function(){

	    		let newMenuElement = document.createElement("textarea");
	    		let menuIdSide;
	    		
	    		newMenuElement.classList.add("menuItem");
	    		newMenuElement.value = "Wpisz nazwę";
	    		newMenuElement.setAttribute("id", maxIdValue + 1);
	    		newMenuElement.setAttribute("name", maxIdValue + 1);
	    		newMenuElement.setAttribute("placeholder", "Wprowadź nazwę przycisku");
	    		newMenuElement.setAttribute("title", "Wprowadź nazwę przycisku");
				
				if (this.id == "addRekuperacji"){
					newMenuElement.classList.add("menuRekuperacjiItem");
					menuIdSide = 1;
					document.getElementById("menuRekuperacji").insertBefore(newMenuElement, this);
					$(".menuItem.menuRekuperacjiItem").last().slideDown(500);
				} else{
					newMenuElement.classList.add("menuKonstrukcjiItem");
					menuIdSide = 2;
					document.getElementById("menuKonstrukcji").insertBefore(newMenuElement, this);
					$(".menuItem.menuKonstrukcjiItem").last().slideDown(500);
				}

				let newArrayObject = {
						id : maxIdValue + 1,
						title : newMenuElement.value,
						picture : false,
						text : "Wpisz tekst",
						movie : "Wprowadz link do filmu",
						belongs : null,
						button : "nowy",
						menuid: menuIdSide,
						single : 1
				};
				maxIdValue++;
				changedDetails.push(newArrayObject);
				hasDetailsBeenChanged = true;

				setOnClickEventsToCreatedElements();
				setOnChangeEventToInputItem("class", "menuItem");
				
				showSaveButton();
	    	});
    	}
    }

    function setCurrentlySelectedSubject(id){

    	listOfPicturesToDisplay = [];
		deletePreviousContainer();
		$("#title").val(changedDetails[id].title);
		$("#title").attr("name", changedDetails[id].id);
		$("#title").attr("placeholder", "Wprowadź tytuł");
		$("#title").attr("title", "Wprowadź tytuł");
		$("#text").val(changedDetails[id].text);
		$("#text").attr("name", changedDetails[id].id);
		$("#text").attr("placeholder", "Wprowadź opis");
		$("#text").attr("title", "Wprowadź opis");
		$("#movie").val(changedDetails[id].movie);
		$("#movie").attr("name", changedDetails[id].id);
		$("#movie").attr("placeholder", "Wklej link do filmu na YouTube");
		$("#movie").attr("title", "Wklej link do filmu");
		
		setOnChangeEventToInputItem("id", "title");
		setOnChangeEventToInputItem("id", "text");
		setOnChangeEventToInputItem("id", "movie");
			
		fillSelectedElement(document.getElementById("details"), document.getElementById("title").getAttribute("name"));
		unhidePicturesContainer();
		
		setPicturesToDisplay(changedDetails[id].id);
    }
    
    function setCurrentlySelectedList(id, position){
		$("#title" + position).val(changedListOfMultiFields[id].title);
		$("#text" + position).val(changedListOfMultiFields[id].text);
		$("#movie" + position).val(changedListOfMultiFields[id].movie);
    }

    function showHiddenWindow(){
    	clearListedFields();
    	
    	if (changedDetails[id].single == 1){
    		setCurrentlySelectedSubject(id);
    		$("#text").show();
        	$("#movie").show();

    	}else{
    		deletePreviousContainer();
        	$("#text").hide();
        	$("#movie").hide();
    		$("#title").val(changedDetails[id].title);
    		$("#title").attr("name", changedDetails[id].id)
    		
    		let buttonDescription = changedDetails[id].id;
    		
    		for (let i = 0; i < changedListOfMultiFields.length; i++){
    			
    			if (changedListOfMultiFields[i].belongs == buttonDescription){
    				let newDiv = document.createElement("div");
    				newDiv.className = "listedElements";
    				newDiv.setAttribute("name", changedListOfMultiFields[i].id);
    				
    				let titleDiv = document.createElement("input");
    				titleDiv.className = "innerListedTitle";
    				titleDiv.value = changedListOfMultiFields[i].title;
    				titleDiv.setAttribute("name", changedListOfMultiFields[i].id);
    				titleDiv.setAttribute("placeholder", "Wprowadź tytuł");
    				titleDiv.setAttribute("title", "Wprowadź tytuł");
    				
    				let textDiv = document.createElement("textarea");
    				textDiv.className = "innerListedElement";
    				textDiv.value = changedListOfMultiFields[i].text;
    				textDiv.setAttribute("name", changedListOfMultiFields[i].id);
    				textDiv.setAttribute("placeholder", "Wprowadź opis tematu");
    				textDiv.setAttribute("title", "Wprowadź opis");
    				
    				let movieDiv = document.createElement("textarea");
    				movieDiv.className = "innerListedMovie";
    				movieDiv.value = changedListOfMultiFields[i].movie;
    				movieDiv.setAttribute("name", changedListOfMultiFields[i].id);
    				movieDiv.setAttribute("placeholder", "Wklej link do filmu z serwisu YouTube");
    				movieDiv.setAttribute("title", "Wklej link do filmu");
    				
    				newDiv.appendChild(titleDiv);
    				newDiv.appendChild(textDiv);
    				newDiv.appendChild(movieDiv);
    				
    				$("#details").append(newDiv);
    				$("#text").val("");
    				$("#movie").val("");
        			
    			}
    		}
    		
    		setOnClickEventsToListedElements();
    		setOnChangeEventToInputItem("class", "innerListedTitle");
    		setOnChangeEventToInputItem("class", "innerListedElement");
    		setOnChangeEventToInputItem("class", "innerListedMovie");
    		
    	}
    	
		let addListedPosition = document.createElement("div");
		addListedPosition.setAttribute("id", "addListedElement");
		
		let titleAddListed = document.createElement("div");
		titleAddListed.className = "innerListedTitle";
		titleAddListed.innerHTML = "Dodaj nową pozycję";
		
		addListedPosition.appendChild(titleAddListed);
		
		$("#details").append(addListedPosition);
		
		addListedElementClick();
		
    	$("#details").slideDown(500);

    }
    
    function addListedElementClick(){
    	$("#addListedElement").click(function(){
    		let name = $("#title").attr("name");
    		
    		if (changedDetails[id].single == 1){
    			
				let newDiv = document.createElement("div");
				newDiv.className = "listedElements";
				newDiv.setAttribute("name", maxIdValue + 1);
				
				let titleDiv = document.createElement("input");
				titleDiv.className = "innerListedTitle";
				titleDiv.value = $("#title").val();
				titleDiv.setAttribute("name", maxIdValue + 1);
				titleDiV.setAttribute("placeholder", "Wprowadź tytuł");
				titleDiv.setAttribute("title", "Wprowadź tytuł");
				
				
				let textDiv = document.createElement("textarea");
				textDiv.className = "innerListedElement";
				textDiv.value = $("#text").val(); 
				textDiv.setAttribute("name", maxIdValue + 1);
				textDiv.setAttribute("placeholder", "Wprowadź opis");
				textDiv.setAttribute("title", "Wprowadź opis");
				
				let movieDiv = document.createElement("textarea");
				movieDiv.className = "innerListedMovie";
				movieDiv.value = $("#movie").val(); 
				movieDiv.setAttribute("name", maxIdValue + 1);
				movieDiv.setAttribute("placeholder", "Wklej link do filmu z serwisu YouTube");
				movieDiv.setAttribute("title", "Wklej link do filmu");
				
				
				let maxId; 
				
				let newArrayObject = {
					id : maxIdValue + 1,
					title : titleDiv.value,
					picture : changedDetails[id].picture,
					text : textDiv.value,
					movie : movieDiv.value,
					belongs : name,
					button : changedDetails[id].button,
					menuid: 3,
					single : 1
				};
				
				changeGalleryAssignment(name, maxIdValue + 1);
				
				maxIdValue++;
				
				changedListOfMultiFields.push(newArrayObject);
				
				newDiv.appendChild(titleDiv);
				newDiv.appendChild(textDiv);
				newDiv.appendChild(movieDiv);
				
				document.getElementById("details").insertBefore(newDiv, this);
				$("#text").val("");
				$("#text").hide(200);
				$("#movie").val("");
				$("#movie").hide(200);
				
				deletePreviousContainer();
				setOnClickEventsToListedElements();
				changedDetails[id].single = 0;
				hasDetailsBeenChanged = true;
	    		hasListedElementsBeenChanged = true;				
    		}

			let newDiv = document.createElement("div");
			newDiv.className = "listedElements";
			newDiv.setAttribute("name", maxIdValue + 1);
			
			let titleDiv = document.createElement("input");
			titleDiv.className = "innerListedTitle";
			titleDiv.value = "Wprowadź tytuł";
			titleDiv.setAttribute("name", maxIdValue + 1);
			titleDiV.setAttribute("placeholder", "Wprowadź tytuł");
			titleDiv.setAttribute("title", "Wprowadź tytuł");
			
			
			let textDiv = document.createElement("textarea");
			textDiv.className = "innerListedElement";
			textDiv.value = "Wpisz opis elementu";
			textDiv.setAttribute("name", maxIdValue + 1);
			textDiv.setAttribute("placeholder", "Wprowadź opis");
			textDiv.setAttribute("title", "Wprowadź opis");
			
			let movieDiv = document.createElement("textarea");
			movieDiv.className = "innerListedMovie";
			movieDiv.value = "Podaj link do YouTube";
			movieDiv.setAttribute("name", maxIdValue + 1);
			movieDiv.setAttribute("placeholder", "Wklej link do filmu z serwisu YouTube");
			movieDiv.setAttribute("title", "Wklej link do filmu");
			
			let newArrayObject = {
					id : maxIdValue + 1,
					title : titleDiv.value,
					picture : "false",
					text : textDiv.value,
					movie : null,
					belongs : name,
					button : "Podaj opis przycisku",
					menuid: 3,
					single : 1
			};
			
			newDiv.appendChild(titleDiv);
			newDiv.appendChild(textDiv);
			newDiv.appendChild(movieDiv);
			
			maxIdValue++;
			changedListOfMultiFields.push(newArrayObject);
			
			document.getElementById("details").insertBefore(newDiv, this);
			
			setOnClickEventsToListedElements();
    		setOnChangeEventToInputItem("class", "innerListedTitle");
    		setOnChangeEventToInputItem("class", "innerListedElement");
    		setOnChangeEventToInputItem("class", "innerListedMovie");
    		
    		hasListedElementsBeenChanged = true;
    		showSaveButton();
    	});
    }
    
    function clearListedFields(){
    	for (let i = 0; i < $(".listedElements").length; i++){
    		$(".listedElements").remove();
    	}
    	$("#addListedElement").remove();
    }
    
    function changeGalleryAssignment(previousValue, newValue){
    	for (let i = 0; i < changedListOfAllPictures.length; i++){
    		if (changedListOfAllPictures[i].belongs == previousValue){
    			changedListOfAllPictures[i].belongs = newValue;
    		}
    	}
    }

    function deletePreviousContainer(){
    	if ($("#galleryContainer").length){
    		$("#galleryContainer").remove();
    	}
    }
    
    function fillSelectedElement(element, id){
    	
    	deletePreviousContainer();
    	
    	let container = document.createElement("div");
    	container.setAttribute("id", "galleryContainer"); 
    	container.setAttribute("value", id);
    	
    	element.appendChild(container);
    }
    
    function setOnClickEventsToListedElements(){
    	
    	let isPicture = true;
    	
    	$(".innerListedTitle").unbind("click");
    	
			$(".innerListedTitle").click(function(){
				
				let valueOfClickedObject = this.getAttribute("name");
				let clickedObject = this.parentElement;
				
				if (!$(this).parent().find("#galleryContainer").length){

					if ($("#galleryContainer").length){
            			$("#galleryContainer").slideUp(500);
            			$(".galleryElement").slideUp(500);
            			$("#previousPicture").slideUp(500);
            			$("#nextPicture").slideUp(500,function(){
            				deletePreviousContainer();
            			});
					}
				}

				if ($(this).parent().children(".innerListedElement").is(':visible')){
    				$(this).parent().children(".innerListedElement").slideUp(500);
    				$(this).parent().children(".innerListedMovie").slideUp(500);
        			$("#galleryContainer").slideUp(500);
        			$(".galleryElement").slideUp(500);
        			$("#previousPicture").slideUp(500);
        			$("#nextPicture").slideUp(500,function(){
        				deletePreviousContainer();
        			});

				}else{
        			$(".innerListedElement").slideUp(500);
        			$(".innerListedMovie").slideUp(500);
        			
        			$(this).parent().children(".innerListedElement").slideDown(500);
        			$(this).parent().children(".innerListedMovie").slideDown(500, function(){
        				
        				if (isPicture){

        					let id = $("#galleryContainer").parent().attr("name");
	        				fillSelectedElement(clickedObject, valueOfClickedObject);
	        				setPicturesForListedElement(clickedObject);
		        			$("#galleryContainer").slideDown(500);
		        			$(".galleryElement").slideDown(500);
		        			$("#previousPicture").slideDown(500);
		        			$("#nextPicture").slideDown(500);
        				}
        			});

				}
				
            	selectedDetailsElement = null;
            	selectedListedElement = this.getAttribute("name");
            	selectedPicture = null;
			});
    }
    
    function setPicturesForListedElement(element){
    
		let description = $(element)
	    .clone() 
	    .children(".innerListedTitle")
	    .attr("name");
	
		setPicturesToDisplay(description);	
    }
    
    function unhidePicturesContainer(){
		$("#galleryContainer").show(500);
		$(".galleryElement").show(500);
    }
    
    function setPicturesToDisplay(desctiption){
			listOfPicturesToDisplay = [];
			for (let i = 0; i < changedListOfAllPictures.length; i++){

				if (changedListOfAllPictures[i].belongs == desctiption){
					listOfPicturesToDisplay.push(changedListOfAllPictures[i]);
				}
			}
			
			for (let i = 0; i < listOfPicturesToDisplay.length; i++){

				let newImgMini = document.createElement("img");
				newImgMini.setAttribute("class", "miniGalleryElement");
				newImgMini.setAttribute("width", "21%");
				newImgMini.setAttribute("alt", listOfPicturesToDisplay[i].id);
				newImgMini.setAttribute("src", "img/" + listOfPicturesToDisplay[i].picture);
				
				document.getElementById("galleryContainer").appendChild(newImgMini);
			}
			
			let addImgButton = document.createElement("img");
			addImgButton.setAttribute("id", "addNewImgElement");
			addImgButton.setAttribute("width", "21%");
			addImgButton.setAttribute("src", "img/add.png");
			document.getElementById("galleryContainer").appendChild(addImgButton);
			
			setOnClickEventToPictures();
    }
    
    function setOnClickEventToPictures(){
    	for (let i = 0; i < $(".miniGalleryElement").length; i++){
    		$(".miniGalleryElement").eq(i).click(function(){
    			
			    selectedDetailsElement = null;
			    selectedListedElement = null;
			    selectedPicture = this.getAttribute("alt");
			    
			    $(".miniGalleryElement").css("border", "none");
				this.style.border = "solid black 3px";

    		});
    	}
    	
    	$("#addNewImgElement").click(function(evt){
    		
    		checkIsAlreadyAnyPictureAssigned($("#galleryContainer").attr("value"));
    		
    		$("#newPicture").click();
    		
			let newImgMini = document.createElement("img");
			newImgMini.setAttribute("class", "miniGalleryElement");
			newImgMini.setAttribute("width", "21%");

			document.getElementById("galleryContainer").insertBefore(newImgMini, this);
			showSaveButton();
			
    	})
    	
    }
    
    $("#newPicture").change(function(){
    	loadedPicturesList.push(newPicture.files[0]);
    	$("#submit").click();
    });
    
    function checkIsAlreadyAnyPictureAssigned(id){
    	for (let i = 0; i < changedDetails.length; i++){
    		if (changedDetails[i].id == id && (changedDetails[i].picture == null || changedDetails[i].picture == "false")){
    			changedDetails[i].picture = "true";
    			hasDetailsBeenChanged = true;
    		}
    	}
    	
    	for (let i = 0; i < changedListOfMultiFields.length; i++){
    		if (changedListOfMultiFields[i].id == id && (changedListOfMultiFields[i].picture == null || changedListOfMultiFields[i].picture == "false")){
    			changedListOfMultiFields[i].picture = "true";
    			hasListedElementsBeenChanged = true;
    		}
    	}
    }
    
    myForm.addEventListener("submit", e=> {
    	e.preventDefault();
    	const formData = new FormData();
    	
    	formData.append("inpFile", newPicture.files[0]);
    	
		if (newPicture.files && newPicture.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$(".miniGalleryElement").last().attr('src', e.target.result);
			}
			reader.readAsDataURL(newPicture.files[0]);
		}
		
		listOfPicturesToSendtoServer.push(formData);
	
		let belongsOfNewPicture = Number($("#galleryContainer").attr("value"));
		
		const newPictureObject = {
				id : maxIdPictures + 1,
				belongs: "" + belongsOfNewPicture,
				picture : newPicture.files[0].name
		}
		
		changedListOfAllPictures.push(newPictureObject);
		hasPicturesBeenChanged = true;
    })
    
    function changedDetailsActualisation(index, field, value){
    	
    	console.log(value);

    	for (let i = 0; i < changedDetails.length; i++){
    		if (changedDetails[i].id == index){
    			if (field == "title"){
    				changedDetails[i].title = value
    			}else if (field == "text"){
    				changedDetails[i].text = value
    			}else if (field == "movie"){
    				changedDetails[i].movie = value
    			}else if (field == "belongs"){
    				changedDetails[i].belongs = value
    			}else if (field == "picture"){
    				changedDetails[i].picture = value
    			}else if (field == "button"){
    				changedDetails[i].button = value
    			}else if (field == "single"){
    				changedDetails[i].single = value
    			}else if (field == "menuid"){
    				changedDetails[i].menuid = value
    			}
    			hasDetailsBeenChanged = true;
    		}
    	}
    	for (let i = 0; i < changedListOfMultiFields.length; i++){
    		if (changedListOfMultiFields[i].id == index){
    			if (field == "title"){
    				changedListOfMultiFields[i].title = value
    			}else if (field == "text"){
    				changedListOfMultiFields[i].text = value
    			}else if (field == "movie"){
    				changedListOfMultiFields[i].movie = value
    			}else if (field == "belongs"){
    				changedListOfMultiFields[i].belongs = value
    			}else if (field == "picture"){
    				changedListOfMultiFields[i].picture = value
    			}else if (field == "button"){
    				changedListOfMultiFields[i].button = value
    			}else if (field == "single"){
    				changedListOfMultiFields[i].single = value
    			}else if (field == "menuid"){
    				changedListOfMultiFields[i].menuid = value
    			}
    			hasListedElementsBeenChanged = true;
    		}
    	}
    	
    }
    
    function setOnChangeEventToInputItem(description, input){
    	
    	console.log(description);
    	
    	let jqeryTarget;
    	if (description == "class"){
    		jqeryTarget = "." + input;
    	}else{
    		jqeryTarget = "#" + input;
    	}
        $(jqeryTarget).on("change", function(event){
        	let field;
        	if (event.target.classList.contains("menuItem")){
        		field = "button";
        	}else if (event.target.classList.contains("innerListedTitle")){
        		field = "title";
        	}else if (event.target.classList.contains("innerListedElement")){
        		field = "text";
        	}else if (event.target.classList.contains("innerListedMovie")){
        		field = "movie";
        	}else {
        		field = event.target.id;
        	}
        	let index = event.target.getAttribute("name");
        	let value = event.target.value;

        	changedDetailsActualisation(index, field, value);
        	showSaveButton();
        })  
    }
    
    function activateDeletePressEvent(){
    	$(document).keyup(function(e) {
    		if (e.which == 46 ){
    			if (selectedDetailsElement != null){
    				
        			if (confirm("Czy na pewno chcesz usunąć ten element menu?")){
        				for (let i = 0; i < changedDetails.length; i++){
        					if (changedDetails[i].id == selectedDetailsElement){
        						listOfDetailsToDelete.push(changedDetails[i]);
        						changedDetails.splice(i, 1);
        					}
        				}
        				
        				for (let i = 0; i < $(".menuItem").length; i++){
        					if ($(".menuItem").eq(i).attr("name") == selectedDetailsElement){
        						$("#details").slideUp(200);
        						$(".menuItem").eq(i).hide(200, function(){
        							$(".menuItem").eq(i).remove();
        						});
        					}
        				}
        				
        				showSaveButton();
        			}
        			
    			}else if (selectedListedElement != null){
    				
        			if (confirm("Czy na pewno chcesz usunąć ten element listy?")){
        				for (let i = 0; i < changedListOfMultiFields.length; i++){
        					if (changedListOfMultiFields[i].id == selectedListedElement){
        						listOfDetailsToDelete.push(changedListOfMultiFields[i]);
        						changedListOfMultiFields.splice(i, 1);
        					}
        				}
        				
        				for (let i = 0; i < $(".listedElements").length; i++){
        					if ($(".listedElements").eq(i).attr("name") == selectedListedElement){
        						$(".listedElements").eq(i).hide(200, function(){
        							if ($(".listedElements").length == 2){
        								$(".listedElements").eq(i).remove();
        								let objectToDragOut;
        								for (let i = 0; i < changedListOfMultiFields.length; i++){
        									if (changedListOfMultiFields[i].id == $(".listedElements").eq(0).attr("name")){
        										$("#text").val(changedListOfMultiFields[i].text);
        										$("#movie").val(changedListOfMultiFields[i].movie);
        										$("#title").val(changedListOfMultiFields[i].title);
        										objectToDragOut = Object.assign({}, changedListOfMultiFields[i]);
        										listOfDetailsToDelete.push(changedListOfMultiFields[i]);
        										changedListOfMultiFields.splice(i, 1);
        										
        									}
        								}
        								for (let i = 0; i < changedDetails.length; i++){
        									if (changedDetails[i].id == objectToDragOut.belongs){
        										let id = changedDetails[i].id;
        										let menuId = changedDetails[i].menuid;
        										changedDetails[i] = objectToDragOut;
        										changedDetails[i].id = id;
        										changedDetails[i].belongs = null;
        										changedDetails[i].single = 1;
        										changedDetails[i].menuid = menuId;
        									}
        								}
        								$("#text").show();
        								$("#movie").show();
        								$(".listedElements").remove();
        								//TODO
        								//przetestować aplikację pod każdym możliwym kątem
        								//wyczyścić i opublikować na serwerze
        							}else{
        								$(".listedElements").eq(i).remove();
        							}
        						});
        					}
        				}
        				hasDetailsBeenChanged = true;
        				showSaveButton();
        			}

    			}else if (selectedPicture != null){
    				
        			if (confirm("Czy na pewno chcesz usunąć to zdjęcie?")){
        				for (let i = 0; i < changedListOfAllPictures.length; i++){
        					if (changedListOfAllPictures[i].id == selectedPicture){
        						listOfPicturesToDelete.push(changedListOfAllPictures[i]);
        						changedListOfAllPictures.splice(i, 1);
        						checkIsDeletedPictureTheLastOne($("#galleryContainer").attr("value"));
        					}
        				}
        				
        				for (let i = 0; i < $(".miniGalleryElement").length; i++){
        					if ($(".miniGalleryElement").eq(i).attr("alt") == selectedPicture){
        						$(".miniGalleryElement").eq(i).hide(200, function(){
        							$(".miniGalleryElement").eq(i).remove();
        						});
        					}
        				}
        				showSaveButton();
        			}
    			}
    		}     
    	});
    }
    
    function checkIsDeletedPictureTheLastOne(id){
    	let count = 0;
    	for (let i = 0; i < changedListOfAllPictures.length; i++){
    		if (changedListOfAllPictures[i].belongs == id){
				count++;
    		}
    	}
    	console.log(id);
    	if (count == 0){
	    	for (let i = 0; i < changedDetails.length; i++){
	    		console.log(changedDetails[i].id);
	    		if (changedDetails[i].id == id){
	    			console.log("test");
	    			changedDetails[i].picture = "false";
	    			hasDetailsBeenChanged = true;
	    		}
	    	}
	    	for (let i = 0; i < changedListOfMultiFields.length; i++){
	    		if (changedListOfMultiFields[i].id == id){
	    			changedListOfMultiFields[i].picture = "false";
	    			hasListedElementsBeenChanged = true;
	    		}
	    	}
    	}
    }
    
    function showSaveButton(){
    	if (!$("#save").is(':visible')){
    		$("#save").show(200);
    	};
    }
    
    $("#save").click(function(){

    	if (listOfDetailsToDelete.length > 0){

    		$.ajax({
    		    url: "http://" + window.location.host + "/delete_details",
    		    type: 'DELETE',
    		    data: JSON.stringify(listOfDetailsToDelete),
    		    contentType: "application/json charset=utf-8",
    		    complete: function(xhr){
    		    	callback(xhr.status);
    		    }
    		});
    		
    		listOfDetailsToDelete = [];
    	}
    	if (hasDetailsBeenChanged){
    		
    		$.ajax({
    		    url: "http://" + window.location.host + "/update_details",
    		    type: "POST",
    		    data: JSON.stringify(changedDetails),
    		    contentType: "application/json charset=utf-8",
    		    complete: function(xhr){
    		    	callback(xhr.status);
    		    }
    		});

    		hasDetailsBeenChanged = false;
    	}
    	
    	if (hasListedElementsBeenChanged){
    		
    		$.ajax({
    		    url: "http://" + window.location.host + "/update_details",
    		    type: "POST",
    		    data: JSON.stringify(changedListOfMultiFields),
    		    contentType: "application/json charset=utf-8",
    		    complete: function(xhr){
    		    	callback(xhr.status);
    		    }
    		});

    		hasListedElementsBeenChanged = false;
    	}
    	if (hasPicturesBeenChanged){
    		
	    	const endpoint = "http://" + window.location.host + "/pictures_file"
	    	
	    	for (let i = 0; i < listOfPicturesToSendtoServer.length; i++){
	    		
		        fetch(endpoint, {
		    		method: "post",
		    		body: listOfPicturesToSendtoServer[i]
		    	}).then(function(){
		    		
		    		$.ajax({
		    		    url: "http://" + window.location.host + "/pictures_db",
		    		    type: "POST",
		    		    data: JSON.stringify(changedListOfAllPictures),
		    		    contentType: "application/json charset=utf-8",
		    		    complete: function(xhr){
		    		    	callback(xhr.status);
		    		    }
		    		});
		    	});
	    	}
	    	hasPicturesBeenChanged = false;
    	}
    	
    	if (listOfPicturesToDelete.length > 0){

    		$.ajax({
    		    url: "http://" + window.location.host + "/delete_pictures",
    		    type: 'DELETE',
    		    data: JSON.stringify(listOfPicturesToDelete),
    		    contentType: "application/json charset=utf-8",
    		    complete: function(xhr){
    		    	callback(xhr.status);
    		    }
    		});
    		
    		listOfPicturesToDelete = [];
    	}
    	
    	$("#save").hide(200);
    })
    
//    async function callback(status){
//    	console.log(status);
//    	if (status == "200" || status == "201" || status == "202"){
//    		$("#message").html("Dane zostały zaktualizowane");
//    		$("#message").slideDown(500);
//    		await sleep(3000);
//    		$("#message").slideUp(500);
//    	}else if(status == "403" ){
//    		$("#message").html("Jesteś zalogowany na koncie testowym, do aktualizacji potrzebny jest status Administratora!");
//    		$("#message").slideDown(500);
//    		await sleep(3000);
//    		$("#message").slideUp(500);
//    	}
//    	
//    }
    
    function sleep(ms) {
    	  return new Promise(resolve => setTimeout(resolve, ms));
    	}
    
    activateDeletePressEvent();

    
});
