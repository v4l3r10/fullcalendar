
function CoordinateGrid(buildFunc) {

	var t = this;
	var rows;
	var cols;
	var sources;
	
	
	t.build = function() {
		rows = [];
		cols = [];
		sources = [];
		buildFunc(rows, cols, sources);
	};
	
	
	t.cell = function(x, y) {
		var rowCnt = rows.length;
		var colCnt = cols.length;
		var srcCnt = sources.length;
		var cols_ = cols;
		var rows_ = rows;

		var i, j, r=-1, c=-1, srcCol=-1, srcNo=-1;
		for (i=0; i<rowCnt; i++) {
			if (y >= rows[i][0] && y < rows[i][1]) {
				r = i;
				break;
			}
		}
		for (i=0; i<colCnt; i++) {
			if (x >= cols[i][0] && x < cols[i][1]) {
				c = i;
				break;
			}
		}
		for (i=0; i<srcCnt; i++) {
			if (x >= sources[i][0] && x < sources[i][1]) {
				srcCol = i;
				srcNo = sources[i][2];
				break;
			}
		}

		return (r>=0 && c>=0) ? { row:r, col:c, srcCol: srcCol, srcNo: srcNo } : null;
	};
	
	
	t.rect = function(row0, col0, row1, col1, originElement, srcCol) { // row1,col1 is inclusive
		var origin = originElement.offset();
		return {
			top: rows[row0][0] - origin.top,
			left: (typeof srcCol === 'undefined') ? cols[col0][0] - origin.left : sources[srcCol][0] - origin.left,
			width: (typeof srcCol === 'undefined') ? cols[col1][1] - cols[col0][0] : sources[srcCol][1] - sources[srcCol][0],
			height: rows[row1][1] - rows[row0][0]
		};
	};

}
