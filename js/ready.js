
$(function() {
	// getting set up

	var r;
	var g;
	var b;

	const background = $('#background');

	const colors = [];
	const displays = [];

	for (r = 0; r < 16; r++) {
		for (g = 0; g < 16; g++) {
			for (b = 0; b < 16; b++) {
				const color = new Color({
					'red': (r * 17),
					'green': (g * 17),
					'blue': (b * 17),
				});

				colors.push(color);

				const display = $('<hr />', {'class': 'magic'}).css({
					'color': color.getHexString(),
					'background-color': color.getHexString(),
				});
				displays.push(display);
				display.appendTo('#background');
			}
		}
	}
});
