'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  /* [DONE] remove class 'active' from all article links */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
	
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
	
  /* [DONE] add class 'active' to the correct article */	
  targetArticle.classList.add('active');
}

/*generating title list*/
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  titleList.innerHTML = '';
	
	
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
  /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /* find the title element and get title form title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    /* create HTML of the link */
    const linkHTML = '<li><a href="#'+ articleId +'"><span>'+ articleTitle +'</span></a></li>';
    console.log(linkHTML);
    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
  const links = document.querySelectorAll(' .titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);
	
	/* START LOOP: for every article: */
	for(let article of articles){
		/* find tags wrapper */
		const hehe = article.querySelector(optArticleTagsSelector);
		/* make html variable with empty string */
		let html = '';
		/* get tags from data-tags attribute */
		const articleTags = article.getAttribute('data-tags');
		console.log(articleTags);
		/*split tags into array */
		const articleTagsArray = articleTags.split(' ');
		/* START LOOP: for each tag */
			for(let tag of articleTagsArray){
			/* generate HTML of the link */
			let linkHTML = '<li><a href="#tag-'+ tag +'">'+ tag +'  </a></li>';
			console.log(linkHTML);
			/* add generated code to html variable */
			hehe.insertAdjacentHTML('beforeend', linkHTML);
			
		/* END LOOP: for each tag */
		}
		/* insert HTML of all the links into the tags wrapper */
		
  	
	/*END LOOP: for every article: */
	}
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  console.log(activeTagLinks);
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTagLinks){
    /* remove class active */
	activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(tagLinks); 
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
	const tinks = document.querySelectorAll(' .list-horizontal a');
  	console.log(tinks);
  	for(let tink of tinks){
    	tink.addEventListener('click', tagClickHandler);
  }
}
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */

addClickListenersToTags();//


function generateAuthors(){
	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);
	
	/* START LOOP: for every article: */
	for(let article of articles){
		/* find tags wrapper */
		const hihi = article.querySelector('.post-author');
		/* make html variable with empty string */
		let html = '';
		/* get tags from data-tags attribute */
		const articleAuth = article.getAttribute('data-author');
		console.log(articleAuth);
		/*split tags into array */
		
		/* START LOOP: for each tag */
			
		let linkHTML = 'by <a href="#auth-'+ articleAuth +'">'+ articleAuth +' </a>';
		console.log(linkHTML);
			/* add generated code to html variable */
		hihi.insertAdjacentHTML('beforeend', linkHTML);
			
		/* END LOOP: for each tag */
		
		/* insert HTML of all the links into the tags wrapper */
		
  	
	/*END LOOP: for every article: */
	}
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clockedElement = this;
  console.log(clockedElement);
  console.log('Link was clicked!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clockedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const auth = href.replace('#auth-', '');
  console.log(auth);
  /* find all tag links with class active */
  const activeAuthLinks = document.querySelectorAll('a.active[href^="#auth-"]');

  console.log(activeAuthLinks);
  /* START LOOP: for each active tag link */
  for(let activeAuth of activeAuthLinks){
    /* remove class active */
	activeAuth.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authLinks); 
  /* START LOOP: for each found tag link */
  for(let authLink of authLinks){
    /* add class active */
    authLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author ="' + auth + '"]');
}

function addClickListenersToAuthors(){
	const sinks = document.querySelectorAll('.post-author a');
  	console.log(sinks);
  	for(let sink of sinks){
    	sink.addEventListener('click', authorClickHandler);
  }
}
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */

addClickListenersToAuthors();//