const phoneStage = document.querySelector('.phone-stage');

if (phoneStage && matchMedia('(hover: hover) and (min-width: 1024px)').matches) {
  phoneStage.addEventListener('pointermove', (event) => {
    const box = phoneStage.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1));
    phoneStage.style.setProperty('--tilt-x', `${-y * 3}deg`);
    phoneStage.style.setProperty('--tilt-y', `${x * 3}deg`);
  });
  phoneStage.addEventListener('pointerleave', () => {
    phoneStage.style.removeProperty('--tilt-x');
    phoneStage.style.removeProperty('--tilt-y');
  });
}
