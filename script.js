
    //variables
    let startTime ;
    let elapse= 0;
    let intervalId;
    let isRunning = false;
    let paused = false;
    let lapcount = 0;
    
    //DOM
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
    
    //live Clock function
    function liveClock(){
        let d = new Date();
        live.innerText =`${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`;
    }

    setInterval(liveClock,1000);

    //updating the Stopwatch
    function updateWatch(d){
    let miliSeleconds = d % 1000;
    const seconds = Math.floor(d / 1000) % 60;
    const minutes = Math.floor(d / (60 * 1000)) % 60;
    const hours = Math.floor(d / (3600 * 1000)) % 24;

    return `${padHour = String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(miliSeleconds).padStart(3, "0")}`
    }


    //starts the stopwatch
    function startWatch(){
        const now = Date.now();

        elapse = now - startTime
        watch.innerText = updateWatch(elapse)
        
    }

    //pause the stopwatch
    function pauseWatch(){
        startTime = Date.now() - elapse; 
        clearInterval(intervalId)
        isRunning = false
        paused = true;
    }

    //event listener start button
    start.addEventListener("click", () =>{
        if(!isRunning){
            clearInterval(intervalId);
            startTime = Date.now() - elapse;
            intervalId = setInterval(() => {startWatch();}, 1);
            start.innerText ="resume";
            isRunning = true
        }
    } )

    //event listener pause button 
    pause.addEventListener("click",()=>{
        pauseWatch();
    })

    //event listener lap button
    lap.addEventListener("click" , () =>{  
        if(isRunning || paused){
        console.log("hi")
        const li = document.createElement("li");
        const rank = document.createElement("div");
        const timeStamp = document.createElement("div");
        li.classList.add("li");
        li.classList.add("lap");


        rank.innerText=`${lapcount+1}.`;
        rank.classList.add("inline-block")
        li.appendChild(rank)
        
        timeStamp.innerText =  updateWatch (elapse);
        li.appendChild(timeStamp)
        laps.appendChild(li)
        lapcount++;
        }
    if (laps.classList.contains("hidden")) {
        laps.classList.add("inline-block")
        laps.classList.remove("hidden");
    }

    })
 
    //event listener stop button
    stop.addEventListener("click", () =>{
        clearInterval(intervalId);

        start.innerText = "start"
        watch.innerText=updateWatch(0);
        elapse = 0;
        paused = false;
        isRunning = false
    })

    //event listener reset button
    resetbtn.addEventListener("click",() =>{
            laps.innerHTML = '';
            laps.classList.add("hidden");
            lapcount = 0
            paused = false;
    })
