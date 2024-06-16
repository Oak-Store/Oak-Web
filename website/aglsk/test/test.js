async function fetchData() {
  const urlParams = new URLSearchParams(window.location.search);
  const project_dev_name = urlParams.get('project_dev_name');
  const project_name = urlParams.get('project_name');
  if (project_dev_name && project_name) {
    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbzY10nMRy1XdLxIsQzj4MqzLc1MMG4P0UXlG7T0dHYmhE3Ts2c05B6Ghw6yMgb33yeV/exec?project_dev_name=${project_dev_name}&project_name=${project_name}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (!data || Object.keys(data).length === 0) {
        throw new Error('No data found');
      }

      document.getElementById('app_title').textContent = data.project_name_app;
      document.getElementById('app_developer').textContent = data.project_dev_name;
      document.getElementById('app_description').textContent = data.project_description;
      document.getElementById('app_category').textContent = data.project_category;
      document.getElementById('app_tags').textContent = data.project_tag;
      document.getElementById('number_of_downloads').textContent = data.project_download_count;
      document.getElementById('app_logo').src = data.project_photo_app;
      document.getElementById('dev_photo').src = data.project_dev_photo;
      document.getElementById('download_link').href = data.project_download_url;

      const features = data.project_functions ? data.project_functions.split(','): [];
      const featuresList = document.getElementById('app-features');
      featuresList.innerHTML = '';
      features.forEach(feature => {
        const li = document.createElement('li');
        li.className = 'mdui-list-item mdui-ripple';
        li.textContent = feature.trim();
        featuresList.appendChild(li);
      });

      const screenshots = data.project_screenshorts ? data.project_screenshorts.split(','): [];
      const screenshotsDiv = document.getElementById('app-screenshots');
      screenshotsDiv.innerHTML = '';
      screenshots.forEach(screenshot => {
        const div = document.createElement('div');
        div.className = 'mdui-col-xs-4';
        const img = document.createElement('img');
        img.src = screenshot.trim();
        img.className = 'mdui-img-fluid';
        div.appendChild(img);
        screenshotsDiv.appendChild(div);
      });
    } catch (error) {
      console.error('Fetch error: ', error);
      document.getElementById('app-detail').innerHTML = `<p>Erro ao carregar os dados: ${error.message}</p>`;
    }
  } else {
    document.getElementById('app-detail').innerHTML = '<p>Nome do desenvolvedor e/ou nome do aplicativo não fornecidos na URL.</p>';
  }
}