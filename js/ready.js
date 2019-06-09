
$(function() {
	// generate the colors

	var r;
	var g;
	var b;

	const background = $('#background');

	const colors = [];
	const displays = [];

	for (r = 0; r < 4; r++) {
		for (g = 0; g < 4; g++) {
			for (b = 0; b < 4; b++) {
				const color = new Color({
					'red': (r * 4 * 17),
					'green': (g * 4 * 17),
					'blue': (b * 4 * 17),
				});

				colors.push(color);

				const display = $('<div>', {'class': 'magic'}).css({
					'background-color': color.getHexString(),
				});
				displays.push(display);
				display.appendTo('#background');
			}
		}
	}

	// put them in their spots

	function assignColors() {
		const selected = $('input[name="compare"][type="radio"]:checked').val();

		colors.sort(Compare[selected]);
		displays.forEach(function(ele, index) {
			ele.css({
				'background-color': colors[index].getHexString(),
			});
		});
	};

	assignColors();
	$('input:radio').change(assignColors);

	// show/hide the descriptions

	function adjustDescriptions() {
		const selected = $('input[name="compare"][type="radio"]:checked').val();
		$('div.compare-description').each(function() {
			if ($(this).attr('id') === 'compare-' + selected) {
				$(this).css({'display': 'block'});
			} else {
				$(this).css({'display': 'none'});
			}
		});
	};
	adjustDescriptions();
	$('input:radio').change(adjustDescriptions);

	// おわり だ よ!
});
