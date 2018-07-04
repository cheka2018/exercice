  
/*................cours 1 : kit batterie............*/
  function playSound(e) {
      var audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
      var key = document.querySelector(`.key[data-key="${e.keyCode}"]`); 
      if(!audio) return; 
      // on va arrêter la fonction si audio est false ( pas de touche associé a un élement audio)
      audio.play(); 
      // si audio est true, alors on fait jouer le son qui est associé a cet élément avec le keyCode qui est associé a la touche clavier spécifié.
      audio.currentTime = 0; 
      // rembobiner la musique, en faite c'est pour pouvoir rejouer le son dés qu'on appuie sur une touche, même si l'évenement d'avant n'est pas terminé 
      key.classList.add('playing');
      }

  function removeTransition(e) {
      if (e.propertyName !== 'transform') return;  // si la properièté  ne correspand pas a transform alors on retourne false sinon : on supprime la classe playing
      e.target.classList.remove('playing')
      }

  var keys = document.querySelectorAll('.key'); 
  keys.forEach(key => key.addEventListener('transitionend', removeTransition)); 
  window.addEventListener('keydown', playSound);




/*...............cours 2 :Horlige............*/

  var secondHand = document.querySelector('.second-hand');
  var minuteHand = document.querySelector('.min-hand');
  var heureHand = document.querySelector('.hour-hand');

  function CorrigerErreur(ele, deg) {  
      if (deg === 90) {
        ele.style.transition = 'all 0.0s' // on remplace la transition au nivea de 90 deg, par une valeur all 0.0s c'est a dire aucune transition 
      }
    }

  function setDate() {  
      var now = new Date();

      var secondes = now.getSeconds();
      var secondsDegrees = secondes /60*360 + 90; // récupérer les secondes en degrés .
      secondHand.style.transform = `rotate(${secondsDegrees}deg)`; // remplacer le style transform par rotate(XXdeg), avec XX la valeur actuel en degrée des secondes.

      var minutes = now.getMinutes();
      var minutesDegrees = minutes  /60*360 + 90;
      minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

      var heures = now.getHours();
      var hoursDegrees = (heures/12)*360 + 90;
      heureHand.style.transform = `rotate(${hoursDegrees}deg)`; 

      CorrigerErreur(secondHand, secondsDegrees);
      CorrigerErreur(minuteHand, minutesDegrees);
      CorrigerErreur(heureHand, hoursDegrees);
     
    }
   setInterval(setDate, 1000) 


/* ........cours 3 : variable CSS .........*/


  var inputs = document.querySelectorAll('.controls input');
   
  function handleUpdate (){
      var suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}` , this.value + suffix) ;
    }

  inputs.forEach(input => input.addEventListener('change', handleUpdate));


/*........cours 4 : Array cardio ...........*/

    var inventors = [
        { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
        { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
        { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
        { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
        { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
        { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
        { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
        { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
        { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
        { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
        { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
        { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
      ];
     var people = ['Zidane, Zinedine', 'Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
 

    /* Filtrer par date de naissance  */
    var fifteenHundreds = inventors.filter(  
      inventor => inventor.year >= 1500 && inventor.year < 1600);


    /* Tableau des noms complets */
    var fullNames = inventors.map(inventors => `${inventors.first} ${inventors.last}`);

    /* Trier du plus jeune au plus vieux */
    var chronologie = inventors.sort((a,b) => (a.year > b.year ? 1 : -1));


    /* Total des année de vécu de tous les inventeurs */

    var  totalYears = inventors.reduce((total, inventor) => { 
      return  total + (inventor.passed - inventor.year)}, 0)



    /* Trier en focntion de la longivité des inventeurs, du plus cours au plus long */
    var longivite  = inventors.sort(  
      (a, b) => (a.passed - a.year > b.passed - b.year ? 1 : -1))


/* Boulevards a Paris */
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

/*var liens = Array.from(document.querySelectorAll('.mw-category a'));
  var de = liens.map(lien => lien.textContent)
                .filter(streetName => streetName.includes('de'));
  console.log(de);*/

/* Trier par ordre alphabétique */
    var alpha = people.sort((a, b) => {
      var [aLast, aFirst] = a.split(', ');
      var [bLast, bFirst] = b.split(', '); 
      return aLast > bLast ? 1 : -1;  
    });
 /* Compter les instances */
    var data = [  
      'car',
      'car',
      'truck',
      'truck',
      'bike',
      'walk',
      'car',
      'van',
      'bike',
      'walk',
      'car',
      'van',
      'car',
      'truck',
    ]
  var transport = data.reduce(function(obj, item) {
   if(!obj[item]) {
        obj[item] = 0; 
       }
      obj[item] ++; 
      return obj;
     
    }, {});  // on commence par 0 (vide)
   //console.log(transport);

/*On aura ce résultats
​
bike: 2
​
car: 5
​
truck: 3
​
van: 2
​
walk: 2
​
<prototype>: Object { … }
*/




/* cours numéro 7 : Array cardio day 2*/

  var peoples = [
      { name: 'Wes', years: 1988 },
      { name: 'Kait', years: 1986 },
      { name: 'Irv', years: 1970 },
      { name: 'Lux', years: 2015 }
    ];

  var comments = [
      { text: 'Love this!', id: 523423 },
      { text: 'Super good', id: 823423 },
      { text: 'You are the best', id: 2039842 },
      { text: 'Ramen is my fav food ever', id: 123523 },
      { text: 'Nice Nice Nice!', id: 542328 }
    ];
    
// Nous allons verfifer si une personne est adulte >= 19
  var adulte = peoples.some(personne => {
  var annee = new Date().getFullYear()
  return annee - personne.years >= 19
});

//console.log(adulte); // si la valeur est true donc il existe au moins une personne qui as plus ou égale 19.

// si je veux savoir si toute les personnes ont plus de 19 ans
var allAdult = peoples.every(personnes => new Date().getYear() - personnes.years >= 19);
//console.log(allAdult); //on a false 


// nous allons chercher un commentaire dans un tableau

var trouverElement = comments.find(comment => comment.id === 823423)
//console.log(trouverElement);

// nous allons trouver un élements avec la méthode findIndex, et le supprimer ensuite

var element = comments.findIndex(comment => comment.id === 823423)
               comments.splice(element, 1);
//console.log(comments);

/*on aura :
(4) […]
​
0: Object { text: "Love this!", id: 523423 }
​
1: Object { text: "You are the best", id: 2039842 }
​
2: Object { text: "Ramen is my fav food ever", id: 123523 }
​
3: Object { text: "Nice Nice Nice!", id: 542328 }
​
length: 4
​
<prototype>: Array [] 
on a supprimé le 2éme élement*/


/* cours 8 canvas */

  var  canvas = document.querySelector('#draw');  
  var ctx = canvas.getContext('2d');

    // on définie les properiétés du contexte:
      ctx.strokeStyle ='#BADA55'; // Définit le style pour les contours des formes
      ctx.lineJoin ='round'; // Créer un coin arrondi lorsque les deux lignes se rencontrent
      ctx.lineCap ='round'; //  Tracer la ligne de cercle de l'embout.
      ctx.lineWidth = 5; // représente l'épaisseur du tracé 

    //Définir les variables de dessin par défaut
  let isDrawing = false ;
    //les coordonnées du début et fin de tracé 
  let lastX = 0 ;
  let lastY = 0;
  let hue = 0; // initialise la teinte a 0
  let direction = true;

    function draw(e) {
        if(!isDrawing) return ; //si on appuie pas sur la souris.
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.lineWidth = hue;
        ctx.beginPath(); // un tracé est initialisé par la méthode beginPath().
        ctx.moveTo(lastX, lastY); // est le point de référence de début du tracé.
        ctx.lineTo(e.offsetX, e.offsetY); // ajoute un segment jusqu'a (e.offsetX, e.offsetY).
            // offsetX et offsetY fourni le décalage sur l'axe X et Y du pointeur de la souris entre cet évènement et la bordure de la marge intérieure du noeud cible.
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY]; 
            // pour permetre de repartir sur le dernier point de décalage connu.

        hue++; // incrémenter la teinte. 
            // on va utiliser les conditions, pour éviter un grossissement exagérés de notre tracé 
        if(hue >= 90) {
          hue = 0;
            } // pour ne pas dépasser une teinte de 360.
         if(ctx.lineWidth >=5 || ctx.linWidth <= 1) {
          direction = !direction;
                   }
          if(direction) {
            ctx.linWidth++;
              } else {
            ctx.lineWidth--;
              } 
         }
         

  canvas.addEventListener('mousemove', draw); //Faire déplacer le curseur sur l'élément
  canvas.addEventListener('mousedown', (e) => { isDrawing = true; //Appuyer sur le bouton gauche de la souris sur l'élément
  [lastX, lastY] = [e.offsetX, e.offsetY]; // mettre la condition ici, c'est de pouvoir mettre  notre tracé au a jour a l'évenement click .
                      });
  canvas.addEventListener('mouseup', () => isDrawing = false); // Relâcher le bouton gauche de la souris sur l'élément
  canvas.addEventListener('mouseout', () => isDrawing = false); //Faire sortir le curseur de l'élément


/* ........cours 10 ......*/

var checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]'); // séléctionne toutes les cases

function handleCheck(e) {  
  let inBetween = false // on déclare une variable booleen avec une valeur false
   // vérifier si la touche maj et une case checkbox est cochée.
  if (e.shiftKey && this.checked) {
         checkboxes.forEach(checkbox => {
           if (checkbox === this || checkbox === lastChecked)
           inBetween = !inBetween  
           if (inBetween){
           checkbox.checked = true
              }
          })
       }
       lastChecked = this
   }

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck))  // écouter si une case est coché ou modifié

// fonction effacer les cases cochées 
function Clear(e) {  
  checkboxes.forEach(checkbox => checkbox.checked = false)
}
document.getElementById('clear').addEventListener('click', Clear)



