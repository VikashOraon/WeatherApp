//Getting refrence of elements
const cityForm = document.querySelector('form');
 const card = document.querySelector('.card');
 const details = document.querySelector('.details');
 const time = document.querySelector('img.time');
 const icon = document.querySelector('.icon img');  

//DOM manipulation
const updateUI = (data) =>{

    // const cityDetail = data.cityDetail;
    // const weather = data.weather;
    //the below code is equivalent to the above comment(Object Shorthand Notation)
     const { cityDetail , weather } = data;
    //update detail template
    details.innerHTML =`
    <h5 class="my-3">${cityDetail.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;c</span>
    </div>
    `;
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }else{
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);   
    
 //remove d-none class if exist
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
 };

 const updateCity = async (city)=>{

    const cityDetail = await getCity(city);
    const weather = await getWeather(cityDetail.Key);

    return {
        cityDetail,
        weather
        };
 };

 cityForm.addEventListener('submit', (e)=>{

    //prvent deafault browser action 
    e.preventDefault();
    
  //get City value
    const city = cityForm.city.value.trim();
    cityForm.reset();
    
  //update the UI with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
 });
