Steps to run this api in your local machine. Follow these steps after opening the project >>

1. Open the terminal, In the root folder of your project, enter command - npm install
2. Add a .env file in the root
3. Add these environment variable in it >>
   DB_NAME (name of sql database),
   DB_ROOT (default is root),
   DB_PASSWORD (password of your sql database),
   NEWS_API_KEY (your api key from newsapi.org),
   WEATHER_API_KEY (your api key from openweathermap.org)
4. Move to the backend dir using cd backend
5. Run command tsc
6. A folder named dist will be created
7. Finally, run command - npm run dev

Make sure you have sql installed in your pc and also setup the environment variables as mentioned
Remember to create the database in sql

Documentation of this api is available on - https://documenter.getpostman.com/view/19514705/2s8YmEz6Th
