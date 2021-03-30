'use strict'

class UserComment 
{
	constructor(name, surname, text) 
	{
		this.name = name;
		this.surname = surname;
		this.text = text;
		this.time = Math.floor(Date.now() / 1000)
	}
}

let comments = [];

document.getElementById('add-comment').onclick = function() // добавление комментария по кнопке
{
	event.preventDefault(); // отключаю обновление страницы по нажатию кнопки

	// обьект с данными коммента
	let commentName = document.querySelector('.comment-name');
	let commentSurname = document.querySelector('.comment-surname');
	let commentBody = document.querySelector('.comment-area');
	let comment = new UserComment(commentName.value, commentSurname.value, commentBody.value);
	comments.push(comment);
	console.log(comments)

	// вывод коммента
	let commentsField = document.querySelector('.comments-field');
	commentsField.style = 'display: block;'
	commentsField.insertAdjacentHTML('beforeend', `<div class='comment-wrap'>
														<div class='comment'>
															<span class='comment__name-surname'>${comment.name + ' ' + comment.surname}</span>
															<em class='comment-time'>${timeConverter(comment.time)}</em>
															<span class='comment-text' role='textbox' contenteditable>${comment.text}</span>
														</div>														
													</div>`)
}

function timeConverter(UNIX_timestamp) // перевод времени из unix в привычный формат
{
	let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

document.querySelector('.discending').onclick = function() // сортировка по убыванию
{
	deleteCommentsWrap();

	comments.sort((a, b) => a.time > b.time ? -1 : 1);

	console.log(comments);
	let commentsField = document.querySelector('.comments-field')
	for (let comment of comments)
	{
		commentsField.insertAdjacentHTML('beforeend', `<div class='comment-wrap'>
														<div class='comment'>
															<span class='comment__name-surname'>${comment.name + ' ' + comment.surname}</span>
															<em class='comment-time'>${timeConverter(comment.time)}</em>
															<span class='comment-text' role='textbox' contenteditable>${comment.text}</span>
														</div>														
													</div>`)
	}
}

document.querySelector('.ascending').onclick = function() // сортировка по возрастанию
{
	deleteCommentsWrap();

	comments.sort((a, b) => a.time > b.time ? 1 : -1);

	let commentsField = document.querySelector('.comments-field')
	for (let comment of comments)
	{
		commentsField.insertAdjacentHTML('beforeend', `<div class='comment-wrap'>
														<div class='comment'>
															<span class='comment__name-surname'>${comment.name + ' ' + comment.surname}</span>
															<em class='comment-time'>${timeConverter(comment.time)}</em>
															<span class='comment-text' role='textbox' contenteditable>${comment.text}</span>
														</div>														
													</div>`)
	}
}

function deleteCommentsWrap()
{
	let commentsWrap = document.querySelectorAll('.comment-wrap');
	
	for (let item of commentsWrap) 
	{
    	item.remove();
	}
}