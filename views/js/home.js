const removeCrosses = document.querySelectorAll('.remove');

removeCrosses.forEach((cross, index) => {
    cross.addEventListener('click', (e) => {
      e.preventDefault();
      cross.parentElement.remove();
      const cityName = cross.parentElement.querySelector('.cityName').textContent;
      const data = {city: cityName};
      const JSONdata = JSON.stringify(data);
      fetch('/deleteCity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSONdata,
      });

    }
  );
});