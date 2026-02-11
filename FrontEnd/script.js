/* ---------- PAGE SWITCH ---------- */
function go(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

let userName="";
let currentRole="";
let currentTest=[];


/* ---------- LOGIN ---------- */
function login(){
  userName = username.value || "User";
  welcome.innerText = "Welcome, " + userName;
  go("roles");
}


/* ---------- ROLES ---------- */
const roles=[
"Data Scientist","Web Developer","AI Engineer","Backend Developer",
"Frontend Developer","Full Stack Developer","Android Developer",
"Cybersecurity Analyst","Cloud Engineer","DevOps Engineer"
];

roles.forEach(r=>{
  rolesGrid.innerHTML+=`<div class="role" onclick="startRole('${r}')">${r}</div>`;
});


/* ---------- REAL QUESTIONS ---------- */
const questionBank = {
"Data Scientist":[
{q:"Which library is used for data analysis?",o:["React","Pandas","Docker","Node"],a:1,skill:"Pandas"},
{q:"SQL is used for?",o:["Styling","Database queries","ML","Hosting"],a:1,skill:"SQL"},
{q:"KNN is?",o:["Algorithm","DB","Framework","Server"],a:0,skill:"ML"},
{q:"Mean is?",o:["Spread","Central tendency","Bias","Error"],a:1,skill:"Statistics"},
{q:"Matplotlib is for?",o:["Charts","DB","Cloud","Security"],a:0,skill:"Visualization"},
{q:"Git is?",o:["Version control","Compiler","Language","API"],a:0,skill:"Git"},
{q:"NumPy handles?",o:["Arrays","CSS","HTML","Docker"],a:0,skill:"Numpy"},
{q:"Cleaning means?",o:["Removing noise","Training","Hosting","Testing"],a:0,skill:"Cleaning"},
{q:"Train/test split is for?",o:["Evaluation","Deployment","Design","None"],a:0,skill:"Evaluation"},
{q:"Deployment means?",o:["Host model","Train","Clean","Test"],a:0,skill:"Deployment"}
]
};

/* reuse same set for others */
roles.forEach(r=>{
  if(!questionBank[r]) questionBank[r]=questionBank["Data Scientist"];
});


/* ---------- START TEST ---------- */
function startRole(role){

  currentRole = role;
  currentTest = questionBank[role];
  roleTitle.innerText = role+" Test";

  questions.innerHTML="";

  currentTest.forEach((q,i)=>{
    let ops="";
    q.o.forEach((opt,j)=>{
      ops+=`<label><input type="radio" name="q${i}" value="${j}">${opt}</label><br>`;
    });

    questions.innerHTML+=`<p><b>Q${i+1}:</b> ${q.q}</p>${ops}<br>`;
  });

  go("assessment");
}


/* ---------- ANALYSIS ---------- */
function analyze(){

  let correct=0;
  let weak=[];

  currentTest.forEach((q,i)=>{
    let ans=document.querySelector(`input[name="q${i}"]:checked`);
    if(ans && parseInt(ans.value)===q.a) correct++;
    else weak.push(q.skill);
  });

  let percent = Math.round((correct/10)*100);

  scoreBox.innerText = percent+"%";
  userScore.innerText = percent;
  userRow.innerText = userName;

  /* streak */
  let streak = localStorage.getItem("streak") || 0;
  streak++;
  localStorage.setItem("streak",streak);
  streakBox.innerText = streak;

  /* daily routine */
  routine.innerHTML="";
  weak.slice(0,3).forEach(s=>{
    routine.innerHTML+=`
      <li>
      Study ${s} for 45 mins → practice 2 problems → revise notes
      </li>`;
  });

  /* 3 links */
  courses.innerHTML=`
  <a target="_blank" href="https://youtube.com/results?search_query=${currentRole}+full+course">YouTube Course</a><br>
  <a target="_blank" href="https://www.freecodecamp.org/">FreeCodeCamp</a><br>
  <a target="_blank" href="https://www.geeksforgeeks.org/">GeeksForGeeks Practice</a>
  `;

  /* chart */
  new Chart(chart,{
    type:'radar',
    data:{
      labels:["Concepts","Practical","Tools","Theory","Problem Solving"],
      datasets:[{data:[percent/20,4,3,5,percent/20]}]
    }
  });

  go("dashboard");
}
