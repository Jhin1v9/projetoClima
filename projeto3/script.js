document.querySelector('.busca').addEventListener('submit',async(event) =>{
event.preventDefault();
let aviso = document.querySelector('.aviso');
let input = document.querySelector('#searchInput').value;
let redWarning = aviso.style.color = 'red';
let boldWarning = aviso.style.fontWeight = 'bold';

if(input !== ''){
    clearInfo();
    showWarning('Carregando...')
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=3587a6c2c24c73f33b31f634498d72b1&units=metric&lang=pt_br`
    let results = await fetch(url);
    let json = await results.json();

    if(json.cod === 200){
        
        showInfo({
            name:json.name, 
            country: json.sys.country,
            temp:json.main.temp,
            tempIcon:json.weather[0].icon,
            windSpeed:json.wind.speed,
            windAngle:json.wind.deg
        });
    } else{
        clearInfo()
        showWarning('Cidade não encontrada')
       
        return redWarning, boldWarning;
    }

} else {
         clearInfo();

}
console.log(input)
});

function showInfo(json){
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML= `${json.temp} ºC`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} KM/H `;
    document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${json.tempIcon}.png`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`
}
function clearInfo(){
    showWarning('');
     document.querySelector('.resultado').style.display='none';
}
function showWarning(msg){
     return document.querySelector('.aviso').innerHTML = msg;
}

