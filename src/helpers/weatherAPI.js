// Remova os comentários a medida que for implementando as funções
const TOKEN = import.meta.env.VITE_TOKEN;

export const searchCities = async (term) => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=${term}`);
    const data = await response.json();

    if (data.length === 0) {
      window.alert('Nenhuma cidade encontrada');
    }
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export async function getWeatherByCity(cityURL) {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=${cityURL}`);

    const data = await response.json();
    const { temp_c: tempC, condition } = data.current;
    const { name, country } = data.location;

    return {
      temp: tempC,
      condition: condition.text,
      icon: condition.icon,
      name,
      country,
      url: cityURL,
    };
  } catch (error) {
    console.error('Erro ao obter informações do tempo atual:', error);
    throw error;
  }
}

export async function getSevenDays(cityURL) {
  const DIAS = 7;

  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${TOKEN}&q=${cityURL}&days=${DIAS}`);
  const data = await response.json();

  console.log(data);
  const result = data.forecast.forecastday.map((dia) => {
    return {
      date: dia.date,
      maxTemp: dia.day.maxtemp_c,
      minTemp: dia.day.mintemp_c,
      condition: dia.day.condition.text,
      icon: dia.day.condition.icon,
    };
  });
  return result;
}
