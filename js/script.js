

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute('href'));

        if(target){

            target.scrollIntoView({
                behavior:'smooth',
                block:'start'
            });

        }

    });
});


// ===============================
// Active Navbar Link
// ===============================

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;
        const sectionHeight=section.clientHeight;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


// ===============================
// Navbar Background
// ===============================

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        header.style.background="rgba(11,12,16,0.92)";
        header.style.backdropFilter="blur(18px)";
        header.style.boxShadow="0 8px 30px rgba(0,0,0,.35)";

    }

    else{

        header.style.background="rgba(11,12,16,.8)";
        header.style.boxShadow="none";

    }

});


// ===============================
// Scroll Reveal Animation
// ===============================

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(".glass-card,.project-card,.hero-content,.hero-image-container").forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});


// ===============================
// Typing Effect
// ===============================

const highlight=document.querySelector(".highlight");

if(highlight){

const text=highlight.textContent;

highlight.textContent="";

let i=0;

function type(){

    if(i<text.length){

        highlight.textContent+=text.charAt(i);

        i++;

        setTimeout(type,70);

    }

}

type();

}


// ===============================
// Button Ripple Effect
// ===============================

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const diameter=Math.max(this.clientWidth,this.clientHeight);

const radius=diameter/2;

circle.style.width=circle.style.height=`${diameter}px`;

circle.style.left=`${e.clientX-this.getBoundingClientRect().left-radius}px`;

circle.style.top=`${e.clientY-this.getBoundingClientRect().top-radius}px`;

circle.classList.add("ripple");

const ripple=this.getElementsByClassName("ripple")[0];

if(ripple){

ripple.remove();

}

this.appendChild(circle);

});

});


// ===============================
// Contact Form
// ===============================


// Scroll Progress

const progress=document.getElementById("progressBar");

window.addEventListener("scroll",()=>{

const total=document.documentElement.scrollHeight-window.innerHeight;

const progressWidth=(window.pageYOffset/total)*100;

progress.style.width=progressWidth+"%";

});

const contactForm = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    sendBtn.innerHTML = "Sending...";
    sendBtn.disabled = true;
    console.log("Name:", contactForm.from_name.value);
    console.log("Email:", contactForm.from_email.value);
    console.log("Message:", contactForm.message.value);


   const templateParams = {
    from_name: contactForm.from_name.value,
    from_email: contactForm.from_email.value,
    message: contactForm.message.value
};

console.log(templateParams);

emailjs.send(
    "service_47y0qsj",
    "template_yfgmjoy",
    templateParams
)

    .then(function (response) {

    console.log("SUCCESS!", response);

    showToast("Message Sent Successfully!");

    contactForm.reset();

    sendBtn.innerHTML = 'Send <i class="fas fa-paper-plane"></i>';

    sendBtn.disabled = false;

})

.catch(function (error) {

    console.log("FAILED...", error);

    alert(JSON.stringify(error));

    showToast("Failed to Send Message!", true);

    sendBtn.innerHTML = 'Send <i class="fas fa-paper-plane"></i>';

    sendBtn.disabled = false;

});

});

function showToast(message, error = false){

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.className = "";

    if(error){

        toast.classList.add("error");

    }

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}