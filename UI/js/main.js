const hamburger = document.getElementById('hamburger-menu');
const page = document.getElementById("page");
const sideBar = document.getElementById("mySidebar");
let open = 0;

hamburger.addEventListener('click', openNav);
function openNav() {
	if (open === 1) {
		open = 0;
		return closeNav();
	} 
	sideBar.style.width = "100px";
	page.style.marginRight = "100px";
	open = 1;
}
  
function closeNav() {
	sideBar.style.width = "0";
	page.style.marginRight= "0";
}
