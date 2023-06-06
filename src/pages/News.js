import '../App.css';
import React, {Suspense} from 'react';
import {BeatLoader} from 'react-spinners';
import * as cheerio from 'cheerio';

const getNews = () => {
  console.log("loading..")
  throw new Promise(resolves => setTimeout(resolves, 3000));
}

const url = "https://www.pokemon.com/us/pokemon-news";

async function scrapeNews(){
  try{
    const document = await fetch(url, {
      method: "GET",
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    }).then(res => res);

    console.log(document)

    const $ = cheerio.load(document);
    console.log($)

    return;
    const listItems = $(".news-list .clear ul li");
    const news = [];
    listItems.each((idx, el) => {
      const item = {
        date: "",
        category: "",
        title: "",
        url: "",
        image_url: ""
      };
      item.date = $(el).children("a").attr("href").text();
      console.log(item.date);
    })
  } catch (err) {
    console.log(err);
  }
}

function safe(fn){
  try{
    fn();
  } catch(error){
    if(error instanceof Promise)
      error.then(() => safe(fn))
    else
      throw error;
  }
}

function GetNews(){
  const document = safe(getNews());
  return <h1>Loaded</h1>;
}

export default function News() {
  const cheerio = require('cheerio');
  const $ = cheerio.load('<ul id="list">...</ul>');  

  scrapeNews();

  return (
    <div className="App">
      <section>
        <article>
          <h1>News</h1>
            <Suspense fallback={<BeatLoader/>}>
              <GetNews/>
            </Suspense>
            {$.html()}
        </article>
      </section>
    </div>
  );
}