import * as fs from 'fs/promises';
import { getContentTypeFrom }  from '../scripts/contentTypeUtil.js';

const BASE = 'http://localhost:8080/';
/**
*  define a controller to retrieve static resources
*/
export default class RequestController {

  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(this.request.url,BASE).pathname;   
  }

  get response() {
    return this.#response;
  }
  get request() {
    return this.#request;
  }
  get url() {
    return this.#url;
  }

  async handleRequest() {
    this.response.setHeader("Content-Type" , getContentTypeFrom(this.url) );
    await this.buildResponse();
    this.response.end();
  }


  /**
  * send the requested resource as it is, if it exists, else responds with a 404
  */
  async buildResponse()  {
    if(this.url==='/'){
      try{
        const data = await fs.readFile('../public/pages/home.html');
        this.response.statusCode = 200;
        this.response.write(data);}
        catch(err) { 
          const data1 = await fs.readFile('../public/pages/error.html');
          this.response.statusCode = 404;
          this.response.write(data1);
        }
    }

    else if(this.url==='/home'){
      try{
        
        const data = await fs.readFile('../public/pages/home.html');
        this.response.statusCode = 200;
        this.response.write(data);}
        catch(err) { 
          const data1 = await fs.readFile('../public/auctionner/auctionner.html');
          this.response.statusCode = 404;
          this.response.write(data1);
        }
    }

    else if(this.url==='/auctionner'){
      try{
        const data = await fs.readFile('../public/auctionner/auctionner.html');
        this.response.statusCode = 200;
        this.response.write(data);}
        catch(err) { 
          const data1 = await fs.readFile('../public/auctionner/auctionner.html');
          this.response.statusCode = 404;
          this.response.write(data1);
        }
    }

    else if(this.url==='/bidder'){
      try{
        const data = await fs.readFile('../public/bidder/bidder.html');
        this.response.statusCode = 200;
        this.response.write(data);}
        catch(err) { 
          const data1 = await fs.readFile('../public/bidder/bidder.html');
          this.response.statusCode = 404;
          this.response.write(data1);
        }
    }

    else if(this.url==='/about'){
      try{
        const data = await fs.readFile('../public/pages/about.html');
        this.response.statusCode = 200;
        this.response.write(data);}
        catch(err) { 
          const data1 = await fs.readFile('../public/pages/about.html');
          this.response.statusCode = 404;
          this.response.write(data1);
        }
    }

  else {
    try {
      console.log(this.url);
      const data = await fs.readFile(`../public/${this.url}`)
      this.response.statusCode = 200;
      this.response.write(data);
    }
    catch(err) { 
      const data1 = await fs.readFile('../public/pages/error.html');
      this.response.statusCode = 404;
      this.response.write(data1);
    }
    }

  }

}
