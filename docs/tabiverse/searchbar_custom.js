// get list of TLDs from IANA website thing
const tlds_url = "https://data.iana.org/TLD/tlds-alpha-by-domain.txt";
let tlds = [];
fetch(tlds_url)
    .then((response) => (response.text()))
    .then((response) => {
        tlds = (response.split(/\r?\n/).slice(1));
    }
);

// the search <input>
const search_input = document.getElementById("search");

// focus search bar
search_input.focus();

// resize searchbar to maximum width - 256 (for spacing of other icon) or 1000, whichever is smaller
function searchbar_resize(event) {
    let barsize = Math.min(document.documentElement.clientWidth - 256, 1000)
    search_input.style.width = `${barsize}px`;
}

// resize initially, and then add listener
searchbar_resize();
window.addEventListener("resize", searchbar_resize);

// get <form> element
const form = document.getElementById("sbar-form");

// error message tag
const err_p = document.getElementById("err");

// make message fade and reset after a bit
function fade_error(msg) {
    if (err_p.innerHTML === msg) {
        err_p.style.opacity = "0";
    }
}

// reset opacity, innerhtml, blah blah blah of error <p> tag
function reset() {
    err_p.innerHTML = "";
    err_p.classList.remove("fade-transition");
    err_p.style.opacity = "1";
    err_p.offsetHeight; // listen I know this looks cursed but it triggers a reflow otherwise this still animates
    err_p.classList.add("fade-transition");
}

// set listener to empty when done fading
err_p.addEventListener("transitionend", reset);

const drive_re = /^[a-z]:.*/i;

// regexes for searched()
const domain_re = /^(([a-z\-]+)\.)+([a-z\-]+)\//i;

// when enter is pressed
function searched(event) {
    event.preventDefault();
    let string = search_input.value;
    
    try {
        let urlToOpen;
        if ( // http/https/file
            string.startsWith("http:")
            || string.startsWith("https:")
            || string.startsWith("file:")) {
            urlToOpen = string;
        }
        else if ( // C: or / starting files indicating file:// paths on their respective operating systems
            (drive_re.test(string) && window.navigator.platform.startsWith("Win")) // windows
            || (string.startsWith("/") && (!window.navigator.platform.startsWith("Win")))) {
            urlToOpen = "file://" + string;
        }
        else {
            let slashed_string = string.endsWith("/") ? string : (string + "/");
            if (domain_re.test(slashed_string)) {
                urlToOpen = "http://" + string;
            }
            else {
                urlToOpen = "https://www.google.com/search?q=" + string;
            }
        }

        if (urlToOpen !== undefined) {
            window.open(urlToOpen, "_self", "noreferrer=true");
        }
        else {
            throw new Error("urlToOpen is not defined")
        }
    }
    catch (e) {
        let emsg = String(e.message);
        reset();
        err_p.innerHTML = emsg;
        setTimeout(() => (fade_error(emsg)), 5000);
        throw e;
    }
    
} 

// add listener
form.addEventListener("submit", searched);