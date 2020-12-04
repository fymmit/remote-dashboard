import { sendKeys } from './helpers/fetch.js';

const volumeInput = document.getElementById('volume');
const volumeButton = document.getElementById('volume-button');
const websiteInput = document.getElementById('website');
const websiteButton = document.getElementById('website-button');
const ctrlwButton = document.getElementById('ctrlw-button');
const prevTabButton = document.getElementById('ctrlShiftTab-button');
const nextTabButton = document.getElementById('ctrlTab-button');
const twitchButton = document.getElementById('twitch-button');
const httpsButton = document.getElementById('https-button');
const fButton = document.getElementById('f-button');
const altTabButton = document.getElementById('altTab-button');
const keysInput = document.getElementById('keys');
const keysButton = document.getElementById('keys-button');

window.onload = async () => {
  const volume = await (await fetch('/volume')).text();
  volumeInput.value = volume;
}

volumeButton.addEventListener('click', () => {
  const vol = volumeInput.value;
  fetch(`/volume/${vol}`, { method: 'POST' });
});

websiteButton.addEventListener('click', () => {
  const url = websiteInput.value;
  fetch(`/website?url=${url}`, { method: 'POST' });
});

ctrlwButton.addEventListener('click', () => {
  sendKeys('^w');
});

prevTabButton.addEventListener('click', () => {
  sendKeys('^+{tab}');
});

nextTabButton.addEventListener('click', () => {
  sendKeys('^{tab}');
});

altTabButton.addEventListener('click', () => {
  sendKeys('%({tab 2})')
});

'fjkl'.split('').forEach(x => {
  const button = document.getElementById(`${x}-button`);
  button.addEventListener('click', () => sendKeys(x));
});

keysButton.addEventListener('click', () => {
  sendKeys(keysInput.value);
});

twitchButton.addEventListener('click', () => {
  websiteInput.value = 'https://twitch.tv/';
  websiteInput.focus();
});
httpsButton.addEventListener('click', () => {
  websiteInput.value = 'https://';
  websiteInput.focus();
});
