const questions=[
{t:"Students should master a common core of knowledge.",p:"Essentialist"},
{t:"Learning should begin with student interests.",p:"Progressive"},
{t:"Schools should actively address social problems.",p:"Reconstructionist"},
{t:"Reinforcement is an effective learning tool.",p:"Behaviorist"},
{t:"Students should define personal meaning.",p:"Existentialist"},
{t:"Great books remain valuable.",p:"Perennialist"},
{t:"Experience is the best teacher.",p:"Progressive"},
{t:"Academic discipline is essential.",p:"Essentialist"},
{t:"Freedom is central to education.",p:"Existentialist"},
{t:"Education should transform society.",p:"Reconstructionist"},
{t:"Knowledge transcends time.",p:"Perennialist"},
{t:"Student voice matters.",p:"Progressive"},
{t:"Shared cultural knowledge matters.",p:"Essentialist"},
{t:"Rewards improve performance.",p:"Behaviorist"},
{t:"Authenticity matters more than conformity.",p:"Existentialist"},
{t:"Inquiry should drive curriculum.",p:"Progressive"},
{t:"Teachers should explicitly teach content.",p:"Essentialist"},
{t:"Democratic classrooms are ideal.",p:"Progressive"},
{t:"Observable behaviors should be measured.",p:"Behaviorist"},
{t:"Schools should challenge injustice.",p:"Reconstructionist"},
{t:"Reflection deepens learning.",p:"Existentialist"},
{t:"Core skills are foundational.",p:"Essentialist"},
{t:"Choice enhances engagement.",p:"Existentialist"},
{t:"Conditioning influences behavior.",p:"Behaviorist"},
{t:"Education should prepare agents of change.",p:"Reconstructionist"}
];
const quiz=document.getElementById("quiz");
questions.forEach((q,i)=>{quiz.innerHTML+=`<div class='q'><div>${i+1}. ${q.t}</div><select id='q${i}'><option value='1'>Strongly Disagree</option><option value='2'>Disagree</option><option value='3'>Neutral</option><option value='4'>Agree</option><option value='5'>Strongly Agree</option></select></div>`});
function scoreQuiz(){let scores={};questions.forEach((q,i)=>{scores[q.p]=(scores[q.p]||0)+Number(document.getElementById('q'+i).value)});let sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);localStorage.setItem('pq_inventory_complete','true');document.getElementById('results').innerHTML='<div class="results"><h2>Results</h2><p>Primary Alignment: '+sorted[0][0]+'</p><p>Secondary Alignment: '+sorted[1][0]+'</p></div>';}
