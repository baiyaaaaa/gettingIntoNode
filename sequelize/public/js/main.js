$(function() {
	$('form').submit(function(ev) {
		ev.preventDefault();
		var form = $(this);

		$.ajax({
			url : form.attr('action'),
			type : 'POST',
			data : form.serialize(),
			success : function(obj) {
				var projects_num = $('#projects-list').length,
					el = $('<li>');
				
				if (projects_num) {
					el
					.append($('<a>').attr('href', '/project/' + obj.id + '/tasks').text(obj.title + ' '))
					.append($('<a>').attr('href', '/project/' + obj.id + '/tasks').attr('class', 'delete').text('x'));
				} else {
					el
					.append($('<span>').text(obj.title + ' '))
					.append($('<a>').attr('href', '/task/' + obj.id).attr('class', 'delete').text('x'));
				}

				$('ul').append(el);
			}
		});

		form.find('input').val('');
	});
});