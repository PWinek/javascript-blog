'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
}

function titleClickHandler(event){

  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.post');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href');
	const targetArticle = document.querySelector(articleSelector);
	targetArticle.classList.add('active');
}

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
  const links = document.querySelectorAll(' .titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags){

  const params = {
    min: 999,
    max: 0
  };
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

try{
  calculateTagClass();
}catch(e){
  console.error(e);
}

function generateTags(){

	let allTags = {};
	const articles = document.querySelectorAll(optArticleSelector);
	for(let article of articles){
		const findTagWrapper = article.querySelector(optArticleTagsSelector);
		let html = '';
		const articleTags = article.getAttribute('data-tags');
		const articleTagsArray = articleTags.split(' ');
		for(let tag of articleTagsArray){
			let linkHTML = '<li><a href="#tag-'+ tag +'">'+ tag +'  </a></li>';
			findTagWrapper.insertAdjacentHTML('beforeend', linkHTML);
			if(!allTags.hasOwnProperty(tag)){
			 allTags[tag] = 1;
			} else {
			 allTags[tag]++;
			}
	  }
	  const tagList = document.querySelector('.tags');
	  const tagsParams = calculateTagsParams(allTags);
	  console.log('tagsParams:', tagsParams);
    const allTagsData = {tags: []};
    for(let tag in allTags){
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
  	}
  	tagList.innerHTML = templates.tagCloudLink(allTagsData);
	}
}

generateTags();

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for(let activeTag of activeTagLinks){
	  activeTag.classList.remove('active');
  }
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for(let tagLink of tagLinks){
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
	const klicks = document.querySelectorAll(' .list-horizontal a');	
  	for(let klick of klicks){
    	klick.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();//

function generateAuthors(){

	const articles = document.querySelectorAll(optArticleSelector);
	for(let article of articles){
		const findTegWrapper = article.querySelector('.post-author');
		let html = '';
		const articleAuth = article.getAttribute('data-author');	
		let linkHTML = 'by <a href="#auth-'+ articleAuth +'">'+ articleAuth +' </a>';
		findTegWrapper.insertAdjacentHTML('beforeend', linkHTML);
	}
}

generateAuthors();

function authorClickHandler(event){
  
  event.preventDefault();
  const clockedElement = this;
  const href = clockedElement.getAttribute('href');
  const auth = href.replace('#auth-', '');
  const activeAuthLinks = document.querySelectorAll('a.active[href^="#auth-"]');
  for(let activeAuth of activeAuthLinks){
	  activeAuth.classList.remove('active');
  }
  const authLinks = document.querySelectorAll('a[href="' + href + '"]');
  for(let authLink of authLinks){ 
    authLink.classList.add('active');
  }
  generateTitleLinks('[data-author ="' + auth + '"]');
}

function addClickListenersToAuthors(){
	const sinks = document.querySelectorAll('.post-author a');
  	for(let sink of sinks){
    	sink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();//