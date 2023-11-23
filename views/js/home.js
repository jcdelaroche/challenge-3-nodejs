const removeCrosses = document.querySelectorAll('.remove');

removeCrosses.forEach((cross, index) => {
    cross.addEventListener('click', (e) => {
      e.preventDefault();
      cross.parentElement.parentElement.remove();
      const id = cross.parentElement.parentElement.getAttribute('id');
      const data = {id: id};
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