/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// For assistance: 
  // Check the "Project Resources" section of the project instructions
  // Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat


//-- Store all quotes in array of array literals
const quotes = [
  {
    quote: "If you don't know anything about computers, just remember that they are machines that do exactly what you tell them but often surprise you in the result.", 
    source: "Richard Dawkins", 
    citation:"The Blind Watchmaker", 
    year: "1986",
    tags: ["computers", "evolution"]
  },
  {
    quote: "Dare to be gorgeous and unique. But don't ever be cryptic or otherwise unfathomable. Make it unforgettably great.", 
    source: "Robert J. Mical", 
    citation:"Amiga Intuition Reference Manual", 
    year: "1986",
    tags: ["computers", "inspirational"]
  },
  {
    quote: "Education doesn’t have aims. It is the aim of other things.", 
    source: "Andrew Abbott", 
    tags: ["education"]
  },
  {
    quote: "We are stuck with technology when all we really want is just stuff that works. How do you recognize something that is still technology? A good clue is if it comes with a manual.", 
    source: "Douglas Adams", 
    citation:"The Salmon of Doubt: Hitchhiking the Galaxy One Last Time", 
    year: "2002",
    tags: ["technology", "science"]
  },
  {
    quote: "Engineering or Technology is the making of things that did not previously exist, whereas science is the discovering of things that have long existed.", 
    source: "David Billington", 
    citation:"The Tower and the Bridge: The New Art of Structural Engineering", 
    year: "1983",
    tags: ["technology", "science", "engineering"]
  }
];


//-- Store all colors in array
const colors = [ "#3aa2c1", "#613ac1", "#c13a3a", "#c1a43a", "#3ac162" ];

//-- Keep track of last indexes so we don't show the same thing in a row
let lastQuoteIndex = -1;
let lastColorIndex = -1;

//-- Keep track of setInterval timer settings
const intervalTimer = 10;
let pageTimer;
let timerStart;

/**
 * Returns array literal object of provided quotes
 * @returns {object}
 */
function getRandomQuote() {
  if (quotes.length == 0) {
    throw "Not enough quotes were supplied.";
  }

  //-- define empty index now assign later
  let quoteIndex;

  //-- Potentially loop through random numbers and colors until we get a different index than the last
  do {
    quoteIndex = Math.floor(Math.random() * quotes.length); 
  } while (quotes.length > 1 && quoteIndex == lastQuoteIndex)

  //-- Keep track of last index shown so we don't show the same thing twice in a row
  lastQuoteIndex = quoteIndex;
  return quotes[quoteIndex];
}


/**
 * Returns hexadecimal color code
 * @returns {string}
 */
function getRandomColor() {
  if (colors.length == 0) {
    return null;
  }

  //-- define empty index now assign later
  let colorIndex;

  //-- Potentially loop through random colors until we get a different index than the last
  do {
    colorIndex = Math.floor(Math.random() * colors.length); 
  } while (colors.length > 1 && colorIndex == lastColorIndex)

  //-- Keep track of last index shown so we don't show the same thing twice in a row
  lastColorIndex = colorIndex;
  return colors[colorIndex];
}


/**
 * Write a randomly selected quote to the page
 * @param resetTimer Checks whether functionwas called by click or timer
 */
function printQuote(resetTimer = true) {
  //-- Get and check random quote
  let randomQuote = getRandomQuote();
  if (randomQuote) {
    let formattedString = `
      <p class="quote">${randomQuote.quote}</p>
      <p class="source">${randomQuote.source}`;

    //-- Check for citation and year before printing it
    if (randomQuote.citation) formattedString +=`<span class="citation">${randomQuote.citation}</span>`
    if (randomQuote.year) formattedString += `<span class="year">${randomQuote.year}</span>`
   
    //-- End formattedString
    formattedString += '</p>';

    //-- Check for tags
    if (randomQuote.tags) formattedString +=`<p class="tags"><span>${randomQuote.tags.join('</span><span>')}</span></p>`

    //-- Insert quote into page
    document.getElementById('quote-box').innerHTML = formattedString; 

    //-- Try to change background color too
    let randomColor = getRandomColor();
    if (randomColor) {
      document.querySelector('body').style.backgroundColor = randomColor; 
    }

    //-- Create a loading bar
    let loadingBar = getLoadingBar();
    if (loadingBar) {
      if (resetTimer) {
        //-- Clear old timer if one exists
        if (pageTimer) {
          clearInterval(pageTimer);
          pageTimer = null;
        } 

        //-- Start new timer
        pageTimer = setInterval(() => {
          printQuote(false);
        }, (intervalTimer * 1000) + 250);      
      } 
      
      //-- Reset loading bar animation speed and positon
      loadingBar.style.transition = "width 0s";
      loadingBar.style.width = "0";
      
      setTimeout(() => {
        loadingBar.style.transition = `width ${intervalTimer}s linear`;
        loadingBar.style.width = "100%";      
      }, 250);
    }

    //-- Keep track of when the timer was started so we can create a progression bar
    timerStart = Math.round(Date.now() / 1000)


  }
  else {
    //-- wipe page and throw error
    document.getElementById('quote-box').innerHTML = ""; 
    throw "Problem receiving random quote.";
  }
}

/**
 * Try to get loading bar or add it to the page if it doesnt exist yet
 * @returns {HTMLElement}
 */
function getLoadingBar() {
  let loadingBar = document.getElementById("loading-bar");
  if (!loadingBar) {
    loadingBar = document.createElement('div');
    loadingBar.id = "loading-bar";
    document.querySelector('body').appendChild(loadingBar);
  }
  return loadingBar;
}


//-- Start document by pulling a random quote
printQuote();


/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);