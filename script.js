
    let startTime ;
    let elapse= 0;
    let intervalId;
    let first = true;
    let endTimed;

    const start = document.getElementById("start");
    const pause = document.getElementById("pause");
    const lap = document.getElementById("lap");
    const stop = document.getElementById("stop");
    const resetbtn = document.getElementById("reset");
    const live = document.getElementById('time');
    const watch = document.getElementById('watch');

    const laps = document.getElementById("laps");

    const d = Date.now();
    watch.innerText=updateWatch(0);
    
    function liveClock(){
        let d = new Date();
        live.innerText =`${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`;
    }

    setInterval(liveClock,10);

    function updateWatch(d){
let miliSeleconds = d % 1000;
    const seconds = Math.floor(d / 1000) % 60;
    const minutes = Math.floor(d / (60 * 1000)) % 60;
    const hours = Math.floor(d / (3600 * 1000)) % 24;

    let padMili = String(miliSeleconds).padStart(3, "0");
    let padSec = String(seconds).padStart(2, "0");
    let padMin = String(minutes).padStart(2, "0");
    let padHour = String(hours).padStart(2, "0");
        return `${padHour}:${padMin}:${padSec}:${padMili}`
    }


    function startWatch(d){
        let now = d;
        const endtime = Date.now();

        let elapsedTime = endtime- now;
        watch.innerText = updateWatch(elapsedTime)
        
        elapse = elapsedTime;
        
    }


    function pauseWatch(){
        startTime = Date.now() - elapse;

        clearInterval(intervalId)
        first = false;
    }

    start.addEventListener("click", () =>{
        if(first){
            startTime = Date.now();
            intervalId = setInterval(() => {startWatch(startTime);}, 1);
        }else{

            startTime = Date.now() - elapse;
            intervalId = setInterval(() => { startWatch(startTime); }, 1);

        }
        start.innerText ="resume";

    })

    pause.addEventListener("click",()=>{
        pauseWatch();
    })


    lap.addEventListener("click" , () =>{
        

        const li = document.createElement("li");
        li.style.border="none";
        li.style.width="100%";
        li.classList.add("lap");
        li.innerText =  updateWatch (elapse);
        laps.appendChild(li)


    if (laps.classList.contains("hidden")) {
        laps.classList.add("inline-block")
        laps.classList.remove("hidden");
    }

    })

    stop.addEventListener("click", () =>{

        start.innerText = "start"
        watch.innerText=updateWatch(0);
        elapse = 0;
        clearInterval(intervalId);
        first = true;
    })


    resetbtn.addEventListener("click",() =>{
            laps.innerHTML = '';
            laps.classList.add("hidden");
            laps.classList.remove("inline-block");

    })
