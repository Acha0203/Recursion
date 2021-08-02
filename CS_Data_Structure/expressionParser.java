class Node {
	public char charData;
	public int intData;
	public Node next;

	public Node(char data) {
		this.charData = data;
		this.next = null;
	}

	public Node(int data) {
		this.intData = data;
		this.next = null;
	}
}

class Stack {
	public Node head;

	public Stack() {
		this.head = null;
	}

	public void push(Node node) {
		Node temp = this.head;
		this.head = node;
		this.head.next = temp;
	}

	public Node pop() {
		if (this.head == null)
			return null;
		Node temp = this.head;
		this.head = this.head.next;
		return temp;
	}

	public Node peek() {
		if (this.head == null)
			return null;
		return this.head;
	}
}

class Main {

	public static int expressionParser(String expression) {
		String numberString = "";
		int result = 0;
		// オペランドスタック
		Stack operandStack = new Stack();
		// 演算子スタック
		Stack operatorStack = new Stack();

		for (int i = 0; i < expression.length(); i++) {
			char token = expression.charAt(i);
			// tokenがオペランドの場合
			if (Character.isDigit(token)) {
				// 演算子が出てくるまで数字をnumberStringに追加する
				numberString += token;
				// tokenが演算子の場合
			} else {
				// 演算子までの数字をint型に変換してスタックにpushする
				if (numberString != "") {
					operandStack.push(new Node(Integer.parseInt(numberString)));
					result = operandStack.peek().intData;
				}
				numberString = "";
				// ()内を計算する
				if (token == ')') {
					while (operatorStack.peek().charData != '(') {
						result = calculate(operandStack.pop().intData, operandStack.pop().intData,
								operatorStack.pop().charData);
						operandStack.push(new Node(result));
					}
					operatorStack.pop();
				} else if (token == '(') {
					operatorStack.push(new Node(token));
				} else if (token == '*' || token == '/' || token == '^') {
					if (operatorStack.peek() == null || operatorStack.peek().charData == '('
							|| operatorStack.peek().charData == '+' || operatorStack.peek().charData == '-') {
						operatorStack.push(new Node(token));
					} else {
						result = calculate(operandStack.pop().intData, operandStack.pop().intData,
								operatorStack.pop().charData);
						operandStack.push(new Node(result));
						operatorStack.push(new Node(token));
					}
				} else {
					if (operatorStack.peek() == null || operatorStack.peek().charData == '(') {
						operatorStack.push(new Node(token));
					} else {
						result = calculate(operandStack.pop().intData, operandStack.pop().intData,
								operatorStack.pop().charData);
						operandStack.push(new Node(result));
						operatorStack.push(new Node(token));
					}
				}
			}
		}
		if (numberString != "") {
			operandStack.push(new Node(Integer.parseInt(numberString)));
			result = operandStack.peek().intData;
		}

		while (operatorStack.peek() != null) {
			result = calculate(operandStack.pop().intData, operandStack.pop().intData, operatorStack.pop().charData);
			operandStack.push(new Node(result));
		}

		return result;
	}

	public static int calculate(int operandA, int operandB, char operator) {
		switch (operator) {
			case '+':
				return operandA + operandB;
			case '-':
				return operandB - operandA;
			case '*':
				return operandA * operandB;
			case '/':
				return operandB / operandA;
			case '^':
				double doubleA = operandA;
				double doubleB = operandB;
				return (int) Math.pow(doubleB, doubleA);
			default:
				return 0;
		}
	}

	public static void main(String[] args) {
		System.out.println(expressionParser("2+4*6"));
		System.out.println(expressionParser("2*3+4"));
		System.out.println(expressionParser("3*3/3*3*3"));
		System.out.println(expressionParser("1+2+3+4+5+6+7+8+9+10"));
		System.out.println(expressionParser("1+2*5/3+6/4*2"));
		System.out.println(expressionParser("42"));
		System.out.println(expressionParser("(100+300)*5+(20-10)/10"));
		System.out.println(expressionParser("(100+200)/3*100+1000/10"));
		System.out.println(expressionParser("100+300/3*(100+100)/2"));
		System.out.println(expressionParser("100*3/30+(100+100)/2*(5+3)"));
		System.out.println(expressionParser("(100+60)/((5+3)*2)"));
		System.out.println(expressionParser("(((100+60)*2)*2)/((5+3)*2)"));
		System.out.println(expressionParser("3^2+5^2"));
	}
}
// expressionParser("2+4*6") // 26
// expressionParser("2*3+4") // 10
// expressionParser("3*3/3*3*3") // 27
// expressionParser("1+2+3+4+5+6+7+8+9+10") // 55
// expressionParser("1+2*5/3+6/4*2") // 6
// expressionParser("42") // 42
// expressionParser("(100+300)*5+(20-10)/10") // 2001
// expressionParser("(100+200)/3*100+1000/10") // 10100
