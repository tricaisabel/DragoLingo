var rightChoices=0;
var totalChoices=0;
var currentQuestion=0;
var questions=[
    {
        "question":["A "," is as good as its weakest "],
        "answears":["chain","link"],
        "choices":["jewellery","chain","friend","link","node"]
    },
    {
        "question":["To kill two "," with one "],
        "answears":["birds","stone"],
        "choices":["problems","solutions","birds","shotgun","stone"]
    },
    {
        "question":["An eye for "," and a tooth for "],
        "answears":["an eye","a tooth"],
        "choices":["a tooth","1 million dollars","an eye","gold","revenge"]
    },
    {
        "question":["Actions "," louder than "],
        "answears":["speak","words"],
        "choices":["motivation","words","shouts","phrases","speak"]
    },
    {
        "question":["Give someone the "," of the "],
        "answears":["benefit","doubt"],
        "choices":["doubt","advantage","disadvantage","benefit"]
    }
]

function loadQuestion(){
    let page=document.getElementById("page");
    page.innerText=`${currentQuestion+1}/${questions.length}`;
    let words=document.getElementById("words");
    words.innerText="";
    for(let j=0;j<questions[currentQuestion].choices.length;j++){
        let option=document.createElement('div');
        option.className="word";
        option.draggable=true;
        option.id=`option${currentQuestion}${j}`;
        option.innerText=questions[currentQuestion].choices[j];
        option.ondragstart=event=>{
            event.dataTransfer.setData("id", event.target.id);
            console.log("Drag started");
        }
        
        words.appendChild(option);
    }

        let q=document.getElementById("question");
        q.innerText="";
        let fieldNumber=0;
        for(let j=0;j<questions[currentQuestion].question.length;j++){
            q.innerHTML+=questions[currentQuestion].question[j];
            if(questions[currentQuestion].question[j].slice(-1)===" "){
                const field=document.createElement('span');
                field.className="field";
                field.id=`field${currentQuestion}${fieldNumber}`;
                fieldNumber++;
                q.append(field);
            }
            
        }

    var fields = document.getElementsByClassName("field");
    for (var i = 0; i < fields.length; i++) {
        fields[i].addEventListener('dragover', event=>{
            event.preventDefault();
        }, false);
        fields[i].addEventListener("drop",e=>drop(e),false);
        fields[i].addEventListener("dblclick",e=>{
            e.target.className="field";
            e.target.innerText="";
            // e.target.style.backgroundColor="#c7c7c7";
        },false);
    }
}

function drop(e) {
    var data = e.dataTransfer.getData("id");
    const choice=document.getElementById(data);
    e.target.innerText=choice.innerText;
    e.target.className="word";
}

function nextQuestion(){
    let firstChoice=document.getElementById(`field${currentQuestion}0`);
    let secondChoice=document.getElementById(`field${currentQuestion}1`);
    if(firstChoice.innerText!=="" && secondChoice.innerText!=""){
        //fields are not empty
        let firstAnswear=questions[currentQuestion].answears[0];
        let secondAnswear=questions[currentQuestion].answears[1];

        if(firstAnswear===firstChoice.innerText && secondAnswear===secondChoice.innerText){
            rightChoices+=2;
            totalChoices+=2;
            currentQuestion++;
            if(currentQuestion===questions.length){
                loadResult(rightChoices,totalChoices);                
            }
            else loadQuestion();
        }
        else{
            //choices are wrong
            if(firstAnswear!==firstChoice.innerText){
                firstChoice.className="word wrong-answear";
                totalChoices+=1;
            }
            if(secondAnswear!==secondChoice.innerText){
                secondChoice.className="word wrong-answear";
                totalChoices+=1;
            }
        }
        
    }
    else{
        alert("You must complete the empty fields!");
    }
    
}

function loadResult(right,total){
    document.getElementById("logo").src="";
    let message=document.getElementById("message");
    let words=document.getElementById("words");
    let question=document.getElementById("question");
    let percent=right/total*100;
    if(percent>=90){
        document.getElementById("logo").src="https://www.clipartmax.com/png/full/335-3351566_super-duo-duolingo.png";
        question.innerText="Congrats! You're a champion!";
    }
    else if(percent>=50){
        document.getElementById("logo").src="https://www.clipartmax.com/png/full/270-2701318_see-4th-of-july-language-exchange-at-duolingo-medell%C3%ADn-duolingo-italian.png";
        question.innerText="You've done great.";
    }
    else{
        document.getElementById("logo").src="https://www.clipartmax.com/png/full/110-1106414_duolingo-crying-owl.png";
        question.innerText="Try harder next time.";
    }
    message.style.display="none";
    words.style.display="none";
    document.getElementById("submit").style.display="none";
    document.getElementById("title").innerText=`${right}/${totalChoices} Right Words`;    
}






