$(document).ready(function () {
	
    let details;
    let listOfMultiFields;
    let listOfAllPictures;
    let listOfRecuperationFields = [];
    let listOfKonstructionFields = [];
    let listOfPicturesToDisplay = [];
    let id;
    let containerWidth;
    let currentPictureLoaded;
	
    const loadData = () => new Promise((resolve, reject) => {
    	$("body").css("cursor", "progress");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://" + window.location.host + "/what");
        xhr.addEventListener('load', () => resolve(xhr.responseText));
        xhr.send();
    });

    loadData().then(result => {
        details = JSON.parse(result);
        setOnClickEventToMainPictures();
        setMouseOverrAndOutEventsToMainPictures();
        $("body").css("cursor", "default");
    	
    	for (let i = 0; i < details.length; i++){
    		
    		if (details[i].menuid == 1){
    			listOfRecuperationFields.push(details[i]);
    		} else if (details[i].menuid == 2) {
    			listOfKonstructionFields.push(details[i]);
    		}    		
    	}

    });
    
    function createMenuButtons(details){
    	
    	for (let i = 0; i < details.length; i++){
    			
			let newDiv = document.createElement("div");
			
			newDiv.innerHTML = details[i].button;
			newDiv.setAttribute("value", details[i].id);
			
			if ($(window).width() < 1000){
				
				newDiv.classList.add("menuItem");
				newDiv.classList.add("horizontalMenuItem");

				$("#optionMenu").append(newDiv);
		    	let width = (100 - details.length * 2) / details.length;  

		    	$(".horizontalMenuItem").css("width", width + "%");
		    	
			}else{
				
				newDiv.classList.add("menuItem");
					
				if (details[i].menuid == 1){
					newDiv.classList.add("menuRekuperacjiItem");
					$("#menuRekuperacji").append(newDiv);
				} else if (details[i].menuid == 2) {
					newDiv.classList.add("menuKonstrukcjiItem");
					$("#menuKonstrukcji").append(newDiv);
				}
			}
    	}
    }
    
    const loadMultiFieldsList = () => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://" + window.location.host + "/list");
        xhr.addEventListener('load', () => resolve(xhr.responseText));
        xhr.send();
    });
    
    loadMultiFieldsList().then(result =>{
    	listOfMultiFields = JSON.parse(result);
    });
    
    const loadAllPictures = () => new Promise((resolve, reject) => {
    	const xhr = new XMLHttpRequest();
    	xhr.open("GET", "http://" + window.location.host + "/pictures");
    	xhr.addEventListener('load', () => resolve(xhr.responseText));
    	xhr.send();
    });
    
    loadAllPictures().then(result => {
    	listOfAllPictures = JSON.parse(result);
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
		}
    		
        for (let i = 0; i < container.length; i++){
        	
    		container.eq(i).click(function(){
        		
        		for (let j=0; j < details.length; j++){
	        		if (this.getAttribute("value") == details[j].id){
	        			id = j;
	        		}
        		}
        		
            	if (document.getElementById("details").style.display != 'none'){
            		$("#details").slideUp(200, showHiddenWindow);
            	}else{
            		showHiddenWindow();
            	}
        	});
        }
    }

    function setCurrentlySelectedSubject(id){

    	listOfPicturesToDisplay = [];
		deletePreviousContainer();
		$("#title").html(details[id].title);
		$("#title").attr("value", details[id].id);
		$("#text").html(details[id].text);
		$("#text").attr("value", details[id].id);
		$("#movie").html(details[id].movie);
		$("#movie").attr("value", details[id].id);
		if (details[id].picture == "true"){
			
    		fillSelectedElement(document.getElementById("details"), document.getElementById("title").getAttribute("value"));
			unhidePicturesContainer();
			
			setPicturesToDisplay(details[id].id);
		}
    }
    
    function setCurrentlySelectedList(id, position){
		$("#title" + position).html(listOfMultiFields[id].title);
		$("#text" + position).html(listOfMultiFields[id].text);
		$("#movie" + position).html(listOfMultiFields[id].movie);
    }

    function showHiddenWindow(){
    	clearListedFields();
    	
    	if (details[id].single == 1){
    		setCurrentlySelectedSubject(id);
    	}else{
    		$("#title").html(details[id].title);
    		
    		let buttonDescription = details[id].id;
    		
    		for (let i = 0; i < listOfMultiFields.length; i++){
    			if (listOfMultiFields[i].belongs == buttonDescription){
    				let newDiv = document.createElement("div");
    				newDiv.className = "listedElements";
    				newDiv.setAttribute("value", listOfMultiFields[i].id);
    				
    				let titleDiv = document.createElement("div");
    				titleDiv.className = "innerListedTitle";
    				titleDiv.innerHTML = listOfMultiFields[i].title;
    				titleDiv.setAttribute("value", listOfMultiFields[i].id);
				
    				let textDiv = document.createElement("div");
    				textDiv.className = "innerListedElement";
    				textDiv.innerHTML = listOfMultiFields[i].text;
    				textDiv.setAttribute("value", listOfMultiFields[i].id);
    				
    				let movieDiv = document.createElement("div");
    				movieDiv.className = "innerListedMovie";
    				movieDiv.innerHTML = listOfMultiFields[i].movie;
    				movieDiv.setAttribute("value", listOfMultiFields[i].id);
    				
    				newDiv.appendChild(titleDiv);
    				newDiv.appendChild(textDiv);
    				newDiv.appendChild(movieDiv);
    				
    				$("#details").append(newDiv);
    				$("#text").html("");
    				$("#movie").html("");

    			}
    			if (listOfMultiFields[i].picture == "true"){
    				setOnClickEventsToListedElements(i, true);
    			}else{
    				setOnClickEventsToListedElements(i, false);
    			}
    		}
    	}
    	$("#details").slideDown(500);

    }
    
    function clearListedFields(){
    	for (let i = 0; i < $(".listedElements").length; i++){
    		$(".listedElements").remove();
    	}
    }
 
    function goToNextPicture(){

    	activateGalleryNavigation($("#previousPicture"));

    	containerWidth = document.getElementById("galleryContainer").offsetWidth
    	
    	$("#picture1").attr("z-index", "10");
    	$("#picture1").hide();
    	$("#picture3").show();
    	$("#picture3").attr("z-index", "20");
    	$("#picture2").attr("z-index", "30");
    	
    	$("#picture3").css("left", containerWidth + "px");
    	
    	$("#picture2").stop().animate({
    		left:"-" + containerWidth + "px",
    	},500);

    	$("#picture3").stop().animate({
    		left:"0px",
    	},500, function(){
    		
    		
    		$("#picture2").attr("id", "picture1temp");
    		$("#picture3").attr("id", "picture2");
        	$("#picture1temp").attr("src", "img/" + listOfPicturesToDisplay[currentPictureLoaded]);
        	$("#picture1").attr("id", "picture3");
        	$("#picture1temp").attr("id", "picture1");
        	$("#picture3").css("left", "0px");
        	$("#picture1").css("left", "0px");
        	if (currentPictureLoaded < listOfPicturesToDisplay.length - 2){
        		$("#picture3").attr("src", "img/" + listOfPicturesToDisplay[currentPictureLoaded+2]);
        	}
        	
        	$("#picture1").attr("z-index", "10");
        	$("#picture3").attr("z-index", "20");
        	$("#picture2").attr("z-index", "30");     	
        	
        	currentPictureLoaded++;
        	
        	if (currentPictureLoaded == listOfPicturesToDisplay.length - 1){
        		deactivateGalleryNavigation($("#nextPicture"));
        	}
    	});
    }

    function goToPreviousPicture(){
    	
    	activateGalleryNavigation($("#nextPicture"));
    	
    	containerWidth = document.getElementById("galleryContainer").offsetWidth;
    	$("#picture3").attr("z-index", "10");
    	$("#picture3").hide();
    	$("#picture1").show();
    	$("#picture1").attr("z-index", "20");
    	$("#picture2").attr("z-index", "30");
    	
    	$("#picture1").css("left", "-" + containerWidth + "px");
    	$("#picture2").stop().animate({
    		left: containerWidth + "px",
    	},500);

    	$("#picture1").stop().animate({
    		left:"0px",
    	},500, function(){
    		
        	$("#picture2").attr("id", "picture3temp");
        	$("#picture1").attr("id", "picture2");
        	$("#picture3").attr("id", "picture1");
        	$("#picture3temp").attr("id", "picture3");
        	
    		if (currentPictureLoaded - 1> 0){
    			$("#picture1").attr("src", "img/" + listOfPicturesToDisplay[currentPictureLoaded - 2]);
    		}
        	
        	if (currentPictureLoaded < listOfPicturesToDisplay.length){
        		$("#picture3").attr("src", "img/" + listOfPicturesToDisplay[currentPictureLoaded]);
        	}
        	
        	$("#picture3").css("left", "0px");
        	$("#picture1").css("left", "0px");
        	
        	$("#picture3").attr("z-index", "10");
        	$("#picture1").attr("z-index", "20");
        	$("#picture2").attr("z-index", "30");
        	
    		currentPictureLoaded--;
        	
        	if (currentPictureLoaded == 0){
        		deactivateGalleryNavigation($("#previousPicture"));
        	}      	
    	});
    }
    
    function deletePreviousContainer(){
    	if ($("#galleryContainer").length){
    		$("#galleryContainer").remove();
    	}
    }
    
    function fillSelectedElement(element, id){

    	let container = document.createElement("div");
    	container.setAttribute("id", "galleryContainer"); 
    	container.setAttribute("value", id);
    	
    	let button1 = document.createElement("div");
    	let button2 = document.createElement("div");
    	
    	button1.setAttribute("id", "nextPicture");
    	button2.setAttribute("id", "previousPicture");
    	
    	button1.innerHTML = '<i class="demo-icon icon-right-open"></i>';
    	button2.innerHTML = '<i class="demo-icon icon-left-open"></i>';

    	container.appendChild(button1);
    	container.appendChild(button2);
    	
    	for (let i = 1; i <= 3; i++){
    		let newImg = document.createElement("img");
    		newImg.setAttribute("class", "galleryElement");
    		newImg.setAttribute("id", "picture" + i);
    		newImg.setAttribute("width", "100%");
    		container.appendChild(newImg);
    	}
    	
    	element.appendChild(container);
    	
    	let description = $(element)
		    .clone() 
		    .children(".innerListedTitle")
		    .attr("value");
    	
    	setPicturesToDisplay(description);	
    }
    
    function activateGalleryNavigation(element){
    	
    	if (element.attr("id") == "nextPicture"){
    		element.click(goToNextPicture);
    	}else{
    		element.click(goToPreviousPicture);
    	}
		
        element.css({
            "border": "black solid 1px",
            "cursor": "pointer",
            "color" : "black"
        })
		
	    element.mouseover(function () {
	        element.css({
	            "background": "white",
	        })
	    });
        
	    element.mouseout(function () {
	        element.css({
	            "background": "none",
	        })
	    });
    }
    
    function deactivateGalleryNavigation(element){
    	
		element.off("click");
		
	    element.unbind("mouseover mouseout");
		
        element.css({
            "border": "gray solid 1px",
            "cursor": "default",
            "color" : "gray",
            "background" : "none"
        });
    }
    
    function setOnClickEventsToListedElements(i, isPicture){
    	
			$(".innerListedTitle").eq(i).click(function(){

				let valueOfClickedObject = this.getAttribute("value");
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
        			$(this).parent().children(".innerListedMovie").slideDown(500);
        			$(this).parent().children(".innerListedElement").slideDown(500, function(){
        				
        				if (isPicture){
        					
        					let id = $("#galleryContainer").parent().attr("value");
	        				fillSelectedElement(clickedObject, valueOfClickedObject);
		        			$("#galleryContainer").slideDown(500);
		        			$(".galleryElement").slideDown(500);
		        			$("#previousPicture").slideDown(500);
		        			$("#nextPicture").slideDown(500);
        				}
        			});

				}
			});
    }
    
    function unhidePicturesContainer(){
		$("#galleryContainer").show(500);
		$(".galleryElement").show(500);
		$("#previousPicture").show(500);
		$("#nextPicture").show(500);
    }
    
    function setPicturesToDisplay(desctiption){
			listOfPicturesToDisplay = [];
			for (let i = 0; i < listOfAllPictures.length; i++){

				if (listOfAllPictures[i].belongs == desctiption){
					listOfPicturesToDisplay.push(listOfAllPictures[i].picture);
				}
			}
			$("#picture2").attr("src", "img/" + listOfPicturesToDisplay[0]);
        	$("#picture2").css("left", "0px");
			
			if (listOfPicturesToDisplay.length > 1){
				$("#picture3").attr("src", "img/" + listOfPicturesToDisplay[1]);
	        	containerWidth = document.getElementById("galleryContainer").offsetWidth
	        	$("#picture3").css("left", containerWidth + "px");
	        
			}
			$("#picture1").attr("src", "");
			currentPictureLoaded = 0;
			
	    	if (listOfPicturesToDisplay.length > 1){	    		
	    		activateGalleryNavigation($("#nextPicture"));
	    	}else{
	    		deactivateGalleryNavigation($("#nextPicture"));
	    	}
    }
    
});
