import errHandler from "../middlewares/errHandler";
import {Request, Response, NextFunction, RequestHandler} from "express"

interface Obj {
  [key : string]: any
}

let cache : Obj = {};
let weatherCache : Obj = {};

const fetchNews = async (search? : string, res? : Response) => {
  let url = `https://newsapi.org/v2/top-headlines?country=us${
    search ? `&q=${search}` : ""
  }&apiKey=${process.env.NEWS_API_KEY}&pageSize=10`;
  const response = await fetch(url);
  const parsedData = await response.json();
  const data : object[] = parsedData.articles.map((item : Obj) => {
    return { headline: item.title, link: item.url };
  });
  if (search) res?.status(200).json({ count:
    parsedData.totalResults < 10 ? parsedData.totalResults : 10, data });
  cache[search ? search : "default"] = { count: search
    ? parsedData.totalResults < 10
      ? parsedData.totalResults
      : 10
    : 10, data };
};

fetchNews();

const fetchWeatherReport = async () => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=Bangalore&appid=${process.env.WEATHER_API_KEY}&cnt=5&units=metric`
  );
  const parsedData = await response.json();
  const data : object[] = parsedData.list.map((item: Obj) => {
    return {
      date: item.dt_txt,
      main: item.weather[0].main,
      temp: item.main.temp_max,
    };
  });
  weatherCache.default = {
    count: 5,
    unit: "metric",
    location: parsedData.city.name,
    data,
  };
};
fetchWeatherReport();

export const newsController = errHandler(async (req: Request, res: Response, next: NextFunction) => {
  let data : object;
  const { search } = req.query; 
  if (!search) data = cache.default;
  else if (cache[`${search}`]) data = cache[`${search}`];
  else return fetchNews(search as string, res);
  res.status(200).json(data);
});

export const weatherNews = errHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ data: weatherCache.default });
});
