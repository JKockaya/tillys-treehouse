const ears = document.querySelectorAll('.ear');
     
const eyes = document.querySelectorAll('.eye');

const arms = document.querySelectorAll('.arm');


function applyAnimateClass() {

    ears.forEach((ear) => {
      ear.classList.add('animated');
    })
     
     eyes.forEach((eye) => {
      eye.classList.add('animated');
    })

    arms.forEach((arm) => {
        arm.classList.add('animated');
    })
   
   }
   
   function removeAnimateClass() {
    
    ears.forEach((ear) => {
      ear.classList.remove('animated');
    })
     

    eyes.forEach((eye) => {
      eye.classList.remove('animated');
    })

    arms.forEach((arm) => {
        arm.classList.remove('animated');
    })
   }
   
   setInterval(applyAnimateClass, 2000);
   setInterval(removeAnimateClass, 2500);