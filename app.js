const state = { experience: 4, portfolio: 72, match: 68, interview: 'medium' };
const weights = { experience: .11, portfolio: .028, match: .035, interview: .48 };
const interviewValues = { low: -1, medium: 0, high: 1 };
const labels = { experience: 'Experience', portfolio: 'Portfolio', match: 'Role match', interview: 'Interview signal' };
const $ = id => document.getElementById(id);

function calculate() {
  const values = { experience: state.experience / 2, portfolio: (state.portfolio - 50) / 10, match: (state.match - 50) / 10, interview: interviewValues[state.interview] };
  const contributions = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value * weights[key]]));
  const logOdds = -.25 + Object.values(contributions).reduce((a, b) => a + b, 0);
  const score = Math.round(100 / (1 + Math.exp(-logOdds)));
  return { contributions, score };
}
function update() {
  const { contributions, score } = calculate();
  $('experienceValue').textContent = `${state.experience} years`;
  $('portfolioValue').textContent = `${state.portfolio} / 100`;
  $('matchValue').textContent = `${state.match} / 100`;
  $('score').textContent = score;
  $('scoreRing').style.background = `conic-gradient(var(--lime) ${score * 3.6}deg, #e3e7de 0deg)`;
  $('meterFill').style.width = `${score}%`;
  const result = score >= 75 ? ['Strong shortlist', 'The inputs reinforce one another, especially the work sample and role fit.'] : score >= 55 ? ['Potential shortlist', 'The fit is plausible, but one or two signals could make the case clearer.'] : ['Needs more evidence', 'The model has limited evidence of fit from these signals.'];
  $('decision').textContent = result[0]; $('decisionNote').textContent = result[1];
  $('contributions').innerHTML = Object.entries(contributions).map(([key, value]) => {
    const percent = Math.min(100, Math.abs(value) / 1.1 * 100);
    const sign = value >= 0 ? '+' : '−';
    return `<div class="contribution"><span>${labels[key]}</span><div class="bar"><span class="${value < 0 ? 'negative' : ''}" style="width:${percent}%"></span></div><output>${sign}${Math.abs(value).toFixed(2)}</output></div>`;
  }).join('');
  const target = 75, shortfall = target - score;
  let tip = state.interview !== 'high' ? 'Move the interview signal to High.' : state.match < 90 ? 'Raise role-match to 90.' : 'Strengthen the portfolio score.';
  $('counterfactualTitle').textContent = score >= target ? 'You already cross the strong-shortlist threshold.' : `A change of ${shortfall} points reaches ${target}%.`;
  $('counterfactualText').textContent = score >= target ? 'Try lowering one input and observe which change has the largest local effect.' : `${tip} Counterfactuals describe a model change, not a guaranteed real-world outcome.`;
  $('counterfactualPill').textContent = score >= target ? 'Threshold met' : `Need +${shortfall} pts`;
}
['experience', 'portfolio', 'match'].forEach(id => $(id).addEventListener('input', e => { state[id] = Number(e.target.value); update(); }));
document.querySelectorAll('[data-interview]').forEach(button => button.addEventListener('click', () => { state.interview = button.dataset.interview; document.querySelectorAll('[data-interview]').forEach(b => b.classList.toggle('active', b === button)); update(); }));
$('reset').addEventListener('click', () => { Object.assign(state, { experience: 4, portfolio: 72, match: 68, interview: 'medium' }); ['experience','portfolio','match'].forEach(id => $(id).value = state[id]); document.querySelectorAll('[data-interview]').forEach(b => b.classList.toggle('active', b.dataset.interview === 'medium')); update(); });
update();
