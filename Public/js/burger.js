let burger = document.querySelector('.burger');
let navbar = document.querySelector('.big_container')
let logo = document.querySelector('.logo')
let homeNav = document.querySelector('.navbar')

burger.addEventListener('click', ()=>{
  navbar.classList.toggle('big-nav')
  logo.classList.toggle('logo-nav')
  homeNav.classList.toggle('home-nav')
})