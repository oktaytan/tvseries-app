class UI {
  constructor(data, i) {
    this.name = data[i].show.name;
    this.imageSrc = data[i].show.image === null || data[i].show.image === '' ? './img/no-image.svg' : data[i].show.image.medium;
    this.summary = data[i].show.summary === null ? 'No summary' : (data[i].show.summary.length > 600 ? data[i].show.summary.substring(0, 500) : data[i].show.summary);
    this.network = data[i].show.network === null || data[i].network === '' ? 'Unknown' : (data[i].show.network.name === null || data[i].show.network.name === '' ? 'Unknown' : data[i].show.network.name);
    this.scheduleDay = data[i].show.schedule.days[0] === undefined ? 'Unknown' : data[i].show.schedule.days[0];
    this.scheduleTime = data[i].show.schedule.time;
    this.scheduleDuration = data[i].show.runtime;
    this.language = data[i].show.language === undefined ? 'Unknown' : data[i].show.language;
    this.genres = data[i].show.genres.length === 0 ? 'Unknown' : [...data[i].show.genres].join(' | ');
    this.status = data[i].show.status;
    this.official = data[i].show.officialSite === null ? '#' : data[i].show.officialSite;
  }

  getSerie() {
    $('#seriesList').append(`
        <div class="series">
          <h4 class="series__title" id="name">${this.name}</h4>
          <div class="series__detail">
            <div class="series__image">
              <img class="image__medium" src="${this.imageSrc}" alt="image">
            </div>
            <div class="series__info">
              <p class="summary">${this.summary}</p>
              <div class="series__info__details">
                <div class="series__info__details__left">
                  <div class="info__titles">
                    <p>Network :</p>
                    <p>Schedule :</p>
                    <p>Language :</p>
                    <p>Genres :</p>
                    <p>Status :</p>
                  </div>
                  <div class="info__results">
                    <span class="network">${this.network}</span>
                    <span class="schedule">${this.scheduleDay} at ${this.scheduleTime} (${this.scheduleDuration} min)</span>
                    <span class="language">${this.language}</span>
                    <span class="genres">${this.genres}</span>
                    <span class="status">${this.status}</span>
                  </div>
                </div>
                <div class="series__info__details__right">
                  <i class="fas fa-play"></i><a class="website" href="${this.official}"> Official Site</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
  }

  clearForm() {
    $('#tvseries').val('');
  }
}

$('#serieForm').submit(function (e) {
  e.preventDefault();
  $('#seriesList').html('');
  if ($('#tvseries').val() === '') {
    $('#feedback').addClass('show');
    setTimeout(() => {
      $('#feedback').removeClass('show');
    }, 3000);
  } else {
    const serieName = $('#tvseries').val().toLowerCase().replace(/\s+/g, '');
    const url = `http://api.tvmaze.com/search/shows?q=${serieName}`;

    $.get(url, data => {
      $(data).each(i => {
        const ui = new UI(data, i);
        ui.getSerie();
        ui.clearForm();
      })
    }).fail((err) => {
      console.log(err);
    });
  }
});