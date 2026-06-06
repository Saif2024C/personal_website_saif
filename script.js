const clock = document.getElementById('clock');
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('site-theme') || 'dark';

function tick() {
  const now = new Date();
  if (clock) {
    clock.textContent = now.toLocaleString('en-GB', {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

function setTheme(theme) {
  document.documentElement.style.setProperty('--bg', theme === 'paper' ? '#f5efe7' : '#0f0d14');
  document.documentElement.style.setProperty('--bg2', theme === 'paper' ? '#f0e8dc' : '#15111f');
  document.documentElement.style.setProperty('--panel', theme === 'paper' ? '#fffaf4' : '#1a1626');
  document.documentElement.style.setProperty('--panel2', theme === 'paper' ? '#f4ede1' : '#201a2e');
  document.documentElement.style.setProperty('--text', theme === 'paper' ? '#1c1820' : '#f4ecff');
  document.documentElement.style.setProperty('--muted', theme === 'paper' ? '#5f5868' : '#b6afc7');
  document.documentElement.style.setProperty('--line', theme === 'paper' ? 'rgba(28,24,32,0.12)' : 'rgba(255,255,255,0.11)');
  document.documentElement.style.setProperty('--link', theme === 'paper' ? '#7c4cff' : '#ef77ff');
  localStorage.setItem('site-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'paper' ? 'switch to dark' : 'switch theme';
  }
}

tick();
setInterval(tick, 1000);
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = localStorage.getItem('site-theme') || 'dark';
    setTheme(current === 'dark' ? 'paper' : 'dark');
  });
}

const updatedDate = document.getElementById('updatedDate');
if (updatedDate) {
  updatedDate.textContent = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date());
}
