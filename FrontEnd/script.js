/* ======================================================
   SKILLMAP AI FINAL LOGIC
   SAFE + STABLE + CLEAN
   ONLY JS — layout untouched
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const $ = id => document.getElementById(id);

  /* ================= PAGE SWITCH ================= */
  function go(id){
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    $(id).classList.add("active");
  }
  window.go = go;



  /* ================= GLOBAL STATE ================= */
  let userName = "";
  let currentTest = [];



  /* ================= LOGIN ================= */
  $("startBtn").addEventListener("click", ()=>{

    userName = $("username").value || "User";

    $("welcome").innerText = "Welcome, " + userName;

    go("roles");   // 🔥 page change after login
  });



  /* ================= ROLES ================= */
  const roles = [
    "Data Scientist","Web Developer","AI Engineer","Backend Developer",
    "Frontend Developer","Full Stack Developer","Android Developer",
    "Cybersecurity Analyst","Cloud Engineer","DevOps Engineer"
  ];

  const rolesGrid = $("rolesGrid");

  roles.forEach(role=>{
    const div=document.createElement("div");
    div.className="role";
    div.innerText=role;
    div.onclick=()=>startRole(role);
    rolesGrid.appendChild(div);
  });



  /* ================= QUESTIONS ================= */

  const questions = [
    {q:"Git is used for?",o:["Design","Version Control","Database","Hosting"],a:1,skill:"Git"},
    {q:"SQL is used for?",o:["Database","UI","Cloud","AI"],a:0,skill:"SQL"},
    {q:"HTML controls?",o:["Structure","Logic","Security","Server"],a:0,skill:"HTML"},
    {q:"CSS controls?",o:["Design","Database","Logic","Compiler"],a:0,skill:"CSS"},
    {q:"API stands for?",o:["Application Programming Interface","None","Server Tool","Panel"],a:0,skill:"API"},
    {q:"React is a?",o:["Library","Database","OS","Compiler"],a:0,skill:"React"},
    {q:"Cloud computing means?",o:["Remote servers","Local PC","Git","HTML"],a:0,skill:"Cloud"},
    {q:"Debugging means?",o:["Fix bugs","Design","Deploy","Test only"],a:0,skill:"Debugging"},
    {q:"Python is?",o:["Language","Framework","Database","Server"],a:0,skill:"Python"},
    {q:"Machine Learning is?",o:["AI method","UI tool","Database","None"],a:0,skill:"ML"}
  ];



  /* ================= START ROLE ================= */
  function startRole(role){

    $("roleTitle").innerText = role + " Test";

    currentTest = questions;

    const qBox = $("questions");
    qBox.innerHTML="";

    questions.forEach((q,i)=>{

      let opts = q.o.map((opt,j)=>
        `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label><br>`
      ).join("");

      qBox.innerHTML += `<p><b>Q${i+1}</b> ${q.q}</p>${opts}`;
    });

    go("assessment");
  }



  /* ================= SUBMIT TEST ================= */
  $("submitBtn").addEventListener("click", ()=>{

    let correct = 0;
    let weak = [];

    currentTest.forEach((q,i)=>{
      const ans=document.querySelector(`input[name=q${i}]:checked`);

      if(ans && +ans.value===q.a){
        correct++;
      } else {
        weak.push(q.skill);
      }
    });

    const percent = Math.round(correct*10);

    $("userScore").innerText = percent + "%";
    $("userRow").innerText = userName;



    /* ============ STREAK ============ */
    let streak = (+localStorage.getItem("streak")||0)+1;
    localStorage.setItem("streak",streak);

    $("streakBox").innerText = streak;
    if($("streakBig")) $("streakBig").innerText = streak;

    buildHeatmap(streak);



    /* ============ DAILY ROUTINE ============ */
    const routine = $("routine");
    routine.innerHTML="";

    weak.slice(0,3).forEach(skill=>{
      routine.innerHTML += `<li>Practice ${skill} for 45 minutes</li>`;
    });



    /* ============ RECOMMENDATIONS (REAL LINKS) ============ */
    const courses = $("courses");

    courses.innerHTML = `
      <a target="_blank" href="https://www.youtube.com/results?search_query=${weak[0]||"programming"}+course+free">📺 YouTube Course</a><br><br>
      <a target="_blank" href="https://www.freecodecamp.org/">💻 FreeCodeCamp</a><br><br>
      <a target="_blank" href="https://www.geeksforgeeks.org/">📘 GeeksForGeeks Practice</a>
    `;



    /* ============ BADGES ============ */
    const badges = $("badges");
    badges.innerHTML="";

    if(percent>=90) badges.innerHTML += "<span class='badge'>🏆 Top Performer</span>";
    if(percent>=70) badges.innerHTML += "<span class='badge'>⭐ Skilled</span>";
    if(streak>=3) badges.innerHTML += "<span class='badge'>🔥 Consistent</span>";



    /* ============ CHART ============ */
    if(window.Chart){
      new Chart($("chart"),{
        type:"radar",
        data:{
          labels:["Concepts","Tools","Practice","Speed","Confidence"],
          datasets:[{
            data:[percent/20,4,3,5,percent/20]
          }]
        }
      });
    }



    /* 🔥 go to report */
    go("report");
  });



  /* ================= HEATMAP ================= */
  function buildHeatmap(streak){

    const heatmap = $("heatmap");
    if(!heatmap) return;

    heatmap.innerHTML="";

    for(let i=0;i<35;i++){
      let d=document.createElement("div");
      d.className="day"+(i<streak?" active":"");
      heatmap.appendChild(d);
    }
  }

});
