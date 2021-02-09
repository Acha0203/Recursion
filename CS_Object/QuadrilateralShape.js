class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Line{
    constructor(startPoint, endPoint){
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

	// 辺の長さを計算する
	getLength(){
		return Math.sqrt(Math.pow(this.endPoint.x - this.startPoint.x, 2) + Math.pow(this.endPoint.y - this.startPoint.y, 2));
    }

	// x軸と成す角度θを求める
	getTheta(){
		let base = new Line(this.startPoint, new Point(this.endPoint.x, this.startPoint.y)); // 直角三角形の底辺を定義
		let theta = Math.round(Math.acos(base.getLength() / this.getLength()) * (180 / Math.PI)); // x軸と成す角度θ
		// θが90°以上の場合は180 - θ
		if (this.startPoint.x > this.endPoint.x){
			if (this.startPoint.y < this.endPoint.y){
				return 180 - theta;
			} else return theta;
		} else if (this.startPoint.x < this.endPoint.x){
			if (this.startPoint.y > this.endPoint.y){
				return 180 - theta;
			} else return theta;
		} else return theta;
	}

	// 始点と終点のX座標の差を返す
	getDiffX(){
		return Math.abs(this.endPoint.x - this.startPoint.x);
	}

	// 始点と終点のY座標の差を返す
	getDiffY(){
		return Math.abs(this.endPoint.y - this.startPoint.y);
	}

	// x軸の描画方向を返す(1または-1)
	getDirectionX(){
		return (this.endPoint.x >= this.startPoint.x) ? 1: -1;
	}

	// y軸の描画方向を返す(1または-1)
	getDirectionY(){
		return (this.endPoint.y >= this.startPoint.y) ? 1: -1;
	}

	// 斜線の(線の傾きが0°でも90°でもない)場合にtrueを返す
	doEndPointsCross(){
		return this.startPoint.x !== this.endPoint.x && this.startPoint.y !== this.endPoint.y
	}

	// この線分のstartPointと渡された線分のendPointを繋ぐ新しい線分newLineを返す
	getThirdLine(line){
		let newLine = new Line(line.endPoint, this.startPoint);
		return newLine;
	}

}

class QuadrilateralShape{
	constructor(lineAB, lineBC, lineCD, lineDA){
		this.lineAB = lineAB;
		this.lineBC = lineBC;
		this.lineCD = lineCD;
		this.lineDA = lineDA;
	}

	// 四角形の名称を返す
	getShapeType(){
		let lengthAB = this.lineAB.getLength();
		let lengthBC = this.lineBC.getLength();
		let lengthCD = this.lineCD.getLength();
		let lengthDA = this.lineDA.getLength();

		let angleBAD = this.getAngle("BAD");
    	let angleABC = this.getAngle("ABC");
    	let angleBCD = this.getAngle("BCD");
    	let angleADC = this.getAngle("ADC");

		if (lengthAB === 0 || lengthBC === 0 || lengthCD === 0 || this.lengthDA === 0){
			return "not a quadrilateral";
		} else if (angleBAD === 0 || angleABC === 0 || angleADC === 0 || angleBCD === 0){
			return "not a quadrilateral";
		} else if (angleBAD === 180 || angleABC === 180 || angleADC === 180 || angleBCD === 180){
			return "not a quadrilateral";
		} else{
			if (lengthAB === lengthCD && lengthBC === lengthDA && lengthAB === lengthDA){
				return (angleBAD === 90) ? "square(正方形)": "rhombus(ひし形)";
			} else if (lengthAB === lengthCD && lengthBC === lengthDA){
				return (angleBAD === 90) ? "rectangle(長方形)": "parallelogram(平行四辺形)";
			} else if (angleBAD + angleADC === 180 && angleABC + angleBCD === 180 || angleBAD + angleABC === 180 && angleBCD + angleADC === 180){
				return "trapezoid(台形)";
			} else if (lengthAB === lengthDA || lengthBC === lengthAB || lengthBC === lengthCD || lengthCD === lengthDA){
				return (angleBAD + angleADC + angleABC + angleBCD >= 359 && angleBAD + angleADC + angleABC + angleBCD <= 361) ? "kite(凧)": "other（その他）";
			} else return "other（その他）";
		}
	}

	// 四角形の周囲の長さを返す
	getPerimeter(){
		return this.lineAB.getLength() + this.lineBC.getLength() + this.lineCD.getLength() + this.lineDA.getLength();
	}

	// 四角形の面積を返す
	getArea(){
		if (this.getShapeType() === "square(正方形)" || this.getShapeType() === "rectangle(長方形)"){
			return this.lineAB.getLength() * this.lineBC.getLength();
		} else if (this.getShapeType() === "parallelogram(平行四辺形)"){
			if (this.lineAB.startPoint.y === this.lineAB.endPoint.y){
				let height = new Line(new Point(this.lineDA.startPoint.x, this.lineDA.endPoint.y), this.lineDA.endPoint);
				return height.getLength() * this.lineAB.getLength();
			} else {
				let height = new Line(this.lineAB.startPoint, new Point(this.lineAB.endPoint.x, this.lineAB.startPoint.y));
				return height.getLength() * this.lineDA.getLength();
			}			
		} else if (this.getShapeType() === "rhombus(ひし形)" || this.getShapeType() === "kite(凧)"){
			let lineAC = this.lineAB.getThirdLine(this.lineBC);
			let lineDB = this.lineDA.getThirdLine(this.lineAB);
			return (lineAC.getLength() * lineDB.getLength()) / 2;
		} else if (this.getShapeType() === "trapezoid(台形)"){
			let height = new Line(new Point(0, 0), new Point(0, 0)); // 台形の高さ
			let length1 = 0;
			let length2 = 0;
			// 斜辺を挟む辺が上底と下底
			if (this.lineAB.doEndPointsCross()){
				length1 = this.lineBC.getLength();
				length2 = this.lineDA.getLength();
				height.startPoint = this.lineAB.startPoint;
				height.endPoint.x = this.lineAB.endPoint.x;
				height.endPoint.y = this.lineAB.startPoint.y;
			} else if (this.lineBC.doEndPointsCross()){
				length1 = this.lineAB.getLength();
				length2 = this.lineCD.getLength();
				height.startPoint = this.lineBC.startPoint;
				height.endPoint.x = this.lineBC.startPoint.x;
				height.endPoint.y = this.lineBC.endPoint.y;
			} else if (this.lineCD.doEndPointsCross()){
				length1 = this.lineDA.getLength();
				length2 = this.lineBC.getLength();
				height.startPoint = this.lineCD.startPoint;
				height.endPoint.x = this.lineCD.endPoint.x;
				height.endPoint.y = this.lineCD.startPoint.y;
			} else {
				length1 = this.lineAB.getLength();
				length2 = this.lineCD.getLength();
				height.startPoint = this.lineDA.startPoint;
				height.endPoint.x = this.lineDA.startPoint.x;
				height.endPoint.y = this.lineDA.endPoint.y;
			}
			// 台形の面積 = ((上底 + 下底) * 高さ) / 2
				return ((length1 + length2) * height.getLength()) / 2;
		} else return 0; // その他の場合は0を返す
	}

	// BAD, ABC, ADC, BCDの角度を返す
	getAngle(angleString){
		let l1 = this.lineDA;
		let l2 = this.lineAB;

		if (angleString === "ABC"){
			l1 = l2;
			l2 = this.lineBC;
		} else if (angleString === "ADC"){
			l2 = l1;
			l1 = this.lineCD;
		} else if (angleString === "BCD") {
			l1 = this.lineBC;
			l2 = this.lineCD;
		}

		let length1 = l1.getLength();
		let length2 = l2.getLength();
		let length3 = l1.getThirdLine(l2).getLength();

		// 辺の長さが0の場合は0を返す(四角形ではない)
		if (length1 === 0 || length2 === 0){
			return 0;
		}

		return Math.round(Math.acos((Math.pow(length1, 2) + Math.pow(length2, 2) - Math.pow(length3, 2)) / (2 * length1 * length2)) * (180 / Math.PI));
	}

	// 四角形の高さ(y軸の長さ)を返す
	getHeight(){
		let topPoint = new Point(0, 0); // yの最大値
		if (this.lineAB.startPoint.y >= this.lineBC.startPoint.y && this.lineAB.startPoint.y >= this.lineCD.startPoint.y && this.lineAB.startPoint.y >= this.lineDA.startPoint.y){
			topPoint = this.lineAB.startPoint;
		} else if (this.lineBC.startPoint.y >= this.lineCD.startPoint.y && this.lineBC.startPoint.y >= this.lineDA.startPoint.y){
			topPoint = this.lineBC.startPoint;
		} else if (this.lineCD.startPoint.y >= this.lineDA.startPoint.y){
			topPoint = this.lineCD.startPoint;
		} else {
			topPoint = this.lineDA.startPoint;
		}

		let bottomPoint = new Point(0, 0); // yの最小値
		if (this.lineAB.startPoint.y <= this.lineBC.startPoint.y && this.lineAB.startPoint.y <= this.lineCD.startPoint.y && this.lineAB.startPoint.y <= this.lineDA.startPoint.y){
			bottomPoint = this.lineAB.startPoint;
		} else if (this.lineBC.startPoint.y <= this.lineCD.startPoint.y && this.lineBC.startPoint.y <= this.lineDA.startPoint.y){
			bottomPoint = this.lineBC.startPoint;
		} else if (this.lineCD.startPoint.y <= this.lineDA.startPoint.y){
			bottomPoint = this.lineCD.startPoint;
		} else {
			bottomPoint = this.lineDA.startPoint;
		}

		let height = new Line(new Point(0, topPoint.y), new Point(0, bottomPoint.y));
		return height.getLength();
	}

	// 四角形の横幅(x軸の長さ)を返す
	getWidth(){
		let rightPoint = new Point(0, 0); // xの最大値
		if (this.lineAB.startPoint.x >= this.lineBC.startPoint.x && this.lineAB.startPoint.x >= this.lineCD.startPoint.x && this.lineAB.startPoint.x >= this.lineDA.startPoint.x){
			rightPoint = this.lineAB.startPoint;
		} else if (this.lineBC.startPoint.x >= this.lineCD.startPoint.x && this.lineBC.startPoint.x >= this.lineDA.startPoint.x){
			rightPoint = this.lineBC.startPoint;
		} else if (this.lineCD.startPoint.x >= this.lineDA.startPoint.x){
			rightPoint = this.lineCD.startPoint;
		} else {
			rightPoint = this.lineDA.startPoint;
		}

		let leftPoint = new Point(0, 0); // xの最小値
		if (this.lineAB.startPoint.x <= this.lineBC.startPoint.x && this.lineAB.startPoint.x <= this.lineCD.startPoint.x && this.lineAB.startPoint.x <= this.lineDA.startPoint.x){
			leftPoint = this.lineAB.startPoint;
		} else if (this.lineBC.startPoint.x <= this.lineCD.startPoint.x && this.lineBC.startPoint.x <= this.lineDA.startPoint.x){
			leftPoint = this.lineBC.startPoint;
		} else if (this.lineCD.startPoint.x <= this.lineDA.startPoint.x){
			leftPoint = this.lineCD.startPoint;
		} else {
			leftPoint = this.lineDA.startPoint;
		}

		let width = new Line(new Point(leftPoint.x, 0), new Point(rightPoint.x, 0));
		return width.getLength();
	}

	// 四角形をテキストとして描画する(開始(0,0)、終了(0,0))
	draw(){
		// 描画するビットマップを作成
		let bmpWidth = this.getWidth() + 2; // ビットマップの横幅
		let bmpHeight = this.getHeight() + 2; // ビットマップの高さ
		let bmp = new Array(bmpWidth * bmpHeight).fill("　"); // ビットマップを"　"で初期化
		let index = 0; // ビットマップのインデックス
		let drawPoint = this.lineAB.startPoint; // 描画ポイントの定義(点Aから描き始める)

		// 辺ABを描画
		let diffX = this.lineAB.getDiffX(); // 始点と終点のX座標の差
		let diffY = this.lineAB.getDiffY(); // 始点と終点のY座標の差
		let directX = this.lineAB.getDirectionX();
		let directY = this.lineAB.getDirectionY();
		let angleABC = this.getAngle("ABC");

		if (this.lineAB.getTheta() === 0){
			for (let i = 1; i <= diffX; i++){
				drawPoint.x = drawPoint.x + directX;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "﹉";
			}
			if (angleABC <= 90){
				drawPoint.x = drawPoint.x + directX;
			}
		} else if (this.lineAB.getTheta() === 90){
			for (let i = 1; i <= diffY; i++){
				drawPoint.y = drawPoint.y + directY;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "\|";
			}
		} else if (this.lineAB.getTheta() === 45){
			for (let i = 1; i <= diffX; i++){
				drawPoint.x = drawPoint.x + directX;
				drawPoint.y = drawPoint.y + directY;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "/";
			}
			drawPoint.x = drawPoint.x + directX;
		} else if (this.lineAB.getTheta() === 135){
			drawPoint.y = drawPoint.y + 1;
			for (let i = 1; i <= diffX; i++){
				drawPoint.x = drawPoint.x + directX;
				drawPoint.y = drawPoint.y + directY;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "\\";
			}
			drawPoint.y = drawPoint.y + directY;
			if (angleABC <= 90){
				drawPoint.x = drawPoint.x + directX;
			}
		} else {
			drawPoint = this.lineBC.startPoint;
		}

		//console.log("x: " + drawPoint.x);
		//console.log("y: " + drawPoint.y);
		//if (this.getAngle("ABC") <= 90){
		//	drawPoint.x = drawPoint.x + directX;
		//}
		//console.log("x: " + drawPoint.x);
		//console.log("y: " + drawPoint.y);

		// 辺BCを描画
		diffX = this.lineBC.getDiffX(); // 始点と終点のX座標の差
		diffY = this.lineBC.getDiffY(); // 始点と終点のY座標の差
		directX = this.lineBC.getDirectionX();
		directY = this.lineBC.getDirectionY();
		let angleBCD = this.getAngle("BCD");

		if (this.lineBC.getTheta() === 0){
			for (let i = 1; i <= diffX; i++){
				drawPoint.x = drawPoint.x + directX;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "﹍";
			}
		} else if (this.lineBC.getTheta() === 90){
			for (let i = 1; i <= diffY; i++){
				drawPoint.y = drawPoint.y + directY;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "\|";
			}
			if (angleBCD < 90){
				drawPoint.y = drawPoint.y + directY;
			}
		} else if (this.lineBC.getTheta() === 45){
			for (let i = 1; i <= diffX; i++){
				drawPoint.x = drawPoint.x + directX;
				drawPoint.y = drawPoint.y + directY;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "/";
			}
			if (angleBCD <= 90){
				drawPoint.x = drawPoint.x + directX;
			}
		} else if (this.lineBC.getTheta() === 135){
			for (let i = 1; i <= diffX; i++){
				drawPoint.x = drawPoint.x + directX;
				drawPoint.y = drawPoint.y + directY;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "\\";
			}
		} else {
			drawPoint = this.lineCD.startPoint;
		}

		// 辺CDを描画
		diffX = this.lineCD.getDiffX(); // 始点と終点のX座標の差
		diffY = this.lineCD.getDiffY(); // 始点と終点のY座標の差
		directX = this.lineCD.getDirectionX();
		directY = this.lineCD.getDirectionY();
		let angleADC = this.getAngle("ADC");

		if (this.lineCD.getTheta() === 0){
			drawPoint.y = drawPoint.y + directY;
			for (let i = 1; i <= diffX; i++){
				drawPoint.x = drawPoint.x + directX;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "﹍";
			}
			if (angleADC <= 90){
				drawPoint.x = drawPoint.x + directX;
			}
		} else if (this.lineCD.getTheta() === 90){
			drawPoint.x = drawPoint.x + directX;
			for (let i = 1; i <= diffY; i++){
				drawPoint.y = drawPoint.y + directY;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "\|";
			}
		} else if (this.lineCD.getTheta() === 45){
			for (let i = 1; i <= diffX; i++){
				drawPoint.x = drawPoint.x + directX;
				drawPoint.y = drawPoint.y + directY;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "/";
			}
			drawPoint.x = drawPoint.x + directX;
			if (angleADC < 90){
				drawPoint.y = drawPoint.y + directY;
			}
		} else if (this.lineCD.getTheta() === 135){
			for (let i = 1; i <= diffX; i++){
				drawPoint.x = drawPoint.x + directX;
				drawPoint.y = drawPoint.y + directY;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "\\";
			}
			if (angleADC <= 90){
				drawPoint.x = drawPoint.x + directX;
				drawPoint.y = drawPoint.y + directY;
			}
		} else {
			drawPoint = this.lineDA.startPoint;
		}

		// 辺DAを描画
		diffX = this.lineDA.getDiffX(); // 始点と終点のX座標の差
		diffY = this.lineDA.getDiffY(); // 始点と終点のY座標の差
		directX = this.lineDA.getDirectionX();
		directY = this.lineDA.getDirectionY();

		if (this.lineDA.getTheta() === 0){
			for (let i = 1; i <= diffX; i++){
				drawPoint.x = drawPoint.x + directX;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "﹉";
			}
		} else if (this.lineDA.getTheta() === 90){
			for (let i = 1; i <= diffY; i++){
				drawPoint.y = drawPoint.y + directY;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "\|";
			}
		} else if (this.lineDA.getTheta() === 45){
			for (let i = 1; i <= diffX; i++){
				drawPoint.x = drawPoint.x + directX;
				drawPoint.y = drawPoint.y + directY;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "/";
			}
		} else if (this.lineDA.getTheta() === 135){
			for (let i = 1; i <= diffX; i++){
				drawPoint.x = drawPoint.x + directX;
				drawPoint.y = drawPoint.y + directY;
				index = drawPoint.y * bmpWidth + drawPoint.x;
				bmp[index] = "\\";
			}
		} else {
			drawPoint = this.lineAB.startPoint;
		}

		// テキストに変換して出力
		let lineString = bmp.join(" ");
		let output = "";
		let bmpArea = bmpHeight * bmpWidth;
		for (let i = 0; i < bmpHeight; i++) {
			output = output + lineString.substring(bmpArea * 2 - bmpWidth * 2 * (i + 1), bmpArea * 2 - bmpWidth * 2 * i) + "\n";
		}
		return output;
	}	
}

let quadrilaterals1 = new QuadrilateralShape(new Line(new Point(0,0), new Point(5,0)), new Line(new Point(5,0), new Point(5,5)), new Line(new Point(5,5), new Point(0,5)), new Line(new Point(0,5), new Point(0,0)));

console.log(quadrilaterals1.getShapeType());
console.log("周囲の長さ:" + quadrilaterals1.getPerimeter());
console.log("面積:" + quadrilaterals1.getArea());
console.log("BADの角度:" + quadrilaterals1.getAngle("BAD"));
console.log("ABCの角度:" + quadrilaterals1.getAngle("ABC"));
console.log("BCDの角度:" + quadrilaterals1.getAngle("BCD"));
console.log("ADCの角度:" + quadrilaterals1.getAngle("ADC"));
console.log(quadrilaterals1.draw());

let quadrilaterals2 = new QuadrilateralShape(new Line(new Point(0,0), new Point(8,0)), new Line(new Point(8,0), new Point(8,5)), new Line(new Point(8,5), new Point(0,5)), new Line(new Point(0,5), new Point(0,0)));

console.log(quadrilaterals2.getShapeType());
console.log("周囲の長さ:" + quadrilaterals2.getPerimeter());
console.log("面積:" + quadrilaterals2.getArea());
console.log("BADの角度:" + quadrilaterals2.getAngle("BAD"));
console.log("ABCの角度:" + quadrilaterals2.getAngle("ABC"));
console.log("BCDの角度:" + quadrilaterals2.getAngle("BCD"));
console.log("ADCの角度:" + quadrilaterals2.getAngle("ADC"));
console.log(quadrilaterals2.draw());

let quadrilaterals3 = new QuadrilateralShape(new Line(new Point(0,0), new Point(2,2)), new Line(new Point(2,2), new Point(2,6)), new Line(new Point(2,6), new Point(0,4)), new Line(new Point(0,4), new Point(0,0)));

console.log(quadrilaterals3.getShapeType());
console.log("周囲の長さ:" + quadrilaterals3.getPerimeter());
console.log("面積:" + quadrilaterals3.getArea());
console.log("BADの角度:" + quadrilaterals3.getAngle("BAD"));
console.log("ABCの角度:" + quadrilaterals3.getAngle("ABC"));
console.log("BCDの角度:" + quadrilaterals3.getAngle("BCD"));
console.log("ADCの角度:" + quadrilaterals3.getAngle("ADC"));
console.log(quadrilaterals3.draw());

let quadrilaterals4 = new QuadrilateralShape(new Line(new Point(0,0), new Point(4,0)), new Line(new Point(4,0), new Point(6,2)), new Line(new Point(6,2), new Point(2,2)), new Line(new Point(2,2), new Point(0,0)));

console.log(quadrilaterals4.getShapeType());
console.log("周囲の長さ:" + quadrilaterals4.getPerimeter());
console.log("面積:" + quadrilaterals4.getArea());
console.log("BADの角度:" + quadrilaterals4.getAngle("BAD"));
console.log("ABCの角度:" + quadrilaterals4.getAngle("ABC"));
console.log("BCDの角度:" + quadrilaterals4.getAngle("BCD"));
console.log("ADCの角度:" + quadrilaterals4.getAngle("ADC"));
console.log(quadrilaterals4.draw());

let quadrilaterals5 = new QuadrilateralShape(new Line(new Point(0,0), new Point(6,0)), new Line(new Point(6,0), new Point(4,2)), new Line(new Point(4,2), new Point(2,2)), new Line(new Point(2,2), new Point(0,0)));

console.log(quadrilaterals5.getShapeType());
console.log("周囲の長さ:" + quadrilaterals5.getPerimeter());
console.log("面積:" + quadrilaterals5.getArea());
console.log("BADの角度:" + quadrilaterals5.getAngle("BAD"));
console.log("ABCの角度:" + quadrilaterals5.getAngle("ABC"));
console.log("BCDの角度:" + quadrilaterals5.getAngle("BCD"));
console.log("ADCの角度:" + quadrilaterals5.getAngle("ADC"));
console.log(quadrilaterals5.draw());

let quadrilaterals6 = new QuadrilateralShape(new Line(new Point(0,0), new Point(2,2)), new Line(new Point(2,2), new Point(2,4)), new Line(new Point(2,4), new Point(0,6)), new Line(new Point(0,6), new Point(0,0)));

console.log(quadrilaterals6.getShapeType());
console.log("周囲の長さ:" + quadrilaterals6.getPerimeter());
console.log("面積:" + quadrilaterals6.getArea());
console.log("BADの角度:" + quadrilaterals6.getAngle("BAD"));
console.log("ABCの角度:" + quadrilaterals6.getAngle("ABC"));
console.log("BCDの角度:" + quadrilaterals6.getAngle("BCD"));
console.log("ADCの角度:" + quadrilaterals6.getAngle("ADC"));
console.log(quadrilaterals6.draw());

let quadrilaterals7 = new QuadrilateralShape(new Line(new Point(0,2), new Point(2,0)), new Line(new Point(2,0), new Point(4,0)), new Line(new Point(4,0), new Point(6,2)), new Line(new Point(6,2), new Point(0,2)));

console.log(quadrilaterals7.getShapeType());
console.log("周囲の長さ:" + quadrilaterals7.getPerimeter());
console.log("面積:" + quadrilaterals7.getArea());
console.log("BADの角度:" + quadrilaterals7.getAngle("BAD"));
console.log("ABCの角度:" + quadrilaterals7.getAngle("ABC"));
console.log("BCDの角度:" + quadrilaterals7.getAngle("BCD"));
console.log("ADCの角度:" + quadrilaterals7.getAngle("ADC"));
console.log(quadrilaterals7.draw());

let quadrilaterals8 = new QuadrilateralShape(new Line(new Point(0,2), new Point(2,0)), new Line(new Point(2,0), new Point(2,6)), new Line(new Point(2,6), new Point(0,4)), new Line(new Point(0,4), new Point(0,2)));

console.log(quadrilaterals8.getShapeType());
console.log("周囲の長さ:" + quadrilaterals8.getPerimeter());
console.log("面積:" + quadrilaterals8.getArea());
console.log("BADの角度:" + quadrilaterals8.getAngle("BAD"));
console.log("ABCの角度:" + quadrilaterals8.getAngle("ABC"));
console.log("BCDの角度:" + quadrilaterals8.getAngle("BCD"));
console.log("ADCの角度:" + quadrilaterals8.getAngle("ADC"));
console.log(quadrilaterals8.draw());

let quadrilaterals9 = new QuadrilateralShape(new Line(new Point(0,2), new Point(2,0)), new Line(new Point(2,0), new Point(4,2)), new Line(new Point(4,2), new Point(2,4)), new Line(new Point(2,4), new Point(0,2)));

console.log(quadrilaterals9.getShapeType());
console.log("周囲の長さ:" + quadrilaterals9.getPerimeter());
console.log("面積:" + quadrilaterals9.getArea());
console.log("BADの角度:" + quadrilaterals9.getAngle("BAD"));
console.log("ABCの角度:" + quadrilaterals9.getAngle("ABC"));
console.log("BCDの角度:" + quadrilaterals9.getAngle("BCD"));
console.log("ADCの角度:" + quadrilaterals9.getAngle("ADC"));
console.log(quadrilaterals9.draw());

// square（正方形）
// 　　﹍　﹍　﹍　﹍　﹍　　
// ｜　　　　　　　　　　　｜
// ｜　　　　　　　　　　　｜
// ｜　　　　　　　　　　　｜
// ｜　　　　　　　　　　　｜
// ｜　　　　　　　　　　　｜
// 　　﹉　﹉　﹉　﹉　﹉　　

// rectangle（長方形）
// 　　﹍　﹍　﹍　﹍　﹍　﹍　﹍　﹍　　
// ｜　　　　　　　　　　　　　　　　　｜
// ｜　　　　　　　　　　　　　　　　　｜
// ｜　　　　　　　　　　　　　　　　　｜
// ｜　　　　　　　　　　　　　　　　　｜
// ｜　　　　　　　　　　　　　　　　　｜
// 　　﹉　﹉　﹉　﹉　﹉　﹉　﹉　﹉　　

// parallelogram(平行四辺形)
// 　　　　　　　
// 　　　　／　｜
// 　　／　　　｜
// ｜　　　　　｜
// ｜　　　　　｜
// ｜　　　／　　
// ｜　／　


// parallelogram(平行四辺形)
// 　　　　　　﹍　﹍　﹍　﹍　　
// 　　　　／　　　　　　　／　　
// 　　／　　　　　　　／　　　　
// 　　﹉　﹉　﹉　﹉　　

// trapezoid(台形)
// 　　　　　　﹍　﹍　　　　　　
// 　　　　／　　　　　＼　　　　
// 　　／　　　　　　　　　＼　　
// 　　﹉　﹉　﹉　﹉　﹉　﹉　　