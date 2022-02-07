function attachEvents() {
    const cityInput = document.getElementById('location');
    const displayConditions = document.getElementById('forecast');
    
 
    const current = document.getElementById('current');
    
    const upcoming = document.getElementById('upcoming');
   
    
 
   
    const btn = document.getElementById('submit');
     btn.addEventListener('click',displayForecast);
 
     async function displayForecast() {
         try {
             
            
             displayConditions.style.display = 'block';
            
 
             const cityCode = await getLocation(cityInput.value);
 
             const dailyWeather = await getCurrentConditions(cityCode);
         
             const upcomingWeather = await upcomingConditions(cityCode);
         
           const [dWeather,name]=  Object.values(dailyWeather);
           let condition = '';
           
          switch (dWeather.condition) {
              
                  case 'Sunny':
                  condition= '&#x2600'; // ☀
                  break;
 
                  case 'Partly sunny':
                  condition='&#x26C5'; // ⛅
                  break;
 
                  case 'Overcast':
                  condition= '&#x2601';// ☁
                  break;
 
                  case 'Rain':
                  condition = '&#x2614'; // ☂
                  break;         
             
          }
 
          const divCurrForecast = document.createElement('div');
          divCurrForecast.className ='forecasts';
 
          const spanSymbol = document.createElement('span');
          spanSymbol.className = 'condition symbol';
          spanSymbol.innerHTML = condition
 
          const spanCondition = document.createElement('span');
          spanCondition.className = 'condition';
 
          const spanDataName = document.createElement('span');
          spanDataName.className = 'forecast-data';
          spanDataName.textContent = name;
 
          const spanDataTemp = document.createElement('span');
          spanDataTemp.className = 'forecast-data';
          spanDataTemp.innerHTML = `${dWeather.low}&#176 / ${dWeather.high}&#176`;
 
          const spanDataCondition = document.createElement('span');
          spanDataCondition.className = 'forecast-data';
          spanDataCondition.textContent = dWeather.condition;
 
          spanCondition.appendChild(spanDataName);
          spanCondition.appendChild(spanDataTemp);
          spanCondition.appendChild(spanDataCondition);
          divCurrForecast.appendChild(spanCondition);
          divCurrForecast.appendChild(spanSymbol);
          current.appendChild(divCurrForecast);
 
 
          const divForecastInfo = document.createElement('div');
          divForecastInfo.className = 'forecast-info';
 
          const spanClassUpcoming = document.createElement('span');
          spanClassUpcoming.className = 'upcoming';
 
         
 
       const [days,city] = await Object.values(upcomingWeather);
 
          for (const day of days) {
 
             let foreCondition = '';
 
             switch (day.condition) {
              
                 case 'Sunny':
                 foreCondition= '&#x2600'; // ☀
                 break;
 
                 case 'Partly sunny':
                     foreCondition='&#x26C5'; // ⛅
                 break;
 
                 case 'Overcast':
                     foreCondition= '&#x2601';// ☁
                 break;
 
                 case 'Rain':
                     foreCondition = '&#x2614'; // ☂
                 break;         
            
         }
             const spanClassSymbol = document.createElement('span');
             spanClassSymbol.className = 'symbol';
             spanClassSymbol.innerHTML = foreCondition;
    
             const spanDataForecastDegrees = document.createElement('span');
             spanDataForecastDegrees.className = 'forecast-data';
             spanDataForecastDegrees.innerHTML = `${day.low}&#176 / ${day.high}&#176`;
    
             const spanDataForecastCondition = document.createElement('span');
             spanDataForecastCondition.className = 'forecast-data';
             spanDataForecastCondition.textContent = day.condition;
 
             spanClassUpcoming.appendChild(spanClassSymbol);
             spanClassUpcoming.appendChild(spanDataForecastDegrees);
             spanClassUpcoming.appendChild(spanDataForecastCondition);
          }
          
          divForecastInfo.appendChild(spanClassUpcoming);
          upcoming.appendChild(divForecastInfo);
          
 
         } catch (error) {
             displayConditions.style.display = 'block';
             displayConditions.textContent = error.message;
 
         }
 
         
     }
 }
 
 
 async function getLocation(name) {
     
         const url = `http://localhost:3030/jsonstore/forecaster/locations`;
 
     const response = await fetch(url);
     
    
     const data = await response.json();
 
     const currentCity = await Object.values(data).find(c => c.name === name);
 
     return currentCity.code;
    
     
 
 }
 
 async function getCurrentConditions(code) {
 
     const url = `http://localhost:3030/jsonstore/forecaster/today/`+ code;
 
     const response = await fetch(url);
     const data = await response.json();
 
     return data;
 }
 
 async function upcomingConditions(code) {
 
     const url = `http://localhost:3030/jsonstore/forecaster/upcoming/`+ code;
 
     const response = await fetch(url);
     const data = await response.json();
 
     return data;
 }
 
 attachEvents();