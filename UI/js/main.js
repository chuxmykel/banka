const hamburger = document.getElementById('hamburger-menu');
const page = document.getElementById("page");
const sideBar = document.getElementById("mySidebar");
let open = 0;

const openNav = () => {
	if (open === 1) {
		open = 0;
		return closeNav();
	} 
	sideBar.style.width = "120px";
	page.style.marginRight = "120px";
	open = 1;
}
  
const closeNav = () => {
	sideBar.style.width = "0";
	page.style.marginRight= "0";
}

const displayInfo = (evt, tabName) => {
	let i;
	const tabcontent = document.getElementsByClassName("tabcontent");
	const tablinks = document.getElementsByClassName("tablinks");
	
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
	
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
  
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}

hamburger.addEventListener('click', openNav);
document.getElementById('profile-tab').style.display = "block";
document.getElementById('profile').className += " active";