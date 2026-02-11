document.addEventListener("DOMContentLoaded", function () {

  const $ = id => document.getElementById(id);

  function go(id){
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    $(id).classList.add("active");
  }
  window.go = go;

  let userName="";
  let currentTest=[];

  /* prevent enter refresh */
  document.addEventListener("keydown", e=>{
    if(e.key==="Enter") e.preventDefault();
  });


  /* LOGIN */
  $("startBtn").addEventListener("click", ()=>{
    userName = $("username").value || "User";
    $("welcome").innerText = "Welcome, " + userName;
    go("roles");
  });


  /* ROLES */
  const roles=[
    "Data Scientist","Web Developer","AI Engineer","Backend Developer",
    "Frontend Developer","Full Stack Developer","Android Developer",
    "Cybersecurity Analyst","Cloud Engineer","DevOps Engineer"
  ];

  roles.forEach(role=>{
    const div=document.createElement("div");
    div.className="role";
    div.innerText=role;
    div.onclick=()=>startRole(role);
    $("rolesGrid").appendChild(div);
  });


  const questions=[
    {q:"Git is used for?",o:["Design","Version Control","DB","ML"],a:1},
    {q:"SQL is for?",o:["Database","UI","Cloud","AI"],a:0},
    {q:"HTML is?",o:["Structure","Logic","Server","DB"],a:0},
    {q:"CSS controls?",o:["Design","Logic","Data","Git"],a:0},
    {q:"React is?",o:["Library","DB","OS","Compiler"],a:0},
    {q:"Debugging?",o:["Fix bugs","Deploy","Design","Test only"],a:0},
    {q:"Python is?",o:["Language","DB","Server","Tool"],a:0},
    {q:"Cloud means?",o:["Remote servers","Local PC","Git","HTML"],a:0},
    {q:"API stands for?",o:["Application Programming Interface","None","Auto","Panel"],a:0},
    {q:"ML is?",o:["AI method","UI tool","DB","None"],a:0}
  ];


  function startRole(role){
    currentTest=questions;
    $("roleTitle").innerText=role+" Test";
    $("questions").innerHTML="";

    questions.forEach((q,i)=>{
      let html=q.o.map((o,j)=>`<label><input type="radio" name="q${i}" value="${j}">${o}</label><br>`).join("");
      $("questions").innerHTML+=`<p><b>Q${i+1}</b> ${q.q}</p>${html}`;
    });

    go("assessment");
  }


  /* SUBMIT */
  $("submitBtn").addEventListener("click", ()=>{

    let correct=0;

    currentTest.forEach((q,i)=>{
      let ans=document.querySelector(`input[name=q${i}]:checked`);
      if(ans && +ans.value===q.a) correct++;
    });

    let percent=Math.round(correct*10);

    $("userRow").innerText=userName;
    $("userScore").innerText=percent+"%";

    let streak=(+localStorage.getItem("streak")||0)+1;
    localStorage.setItem("streak",streak);

    $("streakBox").innerText=streak;
    $("streakBig").innerText=streak;

    buildHeatmap(streak);

    go("report");
  });


  function buildHeatmap(streak){
    $("heatmap").innerHTML="";
    for(let i=0;i<35;i++){
      let d=document.createElement("div");
      d.className="day"+(i<streak?" active":"");
      $("heatmap").appendChild(d);
    }
  }

});

